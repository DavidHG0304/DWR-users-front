import { useEffect, useState } from 'react';
import type { User, UserResponse } from '../types/User.type';
import HttpClient from '../utils/HttpClient';

const httpClient = new HttpClient();

const useGetUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    const getUsers = () => {
        httpClient
            .get("users/all")
            .then((response) => {
                response
                    .json()
                    .then((data: UserResponse) => {
                        console.log("Usuarios:", data);
                        setUsers(data.users);
                    })
                    .catch((error) => {
                        setUsers([]);
                        console.error("Error while parsing users/all", error);
                    });
            })
            .catch((error) => {
                setUsers([]);
                console.error("Fail fetching users/all", error);
            });
    };

    const addUserToList = (user: User) => {
        setUsers((prev) => [...prev, user]);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return {
        users,
        getUsers,
        addUserToList
    };
};

export default useGetUsers;