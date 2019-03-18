import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import CameraPhoto, {
  FACING_MODES,
  IMAGE_TYPES
} from "jslib-html5-camera-photo";
import React from "react";
import ButtonBar from "./ButtonBar";
import { IconButton } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import "./Cam.scss";

let camera;

const useCamera = videoRef => {
  const startCamera = () => {
    if (camera) {
      camera.startCamera(FACING_MODES.ENVIRONMENT);
    }
  };

  useEffect(() => {
    if (videoRef.current && !camera) {
      camera = new CameraPhoto(videoRef.current);
      startCamera();
    }
  });
};

const capture = eventHandler => {
  console.log("maybe capture");
  if (camera) {
    console.log("do capture");
    const config = {
      sizeFactor: 0.7,
      imageType: IMAGE_TYPES.JPG,
      imageCompression: 0.95,
      isImageMirror: false
    };
    const uri = camera.getDataUri(config);
    eventHandler(uri);
  }
};

const Cam = props => {
  const videoRef = useRef(null);
  useCamera(videoRef);

  const buttonArea = (
    <ButtonBar>
      <IconButton
        size="big"
        variant="contained"
        onClick={() => capture(props.onTakePhoto)}
        aria-label="Delete"
      >
        <PhotoCamera fontSize="large" />
      </IconButton>
    </ButtonBar>
  );

  return (
    <div className="outer">
      <div className="cam-container">
        <video ref={videoRef} autoPlay={true} />
      </div>
      <div>{buttonArea}</div>
    </div>
  );
};

Cam.propTypes = {
  onTakePhoto: PropTypes.func.isRequired
};

export default Cam;
