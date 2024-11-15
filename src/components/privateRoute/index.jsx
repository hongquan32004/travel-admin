import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { get, post } from "../../utils/axios-http/axios-http";
import { Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setPermissions } from "../../slice/permissionSlice";

const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Kiểm tra token
        const verifyResponse = await post("auth/verify-token");
        const adminId = verifyResponse;

        const roleResponse = await get(`roles/detail/${adminId}`);

        const permissionsResponse = await get(
          `roles/${roleResponse.id}/permissions`
        );
        const permissions = permissionsResponse.permissions.map(
          (item) => item.name
        );
        dispatch(setPermissions(permissions));

        if (permissionsResponse.permissions.length > 0) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          message.error("Không có quyền truy cập!");
        }
      } catch (error) {
        console.log("Lỗi khi xác thực token hoặc lấy quyền:", error);
        setIsAuthorized(false);
        message.error("Lỗi khi xác thực token!");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
