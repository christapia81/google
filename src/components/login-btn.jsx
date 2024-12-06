import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()} className="bg-slate-500-200 shadow-sm rounded-sm border-black w-60">Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()} className="bg-amber-200 shadow-sm rounded-sm border-black  w-60" >Sign in</button>
    </>
  )
}