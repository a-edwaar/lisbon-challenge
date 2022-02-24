import useFavourites from "../hooks/use-favourites";
import Card from "../components/card";
import React, { ChangeEvent, Fragment, useEffect } from "react";
import Layout from "../components/layout";
import Spinner from "../components/spinner";
import languages from "../types/languages";
import { useRouter } from "next/router";
import useRepos from "../hooks/use-repos";

const Home = () => {
  const [favourites, setFavourites] = useFavourites();
  const router = useRouter();
  const [
    language,
    setLanguage,
    { data, error, status, isFetchingNextPage, hasNextPage, fetchNextPage },
  ] = useRepos();

  useEffect(() => {
    const { lang } = router.query;
    if (lang && !Array.isArray(lang)) {
      setLanguage(lang);
    }
  }, [router.query, setLanguage]);

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    router.push(`/?lang=${event.target.value}`, undefined, {
      shallow: true,
    });
  };

  return (
    <Layout
      title="Trending repos"
      linkHref="/favourites"
      linkText="View favourites"
    >
      {status === "loading" ? (
        <Spinner />
      ) : status === "error" ? (
        <p>{error ? error.message : "An unknown error occurred."}</p>
      ) : (
        <>
          <form>
            <label>
              <span>Language: </span>
              <select
                name="language"
                id="language"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="Any">Any</option>
                {languages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
          </form>

          <div className="space-y-8 md:space-y-12">
            {data?.pages.map((page, index) => (
              <Fragment key={index}>
                {index === 0 && page.items.length === 0 && (
                  <p>No results found.</p>
                )}
                {page.items.map((repo) => (
                  <Card
                    key={repo.id}
                    repo={repo}
                    favourites={favourites}
                    setFavourites={setFavourites}
                  />
                ))}
              </Fragment>
            ))}
          </div>

          {hasNextPage && (
            <div className="mt-16">
              <button
                onClick={() => {
                  fetchNextPage();
                }}
                className="flex max-w-max mx-auto py-2 px-4 text-xs md:text-sm text-slate-900 font-medium rounded-md border transition-all duration-300 ease-in-out hover:scale-105 hover:border-indigo-600"
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading ..." : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Home;
