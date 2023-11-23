# express-mongooes-crud-typescript-opperation

## project:  Data Base Design
## live link:  https://users-orders-5pkxf906n-rezoanulhasan.vercel.app/



## Technology use 
- Node js
- Express js
- Mongoose
- typescript
- bcrypt (validation)
- Zod (validation)
- eslint ( code formatting and quality checking )
- prettier (maintain code structure)


## Table of Contents
- [API Endpoints](#api-endpoints)
  - [Create User](#create-user)
  - [Get All Users](#get-all-users)
  - [Get User by ID](#get-user-by-id)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
  - [Add Order to User](#add-order-to-user)
  - [Get Orders for User](#get-orders-for-user)
  - [Calculate Total Price of Orders for User](#calculate-total-price-of-orders-for-user)

## API Endpoints

### Create User
- **Endpoint:** `/api/users`
- **HTTP Method:** POST
- **Controller Method:** `UserController.createUser`

### Get All Users
- **Endpoint:** `/api/users`
- **HTTP Method:** GET
- **Controller Method:** `UserController.getAllUsers`

### Get User by ID
- **Endpoint:** `/api/users/:userId`
- **HTTP Method:** GET
- **Controller Method:** `UserController.getUserById`

### Update User
- **Endpoint:** `/api/users/:userId`
- **HTTP Method:** PUT
- **Controller Method:** `UserController.updateUser`

### Delete User
- **Endpoint:** `/api/users/:userId`
- **HTTP Method:** DELETE
- **Controller Method:** `UserController.deleteUser`

### Add Order to User
- **Endpoint:** `/api/users/:userId/orders`
- **HTTP Method:** PUT
- **Controller Method:** `UserController.addOrder`

### Get Orders for User
- **Endpoint:** `/api/users/:userId/orders`
- **HTTP Method:** GET
- **Controller Method:** `UserController.getOrders`

### Calculate the Total Price of Orders for User
- **Endpoint:** `/api/users/:userId/orders/total-price`
- **HTTP Method:** GET
- **Controller Method:** `UserController.calculateTotalPrice`



## Getting Started
 to set up and run  project locally
 - Colen this repository  
 - npm install
 -  npm run  build
 -  npm run start: dev


