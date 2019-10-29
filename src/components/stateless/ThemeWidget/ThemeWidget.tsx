import { IconButton } from "@material-ui/core";
import OpacityTwoToneIcon from "@material-ui/icons/OpacityTwoTone";
import styled from "styled-components";
import React from "react";
import { IThemes } from "../../../interfaces/Themes";

export function ThemeWidget(props: any) {
  const Div = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
  `;
  let list = props.themes.map((theme: IThemes) => {
    return (
      <IconButton
        key={theme.label}
        aria-label={theme.label}
        color={theme.color}
        onClick={e => props.changeTheme(theme)}
      >
        <OpacityTwoToneIcon />
      </IconButton>
    );
  });
  return <Div>{list}</Div>;
}
