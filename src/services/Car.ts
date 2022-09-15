import IService from '../interfaces/IService';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

export default class CarService implements IService<ICar> {
  constructor(private _carModel: IModel<ICar>) {}

  public async create(object: ICar): Promise<ICar & { _id: string }> {
    const parsedData = CarZodSchema.safeParse(object);
    if (!parsedData.success) throw parsedData.error;

    const result = await this._carModel.create(parsedData.data);
    return result as ICar & { _id: string };
  }

  public async read(): Promise<ICar[]> {
    const data = await this._carModel.read();
    return data;
  }

  public async readOne(_id: string): Promise<ICar> {
    const result = await this._carModel.readOne(_id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }

  public async update(
    _id: string,
    object: ICar,
  ): Promise<ICar & { _id: string }> {
    const parsedData = CarZodSchema.safeParse(object);
    if (!parsedData.success) throw parsedData.error;

    const result = await this._carModel.update(_id, parsedData.data);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);

    return result as ICar & { _id: string };
  }

  public async delete(_id: string): Promise<ICar> {
    const result = await this._carModel.delete(_id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }
}
