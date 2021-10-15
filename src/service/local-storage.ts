import { PointsType } from "../models";

export const getPointsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("points") as any) as PointsType;
};

export const addPointsToLocalStorage = (points: PointsType) => {
  localStorage.setItem("points", JSON.stringify(points));
};