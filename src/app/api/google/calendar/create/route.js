// Import the Google Calendar API
import { google } from 'googleapis'

export async function POST(request) {
  const res = await request.json()
  //expect res as { code: "xyz"}
  const code = res.code;

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
  );

  const { tokens } = await oAuth2Client.getToken(code);



  return Response.json({ tokens })
}