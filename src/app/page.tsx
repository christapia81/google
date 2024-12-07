
'use client'
import Login from "../components/Login"
export default function Page() {
  return <>

    <h1 className="p-4 text-3xl font-mono bg-blue-300 shadow-sm">Hello, Next.js! With <span className="text-amber-400 font-sans">Google</span> APIs</h1>
    <div className="m-7 p-4 rounded-md shadow-md flex flex-col gap-2">
      {/* <p>OAuth Demo</p> 
      <LoginButton></LoginButton> */}
      <p>Firebase Auth Demo</p> 
      <Login></Login>
    </div>
  </>
}