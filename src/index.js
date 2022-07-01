import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_DETAILS', getMovieDetails);
    yield takeEvery('GET_GENRES', getGenreList);
    yield takeEvery('ADD_MOVIE', addNewMovie)
}

function* addNewMovie(action) {
    try {
        yield axios.post(`/api/movie`, action.payload);
    }
    catch (err) {
        console.log(`error in addNewMovie`, err);
    }

    yield put({
        type:'FETCH_MOVIES'
    })
}

function* getGenreList() {
    try {
        const movieGenres = yield axios.get(`/api/genre`);
        yield put({
            type: 'SET_GENRES',
            payload: movieGenres.data
        })
    }
    catch (err) {
        console.log('error in getGenreList', err);
    }
}

function* getMovieDetails(action) {
    // Get all details on a specific movie from DB
    try {
        const details = yield axios.get(`/api/movie/${action.payload.id}`); // <-- 'yield' means "wait for axios to get back", then go.
        // 'put', aka another dispatch, to set the state in 
        //      the 'details' reducer.
        yield put({
            type: 'SET_DETAILS',
            payload: details.data
        })
    }
    catch (err) {
        console.log(`Error in getMovieDetails`, err);
    }
}


function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        // put/dispatch to set the state of the 'movies' reducer.
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


// 'details' Reducer
// Store selected movie's details
const details = (state = null, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// 'movies' Reducer
// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// 'genres' Reducer
// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
