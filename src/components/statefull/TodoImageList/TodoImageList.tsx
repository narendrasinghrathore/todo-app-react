import React, { useEffect, useState, lazy } from "react";
import "./TodoImageList.css";
import AxiosHttp from "../../../utils/http.util";
import { ImageListItem_ } from "../../../interfaces/ImageListItem";
import { SimpleDialog } from "../../stateless/Dialog/Dialog";
import SuspenseContainer from "../../../shared/Loader/Loader";
/**
 * Lazy loading components
 */
const ImageGridList = lazy(() =>
  import("../../stateless/ImageGridList/ImageGridList")
);
const ImageListPaging = lazy(() =>
  import("../../stateless/ImageListPaging/ImageListPaging")
);
const ImageLoader = lazy(() => import("../../../shared/ImageLoading"));

export default function TodoImageList() {
  const imageGridStyletyle = {
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      height: "80vh",
      overflow: "auto",
      alignContent: " flex-start"
    },
    gridItem: {
      padding: 2
    }
  };
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

    return http.http(
      {
        method: "GET",
        url: `https://picsum.photos/v2/list?page=${pageNumber}&limit=${pageSizeLimit}`
      },
      (data: any) => {
        const { data: list } = data;
        setList(list);
      },
      (err: any) => {
        console.log(err);
      }
    );
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
    <>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        title={selectedValue["author"]}
      >
        <SuspenseContainer>
          <ImageLoader
            src={`https://picsum.photos/id/${selectedValue.id}/1280/720`}
            alt={selectedValue.author}
            width={1280}
            height={720}
          />
        </SuspenseContainer>
      </SimpleDialog>
      <SuspenseContainer>
        <ImageListPaging
          pageNumber={pageNumber}
          pageLimit={pageSizeLimit}
          updatePageSize={updatePageSize}
          pagePrevious={pagePreviousEvent}
          pageNext={pageNextEvent}
        />
      </SuspenseContainer>
      <SuspenseContainer>
        <ImageGridList
          list={list}
          classes={imageGridStyletyle}
          openModal={openModal}
        />
      </SuspenseContainer>
    </>
  );
}
