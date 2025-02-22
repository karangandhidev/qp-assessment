import joi from "joi";

export const createOrder = {
  body: joi.object({
    userId: joi.number().required(),
    items: joi
      .array()
      .items(
        joi.object({
          groceryItemId: joi.number().required(),
          quantity: joi.number().min(1).required(),
          itemPrice: joi.number().min(0),
        })
      )
      .required(),
  }),
};
