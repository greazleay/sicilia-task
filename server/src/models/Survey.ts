import { Schema, model } from 'mongoose';
import { ISurvey } from '@interfaces/survey.interface';

const SurveySchema = new Schema<ISurvey>({
    country: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    ratings: [],
}, { timestamps: true });

export default model<ISurvey>('Survey', SurveySchema);