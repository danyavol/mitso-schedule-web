import { Response } from "express";

enum AppErrorCodes {
    UnknownError = 0,
    ValidationError = 1,
    NotUniqueFieldError = 2
}

interface AppError {
    code: AppErrorCodes,
    [key: string]: any
}

export function handleError(res: Response, error: any = {}): void {
    let result: AppError;
    if (error.name == 'MongoServerError') {
        result = handleMongoServerError(res, error);
    }

    if (result) {
        res.json(result);
    }
    else {
        console.error('Unknown error', error);
        res.status(500).json( {code: AppErrorCodes.UnknownError, error} );
    }

}



function handleMongoServerError(res: Response, error: any): AppError {
    if (error.code === 11000) {
        res.status(400);
        const errors = [];
        for (let key in error.keyPattern) {
            errors.push({
                field: key,
                message: 'Не уникальное значение'
            });
        }
        return {code: AppErrorCodes.NotUniqueFieldError, errors};
    }
}