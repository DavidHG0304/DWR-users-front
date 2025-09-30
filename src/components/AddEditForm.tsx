import { useState, useEffect } from "react";
import type { User } from "../types/User.type";

const formDefaultValues: User = {
    id: 0,
    email: '',
    name: '',
    created: ''
}
type AddEditFormProps = {
    onSubmit: (value: User) => void;
    loading?: boolean;
    editingUser?: User | null;
    onCancel?: () => void;
};
const AddEditForm = ({
    onSubmit,
    loading,
    editingUser,
    onCancel,
}: AddEditFormProps) => {
    const [formState, setFormState] = useState<User>(formDefaultValues);

    useEffect(() => {
        if (editingUser) {
            setFormState(editingUser);
        } else {
            setFormState(formDefaultValues);
        }
    }, [editingUser]);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loading) return;
        onSubmit(formState);
        // Solo resetear el formulario si no estamos editando
        if (!editingUser) {
            setFormState(formDefaultValues);
        }
    };

    const handleInputChange = (key: keyof User) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setFormState({
                ...formState,
                [key]: event.target.value,
            })
        }
    };
    // TODO Update to non controlled components
    return (
        <form onSubmit={handleFormSubmit}>
            <input
                id='email'
                name='email'
                type="email"
                placeholder="Inserte su email"
                value={formState.email}
                onChange={handleInputChange('email')}
                disabled={loading}
            />
            <input
                id='name'
                name='name'
                type="text"
                placeholder="Inserte su nombre"
                value={formState.name}
                onChange={handleInputChange('name')}
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {
                    loading ? 'Guardando...' : (editingUser ? 'Actualizar' : 'Guardar')
                }
            </button>
            {editingUser && onCancel && (
                <button type="button" onClick={onCancel} disabled={loading}>
                    Cancelar
                </button>
            )}
        </form>
    );
};

export default AddEditForm;