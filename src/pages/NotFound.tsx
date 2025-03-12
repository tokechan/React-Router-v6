import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <Link to="/">Go back to home</Link>
        </div>
    );
};


export default NotFound;