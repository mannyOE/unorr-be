import Joi from 'joi';
import { password } from '../validate/custom.validation';
import { NewCreatedUser, Roles } from './user.interfaces';

const createUserBody: Record<keyof NewCreatedUser, any> = {
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  name: Joi.string().required(),
  role: Joi.string().required().valid(...Object.values(Roles)),
};

export const createUser = {
  body: Joi.object().keys(createUserBody),
};
export const updateUser = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
    }).required()
};

export const upgradeToSellerAccount = {
  body: Joi.object()
    .keys({
      businessName: Joi.string().required(),
      businessEmail: Joi.string().email().required(),
      identityFileUrl: Joi.string().uri().required(),
    }).required()
};
