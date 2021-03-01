import React from "react";
import { ImageListItem_ } from "../../../interfaces/ImageListItem";
import ImageLoader from "../../../shared/ImageLoading";
import InfiniteScollingContainer from "../../../shared/InfiniteScrolling/InfiniteScollingContainer";
import "./ImageGridList.css";
import LoadingSvg from "../../../assets/loading.svg";

export default function ImageGridList(props: any) {
  const pageEnd = (obj: IntersectionObserverEntry[]) => {
    obj.forEach((entry) => {
      if (entry && entry.isIntersecting && entry.intersectionRatio > 0.5) {
        props.getImages();
      }
    });
  };

  return (
    <>
      <div style={props.classes.root}>
        {props.list.map((tile: ImageListItem_, index: number) => (
          <div
            style={props.classes.gridItem}
            key={index}
            onClick={() => {}}
            onKeyDown={() => props.openModal(tile)}
            role="button"
            tabIndex={0}
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
      {props.isLoading && (
        <div className="loading">
          <img height="100" alt="loading images" src={LoadingSvg} />
        </div>
      )}
      <InfiniteScollingContainer
        rootMargin={"100px 0px 0px 0px"}
        root={null}
        emit={pageEnd}
        threshold={[0.75]}
      />
    </>
  );
}
