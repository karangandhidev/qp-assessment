import joi from "joi";

export const createGrocery = {
  body: joi.object({
    name: joi.string().required().trim().max(100),
    description: joi.string().trim().allow(null, ""),
    price: joi.number().required().min(0),
    inventory: joi.number().required().min(0),
  }),
};

export const updateGrocery = {
  params: joi.object({
    id: joi.number().required(),
  }),
  body: joi.object({
    name: joi.string().trim().max(100),
    description: joi.string().trim().allow(null, ""),
    price: joi.number().min(0),
    inventory: joi.number().min(0),
  }),
};

export const deleteGrocery = {
  params: joi.object({
    id: joi.number().required(),
  }),
};
