import express from 'express';
import * as UserController from './controllers';

const router = express.Router();

router.post('/api/users', UserController.createUser);
router.get('/api/users', UserController.getAllUsers);
router.get('/api/users/:userId', UserController.getUserById);
router.put('/api/users/:userId', UserController.updateUser);
router.delete('/api/users/:userId', UserController.deleteUser);

export default router;
