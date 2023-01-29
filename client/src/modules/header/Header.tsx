import AuthButton from '../../components/auth-button/AuthButton';
import './index.scss';

function Header() {
    return ( 
        <header className='header'>
            <AuthButton />
        </header>
     );
}

export default Header;