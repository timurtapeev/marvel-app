import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState({});

    const {getComics, loading, error} = useMarvelService();

    useEffect(() => {
        onRequest(comicId);
    }, [])
    
    const onRequest = (id) => {
        getComics(id).then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    } 

    function renderComic(comic) {
        return (
            <>
                <img src={comic.thumbnail} alt={comic.title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{comic.title}</h2>
                    <p className="single-comic__descr">{comic.description}</p>
                    <p className="single-comic__descr">{comic.pageCount}</p>
                    <p className="single-comic__descr">{comic.language}</p>
                    <div className="single-comic__price">{comic.price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </>
        )
    }

    const selectedComic = renderComic(comic);
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
 
    return (
        <div className="single-comic">
            {selectedComic}
            {spinner}
            {errorMessage}
        </div>
    )
}

export default SingleComicPage;