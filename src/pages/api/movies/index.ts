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

    const movies = await prismadb.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(ResponseStatus.BAD_REQUEST).end();
  }
}
