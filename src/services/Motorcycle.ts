import IService from '../interfaces/IService';
import { MotorcycleZodSchema, IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

export default class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _motorcycleModel: IModel<IMotorcycle>) {}

  public async create(
    object: IMotorcycle,
  ): Promise<IMotorcycle & { _id: string }> {
    const parsedData = MotorcycleZodSchema.safeParse(object);
    if (!parsedData.success) throw parsedData.error;

    const result = await this._motorcycleModel.create(parsedData.data);
    return result as IMotorcycle & { _id: string };
  }

  public async read(): Promise<IMotorcycle[]> {
    const data = await this._motorcycleModel.read();
    return data;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const result = await this._motorcycleModel.readOne(_id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }

  public async update(
    _id: string,
    object: IMotorcycle,
  ): Promise<IMotorcycle & { _id: string }> {
    const parsedData = MotorcycleZodSchema.safeParse(object);
    if (!parsedData.success) throw parsedData.error;

    const result = await this._motorcycleModel.update(_id, parsedData.data);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);

    return result as IMotorcycle & { _id: string };
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const result = await this._motorcycleModel.delete(_id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }
}
