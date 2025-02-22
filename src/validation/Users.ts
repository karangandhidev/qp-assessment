import joi from "joi";
const passwordRegex =
  "/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{6,30}/";
export const createUser = {
  body: joi.object({
    username: joi.string().required().trim(),
    password: joi
      .string()
      .required()
      .trim()
      .regex(RegExp(passwordRegex))
      .min(6)
      .max(30),
  }),
};
