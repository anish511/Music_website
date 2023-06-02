import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import SongCard from "./SongCard.js";
import Axios from "axios";
import { useParams } from "react-router";

const ShowSong = () => {
    // const album = {
    //     albumId: 1,
    //     albumName: "DevD",
    //     image: "https://media5.bollywoodhungama.in/wp-content/uploads/2016/03/60351108.jpg",
    
    // }

    const [songs, setSong] = useState([]);

    let {id} = useParams();
    
    const getSong = async () => {
        const response = await Axios.get(`/api/Songs/AlbumId/${id}`);
        console.log(response.data);
        setSong(response.data);
    };

    useEffect(() => {
        getSong();
      }, []);

    return (
        <Fragment>
            <div className="banner">
                <div className="intro">
                    <p>Welcome to Muzik</p>
                    <h1>Listen your heart</h1>

                    <a href="#container">
                        <button>
                            Scroll <CgMouse/>
                        </button>
                    </a>
                </div>
            </div>

            <h2 className="homeHeading">Featured Song</h2>

            <div className="container" id="container">
                {
                    songs.map((song,index) => {
                        return(
                        <SongCard key={index} song={song} /> 
                        );
                    })
                }
            </div>
        </Fragment>
    )
}

export default ShowSong;