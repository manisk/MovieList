import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./AddMovie.scss";
import { useState } from "react";
import { addMovieApi } from "../../api";

const DEFAULT_API_STATE = { data: null, error: null, loading: false };
export default function AddMovie() {
  // const [imgUrl, setImgUrl] = useState("");
  // const [movieName, setMovieName] = useState("");
  // const [movieType, setMovieType] = useState("");
  // const [movieLang, setMovieLang] = useState("");
  const [addMoviesForm, setAddMoviesForm] = useState({
    imgUrl: "",
    movieName: "",
    movieType: "",
    movieLang: "",
  });

  const [moviesListStatus, setmoviesListStatus] = useState(DEFAULT_API_STATE);
  return (
    <>
      <Header />
      <div className="addmovie-container d-flex">
        <div className="container" style={{ margin: "auto" }}>
          <form className="m-auto card w-50 p-3">
            <h5 className="text-center">
              <i className="fas fa-user"> Please Enter Movies Detail</i>
            </h5>
            {moviesListStatus.loading && (
              <div className="spinner-border text-primary m-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}

            {moviesListStatus.error && (
              <div className="alert alert-secondary" role="alert">
                Something went wrong
                <i className="fas-solid fas-xmark"></i>
              </div>
            )}
            <hr />
            <div className="mb-3">
              <label for="imgurl" className="form-label">
                Movie Image Url
              </label>
              <input
                type="text"
                className="form-control"
                id="imgurl"
                value={addMoviesForm.imgUrl}
                onChange={(e) =>
                  setAddMoviesForm({ ...addMoviesForm, imgUrl: e.target.value })
                }
                placeholder="Please enter image url"
              />
            </div>
            <div className="mb-3">
              <label for="movieName" className="form-label">
                Movie Name
              </label>
              <input
                type="text"
                className="form-control"
                id="movieName"
                value={addMoviesForm.movieName}
                onChange={(e) =>
                  setAddMoviesForm({
                    ...addMoviesForm,
                    movieName: e.target.value,
                  })
                }
                placeholder="Please enter movie name"
              />
            </div>
            <div className="mb-3">
              <label for="movieType" className="form-label">
                Movie Type
              </label>
              <input
                type="text"
                className="form-control"
                id="movieType"
                value={addMoviesForm.movieType}
                onChange={(e) =>
                  setAddMoviesForm({
                    ...addMoviesForm,
                    movieType: e.target.value,
                  })
                }
                placeholder="Please Enter movie Type e.g Darma,Comedy,Horror"
              />
            </div>
            <div className="mb-3">
              <label for="movielang" className="form-label">
                Movie Language
              </label>
              <input
                type="text"
                className="form-control"
                id="movielang"
                value={addMoviesForm.movieLang}
                onChange={(e) =>
                  setAddMoviesForm({
                    ...addMoviesForm,
                    movieLang: e.target.value,
                  })
                }
                placeholder="Please enter movie language"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                //console.log({ imgUrl, movieName, movieType, movieLang });
                setmoviesListStatus({ ...DEFAULT_API_STATE, loading: true });
                addMovieApi(
                  addMoviesForm.imgUrl,
                  addMoviesForm.movieName,
                  addMoviesForm.movieType,
                  addMoviesForm.movieLang,
                  (data) => {
                    setmoviesListStatus({ ...DEFAULT_API_STATE, data: true });
                  },
                  (error) => {
                    setmoviesListStatus({ ...DEFAULT_API_STATE, error: true });
                  }
                );
                setAddMoviesForm({
                  imgUrl: "",
                  movieName: "",
                  movieType: "",
                  movieLang: "",
                });
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
