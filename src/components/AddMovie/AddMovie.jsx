import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function AddMovie() {
    const genres = useSelector(store => store.genres);
    const dispatch = useDispatch();

    // local states
    const [title, setTitle] = useState('');
    const [poster, setMovieImage] = useState('');
    const [description, setDescription] = useState('');
    const [genre_id, setMovieGenre] = useState('');

    useEffect(() => {
        dispatch({
            type: 'GET_GENRES'
        })
    },[]);

    const dispatchMovie = (event) => {
        event.preventDefault();
        const form = document.getElementById("addMovieForm");
        const newMovie = {
            title,
            poster,
            description,
            genre_id
        }

        if(!genre_id || !title) {
            alert('missing title or genre field');
            return;
        }

        dispatch({
            type: 'ADD_MOVIE',
            payload: newMovie
        })

        form.reset();
    }


    return (
        <main>
            <form id="addMovieForm" onSubmit={dispatchMovie}>
                <input onChange={(event) => {setTitle(event.target.value)}} type="text" placeholder="movie title"/>
                <br/>
                <input onChange={(event) => {setMovieImage(event.target.value)}} type="text" placeholder="movie image url"/>
                <br/>
                <textarea onChange={(event) => {setDescription(event.target.value)}} rows="5" cols="30" placeholder="movie description"/>
                <br/>
                <select onChange={(event) => {setMovieGenre(event.target.value)}}>
                    <option>...</option>
                    {genres.map(genre => {
                        return (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        )
                    })}
                </select>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}
export default AddMovie;