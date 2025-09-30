import ListContainer from './components/ListContainer.tsx';
import UserItem from './components/UserItem.tsx';
import useGetUsers from './hooks/useGetUsers.ts';
import AddEditForm from './components/AddEditForm.tsx';
import type { User } from './types/User.type.ts';
import useCreateEditUser from './hooks/useCreateEditUser.ts';

function App() {
  const {users, addUserToList} = useGetUsers();
  const {createUser, isLoading: isSubmitLoading} = useCreateEditUser();
  const handleOnSubmit =  async(user: User) => {
    const newUser = await createUser({
      user: {
        ...user,
        created: new Date().toISOString(),
      }
    });
    if (newUser) {
      addUserToList(newUser.user);
    }
  };
  return (
    <div>
      <h1>Todo list</h1>
      <AddEditForm onSubmit={handleOnSubmit} loading={isSubmitLoading} />
      <ListContainer>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ListContainer>
    </div>
  );
}

export default App;
