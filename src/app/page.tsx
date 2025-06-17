"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { signUp,signIn } = authClient
  const [email,setEmail]  = useState("");
  const [password,setPassword]  = useState("");
  const [name,setName]  = useState("");

  const { 
      data: session, 
      isPending, //loading state
      error, //error object
      refetch //refetch the session
  } = authClient.useSession() 

  const handlerRegister = async () => {
    try {
      const {data,error} = await signUp.email({
        email,
        password,
        name,
        callbackURL: "/"
      },{
        onRequest:(ctx)=>{
          console.log("Registration request initiated", ctx);
        },
        onSuccess:(ctx)=>{
          console.log("Registration successful", ctx);
        },
        onError:(ctx)=>{
          console.error("Registration failed", ctx);
        }

      });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

    const handlerLogin = async () => {
    try {
      const {data,error} = await signIn.email({
        email,
        password,
        callbackURL: "/"
      },{
        onRequest:(ctx)=>{
          console.log("Registration request initiated", ctx);
        },
        onSuccess:(ctx)=>{
          console.log("Registration successful", ctx);
        },
        onError:(ctx)=>{
          console.error("Registration failed", ctx);
        }

      });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  if(session) {
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
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-4 flex flex-col gap-y-4 w-[400px]">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <p className="text-gray-600">Create a new account</p>
        <Input placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <Input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Button onClick={handlerRegister}>Register</Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4 w-[400px]">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <p className="text-gray-600">Already have an account? Log in below.</p>
        <Input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Button onClick={handlerLogin}>Login</Button>
      </div>
    </div>
  );
}
