import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { verifyAdminSession } from "../services/adminAuth";

const ProtectedAdminRoute = () => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    let active = true;

    const runCheck = async () => {
      const authenticated = await verifyAdminSession();

      if (!active) {
        return;
      }

      setIsAllowed(authenticated);
      setIsChecking(false);
    };

    runCheck();

    return () => {
      active = false;
    };
  }, [location.pathname]);

  if (isChecking) {
    return (
      <div className="blog-editor-page">
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#d4d4d4",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          Validating admin session...
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
