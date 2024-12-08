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
      <meta http-equiv="Content-Security-Policy" content="default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src-elem * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;"></meta>
      <body><FirebaseProvider><NextAuthSessionProvider>{children}</NextAuthSessionProvider></FirebaseProvider></body>
    </html>
  )
}