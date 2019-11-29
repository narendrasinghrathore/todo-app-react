import React, { Fragment, useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import AxiosHttp from '../../../utils/http.util';
import { ImageListItem_ } from '../../../interfaces/ImageListItem';
import { SimpleDialog } from '../../stateless/Dialog/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageGridList from '../../stateless/ImageGridList/ImageGridList';
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
      width: '98vw',
      height: '40vh'
    }
  })
);
export default function TodoImageList() {
  const http = new AxiosHttp();
  const classes = useStyles();
  let [list, setList] = useState([]);

  const [imageLoading, setImageLoading] = useState(false);

  let limit = 10;

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<ImageListItem_>({
    author: 'None'
  });

  const handleClose = () => {
    setOpen(false);
    setImageLoading(false);
  };

  useEffect(() => {
    http
      .http({
        method: 'GET',
        url: `https://picsum.photos/v2/list?limit=${limit}`
      })
      .then(data => {
        const { data: list } = data;
        setList(list);
      });
  });

  const openModal = (item: ImageListItem_) => {
    setOpen(true);
    setImageLoading(true);
    setSelectedValue(item);
  };

  const loadImage = () => {
    setImageLoading(false);
  };

  // Get a specific image by adding /id/{image} to the start of the url.
  // https://picsum.photos/id/1020/367/267
  return (
    <Fragment>
      <h1>Images</h1>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        title={selectedValue['author']}
        loading={imageLoading}
      >
        {
          <>
            <img
              onLoad={loadImage}
              alt={selectedValue.author}
              src={`https://picsum.photos/id/${selectedValue.id}/1280/720`}
            />
            {imageLoading && <CircularProgress />}
          </>
        }
      </SimpleDialog>
      <ImageGridList list={list} classes={classes} openModal={openModal} />
    </Fragment>
  );
}
