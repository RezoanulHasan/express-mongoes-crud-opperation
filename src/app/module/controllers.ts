import { Request, Response } from 'express';
import { UserModel } from './models';
import { User } from './interfaces';
import { userValidationSchema, orderValidationSchema } from './zoidvalidation';

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    try {
      const validatedData = userValidationSchema.parse(req.body);
      const newUser = new UserModel(validatedData);
      const savedUser = await newUser.save();

      const responseUser: User = {
        ...savedUser.toObject(),
        password: '********',
      };
      res.status(201).json({
        success: true,
        message: 'User created successfully!',
        data: responseUser,
      });
    } catch (error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: {
          code: 400,
          description: 'Failed to create user',
        },
      });
    }
  } catch (error) {
    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Failed to create user',
      },
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await UserModel.find(
      {},
      'username fullName age email address -_id',
    );
    const responseUsers = users.map((user) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }));
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: responseUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Failed to fetch users',
      },
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findOne({ userId }, '-password');
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'No user here , Create a user',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Failed to fetch user',
      },
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.params;
  try {
    try {
      const validatedData = userValidationSchema.parse(req.body);
      const updatedUser = await UserModel.findOneAndUpdate(
        { userId },
        validatedData,
        {
          new: true,
          projection: '-password',
        },
      );
      if (!updatedUser) {
        res.status(404).json({
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found!',
          },
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'User updated successfully!',
          data: updatedUser,
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: {
          code: 400,
          description: 'Failed to update user',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Failed to update user',
      },
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.params;
  try {
    const deletedUser = await UserModel.findOneAndDelete(
      { userId },
      { projection: '-password' },
    );
    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Failed to delete user',
      },
    });
  }
};

export const addOrder = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findOne({ userId });
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      if (!user.orders) {
        user.orders = [];
      }
      const { productName, price, quantity } = orderValidationSchema.parse(
        req.body,
      );
      const newOrder = { productName, price, quantity };
      user.orders.push(newOrder);
      await user.save();
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Failed to create order',
      },
    });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findOne({ userId }, 'orders');
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: {
          orders: user.orders || [],
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Failed to fetch orders',
      },
    });
  }
};

export const calculateTotalPrice = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findOne({ userId }, 'orders');
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      const totalPrice = user.orders?.reduce(
        (acc, order) => acc + order.price * order.quantity,
        0,
      );

      // Check if totalPrice is not undefined before formatting
      const formattedTotalPrice =
        typeof totalPrice === 'number' ? totalPrice.toFixed(2) : 'N/A';

      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: {
          totalPrice: formattedTotalPrice,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Failed to calculate total price',
      },
    });
  }
};
