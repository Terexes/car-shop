import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z
    .number({
      required_error: 'doorsQty is required',
      invalid_type_error: 'doorsQty must be a number',
    })
    .gte(2, { message: 'doorsQty must be greater than or equal to 2' })
    .lte(4, { message: 'doorsQty must be lower than or equal to 4' })
    .int(),
  seatsQty: z
    .number({
      required_error: 'seatsQty is required',
      invalid_type_error: 'seatsQty must be a number',
    })
    .gte(2, { message: 'seatsQty must be greater than or equal to 2' })
    .lte(7, { message: 'seatsQty must be lower than or equal to 7' })
    .int(),
});

type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema, ICar };
