import React from "react";
import { Link } from "react-router-dom";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import {Howl,Howler} from "howler";

const SongCard = ({ song }) => {

    const soundPlay = (src) => {
        const sound = new Howl ({
            src,html5: true
        })
        sound.play();
    }
  return (
    <div className="albumCard" >
      <div className="play" id={song.songId} onClick={() => soundPlay(song.audioUrl)}>
      <PlayCircleFilledWhiteIcon fontSize="large"/>
      </div>
 
      <p>{song.songName}</p>
     </div> 
  );
};

export default SongCard;