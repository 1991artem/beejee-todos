import { Pagination } from 'react-bootstrap';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import './index.scss';

function TodoList() {
    const todos = useAppSelector((state: RootState) => state.app.todos);

    const renderPagination = () => {
        let active = 2;
        let items = [];
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items;
    }
    return (
        <section className="todo-list">
            <Pagination>{renderPagination()}</Pagination>
        </section>
    );
}

export default TodoList;