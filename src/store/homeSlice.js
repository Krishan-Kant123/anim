import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        data: {},
        dubdata:{},
        trending:{1:"hii"},
        popular:{1:"hii"},
        latest:{1:"hii"},
        ongoing:{1:"hii"}
    },
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getData: (state, action) => {
            state.data = action.payload;
        },
        getdubData:(state,action)=>{
            state.dubdata=action.payload;

        },
        getTrending: (state, action) => {
            state.trending = action.payload;
        },
        getPopular: (state, action) => {
            state.popular = action.payload;
        },
        getLatest: (state, action) => {
            state.latest = action.payload;
        },
        getOngoing: (state, action) => {
            state.ongoing = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getData,getTrending,getPopular,getLatest,getdubData,getOngoing } = homeSlice.actions;

export default homeSlice.reducer;