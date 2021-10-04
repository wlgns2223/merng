import React, { useState, useEffect, useContext} from "react";
import {  MenuItemProps } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import useCurrentPath from "../utils/hooks/useCurrentPath";
import MenuBarWithAuth from "../components/MenuBarWithAuth"
import MenuBarWIthoutAuth from "../components/MenuBarWithoutAuth";

interface MenuBarProps {}

const MenuBar: React.FC<MenuBarProps> = (props) => {

    const {user, logout } = useContext(AuthContext);
    const currentPath = useCurrentPath();
    const [activeItem, setActiveItem ] = useState(currentPath);
    const onItemClick = (event,{name}:MenuItemProps) => setActiveItem(name as string);

    useEffect(() => {
        setActiveItem(currentPath);
    }, [currentPath]);


    return (
            user ?  <MenuBarWithAuth user={user} logout={logout}/> 
                 :  <MenuBarWIthoutAuth activeItem={activeItem} onItemClick={onItemClick}/>
    )
}

export default MenuBar;