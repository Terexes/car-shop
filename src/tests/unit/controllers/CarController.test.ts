import * as sinon from "sinon";
import chai from "chai";
import CarController from "../../../controllers/Car";
import CarService from "../../../services/Car";
import CarModel from "../../../models/Car";
import { Request, Response } from "express";
import {
  carDoorsLtTwo,
  carSeatsLtTwo,
  id,
  invalidId,
  noBuyValueCar,
  noColorCar,
  noDoorsCar,
  noModelCar,
  noSeatsCar,
  noYearCar,
  updatedCarWithId,
  validCar,
  validCarWithId,
  wrongId,
} from "../../mocks/CarsMocks";
import { ZodError } from "zod";

const { expect } = chai;

describe("Car controller:", () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const request = {} as Request;
  const response = {} as Response;

  beforeEach(async () => {
    sinon.stub(carService, "create").resolves(validCarWithId);
    sinon.stub(carService, "read").resolves([validCarWithId]);
    sinon.stub(carService, "readOne").resolves(validCarWithId);
    sinon.stub(carService, "update").resolves(updatedCarWithId);
    sinon.stub(carService, "delete").resolves(validCarWithId);
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
    response.sendStatus = sinon.stub().returns(response);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Create", () => {
    it("Should create a car", async () => {
      request.body = validCar;
      await carController.create(request, response);
      expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(validCarWithId)).to
        .be.true;
    });

    it("Should throw an error if no model is provided for the car", async () => {
      request.body = noModelCar;
      try {
        await carController.create(request, response);
      } catch (error: any) {
        const { issues } = error;
        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
        expect(issues[0].message).to.be.equal("Model is required");
      }
    });

    it("Should throw an error if no year is provided for the car", async () => {
      request.body = noYearCar;
      try {
        await carController.create(request, response);
      } catch (error: any) {
        const { issues } = error;
        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
        expect(issues[0].message).to.be.equal("Year is required");
      }
    });

    it("Should throw an error if no color is provided for the car", async () => {
      request.body = noColorCar;
      try {
        await carController.create(request, response);
      } catch (error: any) {
        const { issues } = error;
        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
        expect(issues[0].message).to.be.equal("Color is required");
      }
    });

    it("Should throw an error if no buyValue is provided for the car", async () => {
      request.body = noBuyValueCar;
      try {
        await carController.create(request, response);
      } catch (error: any) {
        const { issues } = error;
        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
        expect(issues[0].message).to.be.equal("buyValue is required");
      }
    });

    it("Should throw an error if no seats are provided for the car", async () => {
      request.body = noSeatsCar;
      try {
        await carController.create(request, response);
      } catch (error: any) {
        const { issues } = error;
        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
        expect(issues[0].message).to.be.equal("seatsQty is required");
      }
    });

    it("Should throw an error if less than 2 seats are provided for the car", async () => {
      request.body = carSeatsLtTwo;
      try {
        await carController.create(request, response);
      } catch (error: any) {
        const { issues } = error;
        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
        expect(issues[0].message).to.be.equal(
          "seatsQty must be greater than or equal to 2"
        );
      }
    });

    it("Should throw an error if no doors are provided for the car", async () => {
      request.body = noDoorsCar;
      try {
        await carController.create(request, response);
      } catch (error: any) {
        const { issues } = error;
        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
        expect(issues[0].message).to.be.equal("doorsQty is required");
      }
    });

    it("Should throw an error if less than 2 doors are provided for the car", async () => {
      request.body = carDoorsLtTwo;
      try {
        await carController.create(request, response);
      } catch (error: any) {
        const { issues } = error;
        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
        expect(issues[0].message).to.be.equal(
          "doorsQty must be greater than or equal to 2"
        );
      }
    });
  });

  describe("Get all cars:", () => {
    it("Should get all cars", async () => {
      await carController.read(request, response);
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith([validCarWithId])).to
        .be.true;
    });
  });

  describe("Get one car:", () => {
    it("Should get the specified car", async () => {
      request.params = { id };
      await carController.readOne(request, response);
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(validCarWithId)).to
        .be.true;
    });
  });

  describe("Update Car", () => {
    it("Success", async () => {
      request.params = { id };
      request.body = validCarWithId;

      await carController.update(request, response);

      const statusStub = response.status as sinon.SinonStub;
      const jsonStub = response.json as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(validCarWithId)).to.be.true;
    });
  });

  describe("Delete Car", () => {
    it("Should delete a specified vehicle", async () => {
      request.params = { id };
      await carController.delete(request, response);
      expect((response.sendStatus as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});
