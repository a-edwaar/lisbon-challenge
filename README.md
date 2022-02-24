# Hey 👋

This is a next.js repo written in Typescript. Styling is using Tailwind CSS. Playwright used for end-to-end testing.

## Run

1. `yarn` to install deps
2. `yarn dev` to run local server (view on http://localhost:3000)
3. `yarn test:e2e` to run tests

## Rate limits

Github has some rate limits which makes running tests abit tricky without an access token. If you want to run all the tests then do the following:

1. Navigate to `hooks/use-repos`
2. Remove the following code 👇

```
const octokit = new Octokit();
```

2. Add replace with 👇

```
const octokit = new Octokit({
  auth: <insert_personal_github_access_token>,
});
```
