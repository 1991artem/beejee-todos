import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AuthButton() {
    const navigate = useNavigate();

    const moveToHome = () => {
        navigate('/');
    }

    return ( 
        <div>
            <Button 
                onClick={moveToHome}
                variant="info">
                    Home
            </Button>
        </div>
     );
}

export default AuthButton;