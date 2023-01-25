// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);

  let response = await axios.post(
    "https://api.openai.com/v1/engines/text-davinci-003/completions",
    req.body,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AI_TOKEN}`,
      },
    }
  );
  console.log("status", response.status);
  if (response && response.status === 200) {
    res.status(200).json(response.data.choices);
  }

  res.status(400).json(response.data);
}
