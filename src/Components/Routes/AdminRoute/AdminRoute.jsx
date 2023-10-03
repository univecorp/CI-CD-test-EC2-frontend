import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children, ...rest }) => {
  // getting user info
  const { user, admin, isLoading } = {};
  const location = useLocation();

  // wait until all info loads
  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }
  // checking if admin
  if (admin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoute;
