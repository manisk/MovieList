import "./MovieCard.scss";
import { useEffect, useState } from "react";
import { getMoviesListApi } from "../../api";
const DEFAULT_API_STATE = { data: null, error: null, loading: false };

const defaultProps = {
  searchText: "",
};

export default function MovieCard(props = defaultProps) {
  const [moviesListStatus, setmoviesListStatus] = useState(DEFAULT_API_STATE);

  useEffect(() => {
    fetchMoviesList();
  }, []);

  function fetchMoviesList() {
    setmoviesListStatus({ ...DEFAULT_API_STATE, loading: true });
    getMoviesListApi(
      (data) => {
        setmoviesListStatus({ ...DEFAULT_API_STATE, data });
        console.log("done", data);
      },
      (error) => {
        setmoviesListStatus({ ...DEFAULT_API_STATE, error: true });
      }
    );
  }

  return (
    <>
      <div className="container">
        {moviesListStatus.loading && (
          <div className="d-flex" style={{ height: "200px" }}>
            <div class="spinner-border m-auto" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className="row">
          {moviesListStatus.data
            ?.filter((movie) => {
              if (
                movie.movieName
                  .toLowerCase()
                  .includes(props.searchText.toLowerCase())
              ) {
                return true;
              }
              return false;
            })
            .map((movie) => (
              <div className="col-sm-3">
                <div className="movie-card">
                  <img src={movie.movieImg} alt="" className="img-thumbnail" />
                  <h6 className="movie-name">
                    <b>{movie.movieName}</b>
                  </h6>
                  <p className="movie-type">{movie.movieType}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
