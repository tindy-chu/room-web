import Avatar from '../avatar';
import SearchBar from '../searchBar';
import styles from './index.module.scss';
import AvatarImg from '../../assets/avatar.jpg';
import InfoRow from '../infoRow';
import { useEffect } from 'react';
import { create } from 'zustand';

type TUser = {
  id: string;
  email: string;
  avatar?: string;
  alias?: string;
  desc?: string;
};

export type TUserListState = {
  value: TUser[];
};

export const useUserListStore = create<TUserListState>((_) => ({
  value: [
    {
      id: '1',
      email: 'a@a.com',
    },
    {
      id: '2',
      email: '<EMAssIL>',
    },
  ],
}));

export default function UserList() {
  const userList = useUserListStore((state) => state.value);
  useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <SearchBar />
      {userList.map((user) => (
        <InfoRow
          leftComponent={<Avatar src={AvatarImg} />}
          onClick={() => {}}
          title={user.email}
          desc={'sdf'}
        />
      ))}
    </div>
  );
}
