import { useSelector } from 'react-redux';

function Details() {
    const movieDetails = useSelector(store => store.details);
    return (
        <>
            {movieDetails &&
                <div className='details_container'>
                    <div className='poster_details'>
                        <img src={movieDetails[0].poster} />
                        <h2>{movieDetails[0].title}</h2>
                    </div>
                    <div className='movie_specs'>
                        {movieDetails[0].array_agg.map((item) => {
                                return (
                                    <h4>{item}</h4>
                                )
                            })}
                        <p>{movieDetails[0].description}</p>
                    </div>
                </div>
            }
        </>
    )
};
export default Details;