import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import handleZodError from "../error/handleZodError";

const globalErrorHandler: ErrorRequestHandler = async (
  error,
  req,
  res,
  next
) => {
  const success = false;
  let message = error.message || "Somthing went wrong";
  let errorDetails = error;

  if (error instanceof ZodError) {
    const simplfiedErro = handleZodError(error);
    message = simplfiedErro.message;
    errorDetails = simplfiedErro.errorDetails;
  }

  res.json({
    success,
    message,
    errorDetails,
    error,
  });
};

export default globalErrorHandler;
