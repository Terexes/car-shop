import { Router } from 'express';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import MotorcycleController from '../controllers/Motorcycle';

const motorcycles = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

motorcycles.post('/', (request, response) => motorcycleController.create(request, response));
motorcycles.get('/:id', (request, response) => motorcycleController.readOne(request, response));
motorcycles.get('/', (request, response) => motorcycleController.read(request, response));
motorcycles.put('/:id', (request, response) => motorcycleController.update(request, response));
motorcycles.delete('/:id', (request, response) => motorcycleController.delete(request, response));

export default motorcycles;
