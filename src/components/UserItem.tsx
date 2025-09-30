import type { User } from '../types/User.type.ts';
import ListItem from './ListItem';

type UserItemProps = {
    user: User;
}
const UserItem = ({ user }: UserItemProps) => {
    return (
        <ListItem>
            <>
                <b>{user.id}:</b> {user.name} - {user.email}
            </>
        </ListItem>
    );
};

export default UserItem;