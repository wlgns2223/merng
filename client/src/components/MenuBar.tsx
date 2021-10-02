import React, { useState} from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { Link } from "react-router-dom";

import useCurrentPath from "../utils/useCurrentPath";

interface MenuBarProps {}

const MenuBar: React.FC<MenuBarProps> = (props) => {

    const currentPath = useCurrentPath();
    const [activeItem, setActiveItem ] = useState(currentPath);
    const onItemClick = (event,{name}:MenuItemProps) => setActiveItem(name as string);    
    
    
    return (
        <div>
            <Menu pointing secondary size="huge" color="teal">
                <Menu.Item 
                    name="home"
                    active ={activeItem === 'home'}
                    onClick={onItemClick}
                    as={Link}
                    to="/"
                />
                
                <Menu.Menu position ="right">
                    <Menu.Item 
                        name="login"
                        active = {activeItem === 'login'}
                        onClick = {onItemClick}
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item 
                        name="register"
                        active = {activeItem === 'register'}
                        onClick = {onItemClick}
                        as={Link}
                        to="/register"
                    />
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default MenuBar;