import React, { DragEvent, RefObject } from "react";
import { chartSettings, pointSettings } from "../config";
import "../styles/point.css";
import { PointsType, PointType } from "../models";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import setPointValues from "../redux/action/point";

export const Point: React.FC<PointType> = ({ label, x, y, id }) => {
  const [{ axisX, axisY }, setOffset] = React.useState({ axisX: x, axisY: y });
  const pointRef: RefObject<HTMLDivElement> = React.useRef(null);
  const dispatch = useDispatch();
  const [points, setPoints] = React.useState<PointsType>(
    useSelector((state: RootStateOrAny) => state?.pointValues?.data) || []
  );

  const updatePoints = (point: PointType) => {
    points?.map((item: PointType) => {
      if (item.id === point.id) {
        item.x = point.x;
        item.y = point.y;
      }
    });
    dispatch(setPointValues([...points]));
  };

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
    }
    if (newAxisY < 0) newAxisY = 0;
    if (
      newAxisY >
      chartSettings.height -
        pointSettings.height -
        chartSettings.borderWidth -
        1
    ) {
      newAxisY =
        chartSettings.height -
        pointSettings.height -
        chartSettings.borderWidth -
        1;
    }
    setOffset({ axisX: newAxisX, axisY: newAxisY });
    updatePoints({ id, x: newAxisX, y: newAxisY, label });
  };

  return (
    <div
      ref={pointRef}
      className="container-point"
      style={{
        transform: `translate3d(${axisX}px, ${axisY}px, 0)`,
      }}
      draggable
      onDragEnd={onDragEnd}
    >
      <span className="label">{label}</span>
    </div>
  );
};
