import { useEffect, useState } from "react";
import { editMovieApi } from "../../api";

const DEFAULT_API_STATE = { data: null, loadaing: false, error: null };

export default function Modal(
  props = {
    movieImg: "",
    movieName: "",
    movieType: "",
    movieLang: "",
  }
) {
  const [movieImg, setMovieImg] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieType, setMovieType] = useState("");
  const [movieLang, setMovieLang] = useState("");
  const [editMovieStatus, setMovieStatus] = useState(DEFAULT_API_STATE);

  useEffect(() => {
    setMovieImg(props.movieImg);
    setMovieName(props.movieName);
    setMovieType(props.movieType);
    setMovieLang(props.movieLang);
  }, [props.movieImg, props.movieName, props.movieType, props.movieLang]);

  return (
    <div className="modal fade" id={props.modalId}>
      {editMovieStatus}
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Movie Details</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label for="movieImg" className="form-label">
                  Movie Image
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="movieImg"
                  value={movieImg}
                  onChange={(e) => setMovieImg(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="moviname" className="form-label">
                  Movie Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="moviname"
                  value={movieName}
                  onChange={(e) => setMovieName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="movitype" className="form-label">
                  Movie Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="movietype"
                  value={movieType}
                  onChange={(e) => setMovieType(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="movielang" className="form-label">
                  Movie Lnaguage
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="movielang"
                  value={movieLang}
                  onChange={(e) => setMovieLang(e.target.value)}
                ></input>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setMovieStatus({ ...DEFAULT_API_STATE, loadaing: true });
                editMovieApi(
                  props.id,
                  movieImg,
                  movieName,
                  movieType,
                  movieLang,
                  (data) => {
                    setMovieStatus({ ...DEFAULT_API_STATE, data: true });
                    const modalEl = document.getElementById(props.modalId);
                    const modal =
                      window.bootstrap.Modal.getOrCreateInstance(modalEl);
                    modal.hide();
                    props.fetchMovieData();
                  },
                  (error) => {
                    setMovieStatus({ ...DEFAULT_API_STATE, error: true });
                  }
                );
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
