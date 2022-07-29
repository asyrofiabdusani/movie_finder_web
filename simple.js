const card = document.querySelector('.main-container');
const search = document.querySelector('.search-input');
const searchButton = document.querySelector('.button-search');

searchButton.addEventListener('click', searchMovies);

function searchMovies() {
    fetch(`http://www.omdbapi.com/?apikey=a0861315&s=${search.value}`)
        .then((response) => response.json())
        .then((data) => showResult(data.Search))
        .catch(() => showResult(false))
}

function showResult(movies) {
    if (!movies) {
        searchMovies();
    } else {
        let moviesList = '';
        movies.forEach(e => {
            fetch(`http://www.omdbapi.com/?apikey=a0861315&i=${e.imdbID}`)
                .then((response) => response.json())
                .then((jsonFile) => {
                    console.log(jsonFile);
                    moviesList += showList(e, jsonFile.imdbRating, jsonFile.Runtime);

                    card.innerHTML = moviesList;

                    const detailsButton = document.querySelectorAll('.details-button');

                    detailsButton.forEach(function (e) {
                        e.addEventListener('click', function () {
                            fetch(`http://www.omdbapi.com/?apikey=a0861315&i=${e.value}`)
                                .then((response) => response.json())
                                .then((jsonFile) => showDetail(jsonFile))
                                .catch(function () {
                                    return false;
                                });
                        });
                    });
                });
        })
    }
};

function showList(movies, rating, dura) {
    return `<div class="card shadow bg-body cardd" style="width: 18rem">
        <div class="rating">${rating}</div>
        <div class="dura">${dura}</div>
        <img
        src="${movies.Poster}"
        class="img-fluid image gbr"
        />
        <div class="card-body border-top">
        <h5 class="card-title">${movies.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${movies.Year}</h6>
            <button
                type="button"
                class="btn btn-primary details-button"
                data-bs-toggle="modal"
                data-bs-target="#details"
                value = ${movies.imdbID}>
                Details
            </button>
        </div>
    </div>`;
}

function showDetail(detailMovie) {
    const modalTitle = document.querySelector('.modal-title');
    const modalYear = document.querySelector('.modal-year');
    const modalBody1 = document.querySelector('.modal-body-1');
    const modalBody2 = document.querySelector('.modal-body-2');
    const modalBody3 = document.querySelector('.modal-body-3');

    modalTitle.innerHTML = detailMovie.Title;
    modalYear.innerHTML = detailMovie.Year;
    modalBody1.innerHTML = `Actors : <br>
    ${detailMovie.Actors} `;
    modalBody2.innerHTML = `Plot : <br>
    ${detailMovie.Plot} `;
    modalBody3.innerHTML = `Genre : <br>
    ${detailMovie.Genre} `;
}



