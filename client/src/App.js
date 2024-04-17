import { Route, Routes } from 'react-router-dom';
import Blog from "./pages/Blog";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Userblog from "./pages/Userblog";
import './App.css';
import Createblog from './pages/Createblog';
import Blogdetails from './pages/Blogdetails';
import Fullblog from "./pages/Fullblog"

import { Toaster } from 'react-hot-toast';
// import Home from './pages/Home';

function App() {
  return (
    <div>

          <Header/>
          <Toaster/>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/all-blogs' element={<Blog/>}/>
            <Route path='/my-blogs' element={<Userblog/>} />
            <Route path='/blog-details/:id' element={<Blogdetails/>} />
            <Route path='/blog/:id' element={<Fullblog/>} />
            <Route path='/create-blog' element={<Createblog/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
        </Routes>
      
    </div>
  );
}

export default App;
