import { configureStore } from '@reduxjs/toolkit'
import ToDoList from './slices/ToDoList'

const store = configureStore({
  reducer:{
    toDo: ToDoList
  }
});

export default store;