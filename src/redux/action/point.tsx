import { PointType } from "../../models";

export const addPointAction = () => {
  return {
    type: "ADD_NEW_POINT",
  };
};

export const updatePointAction = (data: PointType) => {
  return {
    type: "UPDATE_POINT",
    payload: data,
  };
};

export const deletePointAction = (pointId: number) => {
  return {
    type: "DELETE_POINT",
    payload: {
      id: pointId,
    },
  };
};
