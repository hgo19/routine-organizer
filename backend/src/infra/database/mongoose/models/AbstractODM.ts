import {
  type Model,
  type Schema,
  model,
  models,
  type UpdateQuery,
  isValidObjectId
} from 'mongoose'

abstract class AbstractODM<T> {
  protected schema: Schema
  protected model: Model<T>
  protected modelName: string

  constructor (schema: Schema, modelName: string) {
    this.schema = schema
    this.modelName = modelName
    this.model = models[this.modelName] ?? model(this.modelName, this.schema)
  }

  public async create (entity: T): Promise<any> {
    return await this.model.create({ ...entity })
  }

  public async getAll (): Promise<any> {
    return await this.model.find({})
  }

  public async getById (id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error('Invalid mongo id')
    return await this.model.findById(id)
  }

  public async update (id: string, entity: T): Promise<any> {
    if (!isValidObjectId(id)) throw Error('Invalid mongo id')

    const filter = { _id: id }
    const update = { ...entity }
    return await this.model.findOneAndUpdate(filter, update as UpdateQuery<T>, { new: true })
  }
}

export default AbstractODM
