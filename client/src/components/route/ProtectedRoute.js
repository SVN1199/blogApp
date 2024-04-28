import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../layouts/Loading";

export default function ProtectedRoute({ children, isAdmin }) {

    const { isAuthenticated, loading, user } = useSelector(state => state.authState)

    if (!isAuthenticated && !loading) {
        toast('Login First to Access', {
            position: 'top-center',
            type: 'info'
        })
        return <Navigate to="/" />
    }

    if (isAuthenticated) {
        if (isAdmin === true && user.role !== 'admin') {
            return <Navigate to="/" />
        }
        return children;
    }

    if (loading) {
        return <Loading />
    }
}