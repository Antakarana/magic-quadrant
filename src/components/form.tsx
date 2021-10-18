import React from "react";
import { Input } from "./index";
import "../styles/form.css";
import { chartSettings, pointSettings } from "../config";
import { PointsType, PointType } from "../models";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  addPointAction,
  deletePointAction,
  updatePointAction,
} from "../redux/action/point";

const Form: React.FC<{ data?: PointsType }> = () => {
  const points = useSelector(
    (state: RootStateOrAny) => state?.pointValues?.data
  );
  let flag = false;

  const dispatch = useDispatch();

  const onPointAdd = () => {
    points?.map((item: PointType, index: number) => {
      if (
        item.x < 0 ||
        item.x >
          chartSettings.width -
            pointSettings.width -
            chartSettings.borderWidth -
            1
      ) {
        flag = true;
        alert(
          `X must be between 0 and ${
            chartSettings.width -
            pointSettings.width -
            chartSettings.borderWidth -
            1
          }`
        );
        return;
      } else if (
        item.y < 0 ||
        item.y >
          chartSettings.height -
            pointSettings.height -
            chartSettings.borderWidth -
            1
      ) {
        flag = true;
        alert(
          `Y must be between 0 and ${
            chartSettings.height -
            pointSettings.height -
            chartSettings.borderWidth -
            1
          }`
        );
        return;
      } else flag = false;
    });

    !flag && dispatch(addPointAction());
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

  const onPointDelete = (pointId: number) => {
    dispatch(deletePointAction(pointId));
  };

  return (
    <div className="container-form">
      <button className="btn" onClick={onPointAdd}>
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
              onPointChange(point, "label", event.target.value)
            }
            type="text"
            placeHolder="New"
            value={point.label}
          />
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onPointChange(point, "x", Number(event.target.value))
            }
            type="number"
            placeHolder="50"
            value={point.x}
          />
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onPointChange(point, "y", event.target.value)
            }
            type="number"
            placeHolder="50"
            value={point.y}
          />
          <button onClick={() => onPointDelete(point.id)} className="btn">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export { Form };
