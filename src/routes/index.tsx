import { RouteObject } from "react-router";
import Layout from "../app/layout";
import Board from "../Board";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				children: [
					{
						path: "",
						element: <Board />,
					},
				],
			},
		],
	},
];

export default routes;
