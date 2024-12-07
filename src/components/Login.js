'use client'

import React, { useContext, useEffect, /* useState */ } from 'react';
/* import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"; */
import { FirebaseContext } from '@/utils/firebase'
import { getAuth, connectAuthEmulator } from "firebase/auth";

const SCOPES =
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

const Login = () => {
    const firebase = useContext(FirebaseContext)
    const auth = getAuth(firebase);
   // connectAuthEmulator(auth, "http://127.0.0.1:9099");
   /*  const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const { user } = result;
                console.log("Google Login Success:", user);
                // Handle user information and redirection here
            })
            .catch((error) => {
                console.error("Google Login Error:", error);
            });
    }; */


/*     const [events, setEvents] = useState(null); */

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = "https://apis.google.com/js/api.js";

        document.body.appendChild(script);

        script.addEventListener("load", () => {
           // if (window.gapi) handleClientLoad();
        });
    }, []);

    const handleClientLoad = () => {
        window.gapi.load("client:auth2", initClient);
    };

    const openSignInPopup = () => {
        window.gapi.auth2.authorize(
            { client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, scope: SCOPES },
            (res) => {
                if (res) {
                    if (res.access_token)
                        localStorage.setItem("access_token", res.access_token);

                    // Load calendar events after authentication
                    window.gapi.client.load("calendar", "v3", listUpcomingEvents);
                }
            }
        );
    }

    const initClient = () => {
        if (!localStorage.getItem("access_token")) {
            openSignInPopup();
        } else {
            // Get events if access token is found without sign in popup
            fetch(
                `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&orderBy=startTime&singleEvents=true`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            )
                .then((res) => {
                    // Check if unauthorized status code is return open sign in popup
                    if (res.status !== 401) {
                        return res.json();
                    } else {
                        localStorage.removeItem("access_token");

                        openSignInPopup();
                    }
                })
                .then((data) => {
                    if (data?.items) {
                        setEvents(formatEvents(data.items));
                    }
                });
        }
    };

    const listUpcomingEvents = () => {
        window.gapi.client.calendar.events
            .list({
                // Fetch events from user's primary calendar
                calendarId: "primary",
                showDeleted: true,
                singleEvents: true,
            })
            .then(function (response) {
                let events = response.result.items;

                if (events.length > 0) {
                    setEvents(formatEvents(events));
                }
            });
    };

    const formatEvents = (list) => {
        return list.map((item) => ({
            title: item.summary,
            start: item.start.dateTime || item.start.date,
            end: item.end.dateTime || item.end.date,
        }));
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <button onClick={handleClientLoad}>
                Login with Google
            </button>
        </div>
    );
};

export default Login;