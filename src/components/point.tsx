import React, { DragEvent } from "react";
import { chartSettings, pointSettings } from "../config";
import "../styles/point.css";
import { PointType } from "../models";
import { useDispatch } from "react-redux";
import { updatePointAction } from "../redux/action/point";

export const Point: React.FC<PointType> = ({ label, x, y, id }) => {
  const dispatch = useDispatch();
  let flag = false;

  const onDragEnd = (e: DragEvent) => {
    e.preventDefault();

    let newAxisX = e.pageX;
    let newAxisY = e.pageY;

    if (newAxisX < 0) newAxisX = 0;

    if (
      newAxisX >
      chartSettings.width - pointSettings.width - chartSettings.borderWidth - 1
    ) {
      newAxisX =
        chartSettings.width -
        pointSettings.width -
        chartSettings.borderWidth -
        1;
      flag = true;
    }
    else flag = false;
    if (newAxisY < 0) newAxisY = 0;
    if (
      newAxisY >
      chartSettings.height -
      pointSettings.height -
      chartSettings.borderWidth -
      1
    )
    {
      newAxisY =
        chartSettings.height -
        pointSettings.height -
        chartSettings.borderWidth -
        1;
      flag = true;
    }
    else flag = false;

    const newPoint = {
      id: id,
      x: newAxisX-70,
      y: newAxisY-15,
      label: label,
    };

   !flag && onPointChange(newPoint, "x", Number(e.nativeEvent.pageX));
   !flag && onPointChange(newPoint, "y", Number(e.nativeEvent.pageY));
  };

  const onPointChange = (
    point: PointType,
    prop: string,
    value: number | string
  ) => {
    const newPoint = {
      ...point,
      [prop]: value,
    };

    dispatch(updatePointAction(newPoint));
  };

  return (
    <div
      className="container-point"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
      draggable
      onDragEnd={onDragEnd}
    >
      <span className="label">{label}</span>
    </div>
  );
};
