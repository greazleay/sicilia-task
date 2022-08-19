import { Router } from 'express';
import { CustomIRouter } from '@interfaces/routes.interface';
import surveyController from '@controllers/surveyController';

const surveyRouter: CustomIRouter = Router();

surveyRouter.get('/all-surveys', surveyController.getAllSurveys);

surveyRouter.get('/:id', surveyController.getSurvey);

surveyRouter.post('/create', surveyController.postCreateSurvey);

export default surveyRouter;