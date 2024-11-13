import profile from '../../assets/images/profilePicture.png'
import { Dropdown, Button } from 'antd'
import DropDown from '../../assets/svgs/drop-down.svg'
import DropUp from '../../assets/svgs/drop-up.svg'
import Exit from '../../assets/svgs/exit.svg'
import './style.scss'
import { useState } from 'react'
const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const menuItems = [
        {
            key: '1',
            label: 'Đăng xuất',
            icon: <img src={Exit} alt="" />,
        },
    ]

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }
    return (
        <header className='header'>
            <div className='header__content'>
                <div className='header__content--jamb'></div>
                <div className='header__content--profile' >
                    <img
                        src={profile}
                        alt='Profile picture'
                        width={57}
                        height={57}
                        onClick={toggleDropdown}

                    />
                </div>
                <div className='header__content--dropdown'>
                    <Dropdown
                        menu={{ items: menuItems }}
                        trigger={['click']}
                        placement='bottomRight'
                        open={isDropdownOpen}
                        onOpenChange={(e) => setIsDropdownOpen(e)}>
                        <Button className='header__btn' type='text'>
                            <div className='header__btn--infor'>
                                <p className='header__username'>DHPhuong</p>
                                <p className='header__role'>Admin</p>
                            </div>
                            <div className='header__icon'>{isDropdownOpen ? (<img src={DropUp} alt='' />) : (<img src={DropDown} alt="" />)}</div>
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </header>
    )
}
export default Header
