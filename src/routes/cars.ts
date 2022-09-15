import { Router } from 'express';
import CarModel from '../models/Car';
import CarService from '../services/Car';
import CarController from '../controllers/Car';

const cars = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

cars.post('/', (request, response) => carController.create(request, response));
cars.get('/:id', (request, response) => carController.readOne(request, response));
cars.get('/', (request, response) => carController.read(request, response));
cars.put('/:id', (request, response) => carController.update(request, response));
cars.delete('/:id', (request, response) => carController.delete(request, response));

export default cars;
