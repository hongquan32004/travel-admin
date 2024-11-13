import './style.scss'

import { NavLink } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import Dashboardicon from '../../assets/images/16139673.png'
import Category from '../../assets/images/Category.png'
import Depature from '../../assets/images/depature.png'
import Destination from '../../assets/images/destination.png'
import Order from '../../assets/images/order.png'
import Role from '../../assets/images/role.png'
import Tour from '../../assets/images/tour.png'
import Transportations from '../../assets/images/transportations.png'

function Sidebar() {
    const title = 'Trang chủ'

    const navData = [
        {
            id: 1,
            label: 'Dashboard',
            icon: <img src={Dashboardicon} alt="" className='icon' />,
            to: '/dashboard',

        },
        {
            id: 2,
            label: 'Category',
            icon: <img src={Category} alt="" className='icon' />,
            to: '/departments',

        },
        {
            id: 3,
            label: 'Depature',
            icon: <img src={Depature} alt="" className='icon' />,
            to: '/events',
        },
        {
            id: 4,
            label: 'Destination',
            icon: <img src={Destination} alt="" className='icon' />,
            to: '/events',
        },
        {
            id: 5,
            label: 'Order',
            icon: <img src={Order} alt="" className='icon' />,
            to: '/events',
        },
        {
            id: 6,
            label: 'Roles',
            icon: <img src={Role} alt="" className='icon' />,
            to: '/events',
        },
        {
            id: 7,
            label: 'Tours',
            icon: <img src={Tour} alt="" className='icon' />,
            to: '/tour',
        },
        {
            id: 8,
            label: 'Transportations',
            icon: <img src={Transportations} alt="" className='icon' />,
            to: '/events',
        },
    ]

    const getClassActive = ({ isActive }) => {
        return isActive ? 'active' : '';
    };

    return (
        <div className='sidebar'>
            <NavLink to='/' className='sidebar__header flex-aline-center'>
                <img
                    src={Logo}
                    alt='logo hit with gradient border'
                    className='sidebar__header--logo'
                />
                <strong className='sidebar__header--title'>{title}</strong>
            </NavLink>

            <nav className='sidebar__nav'>
                <ul>
                    {navData.map((navItem) => (
                        <li className='sidebar__nav--item' key={navItem.id}>
                            <NavLink
                                key={navItem.id}
                                to={navItem.to}
                                className={({ isActive }) => `flex-aline-center ${getClassActive({ isActive })}`}>
                                {navItem.icon}
                                <strong>{navItem.label}</strong>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar