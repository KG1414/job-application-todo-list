import React, { useState } from 'react';
import { Input, Menu } from 'semantic-ui-react';

const Header = (props) => {
    const [isActive, setIsActive] = useState("home");

    const handleItemClick = (e, { name }) => setIsActive(name);

    return (
        <Menu secondary>
            <Menu.Item
                name='home'
                active={isActive === 'home'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='messages'
                active={isActive === 'messages'}
                onClick={handleItemClick}
            />
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Menu.Item
                    name='logout'
                    active={isActive === 'logout'}
                    onClick={handleItemClick}
                />
            </Menu.Menu>
        </Menu>
    )
};

export default Header;
