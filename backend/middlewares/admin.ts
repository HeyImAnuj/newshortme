import { Request, Response, NextFunction } from 'express'

import { IRequest } from '../middlewares/auth'

export default ({ user }: IRequest, res: Response, next: NextFunction) => {
  if (user.isAdmin) {
    return next()
  }
  res.status(401).send({ message: 'Unauthorized!' })
}
