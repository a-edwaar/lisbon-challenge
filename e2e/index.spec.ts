import { test, expect } from "@playwright/test";

/*
Navigation tests
*/
test("should navigate to favourite repos page", async ({ page }) => {
  await page.goto("/");
  await page.click("text=View favourites");
  await expect(page).toHaveURL("/favourites");
  await expect(page.locator("h1")).toContainText("Favourite repos");
});

test("should navigate to trending repos page", async ({ page }) => {
  await page.goto("/favourites");
  await page.click("text=View trending");
  await expect(page).toHaveURL("/");
  await expect(page.locator("h1")).toContainText("Trending repos");
});

/*
Pagination tests
 */
test("should show 10 repos", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("article")).toHaveCount(10);
});

test("should load 10 more repos on pagination", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("article")).toHaveCount(10);
  await page.locator("text=Load more").click();
  await expect(page.locator("article")).toHaveCount(20);
});

/*
Repo tests
*/
test("should go to github url when repo clicked", async ({ page, context }) => {
  await page.goto("/");
  const repoToTest = page.locator("article").first();
  const title = await repoToTest.locator("h2").innerText();

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    repoToTest.locator("a").click(),
  ]);
  await newPage.waitForLoadState();

  await expect(newPage).toHaveURL("https://github.com/" + title);
  // could also test description here but not every repo has one
});

test("should show repos in star order descending", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("article")).toHaveCount(10);
  const repos = page.locator("article");

  let lastStarsCount = 1000000000;
  for (let i = 0; i < 10; i++) {
    const currentStars = Number(
      await repos.nth(i).locator(".stars-count").innerText()
    );
    expect(lastStarsCount).toBeGreaterThanOrEqual(currentStars);
    lastStarsCount = currentStars;
  }
});

/*
Favourite tests
*/
test("should be no favourites", async ({ page }) => {
  await page.goto("/favourites");
  await expect(page.locator("article")).toHaveCount(0);
});

test("should add a favourite", async ({ page }) => {
  await page.goto("/");
  const repoToTest = page.locator("article").first();
  const repoTitle = await repoToTest.locator("h2").innerText();
  await repoToTest.locator("button").click();

  await page.click("text=View favourites");
  await expect(page.locator(`text=${repoTitle}`)).toHaveCount(1);
});

test("should persist favourite on refresh", async ({ page }) => {
  await page.goto("/");
  const repoToTest = page.locator("article").first();
  const repoTitle = await repoToTest.locator("h2").innerText();
  await repoToTest.locator("button").click();

  await page.click("text=View favourites");
  await expect(page.locator(`text=${repoTitle}`)).toHaveCount(1);

  await page.reload();
  await expect(page.locator(`text=${repoTitle}`)).toHaveCount(1);
});

test("should delete a favourite", async ({ page }) => {
  await page.goto("/");
  await page.locator("article button").first().click();

  await page.click("text=View favourites");
  await expect(page.locator("article")).toHaveCount(1);
  const favouriteRepo = page.locator("article").first();
  await favouriteRepo.locator("button").click();
  await expect(page.locator("article")).toHaveCount(0);
});

/*
Language tests
*/
test("should filter by any language initially", async ({ page }) => {
  await page.goto("/");
  expect(await page.inputValue("#language")).toContain("Any");
});

test("should filter by language", async ({ page }) => {
  await page.goto("/");

  // change language, confirm select changed and get first repo shown
  await page.selectOption("#language", "Python");
  expect(await page.inputValue("#language")).toContain("Python");
  const firstRepoTitle = await page.locator("article h2").first().innerText();

  // change language again and confirm select value + first repo changed
  await page.selectOption("#language", "Go");
  expect(await page.inputValue("#language")).toContain("Go");
  const newRepoTitle = await page.locator("article h2").first().innerText();
  expect(newRepoTitle).not.toEqual(firstRepoTitle);
});

test("should filter language with query param", async ({ page }) => {
  await page.goto("/?lang=Python");
  expect(await page.inputValue("#language")).toContain("Python");
  const firstRepoTitle = await page.locator("article h2").first().innerText();

  await page.goto("/?lang=Go");
  expect(await page.inputValue("#language")).toContain("Go");
  const newRepoTitle = await page.locator("article h2").first().innerText();
  expect(newRepoTitle).not.toEqual(firstRepoTitle);
});
