import { Octokit } from "@octokit/core";
import { Dispatch, SetStateAction, useState } from "react";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import { Repos } from "../types/repo";

const octokit = new Octokit();

const perPage = 10;
const daysAgo = 7;

function getCreatedAt(): string {
  let date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
}

const useRepos = (): [
  string,
  Dispatch<SetStateAction<string>>,
  UseInfiniteQueryResult<Repos, Error>
] => {
  const [language, setLanguage] = useState("Any");

  const fetchRepos = async ({ pageParam = 0 }): Promise<Repos> => {
    const { data } = await octokit.request("GET /search/repositories", {
      sort: "stars",
      order: "desc",
      q: `created:>${getCreatedAt()}${
        language === "Any" ? "" : " language=" + language
      }`,
      per_page: perPage,
      page: pageParam,
    });
    return data;
  };

  return [
    language,
    setLanguage,
    useInfiniteQuery<Repos, Error>(["repos", language], fetchRepos, {
      getNextPageParam: (lastPage, pages) => {
        let currentItems = pages.length * perPage;
        if (lastPage.total_count > currentItems) {
          return pages.length;
        }
        return undefined;
      },
    }),
  ];
};

export default useRepos;
