import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ENV } from "../common/config";
import { BaseResponse } from "../common/report/base.response";
import { connectDB } from "../common/db/connectors";

import userRouter from "./routes/user/user.route";

!(async function () {
  const app = express();
  await connectDB();

  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
  app.use(bodyParser.json({ limit: "20mb" }));

  app.use("/api/users/", userRouter);

  // errorHandler
  app.use((error, request, response, next) => {
    console.log(22, error);
    if (error instanceof BaseResponse) response.send(error);
    else response.send(BaseResponse.UnknownError(error));
  });

  app.listen(ENV.USER_PORT, () =>
    console.log("User server is running on http://localhost:" + ENV.USER_PORT)
  );
})();

process.on("uncaughtException", (err) => {
  console.log("33", err);
});
