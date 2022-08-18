import { Request, Response, Router } from 'express';
import surveyRouter from '@routes/api/SurveyRouter';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => res.json({ message: 'HELLO VISITOR, THANK YOU FOR STOPPING BY, THIS IS FORM-SERVER-SIDE' }));

router.use('/survey', surveyRouter);

export default router;