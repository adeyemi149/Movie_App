import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	recommendedForYou: [],
	newDisney: [],
	originals: [],
	trending: [],
	watchList: [],
};

const movieSlice = createSlice({	
	name: "movie",
	initialState,
	reducers: {
		setMovies: (state, actions) => {
			const { recommendedForYou, newDisney, originals, trending } = actions.payload;
			state.recommendedForYou = recommendedForYou;
			state.newDisney = newDisney;
			state.originals = originals;
			state.trending = trending;
		}, 
		addwatchList: (state, actions) => {
			state.watchList.push(actions.payload.watchList);
		}
	}
})

export const { setMovies, addwatchList } = movieSlice.actions;

export const selectRecommended = state => state.movie.recommendedForYou;
export const selectnewDisney = state => state.movie.newDisney;
export const selectOriginals = state => state.movie.originals;
export const selectTrending = state => state.movie.trending;
export const selectWatchList = state => state.movie.watchList;

export default movieSlice.reducer;