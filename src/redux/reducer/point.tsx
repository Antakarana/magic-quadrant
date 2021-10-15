const pointValues = ( state = {}, action: { type: string; payload: string } ) => {

  switch (action.type) {
    case "SET_POINT_VALUES":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default pointValues;
