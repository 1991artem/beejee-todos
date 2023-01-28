import './index.scss';

export interface ITodosCardProps {
    username: string;
    email: string;
    description: string;
}

function Todos({username, email, description}: ITodosCardProps) {
    return ( 
        <div className="todos-card">
            <input type="checkbox" name="done" id="done" />
            <div className="todos-card_text">
                <span>Name: {username}</span>
                <span>Email: {email}</span>
                <span>Description: {description}</span>
            </div>
        </div>
     );
}

export default Todos;