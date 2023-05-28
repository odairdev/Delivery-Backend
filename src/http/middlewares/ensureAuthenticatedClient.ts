import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string
}

export async function ensureAuthenticatedClient(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if(!authHeader) {
    return response.status(401).json({
      message: 'Missing token: No Authorizatio header.'
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

    request.client_id = sub
    
    return next()
  } catch(err) {
    return response.status(401).json({
      message: 'Invalid Token.'
    })
  }
}