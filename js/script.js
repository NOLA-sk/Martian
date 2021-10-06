
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };    

    const adv = document.querySelector('.promo__adv');
    const advPicture = adv.querySelectorAll('img');
    const poster = document.querySelector('.promo__bg');
    const genre = poster.querySelector('.promo__genre');
    const movieList = document.querySelector('.promo__interactive-list');
    const addForm = document.querySelector('form.add');
    const addInput = addForm.querySelector('.adding__input');
    const checkbox = addForm.querySelector('[type="checkbox"]');
    
    const deleteAdv = (arr) => {
        arr.forEach((item) => {
            item.remove();
        });
    };
   
    const makeChanges = () => {
        genre.textContent = 'Драма';
    
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };
        
    const sortArr = (arr) => {
        arr.sort();
    };  

    function createMovieList (films, parent) {
        parent.innerHTML = "";
        sortArr(films);
    
        films.forEach((film, i) =>{
            parent.innerHTML += `
                <li class="promo__interactive-item">${i+1} ${film} 
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });
    }

    addForm.addEventListener('submit', (event) => {
        event.preventDefault(); //отменяет стандартное поведение браузера

        let newFilm =addInput.value; //записывает то, что ввел юзер
        const favorite = checkbox.checked; //записывает отмечена ли галочка

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm); //пушим то, что ввел юзер в БД
            sortArr(movieDB.movies);
    
            createMovieList(movieDB.movies, movieList);
        }
        
        event.target.reset();
    });

    deleteAdv(advPicture);       
    makeChanges();  
    createMovieList(movieDB.movies, movieList);
    
});