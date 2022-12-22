import { makeAutoObservable } from "mobx";
import Movie from "../models/movie";
import MovieContent from "../models/movie.content";
import axios from "axios";

class MoviesStore {
  movies: Movie[] = [];
  movieContentId: string = "";
  moviesContent: MovieContent[] = [];
  moviesPaginationPage: number = 1;
  moviesPaginationSize: number = 4;

  addMovie = (movie: Movie) => {
    this.movies.push(movie);
  };

  setMovies = (movies: Movie[]) => {
    this.movies = movies;
  };

  loadMovies = async () => {
    const loadDBMovies = async () => {
      try {
        const response = await axios.get(
          "https://my-movies-db-875e8-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
        );
        return { data: response.data, isError: false };
      } catch (error) {
        return { data: [], isError: true };
      }
    };

    try {
      const response: {
        data: Movie[];
        isError: boolean;
      } = await loadDBMovies();

      if (response.isError) {
        throw new Error("Something went wrong. Please try again later");
      } else {
        this.setMovies(response.data);
        return { isSuccess: true, message: null };
      }
    } catch (error) {
      return { isSuccess: false, message: error };
    }
  };

  setMoviesContent = (movies: MovieContent[]) => {
    this.moviesContent = movies;
  };

  loadMovieContent = async (movieId: string) => {
    try {
      const response = await axios.get(
        `https://my-movies-db-875e8-default-rtdb.europe-west1.firebasedatabase.app/moviesContent/${movieId}.json`
      );
      const responseData: MovieContent = response.data;
      return responseData;
    } catch (error) {
      debugger;
    }
  };

  setPaginationPage = (page: number) => {
    this.moviesPaginationPage = page;
  }

  setPaginationSize= (size: number) => {
    this.moviesPaginationSize = size;
  }

  get moviesCount() {
    return this.movies.length;
  }

  get moviesList() {
    return this.movies;
  }

  get moviesNames() {
    return this.movies.map((movie) => movie.name);
  }

  get moviesCurrentPaginationPage() {
    return this.moviesPaginationPage;
  }

  get moviesCurrentPaginationSize() {
    return this.moviesPaginationSize;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

const store = new MoviesStore();
export default store;
