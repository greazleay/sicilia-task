import Survey from '@models/Survey';
import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import {
    ConflictException,
    NotFoundException,
    ValidationException,
} from '@exceptions/commonExceptions';

class SurveyController {

    public async getAllSurveys(req: Request, res: Response, next: NextFunction) {
        try {

            const allSurveys = await Survey.find({}).exec();

            if (allSurveys.length) {
                res.status(200).json({ status: 'success', data: allSurveys });
            } else {
                throw new NotFoundException('No Surveys Found')
            };

        } catch (err: any) {

            console.error(err.message)
            next(err);
        }
    };

    public getSurvey = [

        param('id').isMongoId().withMessage('Supplied request param is not a valid mongo ID'),

        async (req: Request, res: Response, next: NextFunction) => {
            try {

                const errors = validationResult(req);
                if (!errors.isEmpty()) throw new ValidationException(errors.array());

                const { id } = req.params;
                const foundSurvey = await Survey.findById(id);

                if (foundSurvey) {
                    res.status(200).json({ status: 'success', data: foundSurvey })
                } else {
                    throw new NotFoundException(`Survey with ID: ${id} not found`)
                }

            } catch (err: any) {

                console.error(err.message)
                next(err)
            }
        }
    ]

    public postCreateSurvey = [

        body('country', 'Country is required').isLength({ min: 1 }).trim().escape(),
        body('email', 'Email is required').isEmail().normalizeEmail(),
        body('name', 'Name is required').isLength({ min: 1 }).trim().escape(),
        body('rating', 'Rating must be between 1 and 5').isInt({ min: 1, max: 5 }),

        async (req: Request, res: Response, next: NextFunction) => {

            try {

                const errors = validationResult(req);
                if (!errors.isEmpty()) throw new ValidationException(errors.array());

                const { email, name, country, rating } = req.body;

                const foundSurvey = await Survey.findOne({ email }).exec();
                if (foundSurvey) throw new ConflictException('You have already participated in the Survey');

                const newSurvey = new Survey({ country, email, name, rating });

                await newSurvey.save();

                res.json({ status: 'success', message: 'survey saved' })

            } catch (err: any) {

                console.error(err.message)
                next(err)
            }
        }
    ];
}

export default new SurveyController()