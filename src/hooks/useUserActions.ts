import { useState } from "react";
import type { CreateUserPayload, CreateUserResponse } from "../types/User.type";
import HttpClient from "../utils/HttpClient";

const httpClient = new HttpClient();

const useUserActions = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateUser = async (data: CreateUserPayload) => {
        try {
            setIsLoading(true);
            const response = await httpClient.put("users/update", data);
            
            // Verificar si la respuesta tiene contenido antes de intentar parsear JSON
            const responseText = await response.text();
            console.log("Update response text:", responseText);
            
            if (responseText) {
                const userData = JSON.parse(responseText);
                console.log("Update response data:", userData);
                return userData as CreateUserResponse;
            } else {
                // Si la respuesta está vacía, devolver el usuario actualizado basado en los datos enviados
                console.log("Empty response, using sent data");
                return { user: data.user } as CreateUserResponse;
            }
        } catch (error) {
            console.error("Fail updating user", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteUser = async (userId: number) => {
        try {
            setIsLoading(true);
            await httpClient.delete(`users/delete/${userId}`);
            return true;
        } catch (error) {
            console.error("Fail deleting user", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateUser,
        deleteUser,
        isLoading,
    };
};

export default useUserActions;