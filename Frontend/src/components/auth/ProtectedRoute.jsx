import {Navigate} from "react-router-dom";

const ProtectedRoute = ({user, children, token}) => {

    if (!user || !token) {

        return <Navigate to="/login" replace/>
    }

    return children;

}

export default ProtectedRoute;