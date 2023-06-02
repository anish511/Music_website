import React, { Fragment,useEffect, useState  } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Axios from "axios";
import {toast} from "react-hot-toast";

const AdminArtistCard = ({ artist }) => {
  const DeleteArtist = (artistId) => {
    Axios.delete(`/api/Artists/${artistId}`).then(response => {
      toast.success("Deleted Successfully");
    }).catch(error => {
      console.log(error.message);
      toast.error("Delete failed");
    });
  }

  const UpdateArtist = (artistId) => {
    console.log(name);
       console.log(image[0]); 

       Axios.put(`/api/Artists/${artistId}`,{
        "artistId" : artistId,
        "artistName" : name,
        "artistType" : type,
        "imageUrl" : image[0]
       }).then(response => {
        toast.success("Updated Successfully");
      }).catch(error => {
        console.log(error.message);
        toast.error("Update failed");
      });
  }

  const [name,setName] = useState();
  const [image,setImages] = useState([]);
  const [type,setType] = useState();

  useEffect(() => {
    setName(artist.artistName);
    setType(artist.artistType);
    setImages([artist.imageUrl]);
  },[]);

  const createArtistImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          // setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };


  return (
    <div className="artistCard" >
      <img src={image[0]} alt={name} />
      <label>Artist Name</label>
      <input type="text" id={artist.artistId} value={name} onChange={(e) => setName(e.target.value)}></input>
      <label>Artist Type</label>
      <input type="text" id={"type" + artist.artistId} value={type} onChange={(e) => setType(e.target.value)}></input>
      <label>Change Photo</label>
      <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createArtistImagesChange}
              />
       <Button name="update" id={"update"+artist.artistId} onClick={() => UpdateArtist(artist.artistId)} >Update</Button>
      <Button name="delete" id={"delete"+artist.artistId} onClick={() => DeleteArtist(artist.artistId)}>Delete</Button>   
    </div>
  );
};

export default AdminArtistCard;