import joi from "joi";

export const createOrderItem = {
  body: joi.object({
    orderId: joi.number().required(),
    groceryItemId: joi.number().required(),
    quantity: joi.number().min(1).required(),
    itemPrice: joi.number().min(0).required(),
  }),
};
