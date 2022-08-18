import { Schema, model } from 'mongoose';
import { ISurvey } from '@interfaces/survey.interface';

const SurveySchema = new Schema<ISurvey>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    rating: { type: Number, required: true },
}, { timestamps: true });

export default model<ISurvey>('Survey', SurveySchema);