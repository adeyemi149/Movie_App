import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	details: null,
	trailer: null,
	isLoading: true,
	watchListItems: [],
	addedToWatchList: false
}

const detailSlice = createSlice({
	name: "detail",
	initialState,
	reducers: {
		setDetails: (state, actions) => {
			const { details, isLoading } = actions.payload;
			state.details = details;
			state.isLoading = isLoading;
		},
		setTrailer: (state, actions) => {
			state.trailer = actions.payload.trailer;
		},
		addToWatchList: (state, actions) => {
			const { watchListItems, addedToWatchList } = actions.payload;
			state.watchListItems.push(watchListItems);
			state.addedToWatchList = addedToWatchList;
		}
	}
})

export const { setDetails, setTrailer, addToWatchList } = detailSlice.actions;

export const selectDetails = state => state.detail.details;
export const selectLoading = state => state.detail.isLoading;
export const selectTrailer = state => state.detail.trailer;
export const selectAddedToWatcListItem = state => state.detail.addedToWatchList;
export const selectWatchList = state => state.detail.watchListItems

export default detailSlice.reducer;