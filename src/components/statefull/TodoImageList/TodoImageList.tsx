import React, { Fragment, useEffect, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import AxiosHttp from "../../../utils/http.util";
import { ImageListItem_ } from "../../../interfaces/ImageListItem";
import { SimpleDialog } from "../../stateless/Dialog/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import ImageGridList from "../../stateless/ImageGridList/ImageGridList";
import ImageListPaging from "../../stateless/ImageListPaging/ImageListPaging";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: "98vw",
      height: "60vh"
    }
  })
);
export default function TodoImageList() {
  const classes = useStyles();
  let [list, setList] = useState([]);

  const [imageLoading, setImageLoading] = useState(false);

  let [pageSizeLimit, setPageSizeLimit] = useState(10);

  const [pageNumber, setPageNumber] = useState(1);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<ImageListItem_>({
    author: "None"
  });

  const handleClose = () => {
    setOpen(false);
    setImageLoading(false);
  };

  useEffect(() => {
    const http = new AxiosHttp();
    http
      .http({
        method: "GET",
        url: `https://picsum.photos/v2/list?page=${pageNumber}&limit=${pageSizeLimit}`
      })
      .then(data => {
        const { data: list } = data;
        setList(list);
      });
  }, [pageSizeLimit, pageNumber]);

  const openModal = (item: ImageListItem_) => {
    setOpen(true);
    setImageLoading(true);
    setSelectedValue(item);
  };

  const loadImage = () => {
    setImageLoading(false);
  };

  const updatePageSize = (val: number) => {
    setPageSizeLimit(val);
  };

  const pagePreviousEvent = () => {
    const page = pageNumber > 1 ? -1 : 0;
    setPageNumber(pageNumber + page);
  };

  const pageNextEvent = () => {
    setPageNumber(pageNumber + 1);
  };

  // Get a specific image by adding /id/{image} to the start of the url.
  // https://picsum.photos/id/1020/367/267
  return (
    <Fragment>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        title={selectedValue["author"]}
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
      <ImageListPaging
        pageNumber={pageNumber}
        pageLimit={pageSizeLimit}
        updatePageSize={updatePageSize}
        pagePrevious={pagePreviousEvent}
        pageNext={pageNextEvent}
      />
      <ImageGridList list={list} classes={classes} openModal={openModal} />
    </Fragment>
  );
}
