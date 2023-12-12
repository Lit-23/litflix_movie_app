import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { caretRight } from '../../../assets/icons';

import MovieList from '../../movieList/MovieList';

const API_URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=a20b0851681cb1cbe3ad6e2eafb80bc8`;

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  // const randomIndex = Math.floor(Math.random() * movies.length);

  const searchMovies = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();

    setMovies(data.results);
  }

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <section className='px-5 mt-5'>
      <Link to='/top-rated' className='font-bold text-[1.3rem]'>Top Rated</Link>

      <div className='flex gap-3 pb-4 pt-2 overflow-auto'>
        {movies.map((movie) => (
          <MovieList key={movie.id} movie={movie} />
        ))}
        <Link to='/top-rated'>
          <button className='font-bold w-36 hover:opacity-75 flex justify-center items-center mt-[140px]'>
            View more
            <img src={caretRight} alt="right-arrow" />
          </button>
        </Link>
      </div>
    </section>
  )
}

export default TopRated

