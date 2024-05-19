"use client"
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const router = useRouter()

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,{
        name: name,
        email: email,
        password:  password,
      })
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('name', res.data.name);
    localStorage.setItem('email', res.data.email);
    localStorage.setItem('profileUrl', res.data.profileUrl);
    console.log(res.data);
    router.push('/User', { scroll: false })
    console.log('Form Submitted:', { name, email, password });
      }
    catch(err:any){
        console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 rounded-xl shadow-md p-8 bg-white">
        <h1 className="text-2xl font-medium text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
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
            Register
          </button>
          <div>
            Want to Login instead? 
            <a href='/Login' className='px-2 text-blue-400'>Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
