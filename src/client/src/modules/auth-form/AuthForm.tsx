import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUserAction } from "../../redux/actions";
import { useAppDispatch } from "../../redux/hooks";


import './index.scss';

function AuthForm() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const nameInputHandler = (name: string) => setName(name);
    const passwordInputHandler = (password: string) => setPassword(password);

    const loginButtonHandler = async (event: React.MouseEvent) => {
        event.preventDefault();

        if (name && password) {
            dispatch(loginUserAction({name, password}));
            navigate('/todos')
        }
    }

    return (
        <Form className="auth-form">
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" onChange={(event) => nameInputHandler(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(event) => passwordInputHandler(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={loginButtonHandler}>
                Login
            </Button>
        </Form>
    );
}

export default AuthForm;