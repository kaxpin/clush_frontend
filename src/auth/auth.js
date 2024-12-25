import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    userId : "",
    login: (userId) => set(() => ({ isAuthenticated: true,
        userId: userId
     })),
    logout: () => set(() => ({ isAuthenticated: false,
        userId: ""
     })),
}));

export default useAuthStore;