import { Router } from 'express';
import { CustomIRouter } from '@interfaces/routes.interface';
import audioController from '@controllers/audioController';

const audioRouter: CustomIRouter = Router();

audioRouter.post('/upload', audioController.uploadAudio);

audioRouter.get('/:filename', audioController.getAudioFile);

export default audioRouter;