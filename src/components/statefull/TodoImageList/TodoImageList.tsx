import React, { useState, lazy } from "react";
import "./TodoImageList.css";
import AxiosHttp from "../../../utils/http.util";
import { ImageListItem_ } from "../../../interfaces/ImageListItem";
import { SimpleDialog } from "../../stateless/Dialog/Dialog";
import SuspenseContainer from "../../../shared/Loader/Loader";
import styled from "styled-components";
// Component to pass SVG and use as IconButton
import CustomSvgIconButton from "../../../shared/CustomSvg/CustomSvg";

// SVG imports
import HdDownloadSvg from "../../../assets/hd.svg";
/**
 * Lazy loading components
 */
const ImageGridList = lazy(() =>
  import("../../stateless/ImageGridList/ImageGridList")
);
const ImageLoader = lazy(() => import("../../../shared/ImageLoading"));

const P = styled.p`
  margin: 10px;
`;

const A = styled.a`
  cursor: pointer;
  text-decoration: underline;
`;

export default function TodoImageList() {
  const imageGridStyletyle = {
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignContent: " flex-start",
      minHeight: "50vh"
    },
    gridItem: {
      padding: 2
    }
  };
  const [list, setList] = useState([]);

  const [isProgress, setIsProgress] = useState(false);

  const pageSizeLimit = 10;

  const [pageNumber, setPageNumber] = useState(0);

  const [imagesLoadingError, setImagesLodingError] = useState(false);

  const [open, setOpen] = React.useState(false);

  const [selectedValue, setSelectedValue] = React.useState<ImageListItem_>({
    author: "None"
  });

  const handleClose = () => {
    setOpen(false);
  };

  const openModal = (item: ImageListItem_) => {
    setOpen(true);
    setSelectedValue(item);
  };

  const pageNextEvent = () => {
    if (isProgress) return;
    setPageNumber(pageNumber + 1);
    GetImages(pageNumber, pageSizeLimit);
  };

  //on download button click
  const downloadImage = (quality: string) => {
    if (!selectedValue.download_url) return;
    const a = document.createElement("a");
    a.download = `${selectedValue.author}.jpg`;
    a.target = "blank";
    a.href = selectedValue.download_url;
    a.click();
  };

  const dialogHeader = () => {
    return (
      <>
        {selectedValue["author"]}
        <CustomSvgIconButton
          click={() => downloadImage("fullhd")}
          src={HdDownloadSvg}
          alt="Download image in HD quality"
        />
      </>
    );
  };

  // Get a specific image by adding /id/{image} to the start of the url.
  // https://picsum.photos/id/1020/367/267
  return (
    <>
      {imagesLoadingError ? (
        <P>
          We are facing some network error,{" "}
          <A onClick={() => pageNextEvent()}>click here to try again</A>
        </P>
      ) : (
        <>
          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            title={dialogHeader()}
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
            <ImageGridList
              getImages={() => pageNextEvent()}
              list={list}
              classes={imageGridStyletyle}
              openModal={openModal}
              isLoading={isProgress}
            />
          </SuspenseContainer>
        </>
      )}
    </>
  );

  function GetImages(pageNumber: number, pageSizeLimit: number) {
    setImagesLodingError(false);
    setIsProgress(true);
    const http = new AxiosHttp();

    return http.request(
      {
        method: "GET",
        url: `https://picsum.photos/v2/list?page=${pageNumber}&limit=${pageSizeLimit}`
      },
      (data: any) => {
        const { data: imagesList } = data;
        setList(list.concat(...imagesList));
        setIsProgress(false);
      },
      (err: any) => {
        setImagesLodingError(true);
        console.log(err);
        setIsProgress(false);
      }
    );
  }
}
