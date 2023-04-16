import { NextApiRequest, NextApiResponse } from "next";
import { RequestMethods, ResponseStatus } from "@/utils/types";
import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== RequestMethods.GET) {
    return res.status(ResponseStatus.NOT_ALLOWED).end();
  }

  try {
    await serverAuth(req, res);

    const { movieId } = req.query;
    if (!movieId || typeof movieId !== "string") {
      return new Error("Invalid ID");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new Error("Invalid ID");
    }

    return res.status(ResponseStatus.SUCCESS).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(ResponseStatus.BAD_REQUEST).end();
  }
}
