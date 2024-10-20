import {NextFunction, Request, Response} from 'express';
import {RequestWithUser} from './auth';

const permit = (...roles: string[]) => {
  return (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as RequestWithUser;

    if (!req.user) {
      return res.status(401).send({'message': 'Unauthenticated'});
    }
    if (!roles.includes(req.user.role)) {
      console.log(req.user._id, roles);
      return res.status(403).send({'message': 'Unauthorized'});
    }


    next();
  }
};

export default permit;