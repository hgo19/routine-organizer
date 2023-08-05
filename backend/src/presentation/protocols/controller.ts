import { type HttpResponse } from './'

export interface IController<T> {
  execute: (value: Partial<T>) => Promise<HttpResponse>
}
