import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/axiosInstance";
import { toast } from "react-hot-toast";

export interface IuserDetails {
  _id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: number;
}

interface Istate {
  users: IuserDetails[];
  loading: boolean;
}

const initialState: Istate = {
  users: [],
  loading: false,
};

// function to get all users
export const getAllUsers = createAsyncThunk("user/get/all", async () => {
  try {
    const res = await axiosInstance.get("/users");
    return res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
});

// function to get all users
export const getIndividualUser = createAsyncThunk(
  "/user",
  async (userID: string) => {
    try {
      const res = await axiosInstance.get(`/user/${userID}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        if (action?.payload) {
          state.users = action?.payload?.data as IuserDetails[];
        }
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state) => {
        toast.error("Failed to load all users data");
        state.loading = false;
      })

      // for get individual users
      .addCase(getIndividualUser.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getIndividualUser.rejected, () => {
        toast.error("Failed to load user data");
      });
  },
});

// export const { } = userSlice.actions;
export default userSlice.reducer;
