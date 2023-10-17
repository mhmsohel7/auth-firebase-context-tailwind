import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Provider/Authproviders";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="navbar bg-primary text-primary-content">
        <a className="btn btn-ghost normal-case text-xl">Auth Master</a>
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          Home
        </Link>
        <Link className="btn btn-ghost normal-case text-xl" to="/profile">
          Profile
        </Link>
        <Link className="btn btn-ghost normal-case text-xl" to="/register">
          Register
        </Link>
        {/* <Link className="btn btn-ghost normal-case text-xl" to="/login">
          Login
        </Link> */}
        {/* Dynamic Login Button with SignOut button */}
        <>
          {user ? (
            <>
              <span>{user.email}</span>
              <button
                onClick={handleLogOut}
                className="btn btn-ghost normal-case text-xl"
              >
                {" "}
                SignOut
              </button>
            </>
          ) : (
            <Link className="btn btn-ghost normal-case text-xl" to="/login">
              Login
            </Link>
          )}
        </>
      </div>
    </div>
  );
};

export default Header;
