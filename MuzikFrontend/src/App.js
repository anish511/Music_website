import './App.css';
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import NewAlbum from './component/Admin/NewAlbum';
import NewArtist from './component/Admin/NewArtist';
import NewSong from './component/Admin/NewSong';
import AdminHome from './component/Admin/AdminHome';
import UpdateSong from './component/Admin/UpdateSong';
import {Toaster} from "react-hot-toast";
import { setAuthToken } from './helpers/setAuthToken';
import UpdateArtist from './component/Admin/UpdateArtist';
import NewPlaylist from './component/Home/NewPlaylist';
import ShowSong from './component/Home/showSong';

function App() {

  const token = localStorage.getItem("jwt");
  if (token) {
      setAuthToken(token);
  }

  return (
    <Router>
      <Toaster position='top-center'/>
      <Header/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginSignUp />} ></Route>
        <Route exact path="/CreatePlaylist" element={<NewPlaylist />} ></Route>
        <Route exact path="/admin/CreateAlbum" element={<NewAlbum />} ></Route>
        <Route exact path="/admin/CreateArtist" element={<NewArtist />} ></Route>
        <Route exact path="/admin/CreateSong" element={<NewSong />} ></Route>
        <Route exact path="/admin/Home" element={<AdminHome />} ></Route>
        <Route exact path="/admin/UpdateSong" element={<UpdateSong />} ></Route>
        <Route exact path="/album/:id" element={<ShowSong />} ></Route>
        <Route exact path="/admin/UpdateArtist" element={<UpdateArtist />} ></Route>
        </Routes>
        <Footer />
    </Router>
    
  );
}

export default App;
