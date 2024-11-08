"use client";
import { useState } from 'react';
import Button from './Button';
import Card from './Card';
import styles from './Signup.module.css';

interface SignupProps {
    onAddUser: (user: {
      id: number;
      name: string;
      username: string;
      email: string;
      password: string;
      imageUrl: string;
    }) => void;
  }

export default function Signup({onAddUser} : SignupProps) {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Username and password are required.');
      return;
    }

    const newUser = {
      id: Math.random(),
      name,
      username,
      email,
      password,
      imageUrl,
    };


  
    onAddUser(newUser);

    //resets fields
    setName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setImageUrl('');

  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-3">
      <Card className={`${styles.input} w-full max-w-lg p-3 bg-white shadow-md rounded-md`}>
        <h1 className="text-4xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name</label>
          <input
            className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="username">Username</label>
          <input
            className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="imageLink">Image Link</label>
          <input
            className="border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            id="imageLink"
            type="url"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
  
          <Button type="submit">Sign Up</Button>
        </form>
      </Card>
    </div>
  );
}