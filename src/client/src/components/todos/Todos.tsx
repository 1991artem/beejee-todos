import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { checkedTodoAction, updateTodoAction } from '../../redux/actions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ITodoItem } from '../../redux/interfaces';
import { RootState } from '../../redux/store';
import './index.scss';

export interface ITodosCardProps {
    item: ITodoItem
}

function Todos({ item }: ITodosCardProps) {
    const { isDone, id } = item;
    const [edit, setEdit] = useState(false);
    const [username, setUserName] = useState(item.username);
    const [email, setEmail] = useState(item.email);
    const [description, setDescription] = useState(item.description);
    const isAdmin = useAppSelector((state: RootState) => state.app.isAdmin)
    const dispatch = useAppDispatch()

    const todosStatus = isDone ? 'COMPLETED' : 'IN PROGRESS';

    const nameInputHandler = (value: string) => setUserName(value);
    const emailInputHandler = (value: string) => setEmail(value);
    const descriptionInputHandler = (value: string) => setDescription(value);

    const toggleCheckBox = () => {
        dispatch(checkedTodoAction(id))
    }

    const editButtonHandler = () => {
        if(edit && username && email && description){
            dispatch(updateTodoAction(id, {
                username,
                email,
                description
            }))
        }
        setEdit(!edit);
    }
    const renderButton = () => {
        const text = edit ? 'Save' : 'Edit'
        if (isAdmin) {
            return (<Button 
                    variant="outline-warning"
                    onClick={editButtonHandler}
                    >{text}</Button>)
        }
        return null;
    }

    const renderItems = () => {
        if(edit) {
            return (
                <>
                <Card.Header><Form.Control type='email' value={email} onChange={(event) => emailInputHandler(event.target.value)}/></Card.Header>
                <Card.Header><Form.Control value={username} onChange={(event) => nameInputHandler(event.target.value)}/></Card.Header>
                <Card.Body>
                <Form.Control value={description} onChange={(event) => descriptionInputHandler(event.target.value)}/>
                </Card.Body>
            </>
            )
        }

        return (
            <>
                <Card.Header>{email}</Card.Header>
                <Card.Header>{username}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
            </>
        )
    }
    return (
        <Card
            bg={'Primary'.toLowerCase()}
            text='white'
            className='todos_card'
        >
            <Form className='todos-card_controls'>
                <Form.Check
                    inline
                    type='checkbox'
                    label={todosStatus}
                    checked={isDone}
                    onChange={toggleCheckBox}
                />
            </Form>
            {renderItems()}
            {renderButton()}
        </Card>
    );
}

export default Todos;