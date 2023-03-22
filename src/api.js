export function getMoviesListApi(onSuccess, onError) {
  const url = "http://localhost:8000/movies";
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw res.json();
      }
    })
    .then((data) => {
      console.log(data);
      onSuccess(data);
    })
    .catch((error) => {
      onError(error);
    });
}

export function addMovieApi(
  imgurl,
  moviename,
  movietype,
  movielang,
  onSuccess,
  onError
) {
  const url = "http://localhost:8000/movies";
  const movieData = {
    movieImg: imgurl,
    movieName: moviename,
    movieType: movietype,
    movieLang: movielang,
  };
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  })
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        throw res;
      }
    })
    .then((response) => {
      const data = response.json();
      onSuccess(data);
    })
    .catch((error) => {
      onError(error);
    });
}

export function deleteMovieApi(movieId, onSuccess, onError) {
  const url = "http://localhost:8000/movies/" + movieId;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw res.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
}

export function editMovieApi(
  id,
  movieImg,
  movieName,
  movieType,
  movieLang,
  onSuccess,
  onError
) {
  const url = "http://localhost:8000/movies/" + id;
  const editData = {
    movieImg: movieImg,
    movieName: movieName,
    movieType: movieType,
    movieLang: movieLang,
  };
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw res.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
}
