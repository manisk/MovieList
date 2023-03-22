import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container d-flex">
          <Link className="navbar-brand" to="/">
            <img
              src="https://logodix.com/logo/2011059.jpg"
              alt="Book My Show"
              width="140"
              className="img-fluid"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addmovie">
                  AddMovie
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/updatemovie">
                  UpdateMovie
                </Link>
              </li>
            </ul>
            <div style={{ marginLeft: "auto" }}>
              {props.searchText !== undefined && props.setSearchText && (
                <input
                  class="form-control"
                  type="search"
                  placeholder="Search Movie"
                  aria-label="Search"
                  value={props.searchText}
                  onChange={(e) => props.setSearchText(e.target.value)}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
