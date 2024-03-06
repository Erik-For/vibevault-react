import React, { useEffect, useState } from 'react'
import { Content, User } from '../types';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import Library from './Library';
import { FaPlay, FaPause } from 'react-icons/fa';
import AuthanticationError from '../error';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';
import DragTest from '../components/DragablePlayer';


const App = () => {
  const [user, setUser] = useState<User  | null>(null);
  const [content, setContent] = useState<Content[] | null>(null);
  const [playing, setPlaying] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://auth.lokal.se/user", {
      method: "GET",
      credentials: "include"
    })
    .then(res => {
      if(res.status === 401){
        throw new AuthanticationError();
      }
      return res.json();
    })
    .then(data => {      
      setUser(data);
    }).catch(err => {
      if(err instanceof AuthanticationError){
        toast("You are not logged in", {type: "error"});
        navigate("/login");
      }
    });
  
  }, [])

  useEffect(() => {
    fetch("https://auth.lokal.se/songs", {
      method: "GET",
      credentials: "include"
    })
    .then(res => {
      if(res.status === 401){
        throw new AuthanticationError();
      }
      return res.json();
    })
    .then(data => {
      setContent(data.songs);
    }).catch(err => {
      if(err instanceof AuthanticationError){
        toast("You are not logged in", {type: "error"});
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row-reverse w-full h-screen text-white">
      <div className="relative flex-full h-15/16 w-full md:w-3/4 lg:w-4/5 md:h-full">
        <div className="w-full h-full overflow-y-scroll">
            <Routes>
              <Route index path="/" Component={Home} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" Component={Library} />
            </Routes>
            <div className='pt-32'></div>
        </div>
        <DragTest playing={false} /> 
      </div>
      <NavBar />
    </div>
  )
}

export default App