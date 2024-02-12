import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./SuggestedProfile";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const Suggestions = ({}) => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  return isLoading ? (
    <>
      <Skeleton count={1} height={24} width={300} className="mt-5 " />
      <Skeleton count={1} height={24} width={300} className="mt-5 " />
      <Skeleton count={1} height={24} width={300} className="mt-5 " />
    </>
  ) : (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {suggestedUsers?.length === 0 ? (
          "No suggested users"
        ) : (
          <>
            {suggestedUsers.map((profile) => (
              <SuggestedProfile profile={profile} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Suggestions;
