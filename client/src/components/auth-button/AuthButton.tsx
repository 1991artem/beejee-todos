import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logOutUserAction } from "../../redux/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

function AuthButton() {
    const isLogin = useAppSelector((state: RootState) => state.app.isLogin);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        dispatch(logOutUserAction())
    }

    const moveToAuthPage = () => {
        navigate('/auth');
    }

    const renderButton = () => {
        if (isLogin) {
            return <Button 
                    onClick={logOut}
                    variant="danger">
                        LogOut
                    </Button>
        }
        return <Button 
                onClick={moveToAuthPage}
                variant="info">
                    Login
                </Button>
    }
    return ( 
        <div>
            {renderButton()}
        </div>
     );
}

export default AuthButton;