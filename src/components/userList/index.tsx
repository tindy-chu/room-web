import Avatar from '../avatar';
// import SearchBar from '../searchBar';
import styles from './index.module.scss';
import AvatarImg from '../../assets/avatar.jpg';
import InfoRow from '../infoRow';
import { useEffect } from 'react';
import { create } from 'zustand';
import useApi from '../../hook/useApi';
import str from '../../utils/str';
import { TZUserList, TZUserListResponse, zUserListResponse } from './type';
import system from '../../utils/system';
import SearchBar from '../searchBar';
import { useChatViewStore } from '../chatView';
import { useFrameStore } from '../frame';

export type TUserListState = {
  list: TZUserList;
  search: string;
  setList: (list: TZUserList) => void;
  appendList: (list: TZUserList) => void;
  updateSearch: (value: string) => void;
};

export const useUserListStore = create<TUserListState>((set) => ({
  list: [],
  search: '',
  setList: (list: TZUserList) => {
    set(() => ({
      list,
    }));
  },
  appendList: (list: TZUserList) => {
    set((state) => ({
      list: [...state.list, ...list],
    }));
  },
  updateSearch: (value: string) => {
    set(() => ({
      search: value,
    }));
  },
}));

export default function UserList() {
  const userList = useUserListStore((state) => state.list);
  const search = useUserListStore((state) => state.search);
  const setList = useUserListStore((state) => state.setList);
  const updateSearch = useUserListStore((state) => state.updateSearch);

  const setUserId = useChatViewStore((state) => state.setUserId);
  const setUserEmail = useChatViewStore((state) => state.setUserEmail);

  const toggleSlideMenuVisible = useFrameStore(
    (state) => state.toggleSlideMenuVisible
  );

  const api = useApi<TZUserListResponse>(
    'get',
    str.getEnv('BACKEND_URL') + '/users',
    {
      withToken: true,
      parse: zUserListResponse.parse,
    }
  );

  const handleSearch = (value: string) => {
    updateSearch(value);
    api.request({ params: { search: value } });
  };

  const handleUserClick = (email: string, userId: string) => {
    setUserId(userId);
    setUserEmail(email);
    toggleSlideMenuVisible();
  };

  useEffect(() => {
    api.request();
  }, []);

  useEffect(() => {
    if (!api.loading) {
      if (api.error) {
        system.popupError('User list error');
        return;
      }

      setList(api.response?.data.data || []);
    }
  }, [api.loading]);

  return (
    <div className={styles.container}>
      <SearchBar value={search} onChange={handleSearch} />

      {!api.loading && (
        // TODO backend pagination
        <div className={styles.subContainer}>
          {userList.map((user) => (
            <InfoRow
              key={user.id}
              leftComponent={<Avatar src={AvatarImg} />}
              onClick={() => {
                handleUserClick(user.email, user.id);
              }}
              title={user.email}
            />
          ))}
        </div>
      )}
    </div>
  );
}
