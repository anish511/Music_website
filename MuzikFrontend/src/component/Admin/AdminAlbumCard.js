import React, { Fragment,useEffect, useState  } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Axios from "axios";
import {toast} from "react-hot-toast";

const AdminAlbumCard = ({ album }) => {

  const DeleteAlbum = (albumId) => {
    Axios.delete(`/api/Albums/${albumId}`).then(response => {
      toast.success("Deleted Successfully");
    }).catch(error => {
      console.log(error.message);
      toast.error("Delete failed");
    });
  }

  const UpdateAlbum = (albumId) => {
       console.log(name);
       console.log(image[0]); 

       Axios.put(`/api/Albums/${albumId}`,{
        "albumId" : albumId,
        "albumName" : name,
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
  // const [albumid,setAlbumid] = useState();

  useEffect(() => {
    setName(album.albumName);
    setImages([album.imageUrl]);
  },[]);

  const createAlbumImagesChange = (e) => {
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
    <div className="albumCard" >
      
      <img src={image[0]} alt={album.albumName} />
      <label>Album Name</label>
      <input type="text" id={album.albumId} value={name} onChange={(e) => setName(e.target.value)}></input>
      <label>Change Poster</label>
      <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createAlbumImagesChange}
              />

       <div className="button">
            <div>       
              <Button className="updateBtn" name="update" id={"update"+album.albumId} onClick={() => UpdateAlbum(album.albumId)}>Update</Button>
            </div>
            <div>
              <Button className="updateBtn" name="delete" id={"delete"+album.albumId} onClick={() => DeleteAlbum(album.albumId)}>Delete</Button>
             </div> 
      </div>       
      <Link to={`admin/album/${album.albumId}`}>Update Songs</Link>     
    </div>
  );
};

export default AdminAlbumCard;