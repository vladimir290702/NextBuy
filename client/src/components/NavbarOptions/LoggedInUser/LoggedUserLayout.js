import './LoggedUserLayout.css'
import { Link, useNavigate } from 'react-router-dom'

export default function LoggedUserLayout() {
    return(
        <>
            <li className='nav-item'>
                <Link className='nav-link' to='/search'>Search</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/cart'>Cart</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/profile'>Profile</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/logout'>Logout</Link>
            </li>
        </>
    )
}