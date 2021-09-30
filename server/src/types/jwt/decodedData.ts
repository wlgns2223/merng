import { JwtPayload } from "jsonwebtoken";
import IUser from "../user/User";

interface IDecodedData extends IUser,JwtPayload  {
    iat: number
}

export default IDecodedData;