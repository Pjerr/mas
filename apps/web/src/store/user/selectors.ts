import { RootState } from '@/store';

export const selectUserSlice = (state: RootState) => state.userSlice;

export const selectUser = (state: RootState) => state.userSlice.user;

export const selectUserRole = (state: RootState) => state.userSlice.user?.role;

export const selectUserId = (state: RootState) => state.userSlice.user?.id;
