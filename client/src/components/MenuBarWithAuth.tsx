import React from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { User } from "../types/User"

interface IMenuBarWithAuth {
    user: User
    logout: (event:any, data?: MenuItemProps) => void
}

const MenuBarWithAuth: React.FC<IMenuBarWithAuth> = ({user, logout}) => {

    return (
        <div>
            <Menu pointing secondary size="huge" color="teal">
                <Menu.Item 
                    name={user.username}
                    active
                    as={Link}
                    to="/"
                />
                
                <Menu.Menu position ="right">
                    <Menu.Item 
                        name="logout" onClick = {logout}
                    />
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default MenuBarWithAuth;