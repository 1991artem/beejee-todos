import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useModal from "../../hook/useModal";
import { createTodosAction } from "../../redux/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

import './index.scss';

function Input() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const {modal, showModal} = useModal();

  const dispatch = useAppDispatch();

  const isLogin = useAppSelector((state: RootState) => state.app.isLogin);

  const nameInputHandler = (value: string) => setUserName(value);
  const emailInputHandler = (value: string) => setEmail(value);
  const descriptionInputHandler = (value: string) => setDescription(value);

    const buttonClickHandler = async (event: React.MouseEvent) => {
        event.preventDefault();
        if (username && email && description) {
          const message = await dispatch(createTodosAction({username, email, description}))
          showModal(message);
        }
    }

    if(!isLogin) {
      return null;
    }
    return ( 
      <>
        {modal}
        <Form className="input-form">
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" onChange={(event) => nameInputHandler(event.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => emailInputHandler(event.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter text" onChange={(event) => descriptionInputHandler(event.target.value)}/>
        </Form.Group>
        <Button
          onClick={buttonClickHandler} 
          variant="primary" 
          type="submit"
        >
          Submit Task
        </Button>
      </Form>
      </>
     );
}

export default Input;