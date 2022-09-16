import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _carService: IService<ICar>) {}

  public async create(request: Request, response: Response<ICar>) {
    const result = await this._carService.create(request.body);
    return response.status(201).json(result);
  }

  public async read(_request: Request, response: Response<ICar[]>) {
    const result = await this._carService.read();
    if (!result) return response.status(200).json([]);
    return response.status(200).json(result);
  }

  public async readOne(request: Request, response: Response<ICar | null>) {
    const { id } = request.params;
    const result = await this._carService.readOne(id);
    return response.status(200).json(result);
  }

  public async update(request: Request, response: Response<ICar>) {
    const { id } = request.params;
    const result = await this._carService.update(id, request.body);
    if (!result) {
      return response.status(500).end();
    }
    return response.status(200).json(result);
  }

  public async delete(request: Request, response: Response<ICar>) {
    const { id } = request.params;
    await this._carService.delete(id);
    return response.sendStatus(204);
  }
}