import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private _motorcycleService: IService<IMotorcycle>) {}

  public async create(request: Request, response: Response<IMotorcycle>) {
    const result = await this._motorcycleService.create(request.body);
    return response.status(201).json(result);
  }

  public async read(_request: Request, response: Response<IMotorcycle[]>) {
    const result = await this._motorcycleService.read();
    if (!result) return response.status(200).json([]);
    return response.status(200).json(result);
  }

  public async readOne(
    request: Request,
    response: Response<IMotorcycle | null>,
  ) {
    const { id } = request.params;
    const result = await this._motorcycleService.readOne(id);
    return response.status(200).json(result);
  }

  public async update(request: Request, response: Response<IMotorcycle>) {
    const { id } = request.params;
    const result = await this._motorcycleService.update(id, request.body);
    if (!result) return response.status(500).end();
    return response.status(200).json(result);
  }

  public async delete(request: Request, response: Response<IMotorcycle>) {
    const { id } = request.params;
    await this._motorcycleService.delete(id);
    return response.sendStatus(204);
  }
}
