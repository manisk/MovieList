import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Toggle from "../../components/Toggle/Toggle";
import { useEffect, useState } from "react";
import { getMoviesListApi } from "../../api";
import { deleteMovieApi } from "../../api";
import Modal from "../Modal/Modal";
import "./UpdateMovie.scss";
const DEFAULT_API_STATE = { id: null, data: null, loading: false, error: null };

export default function UpdateMovie() {
  const [moviesListStatus, setmoviesListStatus] = useState(DEFAULT_API_STATE);
  const [deleteMovieStatus, setDeleteMovieStatus] = useState(DEFAULT_API_STATE);

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
      <Header />
      <div className="container table-responsive">
        {deleteMovieStatus.data && (
          // <sapn>This movie {deleteMovieStatus.id} deleted!!!</sapn>
          <div className="alert alert-danger" role="alert">
            Movie Id {deleteMovieStatus.id} has been deleted!!!
          </div>
        )}

        <table className="table table-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>MovieImage</th>
              <th>Movie Name</th>
              <th>Movie Type</th>
              <th>Movie Language</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {moviesListStatus.data?.map((movie) => (
              <tr>
                <td>{movie.id}</td>
                <td>
                  <div className="thumb-holder">
                    <img src={movie.movieImg} alt="movie" className="thumb" />
                  </div>
                </td>
                <td>{movie.movieName}</td>
                <td>{movie.movieType}</td>
                <td>{movie.movieLang}</td>
                <td>
                  <button
                    type="button"
                    disabled={
                      deleteMovieStatus.loading &&
                      deleteMovieStatus.id === movie.id
                    }
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setDeleteMovieStatus({
                        ...DEFAULT_API_STATE,
                        loading: true,
                        id: movie.id,
                      });
                      deleteMovieApi(
                        movie.id,
                        (data) => {
                          fetchMoviesList();
                          setDeleteMovieStatus({
                            ...DEFAULT_API_STATE,
                            data,
                            id: movie.id,
                          });
                        },
                        (error) => {
                          setDeleteMovieStatus({
                            ...DEFAULT_API_STATE,
                            error: true,
                            id: movie.id,
                          });
                        }
                      );
                    }}
                  >
                    {deleteMovieStatus.loading &&
                    deleteMovieStatus.id === movie.id
                      ? "loading..."
                      : "Delete"}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      const modalId = "movieModal" + movie.id;
                      const modal = window.bootstrap.Modal.getOrCreateInstance(
                        document.getElementById(modalId)
                      );
                      modal.show();
                    }}
                  >
                    Edit
                  </button>
                  <Modal
                    modalId={"movieModal" + movie.id}
                    fetchMovieData={fetchMoviesList}
                    id={movie.id}
                    movieImg={movie.movieImg}
                    movieName={movie.movieName}
                    movieType={movie.movieType}
                    movieLang={movie.movieLang}
                  />
                </td>
                <td>
                  <Toggle
                    value={true}
                    onChange={(value) => console.log(value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {moviesListStatus.loading && (
          <div className="d-flex" style={{ height: "200px" }}>
            <div class="spinner-border m-auto" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
