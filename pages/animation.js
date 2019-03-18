import Button from "@material-ui/core/Button";
import Home from "@material-ui/icons/Home";
import Money from "@material-ui/icons/AttachMoney";
import React, { useState } from "react";
import Layout from "../components/Layout";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Zoom from "@material-ui/core/Grow";

const BUTTONS = 4;

const styles = {
  root: {
    top: 0,
    left: 0,
    background: "lawngreen",
    width: "100%",
    height: "100%",
    display: "flex",
    position: "fixed",
    objectFit: "cover"
  },

  item: {
    position: "fixed",
    top: "40%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    alignItems: "center"
  },

  itemButton: {
    marginLeft: "5px",
    marginRight: "5px"
  }
};

const Animation = props => {
  const { classes } = props;
  const [animation, setAnimation] = useState(false);

  const buttons = [];
  for (let i = 0; i < BUTTONS; i++) {
    buttons.push(
      <Button
        key={`button-${i}`}
        variant="contained"
        color="primary"
        className={classes.itemButton}
        onClick={() => assign()}
      >
        <Money fontSize="large" />
      </Button>
    );
  }

  const assign = () => {
    setAnimation(!animation);
  };

  return (
    <div className={classes.root}>
      {!animation && (
        <Zoom
          {...(!animation ? { timeout: 1000 } : {})}
          in={!animation}
          mountOnEnter={true}
        >
          <div className={classes.item}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => assign()}
            >
              <Home fontSize="large" />
            </Button>
          </div>
        </Zoom>
      )}
      {animation && (
        <Zoom {...(animation ? { timeout: 1000 } : {})} in={animation}>
          <div className={classes.item}>{buttons}</div>
        </Zoom>
      )}
    </div>
  );
};

Animation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Animation);
