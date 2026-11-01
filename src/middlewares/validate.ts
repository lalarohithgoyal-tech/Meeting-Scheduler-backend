import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      const messages = errors.map(error => ({
        field: error.property,
        errors: Object.values(error.constraints || {})
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages
      });
    }

    req.body = dtoObject;
    next();
  };
};

export default validateDto;