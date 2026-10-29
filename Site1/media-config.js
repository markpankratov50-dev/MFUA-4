/* Все пути задаются относительно index.html. Заменяйте файлы в assets или меняйте здесь путь. */
window.CINEMAHERE_ASSETS = {
  logo: "assets/logo/cinemahere.svg",
  posters: {
    "film-1": "assets/posters/1.webp", "film-2": "assets/posters/13.jpg",
    "film-3": "assets/posters/5.jpg", "film-4": "assets/posters/15.webp",
    "film-5": "assets/posters/6.webp", "film-6": "assets/posters/17.webp",
    "series-1": "assets/posters/2.webp", "series-2": "assets/posters/14.webp",
    "series-3": "assets/posters/7.jpg", "series-4": "assets/posters/21.jpg",
    "series-5": "assets/posters/8.jpg", "series-6": "assets/posters/20.jpg",
    "anime-1": "assets/posters/4.avif", "anime-2": "assets/posters/11.jpg",
    "anime-3": "assets/posters/9.jpg", "anime-4": "assets/posters/12.jpg",
    "anime-5": "assets/posters/10.jpg", "anime-6": "assets/posters/22.jpg"
  },
  episodes: {
    /* Отдельный кадр эпизода можно указать по ключу:
       "series/series-5/s01e01": "assets/Cadr/3serial.jpg" */
  },
  frames: {
    /* Фильмы */
    "film-2": "assets/Cadr/1film.jpg",
    "film-3": "assets/Cadr/010101.jpeg",
    "film-4": "assets/Cadr/3film.jpg",
    "film-5": "assets/Cadr/4film.jpg",
    "film-6": "assets/Cadr/5film.jpg",

    /* Сериалы */
    "series-3": "assets/Cadr/1serial.webp",
    "series-4": "assets/Cadr/2serial.jpg",
    "series-5": "assets/Cadr/4serial.jpg",
    "series-1": "assets/Cadr/5serial.webp",

    /* Аниме */
    "anime-4": "assets/Cadr/1Anime.jpg",
    "anime-5": "assets/Cadr/2Anime.jfif",
    "anime-6": "assets/Cadr/3Anime.jfif",
    "anime-1": "assets/Cadr/4Anime.jpg",
    "anime-2": "assets/Cadr/5Anime.png"

    /* Подходящих кадров для Менталиста, film-1 и anime-3 в Cadr нет. */
  }
};

/*
  Ссылки на трейлеры:
  - VK Видео: значение src из кода iframe (video_ext.php).
  - RUTUBE: ссылка rutube.ru/play/embed/ID или страница rutube.ru/video/ID.
  Сейчас подключены трейлеры к 6 фильмам, 6 сериалам и 2 аниме.
  Пустые поля оставлены, когда подходящий ролик на поддерживаемой площадке не удалось подтвердить.
  Ссылки на полные видео указываются через movie или episodes (см. README.md).
*/
window.CINEMAHERE_MEDIA = {
  films: {
    "film-1": { trailer: "https://rutube.ru/video/23c9f7025b5e108bdef9a8bb2628b993/", movie: "https://rutube.ru/video/afcd39060c175d534cffc7d69ea00e6c/" },
    "film-2": { trailer: "https://rutube.ru/video/1135ebdc2281e646badd2ce754fa3839/", movie: "https://rutube.ru/video/ce63edddc60fbf03f6152bdc0fd703cb/" },
    "film-3": { trailer: "https://rutube.ru/video/0406f7c38f6a0e8511de3ab893d59189/", movie: "https://rutube.ru/video/74fb252e6f3a0e6eaedb0909dc6eaf29/" },
    "film-4": { trailer: "https://rutube.ru/video/f1f999e698674de1b6ddb1b71b8aa308/", movie: "https://rutube.ru/video/7458662c635c277ec0bacd01abae1743/" },
    "film-5": { trailer: "https://rutube.ru/video/b4875ee9b7bf0601927b4cf85d1a777c/", movie: "https://rutube.ru/video/307c52af7c3e122855aea0899c247971/" },
    "film-6": { trailer: "https://rutube.ru/video/f85c5101d43fbf83e85ee6e85082d4a0/", movie: "https://rutube.ru/video/0c04896db8d35c1586c9f8941c639d7f/" }
  },
  series: {
    "series-1": { trailer: "https://rutube.ru/video/acc893f460b1711c0f27dc1c076040f9/", seasons: [10, 8, 8], episodes: {} },
    "series-2": { trailer: "https://rutube.ru/video/89ff405043e890fb1ff05ff545726458/", seasons: [13], episodes: {} },
    "series-3": { trailer: "https://rutube.ru/video/3798d1d34c9c59eaefceb3252cadbb56/", seasons: [10, 10, 10, 10, 10, 15], episodes: {} },
    "series-4": { trailer: "https://rutube.ru/video/6836b8c7f8fe8305f80881bb002f9b42/", seasons: [12, 16, 16, 16, 16, 16, 16, 16, 10], episodes: {} },
    "series-5": { trailer: "https://rutube.ru/video/fa4f9878aac647aaee278060dec2668c/", seasons: [12, 12, 12, 12, 12, 12, 12, 12], episodes: {} },
    "series-6": { trailer: "https://rutube.ru/video/0b03498c70d6b6084103033c4010efe5/", seasons: [23, 23, 24, 24, 22, 22, 13], episodes: {} }
  },
  anime: {
    "anime-1": { trailer: "https://rutube.ru/video/972f6f9c662861b0655930ceacd723a5/", seasons: [10, 10], seasonTitles: ["Сезон 1 — Бегущие по краю", "Сезон 2 — Edgerunners 2"], episodes: {} },
    "anime-2": { trailer: "https://rutube.ru/video/dbe0f3bf1aab168ab4d7d207f7321f05/", seasons: [25, 12, 22, 30], episodes: {} },
    "anime-3": { trailer: "", seasons: [26, 13], episodes: {} },
    "anime-4": { trailer: "", seasons: [37], episodes: {} },
    "anime-5": { trailer: "" },
    "anime-6": { trailer: "", seasons: [12, 12, 12], episodes: {} }
  }
};
