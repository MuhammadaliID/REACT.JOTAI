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

  // ADD + EDIT
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

  // OPEN EDIT
  let handleEdit = (user) => {
    setEditingUser(user)

    reset({
      name: user.name,
      description: user.description
    })

    setOpen(true)
  }

  // CLOSE DIALOG
  let closeDialog = () => {
    setOpen(false)
    setEditingUser(null)
    reset()
  }

  return (
    <div className="container">

      <h1>My To-Do List</h1>

      <button onClick={() => {
        setEditingUser(null)
        reset()
        setOpen(true)
      }}>
        ADD
      </button>

      {/* DIALOG */}
      {open && (
        <div className="dialog">

          <form onSubmit={handleSubmit(submit)}>

            <h2>{editingUser ? "Edit To-Do" : "Add To-Do"}</h2>

            <input
              {...register("name")}
              placeholder="Name"
            />

            <input
              {...register("description")}
              placeholder="Description"
            />

            <input
              type="file"
              accept="image/*"
              {...register("image")}
            />

            <button type="submit">
              Save
            </button>

            <button
              type="button"
              onClick={closeDialog}
            >
              Cancel
            </button>

          </form>
        </div>
      )}

      {/* USERS */}
      {users.map((user) => (
        <div className="card" key={user.id}>

          <h1>{user.name}</h1>

          <p>{user.description}</p>

          {user.images?.map((image) => (
            <img
              key={image.id}
              src={`https://to-dos-api.softclub.tj/images/${image.imageName}`}
              alt={user.name}
              width="150"
            />
          ))}

          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>

          <button onClick={() => handleEdit(user)}>
            Edit
          </button>

        </div>
      ))}
      <Jotai></Jotai>
    </div>
  )
}



export default App