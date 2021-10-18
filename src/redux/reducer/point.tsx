import { PointsType } from "../../models";

type PointReducer = {
  data: PointsType[];
  nextId: number;
};

const initialState: PointReducer = {
  data: [],
  nextId: 1,
};

const pointValues = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "ADD_NEW_POINT": {
      return {
        ...state,
        data: [
          ...state.data,
          {
            label: "New",
            x: 192,
            y: 192,
            id: state.nextId,
          },
        ],
        nextId: state.nextId + 1,
      };
    }
    case "UPDATE_POINT":
      return {
        ...state,
        data: state.data.map((point) => {
          //@ts-ignore
          if (point.id === action.payload.id) {
            return action.payload;
          }
          return point;
        }),
      };
    case "DELETE_POINT":
      return {
        ...state,
        //@ts-ignore
        data: state.data.filter((point) => point.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default pointValues;
