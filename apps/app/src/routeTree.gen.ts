/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as IndexImport } from "./routes/index";
import { Route as ServersNameImport } from "./routes/servers/$name";
import { Route as ServersIndexImport } from "./routes/servers/index";
import { Route as SettingsIndexImport } from "./routes/settings/index";

// Create/Update Routes

const IndexRoute = IndexImport.update({
	path: "/",
	getParentRoute: () => rootRoute,
} as any);

const SettingsIndexRoute = SettingsIndexImport.update({
	path: "/settings/",
	getParentRoute: () => rootRoute,
} as any);

const ServersIndexRoute = ServersIndexImport.update({
	path: "/servers/",
	getParentRoute: () => rootRoute,
} as any);

const ServersNameRoute = ServersNameImport.update({
	path: "/servers/$name",
	getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
	interface FileRoutesByPath {
		"/": {
			id: "/";
			path: "/";
			fullPath: "/";
			preLoaderRoute: typeof IndexImport;
			parentRoute: typeof rootRoute;
		};
		"/servers/$name": {
			id: "/servers/$name";
			path: "/servers/$name";
			fullPath: "/servers/$name";
			preLoaderRoute: typeof ServersNameImport;
			parentRoute: typeof rootRoute;
		};
		"/servers/": {
			id: "/servers/";
			path: "/servers";
			fullPath: "/servers";
			preLoaderRoute: typeof ServersIndexImport;
			parentRoute: typeof rootRoute;
		};
		"/settings/": {
			id: "/settings/";
			path: "/settings";
			fullPath: "/settings";
			preLoaderRoute: typeof SettingsIndexImport;
			parentRoute: typeof rootRoute;
		};
	}
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
	IndexRoute,
	ServersNameRoute,
	ServersIndexRoute,
	SettingsIndexRoute,
});

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/servers/$name",
        "/servers/",
        "/settings/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/servers/$name": {
      "filePath": "servers/$name.tsx"
    },
    "/servers/": {
      "filePath": "servers/index.tsx"
    },
    "/settings/": {
      "filePath": "settings/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
