import React, { Fragment, useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
// import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from "./Dropdown";
import SideBar from "./Sidebar";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import "./Dashboard.css";

function Dashboard(){
    const albums = [
        {albumId: 0,albumName: "DevD",image: "https://media5.bollywoodhungama.in/wp-content/uploads/2016/03/60351108.jpg" },
        {albumId: 1,albumName: "Gangs of wasseypur",image: "https://filmyfool.com/wp-content/uploads/2012/06/wassey.jpg" },
        {albumId: 2,albumName: "Gulaal",image: "https://i.scdn.co/image/ab67616d0000b273c45169492ebc6af70588df7d" }, 
      ];

    const songs = [
        [
            {songId:1,songName:"Nayan Tarse",songType:"Indie Pop",artist:["Amit Trivedi"]},
            {songId:2,songName:"Mahi menu",songType:"Indie Pop",artist:["Punjabi singer"]},
            {songId:3,songName:"Emotional Atyachar",songType:"Orchestra",artist:["unKnown"]}
        ],
        [
            {songId:4,songName:"Ik Bagal",songType:"Classic",artist:["Piyush Mishra"]},
            {songId:5,songName:"Hunter",songType:"Indie Pop",artist:["Unknown"]},
            {songId:6,songName:"Chi cha ledar",songType:"Orchestra",artist:["unKnown"]},
            {songId:6,songName:"Keh ke lunga",songType:"Rock",artist:["Amit Trivedi","Shruti Pathak"]},
        ],
        [
            {songId:7,songName:"Duniya",songType:"Classic",artist:["Piyush Mishra"]},
            {songId:8,songName:"Ranaji",songType:"Indie Pop",artist:["Rekha Bhardwaj"]},
            {songId:9,songName:"Bedo",songType:"Indie Pop",artist:["Rekha Bhardwaj"]},
            {songId:10,songName:"Aarambh",songType:"Indie Pop",artist:["Piyush Mishra"]},

        ]
    ]; 

    const artists = [
        { label: "Arijit Singh", value: "Id_of_artist1" },
        { label: "Kishore kumar", value: "Id_of_artist2" },
        { label: "Shreya Ghoshal", value: "Id_of_artist3" },
        { label: "Piyush Mishra", value: "Id_of_artist4" },
        { label: "Rekha Bhardwaj", value: "Id_of_artist5" },
        { label: "Amit Trivedi", value: "Id_of_artist6" },
        { label: "Unknown", value: "Id_of_artist7" },
      ];

      return(
        <Fragment>
            <MetaData title="Dashboard" />
      <div className="dashboard">
        <SideBar/>
      
      {/* <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item> */}

      <Accordion>
      {albums.forEach(element => {
            console.log(element.albumName);
            
            <Accordion.Item eventKey={element.albumId}>
            <Accordion.Header>{element.albumName}</Accordion.Header>
            <Accordion.Body>
                <img src={element.image} alt="logo"></img>
                <h2>{element.albumName}</h2>
                
                 <Accordion>
                    {
                        songs[element.albumId].forEach(song => {
                            var s = element.albumId.toString() + song.songId.toString();
                            <Accordion.Item eventKey={s}>
                                <Accordion.Header>{song.songName}</Accordion.Header>
                                <Accordion.Body>

                                    <label>Song Name</label>
                                    <input type="text" id={"name" + song.songId} value={song.songName} required></input>

                                    <label>Song Type</label>
                                    <input type="text" id={"type" + song.songId} value={song.songType} required></input>

                                    <label>Artist Name</label>
                                    <Dropdown className="dropdown"
                                              isSearchable
                                              isMulti
                                              placeHolder="Select artist..."
                                              options={artists}
                                              value={song.artist}
                                              onChange={(value) => console.log(value)}
                                    />
                                    <Button id={"update" + song.songId} >Update</Button>
                                    <Button id={"Delete" + song.songId} >Delete</Button>
                                </Accordion.Body>
                            </Accordion.Item>
                        })
                    }
                </Accordion>

         </Accordion.Body>
             </Accordion.Item>
             
         })} 
        </Accordion>
      </div>
      </Fragment>
      )
        {/* {albums.forEach(element => {
            <Accordion.Item eventKey={element.albumId}>
            <Accordion.Header>{element.albumName}</Accordion.Header>
            <Accordion.Body>
                <img src={element.image} alt="logo"></img>
                <h2>{element.albumName}</h2>
                
                {/* <Accordion>
                    {
                        songs[element.albumId].forEach(song => {
                            var s = element.albumId.toString() + song.songId.toString();
                            <Accordion.Item eventKey={s}>
                                <Accordion.Header>{song.songName}</Accordion.Header>
                                <Accordion.Body>

                                    <label>Song Name</label>
                                    <input type="text" id={"name" + song.songId} value={song.songName} required></input>

                                    <label>Song Type</label>
                                    <input type="text" id={"type" + song.songId} value={song.songType} required></input>

                                    <label>Artist Name</label>
                                    <Dropdown className="dropdown"
                                              isSearchable
                                              isMulti
                                              placeHolder="Select artist..."
                                              options={artists}
                                              value={song.artist}
                                              onChange={(value) => console.log(value)}
                                    />
                                    <Button id={"update" + song.songId} >Update</Button>
                                    <Button id={"Delete" + song.songId} >Delete</Button>
                                </Accordion.Body>
                            </Accordion.Item>
                        })
                    }
                </Accordion> */}

        //     </Accordion.Body>
        //     </Accordion.Item>
        // })} */}
      
}

export default Dashboard;