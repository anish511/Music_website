import React, { Fragment, useEffect, useState } from "react";
import "./NewSong.css";
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
import Axios from "axios";
import {toast} from "react-hot-toast";
// import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewSong = ({ history }) => {
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
  const [albumId, setalbumId] = useState();
  const [list_of_artist, set_list_of_artist] = useState();
  const [result_songArtistId, set_result_songArtistId] = useState([]);
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState("");
  // const [album, setAlbum] = useState([]);
  // const [artist, setArtist] = useState([]);

  const [dropdown_album, set_dropdown_album] = useState([]);
  const [dropdown_artist, set_dropdown_artist] = useState([]);
//   const [Stock, setStock] = useState(0);
  const [audio, setAudio] = useState([]);
  const [preplayAudio, setpreplayAudio] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadAudio, setUploadAudio] = useState();
  const [sound, setSound] = useState(null);

  const getAlbum = async () => {
    const response = await Axios.get("/api/Albums");
    console.log(response.data);
    // setAlbum(response.data);
    var list = [];
    response.data.map((a,index) => {
      var obj = { label: a.albumName, value: a.albumId };
      list.push(obj);
    })
    set_dropdown_album(list);
  };

  const getArtist = async () => {
    const response = await Axios.get("/api/Artists");
    console.log(response.data);
    // setArtist(response.data);
    var list = [];
    response.data.map((a,index) => {
      var obj = { label: a.artistName, value: a.artistId };
      list.push(obj);
    })
    set_dropdown_artist(list);
  }

  useEffect(() => {
    getAlbum();
    getArtist();
  },[]);

  useEffect(() => {
    console.log(uploadAudio)
  },[uploadAudio]);

  useEffect(() => {
    var snd = new Audio(preplayAudio[0]);
    snd.play();
    setSound(snd);
  }, [preplayAudio]); 

  const dropdown_artists = [
    { label: "Arijit Singh", value: "Id_of_artist1" },
    { label: "Kishore kumar", value: "Id_of_artist2" },
    { label: "Shreya Ghoshal", value: "Id_of_artist3" },
    { label: "Piyush Mishra", value: "Id_of_artist4" },
    { label: "Shruti Pathak", value: "Id_of_artist5" },
    { label: "Amit Trivedi", value: "Id_of_artist6" },
    { label: "Unknown", value: "Id_of_artist7" },
  ];

  const dropdown_albums = [
    {label: 'Dev D', value: 1},
    {label: 'Gangs of wasseypur', value: 2},
    {label: 'Gulaal', value: 3},
    {label: 'Desi Kalakar', value: 4}
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
  setUploadAudio(e.target.files[0]);
  // 
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
    // setAudio((old) => [URL.createObjectURL(files)]);
    // setpreplayAudio((old) => [URL.createObjectURL(files)]);
};

var showFileData = () => {
  if (selectedFile) { 
          return ( 
            <div> 

              <p>File Name: {selectedFile.name}</p>

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
              {/* <h4>Choose before Pressing the Upload button</h4>  */}

            </div> 
          ); 
        } 
}

  const createSongSubmitHandler = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("type",type);
    myForm.set("audio",audio);
    sound.pause();
    //dispatch(createProduct(myForm));
    console.log(name);
    console.log(type);
    console.log(albumId);
    console.log(list_of_artist)
    var audioUrl = "";

    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/reactmuzik/auto/upload';
          const config = {
            headers: {"X-Requested-With":"XMLHttpRequest"},
          };
          const defaultHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded'
          };
            const formData = new FormData();
            formData.append('file', uploadAudio);
            formData.append('upload_preset', 'upload_preset');
            delete Axios.defaults.headers.common["Authorization"]
            // const data = await Axios.post('https://api.cloudinary.com/v1_1/reactmuzik/auto/upload',formData,config).then(r => r.json()).catch((error) => {
            //   console.log(error.message)
            //   toast.error("Something went wrong")
            // })

            //   audioUrl = data.secure_url;
            //   console.log(audioUrl);
            

            Axios({
              url: CLOUDINARY_URL,
              method: 'POST',
              headers: defaultHeaders,
              data: formData
            })
            .then(async res => {
              console.log(res)
              audioUrl = res.data.secure_url;
              console.log(audioUrl);
              Axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
              await Axios.post("/api/Songs",{
                "songName" : name,
                "audioUrl" : audioUrl,
                "songType" : type,
                "albumId" : albumId
              }).then(async response1 => {
                console.log("Song created")
                console.log(response1.data);
                console.log(list_of_artist)
                await Promise.all(list_of_artist.forEach((artist,index) => {
                  console.log(artist)
                  Axios.post("/api/SongArtists",{
                    "songId" : parseInt(response1.data.songId),
                    "artistId" : parseInt(artist.value) 
                  }).then(response2 => {
                    set_result_songArtistId(result_songArtistId => [...result_songArtistId,parseInt(response2.data.songArtistId)]);
                  }).catch(async response3 => {
          
          
                    await Axios.delete(`/api/Songs/${response1.data.songId}`).then(response => {
                      console.log("Delete of song successfull");
                    }).catch(error => {
                      console.log("Not delete");
                      console.log(error.message)
                    })
          
          
          
                    console.log(result_songArtistId)
                    result_songArtistId.forEach((id) => {
                      Axios.delete(`/api/SongArtists/${id}`);
                    })
                    toast.error("Something went wrong");
                  //console.log(parseInt(artist.value));
                    
                  })
                }))
          
                toast.success("Song added successfully");
          
          
              }).catch(error => {
                if(error.message !== "undefined is not iterable (cannot read property Symbol(Symbol.iterator))"){
                  console.log("song not created")
                  console.log(error.message);
                  toast.error("Something went wrong");
                }
                else{
                  toast.success("Song added successfully");
                }
              })
            })
            .catch(err => console.log(err))
            console.log(audioUrl);

    //console.log(preplayAudio[0]);
   
  };

  const set_value = ((value) => {
    console.log(value);
    var list = [];
    value.map((a,index) => {
      list.push(a);
      console.log(a);
    })
    console.log(list)
    set_list_of_artist(list);
    console.log(list_of_artist);
  })

  useEffect(() => {
    console.log(list_of_artist)
  },[list_of_artist])

  return (
    <Fragment>
      <MetaData title="Create Song" />
      <div className="dashboard">
        <SideBar />
        <div className="newSongContainer">
          <form
            className="createSongForm"
            encType="multipart/form-data"
            onSubmit={createSongSubmitHandler}
          >
            <h1>Create Song</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Song Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Song Type"
                required
                value={type}
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
                isSearchable
                placeHolder="Select Album..."
                options={dropdown_album}
                value={[]}
                onChange={(value) => setalbumId(parseInt(value.value))}
              />
            </div>

            <div>
              <AccountTreeIcon />
              <Dropdown className="dropdown"
                isSearchable
                isMulti
                value={[]}
                placeHolder="Select artist..."
                options={dropdown_artist}
                // onChange={(value) => set_list_of_artist(value)}
                onChange={(value) => set_value(value)}
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
              id="createSongBtn"
              type="submit"
            //   disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewSong;