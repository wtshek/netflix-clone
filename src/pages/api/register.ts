import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { RequestMethods, ResponseStatus } from "@/utils/types";

const BCRYPT_HASH = 12;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== RequestMethods.POST) {
    return res.status(ResponseStatus.NOT_ALLOWED).end();
  }

  try {
    const { email, name, password } = req.body;
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res
        .status(ResponseStatus.UNPROCESSABLE)
        .json({ error: "Email taken" });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_HASH);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(ResponseStatus.CREATED).json(user);
  } catch (error) {
    console.log(error);
    return res.status(ResponseStatus.BAD_REQUEST).end();
  }
}
