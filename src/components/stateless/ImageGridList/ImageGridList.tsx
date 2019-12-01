import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { ImageListItem_ } from '../../../interfaces/ImageListItem';
import ImageLoader from '../../../shared/ImageLoading';
export default function ImageGridList(props: any) {
  return (
    <div className={props.classes.root}>
      <GridList cellHeight={160} className={props.classes.gridList} cols={3}>
        {props.list.map((tile: ImageListItem_) => (
          <GridListTile
            key={tile.id}
            cols={1}
            onClick={() => props.openModal(tile)}
          >
            <ImageLoader src={`https://picsum.photos/id/${tile.id}/367/267`} alt={tile.author} />
            {/* <img
              src={`https://picsum.photos/id/${tile.id}/367/267`}
              alt={tile.author}
            /> */}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
