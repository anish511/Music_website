import React, { Fragment,useEffect, useState  } from "react";
import { CgMouse } from "react-icons/cg";
import "./UpdateArtist.css";
import AdminArtistCard from "./AdminArtistCard.js";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Axios from "axios";


// const albums = [
//     {albumId: 0,albumName: "DevD",image: "https://media5.bollywoodhungama.in/wp-content/uploads/2016/03/60351108.jpg" },
//     {albumId: 1,albumName: "Gangs of wasseypur",image: "https://filmyfool.com/wp-content/uploads/2012/06/wassey.jpg" },
//     {albumId: 2,albumName: "Gulaal",image: "https://i.scdn.co/image/ab67616d0000b273c45169492ebc6af70588df7d" }, 
//   ];

const UpdateArtist = () => {

    const navigate = useNavigate();

    if (!localStorage.getItem("jwt")){
        navigate("/login");
    }
    // console.log(localStorage.getItem("jwt"));

    const [artists, setArtists] = useState([]);
    
    const getArtists = async () => {
        const response = await Axios.get("/api/Artists");
        console.log(response.data);
        setArtists(response.data);
    };

    useEffect(() => {
        getArtists();
      }, []);

    return (
        <Fragment>
            <MetaData title="Update Artist" />
            <div className="dashboard">
            <SideBar />

            <div className="container4" id="container4">
                <h2 className="homeHeading">Update Artists</h2>

                <div className="container3" id="container3">
                {
                    artists.map((artist,index) => {
                        return(
                        <AdminArtistCard key={index} artist={artist} /> 
                        );
                    })
                }
                </div>
                
            </div>
            </div>
        </Fragment>
    )
}

export default UpdateArtist;