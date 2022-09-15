import * as sinon from "sinon";
import chai from "chai";
import CarModel from "../../../models/Car";
import { Model } from "mongoose";
import {
  id,
  invalidId,
  updatedCar,
  updatedCarWithId,
  validCar,
  validCarWithId,
  wrongId,
} from "../../mocks/CarsMocks";
import { ErrorTypes } from "../../../errors/catalog";

const { expect } = chai;

describe("Car model:", () => {
  const carModel = new CarModel();
  beforeEach(() => {
    sinon.stub(Model, "create").resolves(validCarWithId);
    sinon.stub(Model, "find").resolves([validCarWithId]);
    sinon.stub(Model, "findOne").resolves(validCarWithId);
    sinon.stub(Model, "findOneAndUpdate").resolves(updatedCarWithId);
    sinon.stub(Model, "findOneAndDelete").resolves(validCarWithId);
  });

  afterEach(() => {
    sinon.restore();
  });
  describe("Create:", () => {
    it("Should create a car", async () => {
      const result = await carModel.create(validCar);
      expect(result).to.be.deep.equal(validCarWithId);
    });
  });

  describe("Get all cars:", () => {
    it("Should find all cars", async () => {
      const result = await carModel.read();
      expect(result).to.be.deep.equal([validCarWithId]);
    });
  });

  describe("Get one car:", () => {
    it("Should find the specified car", async () => {
      const result = await carModel.readOne(id);
      expect(result).to.be.deep.equal(validCarWithId);
    });

    it("Should throw error if no car is found", async () => {
      try {
        await carModel.readOne(wrongId);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it("Should throw error if a invalid id is provided", async () => {
      try {
        await carModel.readOne(invalidId);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe("Update:", () => {
    it("Should successfully update a car", async () => {
      const result = await carModel.update(id, updatedCar);
      expect(result).to.be.deep.equal(updatedCarWithId);
    });

    it("Should throw error if no car is found", async () => {
      try {
        await carModel.update(wrongId, updatedCar);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it("Should throw error if a invalid id is provided", async () => {
      try {
        await carModel.update(invalidId, updatedCar);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('Delete:', () => {
    it("Should successfully delete a car", async () => {
      const result = await carModel.delete(id);
      expect(result).to.be.deep.equal(validCarWithId);
    });
    it("Should throw error if no car is found", async () => {
      try {
        await carModel.delete(wrongId);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it("Should throw error if a invalid id is provided", async () => {
      try {
        await carModel.delete(invalidId);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  })
});
