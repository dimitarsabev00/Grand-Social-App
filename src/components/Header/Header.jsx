import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";
import { auth } from "../../configs/firebase";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
const Header = () => {
  const user = useSelector(selectUser);

  const { handleLogout } = useLogout();

  const logoutOfApp = () => handleLogout();

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between items-center h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <Link to="/" aria-label="Social Media Logo">
              <img
                src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Black-Logo.wine.svg"
                alt=""
                className="w-10 h-10 mr-3"
              />
            </Link>
          </div>
          <form>
            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 absolute ml-3 pointer-events-none"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                type="text"
                placeholder="Search"
                name="search"
                aria-label="Search"
                className="pr-3 pl-10 py-2 font-semibold placeholder-gray-base text-black-light rounded-lg border border-gray-base
          h-8
          "
              />
            </div>
          </form>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <Link to="/" aria-label="HomePage">
                  <svg
                    className="w-8 mr-3 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mr-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </Link>
                <div className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mr-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </div>

                <button type="button" title="Sign Out" onClick={logoutOfApp}>
                  <svg
                    className="w-8 mr-3 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mr-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/profile/${auth.currentUser.displayName}`}>
                    <img
                      // src={userAvatar}
                      className="rounded-full h-8 w-8 flex"
                      alt={`${auth.currentUser.displayName} profile`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    {" "}
                    Log In
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
