import  {createContext,useReducer} from "react";
import { IUser } from "../types/User"
import { JWT_TOKEN } from "../globalVar";
import { ITokenPayload } from "src/types/Auth";
import checkTokenExpiry from "../utils/checkTokenExpiry";

export const AuthContext = createContext({
    user: {} as IUser,
    login: (userData) => {},
    logout: () => {},
});

const authReducer = (state, action ) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            }
        default:
            return {...state};
    }
}

interface IInitialValue {
    user: ITokenPayload | null
}

const AuthProvider = ({ children }) => {

    const initialValue: IInitialValue = { user: null }

    const {result,data} = checkTokenExpiry(JWT_TOKEN);
    if(result) initialValue.user = data;
    else localStorage.removeItem(JWT_TOKEN);

    const [state, dispatch] = useReducer(authReducer,initialValue );

    const login = (userData: IUser) => {
        localStorage.setItem(JWT_TOKEN,userData.token);
        return dispatch({type: 'LOGIN', payload: userData});
    };

    const logout = () => {
        localStorage.removeItem(JWT_TOKEN);
        return dispatch({type: 'LOGOUT' })
    };

    return (
        <AuthContext.Provider value={{user: state.user, login,logout} }>
            {children}
        </AuthContext.Provider>       
    )
}

export default AuthProvider;