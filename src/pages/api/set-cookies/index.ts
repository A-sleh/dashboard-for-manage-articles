import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const locale = req.body?.locale.toString();

  res.setHeader(
    "Set-Cookie",
    `locale=${locale}; Path=/; Max-Age=3600`
  );
  res.status(200).json({ message: "success" });
}
