import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError) => {
  let message = "";
  let errorDetails = err.issues.map((issue: ZodIssue) => {
    message += `${issue.message}. `;
    return {
      field: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    message,
    errorDetails,
  };
};

export default handleZodError;
