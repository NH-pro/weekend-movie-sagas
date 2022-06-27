import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    const movies = useSelector(store => store.movies);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // When movie poster img is clicked, go to the
    //  details component of that movie.
    const handlePosterClick = (event) => {
        history.push(`/details/${event.target.id}`);
    }

    return (
        <main>
            <h1>Current Feature Films</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div className="movie_card" key={movie.id} >
                            <img id={movie.id} onClick={handlePosterClick} src={movie.poster} alt={movie.title}/>
                            <h3>{movie.title}</h3>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;