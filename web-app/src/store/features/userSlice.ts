import { createSlice } from '@reduxjs/toolkit';
import User from 'types/user';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        logged: false,
        value: null as (User | null)
    },
    reducers: {
        newUser(state, action) {
            state.value = action.payload as User;
            state.logged = true;
        },
        removeUser(state){
            state.value = null;
            state.logged = false;
        }
    }
});

export const { newUser, removeUser } = userSlice.actions;
export default userSlice.reducer;