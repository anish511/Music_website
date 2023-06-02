import React from "react";
import { Link } from "react-router-dom";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

const AlbumCard = ({ album }) => {
  return (
    <Link className="albumCard" to={`/album/${album.albumId}`}>
      <div className="play">
      <PlayCircleFilledWhiteIcon fontSize="large"/>
      </div>
      <img src={album.imageUrl} alt={album.albumName} />
      {/* <PlayCircleFilledWhiteIcon fontSize="large"/> */}
      <p>{album.albumName}</p>
    </Link>
  );
};

export default AlbumCard;