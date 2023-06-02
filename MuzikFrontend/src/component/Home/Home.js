import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import AlbumCard from "./AlbumCard.js";
import Axios from "axios";

const Home = () => {
    // const album = {
    //     albumId: 1,
    //     albumName: "DevD",
    //     image: "https://media5.bollywoodhungama.in/wp-content/uploads/2016/03/60351108.jpg",
    
    // }

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

            <h2 className="homeHeading">Featured Albums</h2>

            <div className="container" id="container">
                {
                    albums.map((album,index) => {
                        return(
                        <AlbumCard key={index} album={album} /> 
                        );
                    })
                }
            </div>
        </Fragment>
    )
}

export default Home;