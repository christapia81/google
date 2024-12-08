'use client'

import React, { useContext, useEffect, useState } from 'react';
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { FirebaseContext } from '@/utils/firebase'
//import { getAuth, connectAuthEmulator, } from "firebase/auth";

/* const SCOPES =
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";
 */
const Login = () => {
    const { auth } = useContext(FirebaseContext)
    //const auth = getAuth(firebase);

    /*  
    async function setupEmulators(auth) {
       const authUrl = 'http://localhost:9099'
        await fetch(authUrl)
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
        // why? to make sure that emulator are loaded
      }

    
      // this causes: Uncaught FirebaseError: Firebase: Error (auth/emulator-config-failed).
    //connectAuthEmulator(auth, "http://127.0.0.1:9099");

    setupEmulators(auth) */


    const [user, setUser] = useState(null)
    const [code, setCode] = useState(null)
    useEffect(() => {
        if (auth) {
            auth.onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    setUser(user)
                } else {
                    // No user is signed in.
                    setUser(null)
                }
            });
        }


    }, [])


    /*    useEffect(() => {
           fetch(`api/google`).then((res) => {
             if (res.status !== 200) {
               throw new Error(data.message)
             }
             res.json().then((data) => {
               if (data?.googleApiInstance) {
                 GoogleService.initService(data.googleApiInstance)
               }
             })
           })
         }, []) */


    useEffect(() => {
        if (user) {
            console.log(`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`)
            const client = google.accounts.oauth2.initCodeClient({
                client_id: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
                scope: 'https://www.googleapis.com/auth/calendar.readonly',
                access_type: 'offline',
                ux_mode: 'popup',
                callback: async (response) => {
                    // Send response.code to your backend
                    console.log("must send to backend")
                    console.log(response)
                    const _code = response.code
                    setCode(_code)


                }
            });
            client.requestCode();
        }
    }, [user])


    const handleGoogleLogin = () => {
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
    };

    const handleLogout = () => {
        signOut(auth)
            .then((result) => {

                setUser(null)
            })
            .catch((error) => {
                console.error("Google Logout Error:", error);
            });
    };
    const handleCreateCalendarEntry = async () => {

        // post to calendar
        const rawResponse = await fetch('api/google/calendar/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code, })
        });
        const content = await rawResponse.json();
        console.log("From Create Calendar:", content)
    }
    /* 
        const [events, setEvents] = useState(null);
    
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
            console.log("openSignInPopup NEXT_PUBLIC_GOOGLE_CLIENT_ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
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
                console.log("Fetching events API KEY:", process.env.NEXT_PUBLIC_GOOGLE_API_KEY)
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
    
    
        useEffect(() => {
            console.log(events)
    
    
        }, [events]) */

    return (<>
        <div className="login-container">
            {user ? <button onClick={handleLogout} className='shadow p-3 rounded bg-yellow-200'>
                Logout ({user.email})
            </button> : <button onClick={handleGoogleLogin} className='shadow p-3 rounded bg-slate-200'>
                Login with Google
            </button>
            }



        </div>
        {user && <div className="calendar-container m-3 pb-3">
            <button onClick={handleCreateCalendarEntry} className='shadow p-3 rounded bg-green-300-200'>
                Create Calendar Entry for  ({user.email})
            </button>
        </div>}
    </>
    );
};

export default Login;