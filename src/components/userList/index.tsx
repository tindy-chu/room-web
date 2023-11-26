import Avatar from '../avatar';
// import SearchBar from '../searchBar';
import styles from './index.module.scss';
import AvatarImg from '../../assets/avatar.jpg';
import InfoRow from '../infoRow';
import { useEffect } from 'react';
import { create } from 'zustand';
import useApi from '../../hook/useApi';
import str from '../../utils/str';
import Spinner from '../spinner';
import { TZUserList, TZUserListResponse, zUserListResponse } from './type';
import system from '../../utils/system';
export type TUserListState = {
  list: TZUserList;
  appendList: (list: TZUserList) => void;
};

export const useUserListStore = create<TUserListState>((set) => ({
  list: [],
  appendList: (list: TZUserList) => {
    set((state) => ({
      list: [...state.list, ...list],
    }));
  },
}));

export default function UserList() {
  const userList = useUserListStore((state) => state.list);
  const appendList = useUserListStore((state) => state.appendList);

  const api = useApi<TZUserListResponse>(
    'get',
    str.getEnv('BACKEND_URL') + '/users',
    {
      withToken: true,
      parse: zUserListResponse.parse,
    }
  );

  useEffect(() => {
    api.request();
  }, []);

  useEffect(() => {
    if (!api.loading) {
      if (api.error) {
        system.popupError('User list error');
        return;
      }
      appendList(api.response?.data.data || []);
    }
  }, [api.loading]);

  return (
    <div className={styles.container}>
      {api.loading && <Spinner />}

      {!api.loading &&
        userList.map((user) => (
          <InfoRow
            key={user.id}
            leftComponent={<Avatar src={AvatarImg} />}
            onClick={() => {}}
            title={user.email}
          />
        ))}
    </div>
  );
}
