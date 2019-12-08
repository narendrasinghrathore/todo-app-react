import React from "react";
import { ImageListItem_ } from "../../../interfaces/ImageListItem";
import ImageLoader from "../../../shared/ImageLoading";
export default function ImageGridList(props: any) {
  return (
    <div className={props.classes.root}>
      {props.list.map((tile: ImageListItem_) => (
        <div
          className={props.classes.gridItem}
          key={tile.id}
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
  );
}
