import React from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IMenuBarWIthoutAuth {
    activeItem: string
    onItemClick: (event:any, {name}: MenuItemProps) => void
}

const MenuBarWithoutAuth: React.FC<IMenuBarWIthoutAuth> = ({activeItem, onItemClick}) => {

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

export default MenuBarWithoutAuth;