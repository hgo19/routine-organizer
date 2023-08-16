import { type NextFunction, type Request, type Response } from 'express'

export interface IController {
  execute: (req: Request, res: Response, next: NextFunction) => Promise<any>
}
