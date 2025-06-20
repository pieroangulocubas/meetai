"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export function HomeView() {
  const router = useRouter()
  const { 
      data: session, 
  } = authClient.useSession() 

  if(!session) {
    return ( 
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    ); 
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold">Session Details</h1>
      <pre className="bg-gray-100 p-4 rounded">
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    <div className="mt-4">
      <h2 className="text-xl font-semibold">User Information</h2>
      <p className="text-gray-700">Name: {session.user.name || "N/A"}</p>
      <p className="text-gray-700">Email: {session.user.email}</p>
      <p className="text-gray-700">ID: {session.user.id}</p>  
      <p className="text-gray-600">You are logged in!</p>
      <Button onClick={() => authClient.signOut({fetchOptions:{onSuccess:()=>router.push("/sign-in")}})}>Sign Out</Button>
    </div>
    </div>
  );
}
