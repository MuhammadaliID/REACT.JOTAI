import axios from "axios";
import { atom } from "jotai";


type User = {
    id: number;
    name: string;
    description: string;
};


export let usersAtom = atom<User[]>([]);

// GET
export let getUsersAtom = atom(null, async (get, set) => {
    try {
        let { data } = await axios.get(
            "https://to-dos-api.softclub.tj/api/to-dos"
        );

        set(usersAtom, data.data);

    } catch (error) {
        console.log(error);
    }
});

// DELETE
export let deleteUserAtom = atom(null, async (get, set, id: number) => {
    try {
        await axios.delete(
            `https://to-dos-api.softclub.tj/api/to-dos?id=${id}`
        );

        set(usersAtom, get(usersAtom).filter((user) => user.id !== id));

    } catch (error) {
        console.log(error);
    }
});

// ADD
export let addUserAtom = atom(null, async (get, set, user: FormData) => {
    try {
        await axios.post(
            "https://to-dos-api.softclub.tj/api/to-dos",
            user
        );

        let { data } = await axios.get(
            "https://to-dos-api.softclub.tj/api/to-dos"
        );

        set(usersAtom, data.data);

    } catch (error) {
        console.log(error);
    }
});

// EDIT
export let editUserAtom = atom(
    null,
    async (get, set, { id, user }: { id: number; user: FormData }) => {
        try {
            await axios.put(
                `https://to-dos-api.softclub.tj/api/to-dos?id=${id}`,
                user
            );

            let { data } = await axios.get(
                "https://to-dos-api.softclub.tj/api/to-dos"
            );

            set(usersAtom, data.data);

        } catch (error) {
            console.log(error);
        }
    }
);