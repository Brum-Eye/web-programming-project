
import Image from 'next/image';
import Card from './Card';
import styles from './User.module.css';

    type UserProps = {
    user: {
        id: number;
        name: string;
        username: string;
        imageUrl: string;
        email: string;
        password: string;
    };
    };

    export default function User({ user }: UserProps) {
    return (
        <Card className={styles.userItem}>
        <Image
            className={styles.userImg}
            src={user.imageUrl}
            alt={user.name}
            width={100}
            height={100}
            priority
        />
        <div className={styles.userInfo}>
            <h2>Name: {user.name}</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
        </Card>
    );
    }
