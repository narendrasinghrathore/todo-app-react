import React, { Fragment, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import PrettoSliderComponent from "../../../shared/PrettoSlider";
import { MyThemeContext } from "../../../context/ThemeManager";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300 + theme.spacing(3) * 2
    },
    margin: {
      height: theme.spacing(3)
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      margin: 7,
      boxShadow: "0 0 8px 2px #dedede",
      borderRadius: "2px"
    }
  })
);

export default function ImageListPaging(props: any) {
  const classes = useStyles();
  const [pageSize, setPageSize] = useState(props.pageLimit);
  const pageSizeChange = (event: any, val: number) => {
    setPageSize(val);
    props.updatePageSize(val);
  };

  return (
    <div className={classes.container}>
      <MyThemeContext.Consumer>
        {value => (
          <Fragment>
            Page: {props.pageNumber}
            <IconButton
              disabled={props.pageNumber === 1}
              onClick={props.pagePrevious}
              aria-label="previous page"
              color={value.color}
            >
              <ArrowBackOutlinedIcon />
            </IconButton>
            <PrettoSliderComponent
              color={value.color}
              change={pageSizeChange}
              root={classes.root}
              pageSize={pageSize}
            />
            <IconButton
              aria-label="next page"
              onClick={props.pageNext}
              color={value.color}
            >
              <ArrowForwardOutlinedIcon />
            </IconButton>
          </Fragment>
        )}
      </MyThemeContext.Consumer>
    </div>
  );
}
