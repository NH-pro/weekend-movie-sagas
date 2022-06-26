import { useSelector } from 'react-redux';

function Details() {
    const movieDetails = useSelector(store => store.details);
    return (
        <>
            {movieDetails &&
                <div className='details_container'>
                    <h2>{movieDetails[0].title}</h2>
                    <img src={movieDetails[0].poster} />
                    {movieDetails[0].array_agg.map((item) => {
                        return (
                            <h5>{item}</h5>
                        )
                    })}
                    <p>{movieDetails[0].description}</p>
                </div>
            }
        </>
    )
};
export default Details;