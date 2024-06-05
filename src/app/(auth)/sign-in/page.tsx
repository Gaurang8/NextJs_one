"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className=" text-white px-2 py-1 bg-emerald-600 rounded-md m-2" onClick={() => signIn()}>Sign in</button>
    </>
  )
}