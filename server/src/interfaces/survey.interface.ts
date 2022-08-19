import { Document } from 'mongoose';

export interface ISurvey extends Document {
  _doc?: any;
  country: string;
  email: string;
  name: string;
  ratings: any[]
}