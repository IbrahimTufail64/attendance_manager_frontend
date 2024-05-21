"use client"
import Image from "next/image";
import Login from "./Login/page";
import { useEffect } from "react";

export default function Home() {

 useEffect(()=>{
  alert("Welcome! use 'admin@example.com' & 'abc123' to login as admin or any other email to register as a user ");
 },[])
  return (
   <main>
    <Login/>

   </main>
  );
}
