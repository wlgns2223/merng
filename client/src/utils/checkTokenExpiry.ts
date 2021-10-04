import jwtDecode from "jwt-decode";
import { JWT_TOKEN } from "src/globalVar";
import { ITokenPayload } from "src/types/Auth";

const checkTokenExpiry = (tokenName: string) => {
    const initialReturnValue = { result: false, data: null};
    if(!localStorage.getItem(JWT_TOKEN)) return initialReturnValue

    const decodedToken = jwtDecode(localStorage.getItem(tokenName)!) as ITokenPayload;
    if(decodedToken.exp * 1000 < Date.now().valueOf()) return initialReturnValue
    else return {result: true, data: decodedToken};
}

export default checkTokenExpiry;