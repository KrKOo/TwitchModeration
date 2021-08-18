import express, { NextFunction } from 'express';
import { verifyToken as auth } from 'modules/authentication';
import { User } from 'models';

const router = express.Router();

router.get('/', auth, async (req: any, res: any, next: NextFunction) => {
  let userInfo: User[];
  try {
    userInfo = await User.query()
      .select('username', 'email', 'picture')
      .where('uuid', req.user.uuid);
    res.json(userInfo[0]);
  } catch (err) {
    return next(err);
  }
});

export default router;
