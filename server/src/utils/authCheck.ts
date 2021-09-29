import * as jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-errors";
// import { User } from "../model/User";


const veryfyUser = (context) => {
    const authKey = context.req.headers.authorization;    
    
    if(authKey){

        try{
            const user = jwt.verify(authKey, process.env.SECRET_KEY!);
            return user;

        } catch(error){
            throw new AuthenticationError('Invalid / Expired Token');

        }
    }
    throw new Error('Authentification token must be provided ');
}

export default veryfyUser