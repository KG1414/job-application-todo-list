import { Menu } from 'semantic-ui-react';
import './Header.css';

const Header = ({ isCompletedHandler, isActive }) => {
    return (
        <div className="header__wrapper">
            <Menu secondary widths={2}>
                <Menu.Item
                    name='incompleted items'
                    active={!isActive}
                    onClick={(e) => isCompletedHandler(e, false)}
                />
                <Menu.Item
                    name='completed items'
                    active={isActive}
                    onClick={(e) => isCompletedHandler(e, true)}
                />
            </Menu>
        </div>
    )
};

export default Header;
