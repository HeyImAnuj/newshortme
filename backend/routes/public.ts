import { Request, Response } from 'express'

import { UriStore, UriData } from '../store/UriStore'

export default (req: Request, res: Response) => {
  const key = req.params.key
  if(UriStore[key] == null) return res.status(404).send({ 'message' : 'no url exists for the shortened url' })
  UriStore[key].clicked++
  res.status(301).redirect(UriStore[key].value)
}
