import React from "react";
import { ImageListItem_ } from "../../../interfaces/ImageListItem";
import ImageLoader from "../../../shared/ImageLoading";
import InfiniteScollingContainer from "../../../shared/InfiniteScrolling/InfiniteScollingContainer";
import "./ImageGridList.css";
import LoadingSvg from '../../../assets/loading.svg';

export default function ImageGridList(props: any) {
  const pageEnd = (obj: IntersectionObserverEntry[]) => {
    obj.forEach((entry) => {
      console.log(entry)
      if (entry && entry.isIntersecting && entry.intersectionRatio > 0.50) {
        props.getImages();
      }
    });
  }

  return (
    <>
      <div>
        <img height="100" alt="loading images" src={LoadingSvg} />
      </div>
      <div style={props.classes.root}>
        {props.list.map((tile: ImageListItem_, index: number) => (
          <div
            style={props.classes.gridItem}
            key={index}
            onClick={() => props.openModal(tile)}
          >
            <ImageLoader
              height={200}
              width={367}
              src={`https://picsum.photos/id/${tile.id}/367/267`}
              alt={tile.author}
            />
          </div>
        ))}
      </div>
      {/* // loading indicator */}
      {props.isLoading && <div className="loading">
        <img height="100" alt="loading images" src={LoadingSvg} />
      </div>}
      <InfiniteScollingContainer rootMargin={'100px 0px 0px 0px'} root={null} emit={pageEnd} threshold={[0.75]} />
    </>
  );
}
