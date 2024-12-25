import { create } from 'zustand';

const usePopupStore = create((set) => ({
    open: false,
    setOpen: (status) => set(() => ({
        open: status,
    })),
}));

export default usePopupStore;