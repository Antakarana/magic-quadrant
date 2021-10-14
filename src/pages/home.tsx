import React from "react";
import { Chart, Form, Point } from "../components";
import "../styles/home.css";
import { PointType } from "../models";
import { DefaultRootState, RootStateOrAny, useSelector } from "react-redux";

const Home: React.FC = () => {
  const points = useSelector(
    (state: RootStateOrAny) => state?.pointValues?.data
  );

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
      {console.log("ddd ", points)}
      <Form />
    </div>
  );
};

export { Home };
