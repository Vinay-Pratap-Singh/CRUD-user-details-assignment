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

// function to get individual users
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

// function to add new user
export const addNewUser = createAsyncThunk(
  "/newuser",
  async (data: IuserDetails) => {
    try {
      const res = await axiosInstance.post("user/create", {
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber,
        age: Number(data?.age),
      });
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to update user
export const updateUser = createAsyncThunk(
  "/updateuser",
  async (data: IuserDetails) => {
    try {
      const res = await axiosInstance.patch(`user/${data?._id}`, {
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber,
        age: Number(data?.age),
      });
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to delete user
export const deleteUser = createAsyncThunk(
  "/userdelete",
  async (userID: string) => {
    try {
      const res = await axiosInstance.delete(`/user/${userID}`);
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
      .addCase(getIndividualUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIndividualUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getIndividualUser.rejected, (state) => {
        toast.error("Failed to load user data");
        state.loading = false;
      })

      // for add new user
      .addCase(addNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        if (action?.payload) {
          toast.success(action?.payload?.message);
        }
        state.loading = false;
      })
      .addCase(addNewUser.rejected, (state) => {
        toast.error("Failed to add user");
        state.loading = false;
      })

      // for update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action?.payload) {
          toast.success(action?.payload?.message);
        }
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        toast.error("Failed to update user");
        state.loading = false;
      })

      // for delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (action?.payload) {
          toast.success(action?.payload?.message);
        }
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        toast.error("Failed to delete user");
        state.loading = false;
      });
  },
});

// export const { } = userSlice.actions;
export default userSlice.reducer;
