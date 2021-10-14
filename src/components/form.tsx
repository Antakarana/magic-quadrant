import React, { useState } from "react";
import { Input } from "./index";
import "../styles/form.css";
import { chartSettings, pointSettings } from "../config";
import { PointsType, PointType } from "../models";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import setPointValues from "../redux/action/point";

const Form: React.FC = () => {
  const [label, setLabel] = useState<string>("");
  const [axisX, setAxisX] = useState<number>(0);
  const [axisY, setAxisY] = useState<number>(0);
  const [points, setPoints] = React.useState<PointsType>(
    useSelector((state: RootStateOrAny) => state?.pointValues?.data) || [
      { id: 0, label: "New", x: 50, y: 50 },
    ]
  );
  const dispatch = useDispatch();

  const submit = () => {
    if (!label || !axisX || !axisY) {
      alert("Please fill in the reqired fields");
      return;
    }
    if (
      axisX < 0 ||
      axisX >
        chartSettings.width -
          pointSettings.width -
          chartSettings.borderWidth -
          1
    ) {
      alert(
        `X must be between 0 and ${
          chartSettings.width -
          pointSettings.width -
          chartSettings.borderWidth -
          1
        }`
      );
      return;
    }

    if (
      axisY < 0 ||
      axisY >
        chartSettings.height -
          pointSettings.height -
          chartSettings.borderWidth -
          1
    ) {
      alert(
        `Y must be between 0 and ${
          chartSettings.height -
          pointSettings.height -
          chartSettings.borderWidth -
          1
        }`
      );

      return;
    }
    addPoint({
      id: -1,
      label: label,
      x: axisX,
      y: axisY,
    });
  };

  const addPoint = (point: PointType) => {
    const maxId = points.reduce(
      (acc, item) => (acc = acc > item.id ? acc : item.id),
      0
    );
    point.id = maxId + 1;

    setPoints([...points, point]);
    dispatch(setPointValues(points));
  };

  const deletePoint = (point: PointType) => {
    console.log("point delete an ", point);

    const pointValues = points.filter(
      (item: PointType) => item.id !== point.id
    );

    // if (index > -1) {
    //   points.splice(index, 1);
    // }
    // console.log("--- ", points);
    console.log("ddf ", pointValues);
    setPoints(pointValues);
    dispatch(setPointValues(points));
  };

  return (
    <div className="container-form">
      <button className="btn" onClick={() => submit()}>
        Add
      </button>
      <div className="field-label">
        <span>Label</span>
        <span>Vision</span>
        <span>Ability</span>
        <span>Delete</span>
      </div>
      {points?.map((point: PointType, index: number) => (
        <div className="field-input" key={point.id}>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setLabel(event.target.value)
            }
            type="text"
            placeHolder="New"
          />
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAxisX(Number(event.target.value))
            }
            type="number"
            placeHolder="50"
          />
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAxisY(Number(event.target.value))
            }
            type="number"
            placeHolder="50"
          />
          <button onClick={() => deletePoint(point)} className="btn-delete">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export { Form };
