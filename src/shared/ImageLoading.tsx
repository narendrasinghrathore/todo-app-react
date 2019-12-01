import React, { useState } from "react";
import imageloadingErrorSvg from "../assets/image_loading_error.svg";
import { ImageLoaderInterface } from "../interfaces/ImageLoaderInterface";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    div: {
      border: "1px solid #dedede"
    }
  })
);
export default function ImageLoader(props: ImageLoaderInterface) {
  const classes = useStyles();
  const [ImageLoadingSuccessful, setImageLoadingSuccess] = useState(false);
  const [imageLoadingError, setImageLoadingError] = useState(false);

  const onImageLoadingError = () => {
    setImageLoadingSuccess(true);
    setImageLoadingError(true);
  };

  return (
    <>
      <img
        src={props.src}
        style={{ visibility: ImageLoadingSuccessful ? "visible" : "hidden" }}
        onLoad={() => setImageLoadingSuccess(true)}
        alt={props.alt}
        onError={onImageLoadingError}
      />
      {!ImageLoadingSuccessful && (
        <>
          <div className={classes.div}>
            <Skeleton variant="circle" width={20} height={20} />
          </div>
          <div className={classes.div}>
            <Skeleton variant="rect" width={367} height={100} />
          </div>
          <div className={classes.div}>
            <Skeleton variant="text" width={200} height={20} />
          </div>
        </>
      )}
      {imageLoadingError && <img src={imageloadingErrorSvg} alt="Not found" />}
    </>
  );
}
