import express from "express";
import { connectDB } from "../common/db/connectors";

import { ENV } from "../common/config";

// Routers
import roleRouter from "./routes/role/role.router";
import employeeRouter from "./routes/employee/employee.router";

!(async function () {
  const app = express();
  await connectDB();

  app.use(express.json());

  // admin
  app.use("/roles", roleRouter);
  app.use("/employees", employeeRouter);

  // errorHandler
  app.use((error: any, request: any, response: any, next: Function) => {
    response.send(error);
  });

  app.listen(ENV.ADMIN_PORT, () =>
    console.log("Admin server is running on http://localhost:" + ENV.ADMIN_PORT)
  );
})();
