
import './App.css'
import React, { useEffect, useState } from 'react'
import { useData } from './Store/Zustand'
import { useForm } from 'react-hook-form'
import Jotai from './Jotai'

function App() {
  let { users, getUsers, deleteUser, addUser, editUser } = useData()

  let [open, setOpen] = useState(false)
  let [editingUser, setEditingUser] = useState(null)

  let { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    getUsers()
  }, [])

  let submit = async (data) => {
    let formData = new FormData()

    formData.append("Name", data.name)
    formData.append("Description", data.description)

    if (data.image?.[0]) {
      formData.append("Images", data.image[0])
    }

    if (editingUser) {
      await editUser(editingUser.id, formData)
    } else {
      await addUser(formData)
    }

    reset()
    setEditingUser(null)
    setOpen(false)
  }

  let handleEdit = (user) => {
    setEditingUser(user)

    reset({
      name: user.name,
      description: user.description
    })

    setOpen(true)
  }

  let closeDialog = () => {
    setOpen(false)
    setEditingUser(null)
    reset()
  }

  return (
    <div className="container">

      <header className="header">
        <div>
          <h1>My To-Do List</h1>
          <p>Manage your tasks in one place.</p>
        </div>

        <button className="add-btn" onClick={() => {
          setEditingUser(null)
          reset()
          setOpen(true)
        }}>
          + Add Task
        </button>
      </header>

      {open && (
        <div className="dialog">

          <form className="dialog-content" onSubmit={handleSubmit(submit)}>

            <div className="dialog-header">
              <h2>{editingUser ? "Edit To-Do" : "Create To-Do"}</h2>
              <p>Enter your task information below.</p>
            </div>

            <label>Name</label>
            <input
              {...register("name")}
              placeholder="Enter task name"
              required
            />

            <label>Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter description"
              required
            />

            <label>Image</label>
            <input
              className="file-input"
              type="file"
              accept="image/*"
              {...register("image")}
            />

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={closeDialog}>
                Cancel
              </button>

              <button type="submit" className="save-btn">
                {editingUser ? "Save changes" : "Create task"}
              </button>
            </div>

          </form>
        </div>
      )}

      <div className="users">

        {users.map((user) => (
          <div className="card" key={user.id}>

            {user.images?.map((image) => (
              <img
                className="task-image"
                key={image.id}
                src={`https://to-dos-api.softclub.tj/images/${image.imageName}`}
                alt={user.name}
              />
            ))}

            <div className="card-content">
              <h2>{user.name}</h2>
              <p>{user.description}</p>

              <div className="card-actions">
                <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>

                <button className="edit-btn" onClick={() => handleEdit(user)}>
                  Edit
                </button>
              </div>
            </div>

          </div>
        ))}

      </div>

      <Jotai />

    </div>
  )
} 

export default App
