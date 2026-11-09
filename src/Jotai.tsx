
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
    getUsersAtom,
    usersAtom,
    addUserAtom,
    deleteUserAtom,
    editUserAtom
} from "./Store/Jotai";

function Jotai() {

    let users = useAtomValue(usersAtom);

    let getUsers = useSetAtom(getUsersAtom);
    let addUser = useSetAtom(addUserAtom);
    let deleteUser = useSetAtom(deleteUserAtom);
    let editUser = useSetAtom(editUserAtom);

    let [open, setOpen] = useState(false);
    let [editingUser, setEditingUser] = useState(null);

    let { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        getUsers();
    }, []);

   
    function openAdd() {
        setEditingUser(null);
        reset({
            name: "",
            description: ""
        });
        setOpen(true);
    }

    
    function openEdit(user) {
        setEditingUser(user);
        reset({
            name: user.name,
            description: user.description
        });
        setOpen(true);
    }

    // ADD + EDIT
    async function saveUser(data) {

        if (editingUser) {
            await editUser({
                id: editingUser.id,
                ...data
            });
        } else {
            await addUser(data);
        }

        setOpen(false);
        reset();
    }

    return (
        <div>

            <h1>My To-Do List</h1>

            <button onClick={openAdd}>
                Add User
            </button>

            {users.map((user) => (
                <div key={user.id}>

                    <h2>{user.name}</h2>
                    <p>{user.description}</p>

                    <button onClick={() => deleteUser(user.id)}>
                        Delete
                    </button>

                    <button onClick={() => openEdit(user)}>
                        Edit
                    </button>

                </div>
            ))}

            {open && (
                <div>

                    <h2>
                        {editingUser ? "Edit User" : "Add User"}
                    </h2>

                    <form onSubmit={handleSubmit(saveUser)}>

                        <input
                            {...register("name")}
                            placeholder="Name"
                        />

                        <input
                            {...register("description")}
                            placeholder="Description"
                        />

                        <button type="submit">
                            {editingUser ? "Save" : "Add"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>

                    </form>

                </div>
            )}

        </div>
    );
}

export default Jotai;
