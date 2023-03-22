import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MovieCard from "../MovieCard/MovieCard";
import { useState } from "react";
export default function Home() {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <Header setSearchText={setSearchText} searchText={searchText} />
      <div className="header bg-danger text-white p-3">
        <div className="container">
          <h5 style={{ marginRight: "auto" }}>Now Showing</h5>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-9">
            <MovieCard searchText={searchText} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
