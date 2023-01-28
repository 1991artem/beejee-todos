import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth";
import TodoListPage from "../pages/todo-list";
import { init } from "../redux/actions";
import { useAppDispatch } from "../redux/hooks";

function AppRouter() {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(init())
    })

    return ( 
        <Routes>
            <Route path="/" element={<Navigate to="/todos" />} />
            <Route path="/todos" element={<TodoListPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/todos" />} />
        </Routes>
     );
}

export default AppRouter;