import type { NextPage } from "next";
import useFavourites from "../hooks/use-favourites";
import Card from "../components/card";
import Layout from "../components/layout";

const Favourites: NextPage = () => {
  const [favourites, setFavourites] = useFavourites();

  return (
    <Layout title="Favourite repos" linkHref="/" linkText="View trending">
      <div className="space-y-12">
        {Object.keys(favourites).length === 0 && <p>You have no favourites.</p>}
        {Object.keys(favourites).map((key) => (
          <Card
            key={favourites[Number(key)].id}
            repo={favourites[Number(key)]}
            favourites={favourites}
            setFavourites={setFavourites}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Favourites;
