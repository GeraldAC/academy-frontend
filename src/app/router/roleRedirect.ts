import { NavigateFunction } from "react-router-dom";

export const roleRedirect = (role: string | undefined, navigate: NavigateFunction) => {
  switch (role) {
    case "ADMIN":
      navigate("/admin", { replace: true });
      break;
    case "TEACHER":
      navigate("/teacher", { replace: true });
      break;
    case "STUDENT":
      navigate("/student", { replace: true });
      break;
    default:
      navigate("/auth/login", { replace: true });
  }
};
