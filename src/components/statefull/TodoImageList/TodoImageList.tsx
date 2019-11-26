import React, { Fragment, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AxiosHttp from '../../../utils/http.util';
import { ImageListItem_ } from '../../../interfaces/ImageListItem';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: 500,
      height: 450
    }
  })
);
export default function TodoImageList() {
  const http = new AxiosHttp();
  const classes = useStyles();
  let list: ImageListItem_[] = [];

  useEffect(() => {
    http
      .http({
        method: 'GET',
        url: 'https://picsum.photos/v2/list'
      })
      .then(data => {
        list = data['data'] as ImageListItem_[];
        console.log(list);
      });
  });

  return (
    <Fragment>
      <h1>Images</h1>
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {list.map((item: ImageListItem_) => (
            <GridListTile key={item.id} cols={1}>
              <img
                src={item.download_url}
                alt={item.author}
                width={item.width}
                height={item.height}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Fragment>
  );
}
