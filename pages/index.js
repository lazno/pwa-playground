import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Folder from "@material-ui/icons/Folder";
import Layout from "../components/Layout";
import "./index.scss";
import Link from "next/link";
import Chip from "@material-ui/core/Chip";

const listItems = () => {
  const items = [];
  for (let i = 1; i < 4; i++) {
    items.push(
      <ListItem key={"listitem" + i} button>
        <ListItemText key={"listitemtext" + i} primary={"Hallo du " + i} />
      </ListItem>
    );
  }
  return items;
};

const Index = () => {
  const [bg, setBg] = useState("green");

  let style = { color: bg };

  let el = bg !== "green" ? <Chip label="Basic Chip" /> : <div />;

  return (
    <div className="root">
      <nav>
        <Link href="/capture">
          <a>sexy mofo page</a>
        </Link>
      </nav>
      <main>
        {el}

        <List component="nav">{listItems()}</List>
        <BottomNavigation className="nav">
          <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={<RestoreIcon />}
            onClick={() => setBg("blue")}
          />
          <BottomNavigationAction
            label="Favorites"
            value="favorites"
            icon={<FavoriteIcon />}
            onClick={() => setBg("green")}
          />
          <BottomNavigationAction
            style={style}
            label="Nearby"
            value="nearby"
            icon={<LocationOnIcon />}
          />
          <BottomNavigationAction
            label="Folder"
            value="folder"
            icon={<Folder />}
          />
        </BottomNavigation>
      </main>
    </div>
  );
};

export default Index;
