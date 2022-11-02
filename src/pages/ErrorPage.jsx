import { useEffect } from "react";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "Not Found! - Page";
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="mx-auth max-w-screen-lg">
        <p className="text-center text-2x1">Not Found!</p>
      </div>
    </div>
  );
};

export default ErrorPage;
