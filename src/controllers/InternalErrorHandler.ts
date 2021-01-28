import {NextFunction, Request, Response} from "express";

const internalErrorHandler = async (error: unknown, _: Request, res: Response, __: NextFunction) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({error: "internal server error"});
}
export default internalErrorHandler;