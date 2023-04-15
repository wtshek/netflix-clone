import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { RequestMethods, ResponseStatus } from "@/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allowedMethods: string[] = [RequestMethods.DELETE, RequestMethods.POST];

  if (!req.method || !allowedMethods.includes(req.method)) {
    return res.status(ResponseStatus.NOT_ALLOWED).end();
  }

  const { currentUser } = await serverAuth(req, res);

  const { movieId } = req.body;
  const exisitingMovie = await prismadb.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  try {
    if (req.method === RequestMethods.POST) {
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(ResponseStatus.SUCCESS).json(user);
    }

    if (req.method === RequestMethods.DELETE) {
      if (!exisitingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(ResponseStatus.SUCCESS).json(user);
    }
  } catch (e) {
    console.log(e);
    return res.status(ResponseStatus.BAD_REQUEST).end();
  }
}
