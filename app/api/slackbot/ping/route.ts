import { WebClient } from '@slack/web-api'
import { NextApiRequest, NextApiResponse } from 'next'


// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const web = new WebClient(token);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let conversationId = '@zach'
    const result = await web.chat.postMessage({
        text: 'Hello world!',
        channel: conversationId,
      });
    
      // The result contains an identifier for the message, `ts`.
      console.log(`Successfully sent message ${result.ts} in conversation ${conversationId}`);
}