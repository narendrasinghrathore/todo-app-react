import React, { useEffect, useState, lazy, Suspense } from "react";
import "./TodoImageList.css";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import AxiosHttp from "../../../utils/http.util";
import { ImageListItem_ } from "../../../interfaces/ImageListItem";
import { SimpleDialog } from "../../stateless/Dialog/Dialog";
const ImageGridList = lazy(() =>
  import("../../stateless/ImageGridList/ImageGridList")
);
const ImageListPaging = lazy(() =>
  import("../../stateless/ImageListPaging/ImageListPaging")
);
const ImageLoader = lazy(() => import("../../../shared/ImageLoading"));
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      height: "60vh",
      overflow: "auto",
      alignContent: "space-between",
      backgroundColor: theme.palette.background.paper
    },
    gridItem: {
     margin:'10px'
    }
  })
);
export default function TodoImageList() {
  const classes = useStyles();
  let [list, setList] = useState([]);

  let [pageSizeLimit, setPageSizeLimit] = useState(10);

  const [pageNumber, setPageNumber] = useState(1);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<ImageListItem_>({
    author: "None"
  });

  const handleClose = () => {
    setOpen(false);
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
    setSelectedValue(item);
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
    <Suspense fallback={<div className="loading">Loading ....</div>}>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        title={selectedValue["author"]}
      >
        <ImageLoader
          src={`https://picsum.photos/id/${selectedValue.id}/1280/720`}
          alt={selectedValue.author}
          width={1280}
          height={720}
        />
      </SimpleDialog>
      <ImageListPaging
        pageNumber={pageNumber}
        pageLimit={pageSizeLimit}
        updatePageSize={updatePageSize}
        pagePrevious={pagePreviousEvent}
        pageNext={pageNextEvent}
      />
      <ImageGridList list={list} classes={classes} openModal={openModal} />
    </Suspense>
  );
}
