import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import Dropdown from "../Admin/Dropdown";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import {toast} from "react-hot-toast";
import { Button } from "@material-ui/core";
import "./NewPlaylist.css";

const NewPlaylist = () => {

    const navigate = useNavigate();

    if (!localStorage.getItem("jwt")){
        navigate("/login");
    }

    const [name,setName] = useState("");
    const [userId, setUserId] = useState();
    const [songList,setSongList] = useState([]);
    const [result_playlistSongId, set_result_playlistSongId] = useState([]);

    const songs = [
        {value:4,label:"Ik Bagal"},
        {value:5,label:"Hunter"},
        {value:6,label:"Chi cha ledar"},
        {value:21,label:"Keh ke lunga"},
    ];

    const set_user = async () => {
        var res = await Axios.get(`/api/Users/email/${localStorage.getItem("userEmail")}`);
        setUserId(res.data[0].userId);
    }

    useEffect(() => {
        set_user();
    },[])

    useEffect(() => {
        console.log(songList);
    },[songList])

    const createPlaylistSubmitHandler = async (e) => {
        e.preventDefault();

        await Axios.post("/api/Playlists",{
            "name":name,
            "userId":parseInt(userId)
        }).then(async response1 => {

            await Promise.all(songList.forEach((song,index) => {
                console.log(song)
                console.log(parseInt(response1.data.id));
                Axios.post("/api/PlaylistSongs",{
                  "id" : parseInt(response1.data.id),
                  "songId" : parseInt(song.value) 
                }).then(response2 => {
                  set_result_playlistSongId(result_playlistSongId => [...result_playlistSongId,parseInt(response2.data.playlistSongId)]);
                }).catch(async response3 => {
        
        
                  await Axios.delete(`/api/Playlists/${response1.data.id}`).then(response => {
                    console.log("Delete of playlist successfull");
                  }).catch(error => {
                    console.log("Not delete");
                    console.log(error.message)
                  })
        
        
        
                  console.log(result_playlistSongId)
                  result_playlistSongId.forEach((id) => {
                    Axios.delete(`/api/PlaylistSongs/${id}`);
                  })
                  toast.error("Something went wrong");
                //console.log(parseInt(artist.value));
                  
                })
              }))
        
              toast.success("Playlist added successfully");
        }).catch(error => {
            if(error.message !== "undefined is not iterable (cannot read property Symbol(Symbol.iterator))"){
                console.log("Playlist not created")
                console.log(error.message);
                toast.error("Something went wrong");
              }
              else{
                toast.success("Playlist added successfully");
              }
        })
    }

    return (
        <Fragment>
          <MetaData title="New Playlist" />
          
            <div className="newPlaylistContainer">
              <form
                className="createPlaylistForm"
                encType="multipart/form-data"
                onSubmit={createPlaylistSubmitHandler}
              >
                <h1>Create Playlist</h1>
    
                <div>
                  <SpellcheckIcon />
                  <input
                    type="text"
                    placeholder="Playlist Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
    
                <div>
                  <AccountTreeIcon />
                  <Dropdown className="dropdown"
                    isSearchable
                    isMulti
                    value={[]}
                    placeHolder="Select Songs..."
                    options={songs}
                    // onChange={(value) => set_list_of_artist(value)}
                    onChange={(value) => setSongList(value)}
                  />
                </div>
    
                <Button id="createPlaylistBtn" type="submit"> Create</Button>
              </form>
            </div>
          
        </Fragment>
      );
}

export default NewPlaylist;