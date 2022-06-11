import { Request, Response } from 'express'

import { getKey, updateKey } from '../store/State'
import { UriStore, UriData } from '../store/UriStore'
import { UserStore, UserData } from '../store/UserStore'

import { IRequest } from '../middlewares/auth'

const indexOf = (email: string): number => {
  for(let i = 0; i < UserStore.length; ++i) {
    if(UserStore[i].email === email) {
      return i
    }
  }
  return -1
}

export const Shorten = ({ user, body: { uri } }: IRequest, res: Response) => {
  const key = getKey()
  updateKey()
  UriStore[key] = { value: uri, clicked: 0 }

  const idx = indexOf(user.email)
  UserStore[idx].links.push(key)

  res.status(201).send({ 'uri' : key })
}

type ResponseData = { link: string; value: string; clicked: number; }
export const Info = ({ user }: IRequest, res: Response) => {
  const idx = indexOf(user.email)
  const { links } = UserStore[idx]

  const response: ResponseData[] = [] 
  links.forEach(link => {
    response.push({ link, ...UriStore[link] })
  })

  res.status(200).send(response)
}

export const Admin = (_: IRequest, res: Response) => {
  const response: string[] = UserStore.map(user => user.email) 

  res.status(200).send(response)
}
