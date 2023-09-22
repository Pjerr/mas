import { initialState } from '@/store/user/initialState';
import { SetUserAction, SetUserRole } from '@/store/user/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        resetUser: (state) => {
            state.user = null;
        },
        setUser: (state, { payload }: PayloadAction<SetUserAction>) => {
            state.user = payload.user;
        },
        setUserRole: (state, { payload }: PayloadAction<SetUserRole>) => {
            if (!state.user) return;
            state.user.role = payload.role;
        },
    },
});

export const { resetUser, setUser, setUserRole } = userSlice.actions;

export * from './selectors';

export default userSlice.reducer;
