import React, { useState, useEffect } from "react";
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
    useSelector((state: RootStateOrAny) => state?.pointValues?.data) || []
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
      label: label,
      x: axisX,
      y: axisY,
      id: -1,
    });
  };

  const addPoint = async ( point: PointType ) => {
    const maxId = points.reduce(
      (acc, item) => (acc = acc > item.id ? acc : item.id),
      0
    );
    point.id = maxId + 1;
    setLabel( "" );
    setAxisX( 0 );
    setAxisY( 0 );
    points.push(point);
    setPoints([...points]);
    dispatch( setPointValues( points ) );
  };

  const deletePoint = async (point: PointType) => {
    const pointValues = points.filter(
      (item: PointType) => item.id !== point.id
    );
    setPoints([...pointValues]);
    dispatch( setPointValues( pointValues ) );
  };

  return (
    <div className="container-form">
      <div className="field-label">
        <span>Label</span>
        <span>Vision</span>
        <span>Ability</span>
        <span>Delete</span>
      </div>
      <div className="field-input">
        <Input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setLabel(event.target.value)
          }
          type="text"
          placeHolder="New"
          isDisabled={false}
          value={label}
        />
        <Input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setAxisX(Number(event.target.value))
          }
          type="number"
          placeHolder="50"
          isDisabled={false}
          value={axisX}
        />
        <Input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setAxisY(Number(event.target.value))
          }
          type="number"
          placeHolder="50"
          isDisabled={false}
          value={axisY}
        />
        <button className="btn" onClick={() => submit()}>
          Add
        </button>
      </div>
      {points?.map((point: PointType, index: number) => (
        <div className="field-input" key={point.id}>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setLabel(event.target.value)
            }
            type="text"
            placeHolder="New"
            isDisabled={true}
            value={point.label}
          />
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAxisX(Number(event.target.value))
            }
            type="number"
            placeHolder="50"
            isDisabled={true}
            value={point.x}
          />
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAxisY(Number(event.target.value))
            }
            type="number"
            placeHolder="50"
            isDisabled={true}
            value={point.y}
          />
          <button onClick={() => deletePoint(point)} className="btn">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export { Form };
