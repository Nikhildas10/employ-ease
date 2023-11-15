
import { createSlice } from "@reduxjs/toolkit";
import { employee } from "../data/data";
export const employeeDetail = createSlice({
  name: "employee",
  initialState: employee,
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, name, gmail,photo, department, status, position } = action.payload;
      const uu = state.find((user) => user.id == id);
      if (uu) {
        uu.name = name;
        uu.gmail = gmail;
        uu.department = department;
        uu.photo=photo
        uu.status = status;
        uu.position = position;
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const uu = state.find((user) => user.id == id);
      if (uu) {
        return state.filter((f) => f.id !== id);
      }
    },
    
  }
});

export default employeeDetail.reducer
export const {addEmployee,updateUser,deleteUser}=employeeDetail.actions