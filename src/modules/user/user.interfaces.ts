import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export enum Roles {
  BUYER = 'buyer',
  SELLER = 'seller'
}

export interface ISellerProfile {
  approved: boolean;
  businessName: string;
  businessEmail: string;
  identityFileUrl: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Roles[];
  isEmailVerified: boolean;
  sellerProfile: ISellerProfile
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateUserBody = Partial<IUser>;

export type NewRegisteredUser = Omit<IUser, 'role' | 'isEmailVerified' | 'sellerProfile'>;

export type NewCreatedUser = Omit<IUser, 'isEmailVerified' | 'sellerProfile'>;

export interface IUserWithTokens {
  user: IUserDoc;
  tokens: AccessAndRefreshTokens;
}
