// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

type IndexResponseBody = {
  documents: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IndexResponseBody>,
) {
  res.status(200).json({
    documents: 'http://localhost:3000/api/documents/',
  });
}
