import React, { Fragment, useEffect, useState } from "react";
import "./NewAlbum.css";
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
import Axios from "axios";
import {toast} from "react-hot-toast"
import {useNavigate} from "react-router-dom";
// import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewAlbum = ({ history }) => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { loading, error, success } = useSelector((state) => state.newProduct);

const navigate = useNavigate();

    if (!localStorage.getItem("jwt")){
        navigate("/login");
    }

  const [name, setName] = useState("");
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

//   const categories = [
//     "Laptop",
//     "Footwear",
//     "Bottom",
//     "Tops",
//     "Attire",
//     "Camera",
//     "SmartPhones",
//   ];

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

  const createAlbumSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    // myForm.set("price", price);
    // myForm.set("description", description);
    // myForm.set("category", category);
    // myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    //dispatch(createProduct(myForm));
    
    Axios.post("/api/Albums",{
      "albumName" : name,
      "imageUrl" : images[0]
    }).then(response => {
      console.log(response.data);
      toast.success("Album added successfully");
    }).catch(response => {
      console.log(response.data);
      toast.error("Something went wrong");
    })
  };

  const createAlbumImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Album" />
      <div className="dashboard">
        <SideBar />
        <div className="newAlbumContainer">
          <form
            className="createAlbumForm"
            encType="multipart/form-data"
            onSubmit={createAlbumSubmitHandler}
          >
            <h1>Create Album</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Album Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div> */}

            <div id="createAlbumFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createAlbumImagesChange}
                multiple
              />
            </div>

            <div id="createAlbumFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Album Preview" />
              ))}
            </div>

            <Button
              id="createAlbumBtn"
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

export default NewAlbum;