# CinemaHere — макет онлайн-кинотеатра

Откройте index.html в браузере. Сайт статический; изображения и видео подключаются по путям относительно index.html.

## Структура

- index.html, styles.css, app.js — страницы, оформление и поведение.
- media-config.js — пути к логотипу, постерам, кадрам серий и видео.
- assets/logo/ — логотип.
- assets/posters/ — постеры фильмов, сериалов и аниме.
- assets/episodes/ — кадры эпизодов в папках series/{id}/ и anime/{id}/.
- assets/videos/trailers/ — трейлеры.
- assets/videos/films/ — полнометражные фильмы.
- assets/videos/series/{id}/ и assets/videos/anime/{id}/ — видео серий.

## Как добавить постер или логотип

Скопируйте файл в assets/posters/ и укажите путь в media-config.js внутри CINEMAHERE_ASSETS.posters. Для первого фильма пример:

    "film-1": "assets/posters/film-1.jpg"

Можно использовать JPG, PNG или WebP. Чтобы заменить логотип, положите файл в assets/logo/ и измените поле logo в media-config.js. Для кадров серий используется ключ вида series/series-1/s01e01; файл можно положить по пути assets/episodes/series/series-1/s01e01.webp.

## Как подключить видео

Положите видеофайл в нужную папку assets/videos/. Для совместимости браузеров предпочтителен MP4 с видео H.264 и аудио AAC. Затем в media-config.js укажите относительный путь к файлу:

    films: {
      "film-1": {
        trailer: "assets/videos/trailers/film-1.mp4",
        movie: "assets/videos/films/film-1.mp4"
      }
    }

Для сериала или аниме добавьте объект episodes, где ключ — номер сезона и серии:

    "series-1": {
      trailer: "assets/videos/trailers/series-1.mp4",
      episodes: { "s01e01": "assets/videos/series/series-1/s01e01.mp4" }
    }

Та же структура работает для anime. Пользователь открывает сериал или аниме, выбирает сезон и пронумерованную серию, затем видео запускается на экране просмотра. Кадры миниатюр серий можно заменить в assets/episodes/.

## Ограничения макета

Регистрация демонстрационная: учётная запись хранится только в localStorage этого браузера. Для настоящего сайта нужны серверная авторизация и защищённое хранение. Оплата не подключена. Публикуйте только видео, на которые у вас есть права; для большого каталога используйте видеохостинг или CDN.