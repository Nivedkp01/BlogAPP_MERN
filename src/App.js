import Login from './Login/Login'
import './App.css';

import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import Register from './Register/Register';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Create from './Create/Create';
import PostPage from './PostPage.js/PostPage';
import Comments from './Comments/Comments';
import Edit from './Edit/Edit';



function App() {
  return (
    <BrowserRouter> 
    <Navbar />
  
      <Routes>
        <Route path='/login'  element={<Register/>}></Route>
        <Route path='/register'  element={<Login/>} ></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/post/:id' element={<PostPage/>}></Route>
        <Route path='comment/:id' element={<Comments />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
