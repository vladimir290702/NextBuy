import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()


    return(
        <div id='navbar'>
            <div id='logo'>
               <Link id='logo-wrapper'><img src='../../../public/images/logo.png' to='/' alt='Logo' /></Link >
            </div>
            
            <div id='options'>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
            </div>
        </div>

    )
}