import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function AddMovie() {
    const genres = useSelector(store => store.genres);
    const dispatch = useDispatch();

    // local states
    const [title, setTitle] = useState('');
    const [movieImage, setMovieImage] = useState('');
    const [description, setDescription] = useState('');
    const [movieGenre, setMovieGenre] = useState('');

    useEffect(() => {
        dispatch({
            type: 'GET_GENRES'
        })
    },[]);



    return (
        <main>
            <form>
                <input type="text" placeholder="movie title"/>
                <br/>
                <input type="text" placeholder="movie image url"/>
                <br/>
                <textarea rows="5" cols="30" placeholder="movie description"></textarea>
                <br/>
                <select>
                    {genres.map(genre => {
                        return (
                            <option key={genre.id} value={genre.name}>{genre.name}</option>
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