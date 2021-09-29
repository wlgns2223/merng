import IUser from "../user/User";

interface IDecodedData extends IUser {
    id : string
    email : string
    username : string
    iat: number
}

export default IDecodedData;