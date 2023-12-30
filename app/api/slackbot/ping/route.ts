import { WebClient } from '@slack/web-api'
import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'


// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const web = new WebClient(token);

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
  ) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, cors)
    let conversationId = '@zach'

    const result = await web.chat.postMessage({
        text: 'Hello world!',
        channel: conversationId,
      });
    
      // The result contains an identifier for the message, `ts`.
      console.log(`Successfully sent message ${result.ts} in conversation ${conversationId}`);
      res.status(200).json({ message: 'Hello from Next.js!' })
}

// type ResponseData = {
//     message: string
//   }

// export default function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<ResponseData>
//   ) {
//     res.status(200).json({ message: 'Hello from Next.js!' })
//   }