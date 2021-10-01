import React, { useState} from "react";
import {Menu, MenuItemProps } from "semantic-ui-react";

interface MenuBarProps {}

const MenuBar: React.FC<MenuBarProps> = (props) => {

    const [activeItem, setActiveItem ] = useState('home');
    const onItemClick = (event,{name}:MenuItemProps) => setActiveItem(name as string);    
    
    return (
        <div>
            <Menu pointing secondary>
                <Menu.Item name="home" active ={activeItem === 'home'} onClick={onItemClick}/>
                
                <Menu.Menu position ="right">
                    <Menu.Item 
                        name="login"
                        active = {activeItem === 'login'}
                        onClick = {onItemClick}
                    />
                    <Menu.Item 
                        name="register"
                        active = {activeItem === 'register'}
                        onClick = {onItemClick}
                    />
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default MenuBar;