import React, { useState } from 'react';
import imageloadingErrorSvg from '../assets/image_loading_error.svg';
import { ImageLoaderInterface } from '../interfaces/ImageLoaderInterface';
import Skeleton from '@material-ui/lab/Skeleton';

export default function ImageLoader(props: ImageLoaderInterface) {
  const [ImageLoadingSuccessful, setImageLoadingSuccess] = useState(false);
  const [imageLoadingError, setImageLoadingError] = useState(false);

  const width = props.width || 1280;
  const height = props.height || 720;

  const onImageLoadingError = () => {
    setImageLoadingSuccess(true);
    setImageLoadingError(true);
  };

  return (
    <>
      <img
        src={props.src}
        style={{
          display: ImageLoadingSuccessful ? 'block' : 'none',
          width: '100%',
          height: '100%'
        }}
        onLoad={() => setImageLoadingSuccess(true)}
        alt={props.alt}
        onError={onImageLoadingError}
      />
      {!ImageLoadingSuccessful && (
        <>
          <div>
            <Skeleton variant="text" width={200} height={20} />
            <Skeleton variant="circle" width={20} height={20} />
            <Skeleton variant="rect" width={width} height={height} />
          </div>
        </>
      )}
      {imageLoadingError && <img src={imageloadingErrorSvg} alt="Not found" />}
    </>
  );
}
