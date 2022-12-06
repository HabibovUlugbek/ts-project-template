import jwt from "jsonwebtoken";
import { ENV } from "../../common/config";

export function auth(req: any, res: any, next: Function) {
  try {
    let token = req.headers["authorization"].split(" ")[2];
    const decoded = jwt.verify(token, ENV.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Not authorozed" });
  }
}
