import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask, updateTask } from './store/slices/ToDoList'
// import { useParams } from "react-router-dom";



function App() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const toDo = useSelector((state) => state.toDo);

  const dispatch = useDispatch();
  console.log(toDo);
  // const existingTask = toDo.filter(t => t.id == id);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    if (editingId) {
      dispatch(updateTask({ id: editingId, title, desc, status }));
      setEditingId(null);
    } else {
      const newId = toDo.length > 0 ? toDo[toDo.length - 1].id + 1 : 1;
      dispatch(addTask({ id: newId, title, desc, status }));
    }
    setTitle("");
    setDesc("");
    setStatus(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    if (editingId === id) {
      setTitle('');
      setDesc('');
      setEditingId(null);
      setStatus(false);
    }
  }

  const handleEdit = (task) => {
    setTitle(task.title);
    setDesc(task.desc);
    setEditingId(task.id);
    setStatus(task.status);
  };


  return (
    <>
      <h1>Todo-List</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-grp'>
          <label>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='form-grp'>
          <label>Description</label>
          <input type="text" value={desc} onChange={e => setDesc(e.target.value)} />
        </div>
        <div className="form-grp">
          <label>Completed</label>
          <input type="checkbox" checked={status} onChange={() => setStatus(!status)} />

        </div>
        <button className='btn btn-success' style={{marginBottom:"20px"}}>{editingId ? "Update" : "Add"}</button>
      </form>
      <div>
        {/* <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Task</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              
              toDo.length> 0 ? (
                toDo.map((task, index) => (
                <tr key={index}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.desc}</td>
                  <td>{task.status ? "Completed" : "Pending"}</td>
                  <td>
                    <button className='btn btn-primary' style={{ marginRight: "10px" }} onClick={() => handleEdit(task)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(task.id)}>Delete</button>
                  </td>
                </tr>
              ))
              ) : (
                <p>No Todo's Found</p>
              )
            }
          </tbody>
        </table> */}
        {
          toDo.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {toDo.map((task, index) => (
                  <tr key={index}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.desc}</td>
                    <td>{task.status ? "Completed" : "Pending"}</td>
                    <td>
                      <button
                        className='btn btn-primary'
                        style={{ marginRight: "10px" }}
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </button>
                      <button
                        className='btn btn-danger'
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{textAlign:"center", fontSize:"20px"}}>No Todo's Found</p>
          )
        }

      </div>

    </>
  )
}

export default App

