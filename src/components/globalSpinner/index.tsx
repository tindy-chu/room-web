import { create } from 'zustand';
import { cloneDeep } from 'lodash';
import { v4 as uuid } from 'uuid';

import styles from './index.module.scss';

import spinner from '../../assets/global-spinner.svg';

type TGlobalSpinner = {
  ids: { [key: string]: boolean };
  addId: () => () => void;
  isLoading: () => boolean;
};

export const useGlobalSpinnerStore = create<TGlobalSpinner>((set, get) => ({
  ids: {},
  addId: () => {
    const id = uuid();
    set((state) => {
      const ids = cloneDeep(state.ids);
      ids[id] = true;
      return { ids };
    });

    const deleteId = (): void => {
      set((state) => {
        const ids = cloneDeep(state.ids);
        delete ids[id];
        return { ids };
      });
    };
    return deleteId;
  },
  isLoading: () => Object.keys(get().ids).length > 0,
}));

export default function GlobalSpinner() {
  const globalSpinnerStore = useGlobalSpinnerStore();

  return (
    globalSpinnerStore.isLoading() && (
      <div className={styles.container}>
        <img src={spinner} className={styles.spinner} alt="spinner" />
      </div>
    )
  );
}
