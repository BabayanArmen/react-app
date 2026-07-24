import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
    name: string | null;
}

interface UserState {
    currentUser: User | null;
}

const initialState: UserState = {
    currentUser: {
        name: "John Smith",
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.currentUser = action.payload;
        },

        setUserName(state, action: PayloadAction<string>) {
            if (state.currentUser) {
                state.currentUser.name = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUserNameAsync.pending, () => {
                console.log("setUserNameAsync.pending");
            })
            .addCase(setUserNameAsync.fulfilled, (state, action: PayloadAction<string>) => {
                if (state.currentUser) {
                    state.currentUser.name = action.payload;
                }
            })
    }
})

export const setUserNameAsync = createAsyncThunk(
    "user/setUserNameAsync",
    async (name: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // API call
        return name
    }
)

export const {setUser, setUserName} = userSlice.actions;
export default userSlice.reducer;