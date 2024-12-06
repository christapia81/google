import "../styles/globals.css";

//👇 Import Open Sans font
import { Open_Sans, Roboto_Mono } from 'next/font/google'
import NextAuthSessionProvider from "./providers/SessionProvider";
import FirebaseProvider from "@/utils/firebase"
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  //👇 Add variable to our object
  variable: '--font-opensans',
})

//👇 Configure the object for our second font
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" className={`${openSans.variable} ${robotoMono.variable} font-sans`} >
     
        <body><FirebaseProvider><NextAuthSessionProvider>{children}</NextAuthSessionProvider></FirebaseProvider></body>
      </html>
    )
  }