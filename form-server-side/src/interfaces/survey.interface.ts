import { Document } from 'mongoose';

export interface ISurvey extends Document {
  _doc?: any;
  name: string;
  email: string;
  country: string;
  rating: number
}