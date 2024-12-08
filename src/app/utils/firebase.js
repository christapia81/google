'use client'
// utils/firebase.js
import React, { createContext } from 'react'
//import app from 'firebase/app'
import { getApps, getApp, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, connectAuthEmulator, } from "firebase/auth";
const FirebaseContext = createContext(null)
export { FirebaseContext }

export default ({ children }) => {

    const firebaseConfig = {
        apiKey: "AIzaSyCX9qmR1pkXS0IRNGChnlh9g5Yg-bOmppI",
        authDomain: "demos-12358.firebaseapp.com",
        projectId: "demos-12358",
        storageBucket: "demos-12358.firebasestorage.app",
        messagingSenderId: "862578405009",
        appId: "1:862578405009:web:64aaf214ebf365ce381930",
        measurementId: "G-94M78WZC0R"
    };


    if (!getApps.length) {
        initializeApp(firebaseConfig)
        if (typeof window !== "undefined") {
            if ("measurementId" in firebaseConfig) {
                getAnalytics()
            }
        }
    }

    const app = getApp()
    const auth = getAuth(app);


    const env = process.env.NODE_ENV
    if (env == "development") {
        console.log("Environment is ", env)
        //https://dev.to/ilumin/fix-firebase-error-authemulator-config-failed-mng
        async function setupEmulators(auth) {
            const authUrl = 'http://localhost:9099'
            await fetch(authUrl)
            connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
            // why? to make sure that emulator are loaded
        }


        // this causes: Uncaught FirebaseError: Firebase: Error (auth/emulator-config-failed).
        //connectAuthEmulator(auth, "http://127.0.0.1:9099");

        setupEmulators(auth)
    }
    else if (env == "production") {
        // do something
    }




    return (
        <FirebaseContext.Provider value={{ auth }}>
            {children}
        </FirebaseContext.Provider>
    )
}