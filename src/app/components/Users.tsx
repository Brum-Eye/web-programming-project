import User from './User';

type UserProps = {
users: {
    id: number;
    name: string;
    username: string;
    imageUrl: string;
    email: string;
    password: string;
}[];
};

export default function Users({ users }: UserProps) {
return (
    <div className="user-list">
    {users.map((user) => (
        <User key={user.id} user={user} />
    ))}
    </div>
);
}