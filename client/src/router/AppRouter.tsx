import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AuthPage from "../pages/auth";
import ErrorPage from "../pages/error-page";
import TodoListPage from "../pages/todo-list";
import { init } from "../redux/actions";
import { useAppDispatch } from "../redux/hooks";

function AppRouter() {
    const dispatch = useAppDispatch();
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const initApp = async () => {
        const error = await dispatch(init());
        error && setError(error);
    } 
    
    useEffect(() => {
        initApp();
        if(error){
            navigate('/error') 
        }
    }, [error])

    return ( 
        <Routes>
            <Route path="/" element={<TodoListPage />} />
            <Route path="/todos" element={<TodoListPage />} />
            <Route path="/auth" element={<AuthPage />} />
            {error && <Route path="/error" element={<ErrorPage error={error}/>} />}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
     );
}

export default AppRouter;