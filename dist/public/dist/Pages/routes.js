import DashboardPage from "./DashboardPage.svelte.js";
import OverviewPage from "./OverviewPage.svelte.js";
import RunPage from "./RunPage.svelte.js";
import UnknownPage from "./UnkownPage.svelte.js";
import SchemaPage from "./SchemaPage/SchemaPage.svelte.js";
export const routes = {
  "/": RunPage,
  "/overview": OverviewPage,
  "/dashboard": DashboardPage,
  "/schema": SchemaPage,
  "*": UnknownPage
};
