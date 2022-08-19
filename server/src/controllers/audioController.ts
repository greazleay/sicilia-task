import { Request, Response, NextFunction } from 'express';
import { param, validationResult } from 'express-validator';
import {
    ConflictException,
    NotFoundException,
    ValidationException,
} from '@exceptions/commonExceptions';
import { getBucket } from '@config/database';
import { getFileStorage } from '@middlewares/multer';


class AudioController {

    private audioUploads = getFileStorage();

    public uploadAudio = [

        this.audioUploads.single('file'),

        async (req: Request, res: Response, next: NextFunction) => {
            try {
                return res.status(200).json({ status: 'success', message: 'File Uploaded Successfully' })
            } catch (error: any) {
                console.error(error.message)
                next(error)
            }
        }
    ];

    public getAudioFile = [

        param('filename', 'File name is required').notEmpty().trim().escape(),

        async (req: Request, res: Response, next: NextFunction) => {
            try {

                const errors = validationResult(req);
                if (!errors.isEmpty()) throw new ValidationException(errors.array());

                const { filename } = req.params

                const bucket = getBucket()

                const audioFile = await bucket.find({ filename }).toArray()

                if (!audioFile.length) throw new NotFoundException(`File with ${filename} does not exist`)

                res.header("Cross-Origin-Opener-Policy", "cross-origin");
                res.header("Cross-Origin-Resource-Policy", "cross-origin");

                bucket.openDownloadStreamByName(filename).pipe(res)

            } catch (error: any) {
                console.error(error.message)
                next(error)
            }
        }

    ]

}

export default new AudioController()