// Import the Google Calendar API
import { google } from 'googleapis'

/* export default function handler(req, res) {
  // Fetch Calendar Service Instance
  if (req.method === 'GET') {
    res.status(200).json({
      googleApiInstance: google.calendar({
        version: 'v3',
        auth: process.env.GOOGLE_API_KEY,
      }),
    })
  }
} */

export async function GET() {
  /* res.status(200).json({
      googleApiInstance: google.calendar({
        version: 'v3',
        auth: process.env.GOOGLE_API_KEY,
      }),
    }) */

    return Response.json({
        googleApiInstance: google.calendar({
          version: 'v3',
          auth: process.env.GOOGLE_API_KEY,
        }),
      })
}