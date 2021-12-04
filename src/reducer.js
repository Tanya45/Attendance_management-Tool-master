import { auth } from "./firebase";

export const initialState = {
  user: null,
};

//SELECTOR

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "CLEAR_USER": {
      if (auth) auth.signOut();
      console.log("succesfully Logout");
      return {
        ...state,
        user: null,
      };
    }

    default:
      return state;
  }
};
export default reducer;
