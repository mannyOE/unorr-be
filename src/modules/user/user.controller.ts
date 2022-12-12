import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import * as userService from './user.service';
import { IUserDoc } from './user.interfaces';

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user: IUserDoc = req.user;
  const dbUser = await userService.getUserById(new mongoose.Types.ObjectId(user._id));
  if (!dbUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(dbUser);
});

export const updateAccount = catchAsync(async (req: Request, res: Response) => {
  const user: IUserDoc = req.user;
  const updatedUser = await userService.updateUserById(new mongoose.Types.ObjectId(user._id), req.body);
  res.send(updatedUser);
});

export const upgradeToSellerAccount = catchAsync(async (req: Request, res: Response) => {
  const user: IUserDoc = req.user;
  const updatedUser = await userService.becomeASeller(new mongoose.Types.ObjectId(user._id), req.body);
  res.send(updatedUser);
});


