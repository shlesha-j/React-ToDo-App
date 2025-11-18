import { createSlice } from "@reduxjs/toolkit";
import { todoTask } from "../../Data";


const ToDoList = createSlice({
    name: "toDo",
    initialState: todoTask,
    reducers: {
        addTask: (state, action) => {
            state.push({ ...action.payload, status: action.payload.status || false, })
        },
        deleteTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        },
        updateTask: (state, action) => {
            const { id, title, desc, status } = action.payload;
            const existingTask = state.find((task) => task.id === id);
            if (existingTask) {
                existingTask.title = title;
                existingTask.desc = desc;
                existingTask.status = status;

                // if (status !== undefined) {
                //     existingTask.status = status;
                // }
            }
        },
        // toggleStatus: (state, action) => {
        //     const task = state.find(task => task.id === action.payload);
        //     if (task) {
        //         task.status = task.status === "Pending" ? "Completed" : "Pending";
        //     }
        // },
    }
});

export const { addTask, deleteTask, updateTask} = ToDoList.actions;
export default ToDoList.reducer;