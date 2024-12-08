// Import the Google Calendar API
import { google } from 'googleapis'

export async function POST(request) {
  const res = await request.json()
  //expect res as { code: "xyz"}


  const { code, summary, location, description , start_date, end_date, timezone} = res

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
  );

  const { tokens } = await oAuth2Client.getToken(code);

  const { access_token, refresh_token } = tokens;

  oAuth2Client.setCredentials({ access_token, refresh_token });

  const calendar = google.calendar({
    version: 'v3',
    auth: oAuth2Client
  });

  const event = {
    summary: summary,
    location: location,

    description: description,
    start: {
      dateTime: start_date/* "2024-12-14T19:30:00+05:30" */,
      timeZone: timezone
    },
    end: {
      dateTime: end_date/* "2024-12-14T20:30:00+05:30" */,
      timeZone: timezone
    },
  };

  try {
    const result = await calendar.events.insert({
      calendarId: 'primary',
      auth: oAuth2Client,
      resource: event
    });


    return Response.json({ message: 'Event created', result })
  } catch (err) {
    console.log(err);
    return Response.json({ err })

  }



}