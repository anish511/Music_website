import React, { Fragment, useEffect, useState } from "react";
import "./UpdateSong.css";
import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import Dropdown from "./Dropdown";
import {useNavigate} from "react-router-dom";
import { useParams } from "react-router";
// import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateSong = ({ history }) => {
//   const dispatch = useDispatch();
//   const alert = useAlert();
const navigate = useNavigate();

if (!localStorage.getItem("jwt")){
    navigate("/login");
}


//   const { loading, error, success } = useSelector((state) => state.newProduct);
const inputRef = React.createRef();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [artist, setArtist] = useState([]);
//   const [Stock, setStock] = useState(0);
  const [audio, setAudio] = useState([]);
  const [preplayAudio, setpreplayAudio] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sound, setSound] = useState(null);

  // let {id} = useParams();
  useEffect(() => {
    var snd = new Audio(preplayAudio[0]);
    snd.play();
    setSound(snd);
  }, [preplayAudio]); 

  const categories = [
    { label: "Dev D", value: "Id_of_album1" },
    { label: "Desi Kalakar", value: "Id_of_album2" },
    { label: "Where is my mind", value: "Id_of_album3" },
  ];



  const artists = [
    { label: "Arijit Singh", value: "Id_of_artist1" },
    { label: "Kishore kumar", value: "Id_of_artist2" },
    { label: "Shreya Ghoshal", value: "Id_of_artist3" },
    { label: "Piyush Mishra", value: "Id_of_artist4" },
    { label: "Shruti Pathak", value: "Id_of_artist5" },
    { label: "Amit Trivedi", value: "Id_of_artist6" },
    { label: "Unknown", value: "Id_of_artist7" },
  ];

  const songs = [
        {songId:4,songName:"Ik Bagal",songType:"Classic",artist:[{ label: "Piyush Mishra", value: "Id_of_artist4" }]},
        {songId:5,songName:"Hunter",songType:"Indie Pop",artist:[{ label: "Unknown", value: "Id_of_artist7" }]},
        {songId:6,songName:"Chi cha ledar",songType:"Orchestra",artist:[{ label: "Unknown", value: "Id_of_artist7" }]},
        {songId:7,songName:"Keh ke lunga",songType:"Rock",artist:[{ label: "Amit Trivedi", value: "Id_of_artist6" },{ label: "Shruti Pathak", value: "Id_of_artist5" }]},
  ];

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (success) {
//       alert.success("Product Created Successfully");
//       history.push("/admin/dashboard");
//       dispatch({ type: NEW_PRODUCT_RESET });
//     }
//   }, [dispatch, alert, error, history, success]);

const onClickResetAudioFile = ((e) => {
  setSelectedFile(null); // celears state
  inputRef.current.value = "" // clears form
  setAudio([]);
  setpreplayAudio([]);
  sound.pause();
 });
 
 const showResetButton = () => {
   if (selectedFile) {
 
     return (
         <button onClick={onClickResetAudioFile}> Clear! </button> 
     );
 } else {
   return (
         <div>{null}</div>
 
   );
 }
 }


var Sound = (function () {
  var df = document.createDocumentFragment();
  return function Sound(src) {
      var snd = new Audio(src);
      df.appendChild(snd); // keep in fragment until finished playing
      snd.addEventListener('ended', function () {df.removeChild(snd);});
      snd.play();
      return snd;
  }
}());
// then do it


const onChangeAudio = (e) => {
  const files = Array.from(e.target.files);
  setAudio([]);
  setpreplayAudio([]);
  setSelectedFile(e.target.files[0]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setpreplayAudio((old) => [reader.result]);
          setAudio((old) => [reader.result]);
          //console.log(reader.result);
        }
      };

      reader.readAsDataURL(file);
    });

    //var snd = Sound(preplayAudio[0]);
    
};

var showFileData = () => {
  if (selectedFile) { 
          return ( 
            <div> 
              <h2>File Details:</h2> 
              <p>File Name: {selectedFile.name}</p> <br></br>
              <p>File Type: {selectedFile.type}</p> <br></br>
              <p> 
                Last Modified:{" "} 
                {selectedFile.lastModifiedDate.toDateString()} 
              </p><br></br>

                          {/* <audio
                controls
                src={selectedFile}>
                    Your browser does not support the
                    <code>audio</code> element.
            </audio> */}


              {showResetButton()} 

            </div> 
          ); 
        } else { 
          return ( 
            <div> 
              <br /> 
              <h4>Choose before Pressing the Upload button</h4> 
            </div> 
          ); 
        } 
}

  const createSongSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("type",type);
    myForm.set("audio",audio);
    sound.pause();
    //dispatch(createProduct(myForm));

    //console.log(preplayAudio[0]);
  };



  return (
    <Fragment>
      <MetaData title="Create Song" />
      <div className="dashboard">
        <SideBar />
        <div className="newSongContainer">
        {songs.map((song,index) => {
            return(
            
            <form
              className="createSongForm"
              key={song.songId}
              encType="multipart/form-data"
              onSubmit={createSongSubmitHandler}
            >
              <h1>Update Song</h1>
  
              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  id={"name" + song.songId}
                  placeholder="Song Name"
                  required
                  value={song.songName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
  
              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  id={"type" + song.songId}
                  placeholder="Song Type"
                  required
                  value={song.songType}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              {/* <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div> */}
  
              {/* <div>
                <DescriptionIcon />
  
                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
          </div> */}
  
              <div>
                <AccountTreeIcon />
                <Dropdown className="dropdown"
                id={"selectAlbum" + song.songId}
                  isSearchable
                  placeHolder="Select Album..."
                  options={categories}
                  value={null}
                  onChange={(value) => console.log(value)}
                />
              </div>
  
              <div>
                <AccountTreeIcon />
                <Dropdown className="dropdown"
                id={"selectArtist" + song.songId}
                  isSearchable
                  isMulti
                  placeHolder="Select artist..."
                  value={song.artist}
                  options={artists}
                  onChange={(value) => console.log(value)}
                />
              </div>
  
              <div id="createSongFormFile">
                {/* <input
                  type="file"
                  name="mp3file"
                  accept="audio/*"
                  onChange={createSongFileChange}
                  multiple
                /> */}
                <input type="file" name="audio" accept="audio/*" ref={inputRef}  onChange={onChangeAudio}/>
              </div>
  
              {/* <div id="createSongFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Song Preview" />
                ))}
              </div> */}
              {showFileData()}
  
              <Button
                id={"updateSongBtn" + song.songId}
                className="SongBtn"
                type="submit"
              //   disabled={loading ? true : false}
              >
                Update
              </Button>
              <Button
                id={"deleteSongBtn" + song.songId}
                className="SongBtn"
                type="submit"
              //   disabled={loading ? true : false}
              >
                Delete
              </Button>
            </form>
         
            )
        })}
         </div>
      </div>
    </Fragment>
  );
};

export default UpdateSong;