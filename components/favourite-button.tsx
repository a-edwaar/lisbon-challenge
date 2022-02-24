import { Dispatch, SetStateAction } from "react";
import { Favourites } from "../types/favourites";
import { Repo } from "../types/repo";

interface FavouriteButtonProps {
  favourites: Favourites;
  setFavourites: Dispatch<SetStateAction<Favourites>>;
  repo: Repo;
}

interface StarIconProps {
  fill?: boolean;
}

const StarIcon = ({ fill = false }: StarIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill={fill ? "currentColor" : "none"}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
};

const FavouriteButton = ({
  favourites,
  setFavourites,
  repo,
}: FavouriteButtonProps) => {
  return (
    <button
      onClick={() => {
        if (favourites[repo.id]) {
          let faves = { ...favourites };
          delete faves[repo.id];
          setFavourites(faves);
        } else {
          setFavourites({
            ...favourites,
            [repo.id]: repo,
          });
        }
      }}
      className={`${
        favourites[repo.id]
          ? "text-indigo-600 border-indigo-600"
          : "text-slate-600 hover:border-indigo-400"
      } w-20 px-4 py-2 flex bg-white border rounded-md transition-all duration-300 ease-in-out hover:scale-105`}
    >
      <div className="flex items-center mx-auto">
        <span className="sr-only">Star count for repo</span>
        <StarIcon fill={favourites[repo.id] ? true : false} />
        <span className="stars-count ml-1 text-xs font-semibold">
          {favourites[repo.id]
            ? repo.stargazers_count + 1
            : repo.stargazers_count}
        </span>
      </div>
    </button>
  );
};

export default FavouriteButton;
