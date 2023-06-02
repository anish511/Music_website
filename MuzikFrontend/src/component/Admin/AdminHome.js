import React, { Fragment,useEffect, useState  } from "react";
import { CgMouse } from "react-icons/cg";
import "./AdminHome.css";
import AdminAlbumCard from "./AdminAlbumCard.js";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Axios from "axios";


// const albums = [
//     {albumId: 0,albumName: "DevD",image: "https://media5.bollywoodhungama.in/wp-content/uploads/2016/03/60351108.jpg" },
//     {albumId: 1,albumName: "Gangs of wasseypur",image: "https://filmyfool.com/wp-content/uploads/2012/06/wassey.jpg" },
//     {albumId: 2,albumName: "Gulaal",image: "https://i.scdn.co/image/ab67616d0000b273c45169492ebc6af70588df7d" }, 
//   ];

const AdminHome = () => {

    const navigate = useNavigate();

    if (!localStorage.getItem("jwt")){
        navigate("/login");
    }
    // console.log(localStorage.getItem("jwt"));

    const [albums, setAlbums] = useState([]);
    
    const getAlbum = async () => {
        const response = await Axios.get("/api/Albums");
        console.log(response.data);
        setAlbums(response.data);
    };

    useEffect(() => {
        getAlbum();
      }, []);

    return (
        <Fragment>
            <MetaData title="Create Album" />
            <div className="dashboard">
            <SideBar />

            <div className="container2" id="container2">
                <h2 className="homeHeading">Update Albums</h2>

                <div className="container1" id="container1">
                {
                    albums.map((album,index) => {
                        return(
                        <AdminAlbumCard key={index} album={album} /> 
                        );
                    })
                }
                </div>
                
            </div>
            </div>
        </Fragment>
    )
}

export default AdminHome;