import { useSelector } from 'react-redux';

function Details() {
    const movieDetails = useSelector(store => store.details);
    console.log('this is movieDetails', movieDetails[0]);
    return (
        <>
            <div>
                <h2>{movieDetails[0].title}</h2>
                <img src={movieDetails[0].poster} />
                <p>{movieDetails[0].description}</p>
            </div>
        </>
    )
};
export default Details;