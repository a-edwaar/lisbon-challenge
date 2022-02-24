import { Endpoints } from "@octokit/types";

export type Repos = Endpoints["GET /search/repositories"]["response"]["data"];

export type Repo =
  Endpoints["GET /search/repositories"]["response"]["data"]["items"][0];
