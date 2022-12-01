import logo from './logo.svg';
import './App.css';
import Regestration from './component/Regestration/Regestraion.component';
import Login from './component/Login/Login.component.';
import NavBar from './component/NavBar/NavBar.component';
import SlideBar from './component/SideBar/SlideBar.component';
import Post from './component/Post/Post.component';
import Comment from './component/Comment/Comment.comonent';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Feed from './component/Feed/Feed.comonent';
import HomePage from './pages/HomePage';



function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/register' element={<Regestration/>}></Route>
    <Route path='/comment' element={<Comment/>}></Route> 
    
   </Routes>
   </BrowserRouter>
  );
}

export default App;
