import { useState } from 'react';
import ListContainer from './components/ListContainer.tsx';
import UserItem from './components/UserItem.tsx';
import useGetUsers from './hooks/useGetUsers.ts';
import AddEditForm from './components/AddEditForm.tsx';
import type { User } from './types/User.type.ts';
import useCreateEditUser from './hooks/useCreateEditUser.ts';
import useUserActions from './hooks/useUserActions.ts';

function App() {
  const {users, addUserToList, updateUserInList, removeUserFromList} = useGetUsers();
  const {createUser, isLoading: isSubmitLoading} = useCreateEditUser();
  const {updateUser, deleteUser, isLoading: isActionLoading} = useUserActions();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOnSubmit = async (user: User) => {
    if (editingUser) {
      // Actualizar usuario existente
      const updatedUser = await updateUser({
        user: {
          ...user,
          id: editingUser.id,
          created: editingUser.created,
        }
      });
      if (updatedUser) {
        updateUserInList(updatedUser.user);
        setEditingUser(null); // Esto resetea el formulario
      }
    } else {
      // Crear nuevo usuario
      const newUser = await createUser({
        user: {
          ...user,
          created: new Date().toISOString(),
        }
      });
      if (newUser) {
        addUserToList(newUser.user);
      }
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleDeleteUser = async (userId: number) => {
    const success = await deleteUser(userId);
    if (success) {
      removeUserFromList(userId);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div>
      <h1>Todo list</h1>
      <AddEditForm 
        onSubmit={handleOnSubmit} 
        loading={isSubmitLoading || isActionLoading}
        editingUser={editingUser}
        onCancel={handleCancelEdit}
      />
      <ListContainer>
        {users.map((user) => (
          <UserItem 
            key={user.id} 
            user={user} 
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        ))}
      </ListContainer>
    </div>
  );
}

export default App;
