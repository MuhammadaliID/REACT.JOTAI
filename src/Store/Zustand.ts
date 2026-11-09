import axios from "axios";
import { create } from "zustand";




export const useData = create((set, get) => ({
    users: [],

    getUsers: async () => {
        try {
            let { data } = await axios.get("https://to-dos-api.softclub.tj/api/to-dos")

            set({ users: data.data })
        } catch (error) {
            console.log(error);

        }
    },

    deleteUser: async (id) => {
        try {
            await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos?id=${id}`)

            set((state) => ({
                users: state.users.filter((user) => user.id !== id)
            }))
        } catch (error) {
            console.log(error);

        }
    },


    addUser: async (user) => {
        try {
            await axios.post(`https://to-dos-api.softclub.tj/api/to-dos`, user)

            await get().getUsers()

        } catch (error) {
            console.log(error);
        }
    },

    // EDIT
    editUser: async (user) => {
        try {
            await axios.put(
                `https://to-dos-api.softclub.tj/api/to-dos`,
                user
            );

            await get().getUsers();

        } catch (error) {
            console.log(error);
        }
    }

}))