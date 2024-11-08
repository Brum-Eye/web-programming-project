"use client";
import { useState } from 'react';
import Signup from './components/Signup';
import Users from './components/Users';

type User = {
  id: number;
  name: string;
  username: string;
  imageUrl: string;
  email: string;
  password: string;
};

const USERS_INIT: User[] = [
  {
    id: 1,
    name: 'Buzz Lightyear',
    username: 'blightyear',
    email: 'buzz.lightyear@gmail.com',
    password: 'password',
    imageUrl: 'https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-6/354028274_877327910424573_1574551018727772204_n.png?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=g6-ft4GxIvoQ7kNvgGcz4RE&_nc_zt=23&_nc_ht=scontent-atl3-1.xx&_nc_gid=A8vjtAC-cEw3vg92EjuPF4P&oh=00_AYDSodIiNCNwgN2fjUcuWtNYN_wKO2uPCk9ex_Jn7RUL1g&oe=672EB74A',
  },
  
  
];

export default function Home() {
  const [users, setUsers] = useState<User[]>(USERS_INIT);

  const addUserHandler = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };
  return (
    <div>
    
      <div className="flex flex-col items-center justify-center p-2 bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Home Page</h1>
        <Users users={users}/>
      </div>
      <Signup onAddUser={addUserHandler}/>
    </div>
  );
}

