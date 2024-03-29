import { Button } from "@mui/joy";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { API } from "@/utils";

const SignIn = () => {
  const location = useLocation();

  return (
    <div>
      <a href="/auth/google">sign in with google</a>
    </div>
  );
};

export default SignIn;
