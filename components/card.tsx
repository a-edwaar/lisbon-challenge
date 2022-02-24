import { Dispatch, SetStateAction } from "react";
import { Favourites } from "../types/favourites";
import { Repo } from "../types/repo";
import FavouriteButton from "./favourite-button";

interface CardProps {
  repo: Repo;
  favourites: Favourites;
  setFavourites: Dispatch<SetStateAction<Favourites>>;
}

const Card = ({ repo, favourites, setFavourites }: CardProps) => {
  return (
    <article className="flex items-start justify-between">
      <div className="w-full overflow-hidden">
        <h2 className="text-sm md:text-md font-bold text-slate-800 line-clamp-1">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            {repo.full_name}
          </a>
        </h2>
        <p className="mt-[6px] text-xs md:text-sm text-slate-600 line-clamp-2 md:line-clamp-1">
          {repo.description ? repo.description : "No description for repo."}
        </p>
      </div>

      <div className="ml-4 flex-shrink-0 font-mono">
        <FavouriteButton
          favourites={favourites}
          setFavourites={setFavourites}
          repo={repo}
        />
      </div>
    </article>
  );
};

export default Card;
