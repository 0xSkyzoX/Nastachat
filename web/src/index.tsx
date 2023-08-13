import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../pages/login"
import Register from "../pages/register"
import Dashboard from '../pages/dashboard';
import Logout from '../components/logout';
import Inbox from '../pages/inbox';
import Profile from '../pages/profile';
import Conversation from '../pages/conversation';
import Post from "../pages/post";

const logout: ReactDOM.Root = ReactDOM.createRoot(document.getElementById("logout") as HTMLElement)
logout.render(<Logout />)

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />}></Route>
      <Route element={<Login />} path='/login'></Route>
      <Route element={<Register />} path='/register'></Route>
      <Route element={<Dashboard />} path='/dashboard'></Route>
      <Route element={<Inbox />} path="/inbox" />
      <Route element={<Profile />} path="/profile/:id" />
      <Route element={<Conversation />} path='/conversation/:id' />
      <Route element={<Post />} path='/post/:id'></Route>
    </Routes>
  </BrowserRouter>
);


