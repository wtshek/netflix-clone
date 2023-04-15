import { NextApiRequest, NextApiResponse } from "next";
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

    return res.status(ResponseStatus.SUCCESS).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(ResponseStatus.BAD_REQUEST).end();
  }
}
