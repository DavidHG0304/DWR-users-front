import type { User } from '../types/User.type.ts';
import ListItem from './ListItem';

type UserItemProps = {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (userId: number) => void;
}
const UserItem = ({ user, onEdit, onDelete }: UserItemProps) => {
    const handleEdit = () => {
        onEdit(user);
    };

    const handleDelete = () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar a ${user.name}?`)) {
            onDelete(user.id);
        }
    };

    return (
        <ListItem>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                    <b>{user.id}:</b> {user.name} - {user.email}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={handleEdit} style={{ fontSize: '12px', padding: '4px 8px' }}>
                        ✏️ Editar
                    </button>
                    <button 
                        onClick={handleDelete} 
                        style={{ 
                            fontSize: '12px', 
                            padding: '4px 8px', 
                            backgroundColor: '#dc3545', 
                            color: 'white' 
                        }}
                    >
                        ❌ Eliminar
                    </button>
                </div>
            </div>
        </ListItem>
    );
};

export default UserItem;