'use client'
// utils/firebase.js
import React, { createContext } from 'react'
//import app from 'firebase/app'
import { getApps, getApp, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
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

    return (
        <FirebaseContext.Provider value={app}>
            {children}
        </FirebaseContext.Provider>
    )
}