import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { RequestMethods, ResponseStatus } from "@/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== RequestMethods.GET) {
    return res.status(ResponseStatus.NOT_ALLOWED).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return res.status(ResponseStatus.SUCCESS).json(favoriteMovies);
  } catch (e) {
    console.log(e);
    return res.status(ResponseStatus.BAD_REQUEST).end();
  }
}
