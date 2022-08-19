import { ValidationError } from 'express-validator';
import { HttpException } from '@exceptions/HttpException';


export class ConflictException extends HttpException {

    constructor(error: string) {

        super(409, error)

        this.error = error;
    };

};

export class NotFoundException extends HttpException {

    constructor(error: string) {

        super(404, error)

        this.error = error;
    };

};

export class ValidationException extends HttpException {

    public errors: ValidationError[];

    constructor(errors: ValidationError[]) {

        super(400, 'Validation Errors')
        this.errors = errors
    }
};