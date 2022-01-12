$(".search-button").on("click", function () {
  $.ajax({
    url: "http://www.omdbapi.com/?i=tt3896198&apikey=9ffa246&s=" + $(".input").val(),
    success: (results) => {
      const movie = results.Search;
      let cards = "";
      movie.forEach((e) => {
        cards += showCard(e);
      });
      $(".movie-container").html(cards);

      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url: "http://www.omdbapi.com/?apikey=9ffa246&i=" + $(this).data("imdbid"),
          success: (m) => {
            const movieData = showMovie(m);
            $(".modal-body").html(movieData);
          },
          error: (m) => {
            console.log(m.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showCard(e) {
  return `<div class="col-md-4 my-3">
    <div class="card">
      <img src=${e.Poster} class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">${e.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${e.Year}</h6>
        <button type="button" class="btn  modal-detail-button" data-bs-toggle="modal" data-bs-target="#details" data-imdbid="${e.imdbID}">Show Details</button>
      </div>
    </div>
  </div>`;
}

function showMovie(m) {
  return ` <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 ms-2">
        <img src=${m.Poster} class="img-fluid" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
          <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
          <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
          <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
          <li class="list-group-item"><strong>Plot : </strong> <br /> ${m.Plot}</li>
        </ul>
      </div>
    </div>
  </div>`;
}
