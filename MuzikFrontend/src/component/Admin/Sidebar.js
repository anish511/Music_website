import React from "react";
import "./Sidebar.css";
import logo from "../../images/muziklogo.avif";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link> */}
      <Link to="/admin/Home">
        <p>
          <DashboardIcon /> Home
        </p>
      </Link>
      <Link to="/admin/CreateAlbum">
        {/* <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Create Album">
            <Link to="/admin/CreateAlbum">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView> */}
        <p>
          <AddIcon />
          Create Album
        </p>

      </Link>
      <Link to="/admin/CreateArtist">
        <p>
          <AddIcon />
         Create Artist
        </p>
      </Link>
      <Link to="/admin/CreateSong">
        <p>
          <AddIcon /> Create Song
        </p>
      </Link>
      <Link to="/admin/updateSong">
        <p>
          <PostAddIcon /> Update Song
        </p>
      </Link>
      <Link to="/admin/updateArtist">
        <p>
          <PostAddIcon /> Update Artist
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;