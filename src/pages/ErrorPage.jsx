import { useEffect } from "react";
import Header from "../components/Header/Header";
const ErrorPage = () => {
  useEffect(() => {
    document.title = "Not Found! - Page";
  }, []);

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2x1">Not Found!</p>
      </div>
    </div>
  );
};

export default ErrorPage;
