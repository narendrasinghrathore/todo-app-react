import React from "react";
import Slider from "@material-ui/core/Slider";
import { SliderInterface } from "../interfaces/SliderInterface";
export default function PrettoSliderComponent(props: SliderInterface) {
  const min = props.min || 10;
  const max = props.max || 50;
  const defaultValue = props.defaultValue || 20;
  const steps = props.steps || 10;
  const color = props.color || "primary";

  const valueText = (val: number) => {
    return `page limit is ${val}`;
  };
  return (
    <div className={props.root}>
      <Slider
        color={color}
        defaultValue={defaultValue}
        getAriaValueText={valueText}
        aria-labelledby="page size slider"
        step={steps}
        min={min}
        max={max}
        valueLabelDisplay="on"
        value={props.pageSize}
        onChangeCommitted={props.change}
        track="normal"
      />
    </div>
  );
}
