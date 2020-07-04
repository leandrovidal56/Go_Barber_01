import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/createUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  ensureAuthenticated,
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();
      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });
      delete user.password;
      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });
    delete user.password;
    return response.json(user);
    // return response.send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
