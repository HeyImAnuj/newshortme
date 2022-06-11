import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../constants'

export interface IRequest extends Request {
  [key: string]: any
}

export default (req: IRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization
  if (!token) return res.status(401).send({ message: 'Access Denied / Unauthorized request' });
  try {
    token = token.split(' ')[1]
    if (token === 'null' || !token) return res.status(401).send({ message: 'Unauthorized request' })

    let user = jwt.verify(token, JWT_SECRET)
    if (!user) return res.status(401).send({ message: 'Unauthorized request' })

    req.user = user
    next()
  } catch (error) {
    res.status(400).send({ message: 'Invalid Token' });
  }
}
