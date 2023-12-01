import HomeButton from '../../components/auth-button copy/HomeButton';
import AuthButton from '../../components/auth-button/AuthButton';
import './index.scss';

function Header() {
    return ( 
        <header className='header'>
            <HomeButton />
            <AuthButton />
        </header>
     );
}

export default Header;