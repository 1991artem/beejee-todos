import { useEffect, useState } from 'react';
import { Form, Pagination } from 'react-bootstrap';
import { SORT } from '../../api/interfaces';
import Todos from '../../components/todos/Todos';
import { getAllTodosAction } from '../../redux/actions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ITodoItem } from '../../redux/interfaces';
import { RootState } from '../../redux/store';
import './index.scss';

function TodoList() {
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState(SORT.NAME)
    const data = useAppSelector((state: RootState) => state.app.todos);
    const dispatch = useAppDispatch();

    const itemsInPage = 3;

    const params = {
        offset: (page - 1) * itemsInPage,
        limit: itemsInPage,
    }

    useEffect(() => {
        dispatch(getAllTodosAction({
            offset: params.offset,
            limit: params.limit,
            sort: sort,
        }))
    }, [page, sort, data])

    const { todos, amount } = data;

    const pagesCount = Math.ceil(amount / 3);

    const sortFieldToggle = (value: SORT) => setSort(value);

    const renderPagination = () => {
        let items = [];
        for (let number = 1; number <= pagesCount; number++) {
            items.push(
                <Pagination.Item
                    onClick={() => setPage(number)}
                    key={number}
                    active={number === page}
                >
                    {number}
                </Pagination.Item>,
            );
        }
        return items;
    }
    if (!todos) {
        return null;
    }
    return (
        <section className="todo-list">
            <Form>
                <Form.Check
                    type="switch"
                    label="Sort by email"
                    checked={sort === SORT.EMAIL}
                    onChange={() => sortFieldToggle(SORT.EMAIL)}
                />
                <Form.Check
                    type="switch"
                    label="Sort by user name"
                    checked={sort === SORT.NAME}
                    onChange={() => sortFieldToggle(SORT.NAME)}
                />
                <Form.Check
                    type="switch"
                    label="Sort by user status"
                    checked={sort === SORT.STATUS}
                    onChange={() => sortFieldToggle(SORT.STATUS)}
                />
            </Form>
            <div className='todo-list_list'>
                {todos.map((item: ITodoItem) => <Todos item={item} key={item.id} />)}
            </div>
            <Pagination>{renderPagination()}</Pagination>
        </section>

    );
}

export default TodoList;