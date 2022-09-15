import * as sinon from "sinon";
import chai from "chai";
import CarModel from "../../../models/Car";
import CarService from "../../../services/Car";
import { carDoorsLtTwo, carSeatsLtTwo, id, invalidId, noBuyValueCar, noColorCar, noDoorsCar, noModelCar, noSeatsCar, noYearCar, updatedCar, updatedCarWithId, validCar, validCarWithId, wrongId } from "../../mocks/CarsMocks";
import { ZodError } from "zod";
import { ICar } from "../../../interfaces/ICar";
import { ErrorTypes } from "../../../errors/catalog";
const { expect } = chai;

describe("Car service:", () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  beforeEach(async () => {
    sinon.stub(carModel, "create").resolves(validCarWithId);
    sinon.stub(carModel, "read").resolves([validCarWithId]);
    sinon
      .stub(carModel, "readOne")
      .onCall(0)
      .resolves(validCarWithId)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .resolves(null);
    sinon
      .stub(carModel, "update")
      .onCall(0)
      .resolves(validCarWithId)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .resolves(null);
    sinon
      .stub(carModel, "delete")
      .onCall(0)
      .resolves(validCarWithId)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .resolves(null);
  });

  afterEach(() => {
    sinon.restore();
  });
  describe("Create:", () => {
    it("Should create a car", async () => {
      const result = await carService.create(validCar);
      expect(result).to.be.deep.equal(validCarWithId);
    });

    it("Should throw error if no model is informed", async () => {
      try {
        await carService.create(noModelCar as any);
      } catch (error: any) {
        const { issues } = error;
        expect(error).to.be.instanceOf(ZodError);
        expect(issues[0].message).to.be.equal("Model is required");
      }
    });

    it("Should throw error if no year is informed", async () => {
      try {
        await carService.create(noYearCar as any);
      } catch (error: any) {
        const { issues } = error;
        expect(error).to.be.instanceOf(ZodError);
        expect(issues[0].message).to.be.equal("Year is required");
      }
    });

    it("Should throw error if no color is informed", async () => {
      try {
        await carService.create(noColorCar as any);
      } catch (error: any) {
        const { issues } = error;
        expect(error).to.be.instanceOf(ZodError);
        expect(issues[0].message).to.be.equal("Color is required");
      }
    });

    it("Should throw error if no buy value is informed", async () => {
      try {
        await carService.create(noBuyValueCar as any);
      } catch (error: any) {
        const { issues } = error;
        expect(error).to.be.instanceOf(ZodError);
        expect(issues[0].message).to.be.equal("buyValue is required");
      }
    });

    it("Should throw error if no seats are informed", async () => {
      try {
        await carService.create(noSeatsCar as any);
      } catch (error: any) {
        const { issues } = error;
        expect(error).to.be.instanceOf(ZodError);
        expect(issues[0].message).to.be.equal("seatsQty is required");
      }
    });

    it("Should throw error if less than 2 seats are informed", async () => {
      try {
        await carService.create(carSeatsLtTwo as any);
      } catch (error: any) {
        const { issues } = error;
        expect(error).to.be.instanceOf(ZodError);
        expect(issues[0].message).to.be.equal("seatsQty must be greater than or equal to 2");
      }
    });

    it("Should throw error if no doors are informed", async () => {
      try {
        await carService.create(noDoorsCar as any);
      } catch (error: any) {
        const { issues } = error;
        expect(error).to.be.instanceOf(ZodError);
        expect(issues[0].message).to.be.equal("doorsQty is required");
      }
    });

    it("Should throw error if less than 2 doors are informed", async () => {
      try {
        await carService.create(carDoorsLtTwo as any);
      } catch (error: any) {
        const { issues } = error;
        expect(error).to.be.instanceOf(ZodError);
        expect(issues[0].message).to.be.equal("doorsQty must be greater than or equal to 2");
      }
    });

  });

  describe("Get all cars:", () => {
    it("Should get all cars", async () => {
      const result = await carService.read();
      expect(result).to.be.deep.equal([validCarWithId]);
    })
  })

  describe("Get one car:", () => {
    it("Should find the specified car", async () => {
      const result = await carService.readOne(id);
      expect(result).to.be.deep.equal(validCarWithId);
    });
    it("Should throw error if no car is found", async () => {
      try {
        await carService.readOne(wrongId);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it("Should throw error if a invalid id is provided", async () => {
      try {
        await carService.readOne(invalidId);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  })

  describe("Update:", () => {
    it("Should successfully update a car", async () => {
      const result = await carService.update(id, updatedCar);
      expect(result).to.be.deep.equal(updatedCarWithId);
    });

    it("Should throw error if no car is found", async () => {
      try {
        await carService.update(wrongId, updatedCar);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it("Should throw error if a invalid id is provided", async () => {
      try {
        await carService.update(invalidId, updatedCar);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('Delete:', () => {
    it("Should successfully delete a car", async () => {
      const result = await carService.delete(id);
      expect(result).to.be.deep.equal(validCarWithId);
    });
    it("Should throw error if no car is found", async () => {
      try {
        await carService.delete(wrongId);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it("Should throw error if a invalid id is provided", async () => {
      try {
        await carService.delete(invalidId);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  })
});
