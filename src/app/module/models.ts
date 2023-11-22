import { Document, model, Schema, CallbackError } from 'mongoose';
import { Address, FullName, Order, User } from './interfaces';
import bcrypt from 'bcrypt';

const fullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First Name cannot be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    maxlength: [20, 'Last Name cannot be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const lastNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return lastNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
});

const addressSchema = new Schema<Address>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const orderSchema = new Schema<Order>({
  productName: { type: String, required: [true, 'Product Name is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  fullName: { type: fullNameSchema, required: [true, 'Full Name is required'] },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: { type: Boolean, required: [true, 'isActive is required'] },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: { type: addressSchema, required: [true, 'Address is required'] },
  orders: { type: [orderSchema] },
});

// Hash the password before saving it to the database
userSchema.pre<User>('save', async function (next) {
  const user = this as Document & User;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error as CallbackError);
  }
});

export const UserModel = model<User>('User', userSchema);
