import {
  useSelector
} from "react-redux";
import {
  useMemo
} from "react";

const useCheckPermission = (permissionName) => {
  const permissions = useSelector((state) => state.admin.permissions);

  const hasPermission = useMemo(() => {
    return permissions.includes(permissionName);
  }, [permissions, permissionName]);

  return hasPermission;
};

export default useCheckPermission;