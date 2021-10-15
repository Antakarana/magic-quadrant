import React from "react";
import { Chart, Form, Point } from "../components";
import "../styles/home.css";
import { PointType } from "../models";
import { RootStateOrAny, useSelector } from "react-redux";

const Home: React.FC = () => {
  let points =
    useSelector((state: RootStateOrAny) => state?.pointValues?.data) || [];

  return (
    <div className="container-home">
      <Chart>
        {points?.map((point: PointType, index: number) => (
          <Point
            key={index}
            id={point.id}
            x={point.x}
            y={point.y}
            label={point.label}
          />
        ))}
      </Chart>
      <Form />
    </div>
  );
};

export { Home };
