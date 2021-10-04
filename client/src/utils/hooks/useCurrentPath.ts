import { useLocation } from "react-router-dom"

const useCurrentPath = () => {
    const {pathname} = useLocation();
    
    return  pathname === '/' ? 'home' : pathname.substr(1);
}

export default useCurrentPath;
