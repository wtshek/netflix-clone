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
    await serverAuth(req, res);

    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return res.status(ResponseStatus.SUCCESS).json(randomMovies[0]);
  } catch (error) {
    console.log(error);
    return res.status(ResponseStatus.BAD_REQUEST).end();
  }
}
