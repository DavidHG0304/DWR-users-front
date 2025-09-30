import { useState } from "react";
import type { CreateUserPayload, CreateUserResponse } from "../types/User.type";
import HttpClient from "../utils/HttpClient";

const httpClient = new HttpClient();
const useCreateEditUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const createUser = async (data: CreateUserPayload) => {
        try {
            setIsLoading(true);
            const response = await httpClient.post("users/add", data)
            const userData = await response.json();
            console.log("Response data:", userData);
            return userData as CreateUserResponse;
        }
        catch (error) {
            console.error("Fail fetching users/add", error);
            return null;
        }
        finally {
            setIsLoading(false);
        }
    };
    return {
        createUser,
        isLoading,
    };
};

export default useCreateEditUser;
