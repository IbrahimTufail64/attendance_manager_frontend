"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
 
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,{
        email: email,
        password:  password,
      })
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userName', res.data.name);
    localStorage.setItem('Email', res.data.email);
    localStorage.setItem('profile', res.data.profileUrl);
    localStorage.setItem('Admin', res.data.isAdmin);
    console.log(res.data,'email & name', localStorage.getItem('userName'), localStorage.getItem('Email'));
    if(res.data.isAdmin){
      router.push('/Admin', { scroll: false })
    }
    else{
      router.push('/User', { scroll: false })
    }
    }
    catch(err:any){
        console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 rounded-xl shadow-md p-8 bg-white">
        <h1 className="text-2xl font-medium text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-center text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Login
          </button>
          <div>
            Not Registered? 
            <a href='/Register' className='px-2 text-blue-400'>Register</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
