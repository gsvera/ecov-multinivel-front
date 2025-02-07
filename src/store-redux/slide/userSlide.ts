import { createSlice } from "@reduxjs/toolkit";

type dataUserProps = {
    id: string | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
}

export type userStateProps = {
    token: string | null;
    dataUser: dataUserProps;
}

const initialState: userStateProps = {
  token: null,
  dataUser: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    // permissionXProfiles: [],
  },
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // setIdUser: (state, action) => {
    //   state.dataUser.idUser = action.payload;
    // },
    // setDataUser: (state, action) => {
    //   state.dataUser = action.payload;
    // },
  },
});

export const { setToken /** , setDataUser, setIdUser */ } = userSlice.actions;

export default userSlice.reducer;
