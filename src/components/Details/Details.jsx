import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Details() {

    let id = useParams();
    const dispatch = useDispatch();
    const movieDetails = useSelector(store => store.details);

    // On page load, dispatch to fetch the details
    //  on a specific movie based on the url param.
    useEffect(() => {
        dispatch({
            type: 'GET_DETAILS',
            payload: id
        })
    }, []);

    return (
        <>
            <main>
                {/* If movie is true, render fetched details */}
                {movieDetails &&
                        <div className='details_container'>
                            <div className='poster_details'>
                                <img src={movieDetails[0].poster} />
                                <h2>{movieDetails[0].title}</h2>
                            </div>
                            <div className='movie_specs'>
                                {/* Map through array of the movie's genres */}
                                {movieDetails[0].array_agg.map((item) => {
                                        return (
                                            <h4 key={item}>{item}</h4>
                                        )
                                    })}
                                <p>{movieDetails[0].description}</p>
                            </div>
                        </div>
                    }
            </main>
        </>
    )
};
export default Details;