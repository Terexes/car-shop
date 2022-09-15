import { ICar } from "../../interfaces/ICar";

export const id = '6322faa8c2ce15ba65d5cb6d';

export const wrongId = '6322faa8c2ce15ba65d5cb7a';

export const invalidId = 'teste';

export const validCar:ICar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export const validCarWithId:ICar & {_id: string} = {
  _id: '6322faa8c2ce15ba65d5cb6d',
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export const updatedCar:ICar = {
  model: 'Uno da Escada',
  year: 1966,
  color: 'blue',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export const updatedCarWithId:ICar & {_id: string} = {
  _id: '6322faa8c2ce15ba65d5cb6d',
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export const coverageCar:ICar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export const coverageCarWithId:ICar & {_id: string} = {
  _id: '6322faa8c2ce15ba65d5cb6d',
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export const noModelCar = {
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export const noYearCar = {
  model: 'Uno da Escada',
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
}

export const noColorCar = {
  model: 'Uno da Escada',
  year: 1963,
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
}

export const noBuyValueCar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  seatsQty: 2,
  doorsQty: 2
}

export const noSeatsCar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  doorsQty: 2
}

export const noDoorsCar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
}

export const carSeatsLtTwo = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 1,
  doorsQty: 2
}

export const carDoorsLtTwo = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 1
}