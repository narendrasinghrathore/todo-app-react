import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

export function TodoListItem(props: any) {
  const config = useSpring({ opacity: 1, from: { opacity: 0 } });
  const ListItem = styled.li`
    border: 2px solid palevioletred;
    border-radius: 3px;
    margin: 2px auto;
    list-style: none;
    text-align: left;
    padding-left: 3px;
  `;
  const name = props.name;
  return (
    <animated.div style={config}>
      <ListItem>{name}</ListItem>
    </animated.div>
  );
}
