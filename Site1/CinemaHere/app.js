(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var routes = ['home', 'new', 'contacts', 'episodes', 'movie', 'plans'];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var assets = window.CINEMAHERE_ASSETS || {};
  var media = window.CINEMAHERE_MEDIA || { films: {}, series: {}, anime: {} };
  var films = [
    { id:'film-1', title:'Название фильма', meta:'Драма · 2026', hue:215, year:'2026', genre:'Драма', duration:'1 ч 54 мин', age:'16+', description:'Здесь будет описание сюжета: о чём фильм, кто главные герои и почему его стоит посмотреть. Текст можно заменить на любой.', credits:'В ролях: Имя Фамилия, Имя Фамилия. Режиссёр: Имя Фамилия.', rating:'4.5' },
    { id:'film-2', title:'Название фильма', meta:'Триллер · 2025', hue:260, year:'2025', genre:'Триллер', duration:'1 ч 48 мин', age:'18+', description:'История о тайне, которая постепенно меняет жизнь героев. Замените описание на сюжет вашего фильма.', credits:'В ролях: Имя Фамилия. Режиссёр: Имя Фамилия.', rating:'4.7' },
    { id:'film-3', title:'Название фильма', meta:'Комедия · 2026', hue:190, year:'2026', genre:'Комедия', duration:'1 ч 32 мин', age:'12+', description:'Лёгкая история о неожиданных встречах и важных решениях.', credits:'В ролях: Имя Фамилия. Режиссёр: Имя Фамилия.', rating:'4.2' },
    { id:'film-4', title:'Название фильма', meta:'Фантастика · 2026', hue:235, year:'2026', genre:'Фантастика', duration:'2 ч 06 мин', age:'16+', description:'Приключение в мире будущего. Добавьте здесь собственный синопсис.', credits:'В ролях: Имя Фамилия. Режиссёр: Имя Фамилия.', rating:'4.8' },
    { id:'film-5', title:'Название фильма', meta:'Приключения · 2024', hue:205, year:'2024', genre:'Приключения', duration:'1 ч 57 мин', age:'12+', description:'Путешествие, которое станет главным испытанием для героев.', credits:'В ролях: Имя Фамилия. Режиссёр: Имя Фамилия.', rating:'4.4' },
    { id:'film-6', title:'Название фильма', meta:'Детектив · 2025', hue:245, year:'2025', genre:'Детектив', duration:'1 ч 51 мин', age:'16+', description:'Запутанное расследование и несколько неожиданных поворотов.', credits:'В ролях: Имя Фамилия. Режиссёр: Имя Фамилия.', rating:'4.6' }
  ];
  var series = [
    { id:'series-1', title:'Название сериала', meta:'Драма · 2026', hue:205 },
    { id:'series-2', title:'Название сериала', meta:'Детектив · 2025', hue:225 },
    { id:'series-3', title:'Название сериала', meta:'Комедия · 2026', hue:195 },
    { id:'series-4', title:'Название сериала', meta:'Триллер · 2024', hue:240 },
    { id:'series-5', title:'Название сериала', meta:'Приключения · 2025', hue:215 },
    { id:'series-6', title:'Название сериала', meta:'Фантастика · 2026', hue:255 }
  ];
  var anime = [
    { id:'anime-1', title:'Название аниме', meta:'Аниме · 2026', hue:225 },
    { id:'anime-2', title:'Название аниме', meta:'Фэнтези · 2025', hue:250 },
    { id:'anime-3', title:'Название аниме', meta:'Приключения · 2026', hue:210 },
    { id:'anime-4', title:'Название аниме', meta:'Драма · 2024', hue:235 },
    { id:'anime-5', title:'Название аниме', meta:'Фантастика · 2025', hue:195 },
    { id:'anime-6', title:'Название аниме', meta:'Комедия · 2026', hue:265 }
  ];
  var catalog = { film:films, series:series, anime:anime };
  var icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>';
  var currentMedia = { type:'film', item:films[0], episode:null, season:1 };

  function safeText(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]); }); }
  function assetPath(kind, id, fallback) {
    var map = assets[kind] || {};
    return map[id] || fallback;
  }
  function posterPath(type, item) {
    return assetPath('posters', item.id, 'assets/posters/' + item.id + '.webp');
  }
  function setLogo() {
    var img = $('siteLogoImage');
    if (img) img.src = assets.logo || 'assets/logo/cinemahere.svg';
  }

  /* ---------- storage (demo only; registration is local to this browser) ---------- */
  var mem = { user:null, session:null };
  function read(k) { try { var v = localStorage.getItem('kino_' + k); if (v !== null) return v; } catch (e) {} return mem[k]; }
  function write(k, v) { mem[k] = v; try { if (v === null) localStorage.removeItem('kino_' + k); else localStorage.setItem('kino_' + k, v); } catch (e) {} }
  function hash(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return String(h); }
  var session = read('session');
  var authed = !!session;

  /* ---------- toast ---------- */
  var tt;
  function toast(t) {
    $('toasttext').textContent = t;
    $('toast').classList.add('on');
    clearTimeout(tt);
    tt = setTimeout(function () { $('toast').classList.remove('on'); }, 3000);
  }
  function shake(el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }

  function applyAuth() {
    $('nav').classList.toggle('locked', !authed);
    $('signup').hidden = authed;
    $('welcome').hidden = !authed;
    $('homestrip').hidden = !authed;
    $('acct').hidden = !authed;
    if (authed) { $('acctmail').textContent = session; $('welcomemail').textContent = session; }
  }
  var mode = 'reg';
  function setMode(m) {
    mode = m;
    document.querySelectorAll('.seg button').forEach(function (b) { b.setAttribute('aria-selected', b.dataset.mode === m ? 'true' : 'false'); });
    $('pw2wrap').style.display = m === 'reg' ? 'grid' : 'none';
    $('signbtn').textContent = m === 'reg' ? 'Регистрация' : 'Войти';
    $('pw').autocomplete = m === 'reg' ? 'new-password' : 'current-password';
    $('signmsg').textContent = '';
  }
  document.querySelector('.seg').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) setMode(b.dataset.mode);
  });
  function err(t) { var m = $('signmsg'); m.textContent = t; m.className = 'msg err'; shake($('signup')); }
  $('signup').addEventListener('submit', function (e) {
    e.preventDefault();
    var em = $('em').value.trim().toLowerCase(), pw = $('pw').value;
    $('signmsg').className = 'msg';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) return err('Введите корректную почту.');
    if (pw.length < 6) return err('Пароль должен быть не короче 6 символов.');
    if (mode === 'reg') {
      if (pw !== $('pw2').value) return err('Пароли не совпадают.');
      write('user', JSON.stringify({ e:em, h:hash(em + pw) }));
    } else {
      var u = null;
      try { u = JSON.parse(read('user')); } catch (x) {}
      if (!u) return err('Аккаунт не найден. Сначала зарегистрируйтесь.');
      if (u.e !== em || u.h !== hash(em + pw)) return err('Неверная почта или пароль.');
    }
    session = em; write('session', em); authed = true;
    applyAuth();
    toast(mode === 'reg' ? 'Регистрация прошла успешно. Добро пожаловать!' : 'С возвращением!');
    $('signup').reset();
    location.hash = '#new';
  });
  $('logout').addEventListener('click', function () {
    write('session', null); session = null; authed = false;
    applyAuth(); setMode('login');
    toast('Вы вышли из аккаунта.');
    location.hash = '#home';
  });
  function gate() {
    toast('Сначала зарегистрируйтесь или войдите.');
    var f = $('signup');
    if (!f.hidden) { shake(f); $('em').focus({ preventScroll:true }); }
  }

  /* ---------- movie and episode data ---------- */
  function findItem(type, id) {
    var list = catalog[type] || films;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return list[0];
  }
  function setMovieScreen() {
    var item = currentMedia.item || films[0], type = currentMedia.type || 'film';
    var title = item.title;
    $('movieTitle').textContent = title + (currentMedia.episode ? ' · ' + currentMedia.episode.label : '');
    $('movieYear').textContent = item.year || item.meta.split('·').pop().trim() || '2026';
    $('movieGenre').textContent = item.genre || item.meta.split('·')[0].trim();
    $('movieDuration').textContent = currentMedia.episode ? 'Сезон ' + currentMedia.season : (item.duration || 'Сезон 1');
    $('movieAge').textContent = item.age || '16+';
    $('movieDescription').textContent = currentMedia.episode ? 'Эпизод ' + currentMedia.episode.number + ': ' + (currentMedia.episode.description || 'Описание серии можно изменить в настройках каталога.') : (item.description || 'Описание появится здесь.');
    $('movieCredits').textContent = item.credits || 'Нажмите «Смотреть», чтобы начать просмотр.';
    $('movieFrameCaption').textContent = currentMedia.episode ? 'кадр из серии' : 'кадр из фильма';
    $('moviePoster').style.setProperty('--h', item.hue || 215);
    var img = $('moviePosterImage');
    img.hidden = false;
    img.onerror = function () { img.hidden = true; };
    img.src = posterPath(type, item);
    $('moviePoster').querySelector('span').textContent = type === 'anime' ? 'постер аниме' : type === 'series' ? 'постер сериала' : 'постер';
    $('movieTitle').parentNode.querySelector('.rating').textContent = item.rating || '4.5';
    $('movieTitle').parentNode.querySelector('.rating').setAttribute('aria-label', 'Рейтинг ' + (item.rating || '4.5'));
  }
  function openEpisodes(type, item) {
    currentMedia = { type:type, item:item, episode:null, season:1 };
    $('episodesKind').textContent = type === 'anime' ? 'АНИМЕ' : 'СЕРИАЛ';
    $('episodesTitle').textContent = item.title;
    renderEpisodes(1);
    location.hash = '#episodes';
  }
  function renderEpisodes(season) {
    currentMedia.season = season;
    var tabs = $('seasonTabs'), grid = $('episodeGrid');
    tabs.innerHTML = '';
    [1,2].forEach(function (n) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'season-tab'; b.textContent = 'Сезон ' + n;
      b.setAttribute('aria-pressed', n === season ? 'true' : 'false'); b.dataset.season = n;
      tabs.appendChild(b);
    });
    grid.innerHTML = '';
    for (var n = 1; n <= 8; n++) {
      var episodeId = 's' + String(season).padStart(2,'0') + 'e' + String(n).padStart(2,'0');
      var label = 'Серия ' + n;
      var card = document.createElement('button');
      card.type = 'button'; card.className = 'episode-card'; card.dataset.episodePlay = episodeId;
      var stills = assets.episodes || {};
      var still = stills[currentMedia.type + '/' + currentMedia.item.id + '/' + episodeId] || 'assets/episodes/' + currentMedia.type + '/' + currentMedia.item.id + '/' + episodeId + '.webp';
      card.innerHTML = '<div class="episode-still"><span class="episode-number">' + String(n).padStart(2,'0') + '</span><span class="episode-still-placeholder">КАДР СЕРИИ</span><img src="' + safeText(still) + '" alt="" onerror="this.hidden=true"><span class="episode-play" aria-hidden="true">▶</span></div><div class="episode-copy"><b>' + label + '</b><small>Сезон ' + season + ' · ' + (n + 20) + ' мин</small></div>';
      grid.appendChild(card);
    }
  }
  $('seasonTabs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-season]');
    if (b) renderEpisodes(+b.dataset.season);
  });

  /* ---------- playable video sources ---------- */
  function mediaUrl(kind) {
    var type = currentMedia.type, item = currentMedia.item, entry = (media[type === 'film' ? 'films' : type] || {})[item.id] || {};
    if (kind === 'trailer') return entry.trailer || '';
    if (type === 'film') return entry.movie || '';
    return (entry.episodes || {})[currentMedia.episode ? currentMedia.episode.id : ''] || '';
  }
  function openPlayer(kind) {
    var src = mediaUrl(kind);
    var video = $('playerVideo'), hint = $('playerHint'), dialog = $('playerDialog');
    video.pause(); video.removeAttribute('src'); video.load();
    if (src) {
      hint.hidden = true; video.hidden = false; video.src = src; video.load();
      dialog.showModal();
      var promise = video.play();
      if (promise && promise.catch) promise.catch(function () {});
    } else {
      video.hidden = true; hint.hidden = false;
      hint.textContent = kind === 'trailer'
        ? 'Трейлер пока не добавлен. Положите видео в assets/videos/trailers и укажите путь в media-config.js.'
        : 'Видео пока не добавлено. Положите файл в assets/videos и укажите путь к нему в media-config.js.';
      dialog.showModal();
    }
  }
  $('watchTrailer').addEventListener('click', function () { openPlayer('trailer'); });
  $('watchMovie').addEventListener('click', function () { openPlayer('movie'); });
  $('playerClose').addEventListener('click', function () { $('playerDialog').close(); });
  $('playerDialog').addEventListener('click', function (e) {
    if (e.target === $('playerDialog')) $('playerDialog').close();
  });
  $('playerDialog').addEventListener('close', function () { $('playerVideo').pause(); });

  /* ---------- routing ---------- */
  var current = 'home';
  function route() {
    var h = (location.hash || (authed ? '#new' : '#home')).slice(1);
    if (routes.indexOf(h) < 0) h = 'home';
    if (authed && h === 'home') { h = 'new'; try { history.replaceState(null, '', '#new'); } catch (x) {} }
    if (!authed && h !== 'home') {
      try { history.replaceState(null, '', '#home'); } catch (x) { location.hash = '#home'; return; }
      h = 'home'; gate();
    }
    var sid = h === 'contacts' ? 'new' : h;
    document.body.classList.toggle('movie-active', sid === 'movie');
    if (sid === 'movie') setMovieScreen();
    var changed = sid !== current;
    if (changed) {
      document.querySelectorAll('[data-screen]').forEach(function (s) { s.hidden = s.id !== sid; });
      current = sid;
      window.scrollTo({ top:0, behavior:'instant' });
    }
    document.querySelectorAll('#nav a').forEach(function (a) {
      var section = h === 'episodes' || h === 'movie' ? 'new' : h;
      if (a.dataset.p === section) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (h === 'contacts') requestAnimationFrame(function () { $('contacts-block').scrollIntoView({ behavior:reduce ? 'auto' : 'smooth', block:'start' }); });
    else if (!changed) window.scrollTo({ top:0, behavior:reduce ? 'auto' : 'smooth' });
    autoplay(sid === 'new');
  }
  window.addEventListener('hashchange', route);

  /* ---------- catalog shelves and search ---------- */
  function cardMarkup(type, item, index) {
    var poster = posterPath(type, item);
    return '<button class="card rise" style="--d:' + (index + 1) + '" type="button" data-open-item data-item-type="' + type + '" data-item-id="' + item.id + '" data-search="' + safeText(item.title + ' ' + item.meta) + '"><div class="poster" style="--h:' + item.hue + '"><img class="poster-image" src="' + safeText(poster) + '" alt="" onerror="this.hidden=true" loading="lazy">' + icon + '<span>постер</span></div><b>' + safeText(item.title) + '</b><em>' + safeText(item.meta) + '</em></button>';
  }
  document.querySelectorAll('[data-shelf]').forEach(function (el, n) {
    var type = el.dataset.shelf === '2' ? 'series' : el.dataset.shelf === '3' ? 'anime' : 'film';
    var list = catalog[type];
    var html = '';
    for (var i = 0; i < 5; i++) html += cardMarkup(type, list[(i + n) % list.length], i);
    el.innerHTML = html;
  });
  document.addEventListener('click', function (e) {
    var ep = e.target.closest('[data-episode-play]');
    if (!ep) return;
    currentMedia.episode = { id:ep.dataset.episodePlay, number:+ep.dataset.episodePlay.slice(-2), label:'Серия ' + (+ep.dataset.episodePlay.slice(-2)), description:'' };
    currentMedia.season = +ep.dataset.episodePlay.slice(1,3);
    location.hash = '#movie';
  });
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-open-item]');
    if (!c) return;
    e.preventDefault();
    if (!authed) return gate();
    var type = c.dataset.itemType, item = findItem(type, c.dataset.itemId);
    if (type === 'film') {
      currentMedia = { type:type, item:item, episode:null, season:1 };
      location.hash = '#movie';
    } else openEpisodes(type, item);
  });

  $('catalogSearch').addEventListener('input', function () {
    var q = this.value.trim().toLocaleLowerCase('ru');
    var visible = 0;
    document.querySelectorAll('#new [data-open-item]').forEach(function (card) {
      var match = !q || card.dataset.search.toLocaleLowerCase('ru').indexOf(q) >= 0;
      card.hidden = !match;
      if (match) visible++;
    });
    document.querySelectorAll('[data-collection]').forEach(function (row) {
      row.hidden = !!q && !row.querySelector('[data-open-item]:not([hidden])');
    });
    $('clearSearch').hidden = !q;
    $('searchStatus').textContent = q ? (visible ? 'Найдено карточек: ' + visible : 'Ничего не найдено') : 'Поиск по каталогу';
  });
  $('clearSearch').addEventListener('click', function () {
    $('catalogSearch').value = '';
    $('catalogSearch').dispatchEvent(new Event('input'));
    $('catalogSearch').focus();
  });

  /* ---------- carousel ---------- */
  var N = 5, cur = 0, paused = false, timer = null;
  var track = $('track'), dotsEl = $('dots'), slides = [], dots = [];
  for (var i = 0; i < N; i++) {
    var f = films[i], s = document.createElement('div');
    s.className = 'slide'; s.dataset.i = i; s.style.setProperty('--h', f.hue);
    s.innerHTML = '<div class="frame">' + icon + '<b>Главное</b><em>' + safeText(f.title + ' · ' + f.meta) + '</em><a class="btn primary go" href="#movie" tabindex="-1" data-open-item data-item-type="film" data-item-id="' + f.id + '">Смотреть</a></div>';
    track.appendChild(s); slides.push(s);
    var d = document.createElement('button');
    d.type = 'button'; d.dataset.i = i; d.setAttribute('aria-label', 'Слайд ' + (i + 1));
    dotsEl.appendChild(d); dots.push(d);
  }
  var SC = [1,0.84,0.68], OP = [1,0.55,0];
  function layout() {
    slides.forEach(function (s, i) {
      var o = ((i - cur + N + 2) % N) - 2, a = Math.abs(o);
      s.style.setProperty('--o', o); s.style.setProperty('--s', SC[a]); s.style.setProperty('--op', OP[a]);
      s.style.zIndex = 10 - a; s.classList.toggle('main', a === 0); s.classList.toggle('far', a === 2);
      s.setAttribute('aria-hidden', a === 2 ? 'true' : 'false'); s.tabIndex = a === 1 ? 0 : -1;
      s.querySelector('.go').tabIndex = a === 0 ? 0 : -1;
      dots[i].setAttribute('aria-current', i === cur ? 'true' : 'false');
    });
    $('count').textContent = (cur + 1) + ' из ' + N;
  }
  function go(n) { cur = (n + N) % N; layout(); }
  track.addEventListener('click', function (e) {
    var s = e.target.closest('.slide');
    if (s && !s.classList.contains('main') && !s.classList.contains('far')) go(+s.dataset.i);
  });
  track.addEventListener('keydown', function (e) {
    var s = e.target.closest('.slide');
    if (s && !s.classList.contains('main') && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); go(+s.dataset.i); }
  });
  dotsEl.addEventListener('click', function (e) { if (e.target.dataset.i) go(+e.target.dataset.i); });
  $('prev').onclick = function () { go(cur - 1); };
  $('next').onclick = function () { go(cur + 1); };
  $('stage').addEventListener('mouseenter', function () { paused = true; });
  $('stage').addEventListener('mouseleave', function () { paused = false; });
  $('stage').addEventListener('focusin', function () { paused = true; });
  $('stage').addEventListener('focusout', function () { paused = false; });
  document.addEventListener('keydown', function (e) {
    if (current !== 'new' || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === 'ArrowLeft') go(cur - 1);
    if (e.key === 'ArrowRight') go(cur + 1);
  });
  function autoplay(on) {
    clearInterval(timer); timer = null;
    if (on && !reduce) timer = setInterval(function () { if (!paused && !document.hidden) go(cur + 1); }, 5500);
  }
  layout();

  /* ---------- plans ---------- */
  var plans = document.querySelectorAll('.plan');
  plans.forEach(function (p) {
    p.addEventListener('click', function () {
      plans.forEach(function (x) {
        var on = x === p;
        x.setAttribute('aria-pressed', on ? 'true' : 'false');
        x.querySelector('.pick').textContent = on ? 'Выбрано' : 'Выбрать';
      });
      $('paymsg').textContent = '';
    });
  });
  $('pay').addEventListener('click', function () {
    var sel = document.querySelector('.plan[aria-pressed="true"]');
    $('paymsg').textContent = sel ? 'Выбран тариф «' + sel.dataset.plan + '». Оплата в демо не подключена.' : 'Сначала выберите тариф.';
  });

  setLogo();
  applyAuth();
  setMode(authed || read('user') ? 'login' : 'reg');
  route();
})();