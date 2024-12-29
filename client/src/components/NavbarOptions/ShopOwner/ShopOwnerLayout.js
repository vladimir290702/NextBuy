import './ShopOwnerLayout.css'
import { Link, useNavigate } from 'react-router-dom'

export default function ShopOwnerLayout() {
    return(
        <>
            <li className='nav-item'>
                <Link className='nav-link' to='/profile'>Profile</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/logout'>Logout</Link>
            </li>
        </>
    )
}