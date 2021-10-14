import { PointsType } from "../../models";

const setPointValues = (data: PointsType) => {
  return {
    type: "SET_POINT_VALUES",
    payload: data,
  };
};

export default setPointValues;
