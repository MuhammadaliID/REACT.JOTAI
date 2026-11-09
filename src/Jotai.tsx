import { useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect } from 'react'

import {
    getUsersAtom,
    usersAtom,
    addUserAtom,
    deleteUserAtom,
    editUserAtom
} from './Store/Jotai'

function Jotai() {

    // Получаем пользователей
    let users = useAtomValue(usersAtom)

    // Получаем функции
    let getUsers = useSetAtom(getUsersAtom)
    let addUser = useSetAtom(addUserAtom)
    let deleteUser = useSetAtom(deleteUserAtom)
    let editUser = useSetAtom(editUserAtom)

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <h1>My To-Do List</h1>

            {users.map((user) => (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.description}</p>

                    <button onClick={() => deleteUser(user.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Jotai