import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/htpp/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  ensureAuthenticated,
  userAvatarController.create,
);

usersRouter.post('/', usersController.create);

export default usersRouter;
