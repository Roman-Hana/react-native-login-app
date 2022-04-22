import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./redux/userSlice";

export default configureStore({ reducer: { user: userReduser } });
