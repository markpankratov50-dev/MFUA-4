(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var routes = ['home', 'new', 'contacts', 'episodes', 'movie', 'favorites', 'clapper', 'plans'];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var assets = window.CINEMAHERE_ASSETS || {};
  var media = window.CINEMAHERE_MEDIA || { films: {}, series: {}, anime: {} };
  var films = [
    { id:'film-1', title:'Форсаж 10', meta:'Боевик · 2023', hue:215, year:'2023', genre:'Боевик', duration:'2 ч 21 мин', age:'16+', description:'Доминик Торетто и его семья становятся мишенью Данте Рейеса, сына наркобарона, с которым они столкнулись в прошлом. Данте годами готовил месть и теперь превращает жизнь героев в гонку по всему миру. Доминику предстоит защитить близких и снова собрать команду.', credits:'В ролях: Вин Дизель, Мишель Родригес, Джейсон Момоа. Режиссёр: Луи Летерье.', rating:'6.0' },
    { id:'film-2', title:'Гори, гори, ясно!', meta:'Ужасы · 2019', hue:260, year:'2019', genre:'Ужасы, фантастика', duration:'1 ч 30 мин', age:'18+', description:'Супруги из Канзаса находят младенца после падения загадочного космического корабля и растят его как родного сына. Когда у мальчика начинают проявляться необычные способности, родители пытаются помочь ему справиться с ними. Постепенно становится ясно, что сила ребёнка несёт смертельную угрозу окружающим.', credits:'В ролях: Джексон Данн, Элизабет Бэнкс, Дэвид Денман. Режиссёр: Дэвид Яровески.', rating:'5.9' },
    { id:'film-3', title:'Тёмный рыцарь', meta:'Боевик · 2008', hue:190, year:'2008', genre:'Боевик, фантастика', duration:'2 ч 32 мин', age:'16+', description:'Бэтмен, комиссар Гордон и прокурор Харви Дент объединяются, чтобы очистить Готэм от преступности. Их план рушит Джокер — преступник, который превращает город в арену жестоких испытаний. Чтобы остановить хаос, Брюсу Уэйну придётся столкнуться с пределами собственной веры в справедливость.', credits:'В ролях: Кристиан Бэйл, Хит Леджер, Аарон Экхарт. Режиссёр: Кристофер Нолан.', rating:'8.5' },
    { id:'film-4', title:'Топ Ган', meta:'Боевик · 1986', hue:235, year:'1986', genre:'Боевик, драма', duration:'1 ч 50 мин', age:'12+', description:'Пит «Мэверик» Митчелл попадает в элитную школу пилотов ВМС США, где лучшие лётчики соревнуются за право стать первыми. Его талант помогает ему побеждать, но самоуверенность осложняет отношения с товарищами и инструкторами. Мэверику предстоит научиться доверять команде и справиться с тяжёлым наследием отца.', credits:'В ролях: Том Круз, Келли Макгиллис, Вэл Килмер. Режиссёр: Тони Скотт.', rating:'7.1' },
    { id:'film-5', title:'Матрица', meta:'Фантастика · 1999', hue:205, year:'1999', genre:'Фантастика, боевик', duration:'2 ч 16 мин', age:'16+', description:'Программист и хакер Томас Андерсон подозревает, что привычная реальность скрывает нечто большее. Морфеус и Тринити открывают ему правду о Матрице и мире, в котором человечество оказалось пленником машин. Нео должен решить, готов ли он проснуться и принять роль в борьбе за свободу людей.', credits:'В ролях: Киану Ривз, Лоренс Фишберн, Кэрри-Энн Мосс. Режиссёры: Лана и Лилли Вачовски.', rating:'8.5' },
    { id:'film-6', title:'Волк с Уолл-стрит', meta:'Драма · 2013', hue:245, year:'2013', genre:'Драма, криминал', duration:'3 ч', age:'18+', description:'Молодой брокер Джордан Белфорт быстро строит успешную компанию и превращает торговлю акциями в источник огромного состояния. За роскошной жизнью скрываются обман клиентов, рискованные сделки и всё более разрушительные привычки. Чем выше поднимается Белфорт, тем пристальнее за ним наблюдают следователи.', credits:'В ролях: Леонардо ДиКаприо, Джона Хилл, Марго Робби. Режиссёр: Мартин Скорсезе.', rating:'8.1' }
  ];
  var series = [
    { id:'series-1', title:'Дом Дракона', meta:'Фэнтези · 2022', hue:205, year:'2022', genre:'Фэнтези, драма', age:'18+', rating:'8.1', description:'За несколько поколений до событий «Игры престолов» дом Таргариенов правит Вестеросом, опираясь на силу драконов. После спора о наследовании короны двор раскалывается между принцессой Рейнирой и королевой Алисентой. Семейное противостояние постепенно перерастает в войну, способную изменить судьбу всего королевства.', credits:'В ролях: Эмма Д’Арси, Мэтт Смит, Оливия Кук.' },
    { id:'series-2', title:'Форс-мажоры: Лос-Анджелес', meta:'Драма · 2025', hue:225, year:'2025', genre:'Драма, юридический', age:'16+', rating:'6.0', description:'Бывший федеральный прокурор Тед Блэк начинает новую карьеру в Лос-Анджелесе и представляет интересы влиятельных клиентов. Его юридическая фирма переживает кризис, поэтому Теду приходится заново выстраивать команду и бороться за её будущее. Деловые интриги осложняются личными конфликтами и непростым прошлым героев.', credits:'В ролях: Стивен Амелл, Лекс Скотт Дэвис, Джош Макдермитт.' },
    { id:'series-3', title:'Кобра Кай', meta:'Драма · 2018', hue:195, year:'2018', genre:'Драма, комедия, спорт', age:'12+', rating:'8.0', description:'Спустя десятилетия после школьного турнира Джонни Лоуренс решает открыть додзё «Кобра Кай» и начать жизнь заново. Его возвращение снова сталкивает его с Дэниелом ЛаРуссо, который давно построил успешную жизнь и старается следовать урокам мистера Мияги. Старое соперничество втягивает в себя новое поколение учеников, которым предстоит выбрать собственный путь.', credits:'В ролях: Ральф Маччио, Уильям Забка, Соло Маридуэнья.' },
    { id:'series-4', title:'Форс-мажоры', meta:'Драма · 2011', hue:240, year:'2011', genre:'Драма, комедия', age:'18+', rating:'8.5', description:'Майк Росс обладает феноменальной памятью, но не имеет юридического образования и скрывает это от коллег. Адвокат Харви Спектер всё же берёт его в свою команду, и вместе они ведут сложные дела крупной фирмы в Нью-Йорке. Рабочие победы и конфликты проверяют их партнёрство и секрет, который может разрушить карьеру Майка.', credits:'В ролях: Гэбриел Махт, Патрик Джей Адамс, Сара Рафферти.' },
    { id:'series-5', title:'Декстер', meta:'Детектив · 2006', hue:215, year:'2006', genre:'Триллер, криминал, детектив', age:'18+', rating:'8.3', description:'Декстер Морган работает экспертом по брызгам крови в полиции Майами и помогает раскрывать убийства. За пределами работы он сам ведёт тайную жизнь серийного убийцы, выбирая жертв среди тех, кому удалось избежать правосудия. Правила, которым его научил отец, помогают ему скрываться, пока расследования и личные отношения подбираются всё ближе.', credits:'В ролях: Майкл С. Холл, Дженнифер Карпентер, Джеймс Римар.' },
    { id:'series-6', title:'Менталист', meta:'Детектив · 2008', hue:255, year:'2008', genre:'Триллер, детектив, драма', age:'16+', rating:'8.1', description:'Патрик Джейн помогает Калифорнийскому бюро расследований раскрывать преступления благодаря наблюдательности и тонкому знанию человеческой психологии. Его остроумие и нестандартные методы часто раздражают коллег, но помогают находить важные зацепки. Главная личная цель Джейна — выйти на серийного убийцу по прозвищу Красный Джон.', credits:'В ролях: Саймон Бейкер, Робин Танни, Тим Кэнг.' }
  ];
  var anime = [
    { id:'anime-1', title:'Киберпанк: Бегущие по краю', meta:'Аниме · 2022', hue:225, year:'2022', genre:'Аниме, фантастика, боевик', age:'18+', rating:'7.9', description:'В Найт-Сити подросток Дэвид Мартинес пытается выжить в мире, где технологии и кибернетические импланты доступны не всем. После личной трагедии он устанавливает экспериментальный имплант и присоединяется к команде наёмников. Чем глубже Дэвид погружается в жизнь «бегущего по краю», тем выше цена его силы и амбиций.', credits:'В ролях: Кэнъитиро Охаси, Аои Юки, Кэндзиро Цуда.' },
    { id:'anime-2', title:'Атака титанов', meta:'Фэнтези · 2013', hue:250, year:'2013', genre:'Аниме, фэнтези, боевик', age:'18+', rating:'8.7', description:'Люди укрываются за высокими стенами, спасаясь от титанов — существ, которые охотятся на человека. После нападения на родной город Эрен Йегер вступает в разведкорпус, чтобы сражаться с чудовищами и защитить оставшихся близких. По мере опасных вылазок герои узнают, что история титанов и устройство мира сложнее, чем казалось.', credits:'В ролях: Юки Кадзи, Юи Исикава, Марина Иноуэ.' },
    { id:'anime-3', title:'Баки', meta:'Аниме · 2018', hue:210, year:'2018', genre:'Аниме, боевик, спорт', age:'18+', rating:'7.3', description:'Баки Ханма с детства тренируется, чтобы однажды превзойти своего отца Юдзиро — сильнейшего бойца на планете. Его ждут поединки с опасными противниками, каждый из которых проверяет не только силу, но и выдержку. За зрелищными боями стоит личная цель Баки — доказать, что он способен сам выбрать, кем стать.', credits:'В ролях: Нобунага Симадзаки, Акио Оцука, Такэхито Коясу.' },
    { id:'anime-4', title:'Тетрадь смерти', meta:'Детектив · 2006', hue:235, year:'2006', genre:'Аниме, триллер, детектив', age:'18+', rating:'8.6', description:'Старшеклассник Лайт Ягами находит тетрадь, владелец которой может убить человека, записав его имя. Решив избавить мир от преступников, Лайт начинает скрытую кампанию и привлекает внимание загадочного детектива L. Их противостояние превращается в интеллектуальную дуэль и ставит вопрос о цене справедливости.', credits:'В ролях: Мамору Мияно, Каппэй Ямагути, Сидо Накамура.' },
    { id:'anime-5', title:'Наруто', meta:'Аниме · 2002', hue:195, year:'2002', genre:'Аниме, фэнтези, боевик', age:'12+', rating:'7.8', description:'Наруто Узумаки — шумный юный ниндзя, который мечтает стать Хокагэ и добиться признания жителей своей деревни. Вместе с товарищами по команде он учится работать сообща, осваивает боевые техники и проходит первые серьёзные испытания. На пути к мечте Наруто сталкивается с соперничеством, опасными врагами и решениями, которые меняют его самого.', credits:'В ролях: Дзюнко Такэути, Тиэ Накамура, Нориаки Сугияма.' },
    { id:'anime-6', title:'Ванпанчмен', meta:'Аниме · 2015', hue:265, year:'2015', genre:'Аниме, комедия, фантастика', age:'18+', rating:'8.3', description:'Сайтама так усердно тренировался, что теперь побеждает любого противника одним ударом. Вместе с киборгом Геносом он вступает в Ассоциацию героев, которая распределяет задания и оценивает их подвиги. Сайтама ищет достойный вызов, а вокруг него появляются монстры, герои и ситуации, высмеивающие привычные правила супергеройских историй.', credits:'В ролях: Макото Фурукава, Кайто Исикава, Аои Юки.' }
  ];
  var catalog = { film:films, series:series, anime:anime };
  var icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>';
  var currentMedia = { type:'film', item:films[0], episode:null, season:1 };
  var favoriteMap = {};
  var favoriteLoadError = '';

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

  function favoriteKey(type, id) { return type + ':' + id; }
  function isFavorite(type, id) { return !!favoriteMap[favoriteKey(type, id)]; }
  function favoriteButtonMarkup(type, item) {
    var selected = isFavorite(type, item.id);
    var label = selected ? 'Убрать из избранного' : 'Добавить в избранное';
    return '<button class="favorite-toggle" type="button" data-favorite-toggle data-item-type="' + type + '" data-item-id="' + safeText(item.id) + '" aria-label="' + label + '" title="' + label + '" aria-pressed="' + (selected ? 'true' : 'false') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg></button>';
  }
  function renderFavorites() {
    var grid = $('favoritesGrid');
    if (!grid) return;
    grid.replaceChildren();
    var entries = Object.keys(favoriteMap).map(function (key) {
      var saved = favoriteMap[key], item = saved && findItem(saved.item_type, saved.item_id);
      return item ? { type:saved.item_type, item:item, created_at:saved.created_at || '' } : null;
    }).filter(Boolean);
    entries.sort(function (a, b) { return Date.parse(b.created_at || '') - Date.parse(a.created_at || ''); });
    $('favoritesTotal').textContent = entries.length + (entries.length === 1 ? ' позиция' : entries.length >= 2 && entries.length <= 4 ? ' позиции' : ' позиций');
    $('favoritesCount').textContent = String(entries.length);
    $('favoritesMessage').hidden = !favoriteLoadError;
    $('favoritesMessage').textContent = favoriteLoadError;
    if (!entries.length && !favoriteLoadError) {
      var empty = document.createElement('div');
      empty.className = 'favorites-empty';
      empty.innerHTML = '<span class="favorites-empty-mark" aria-hidden="true">♡</span><b>Пока здесь пусто</b><span>Нажимай сердечко на карточке фильма или сериала — он появится в этой подборке.</span><a class="btn primary" href="#new">Открыть каталог</a>';
      grid.appendChild(empty);
      return;
    }
    entries.forEach(function (entry, index) {
      var holder = document.createElement('div');
      holder.innerHTML = cardMarkup(entry.type, entry.item, index);
      grid.appendChild(holder.firstElementChild);
    });
    refreshFavoriteButtons();
  }
  function refreshFavoriteButtons() {
    document.querySelectorAll('[data-favorite-toggle]').forEach(function (button) {
      var selected = isFavorite(button.dataset.itemType, button.dataset.itemId);
      var label = selected ? 'Убрать из избранного' : 'Добавить в избранное';
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
      button.setAttribute('aria-label', label);
      button.title = label;
    });
    if ($('favoritesCount')) $('favoritesCount').textContent = String(Object.keys(favoriteMap).length);
  }
  async function loadFavorites() {
    favoriteLoadError = '';
    favoriteMap = {};
    if (!backendConfigured || !authed) {
      renderFavorites();
      refreshFavoriteButtons();
      return;
    }
    try {
      var token = await accessToken();
      var params = new URLSearchParams({ select:'item_type,item_id,created_at', order:'created_at.desc' });
      var rows = await backendRequest('/rest/v1/favorites?' + params.toString(), { method:'GET' }, token);
      favoriteMap = {};
      (Array.isArray(rows) ? rows : []).forEach(function (row) {
        favoriteMap[favoriteKey(row.item_type, row.item_id)] = row;
      });
    } catch (error) {
      favoriteLoadError = 'Не удалось загрузить избранное. Запусти supabase-favorites.sql в SQL Editor и проверь подключение.';
    }
    renderFavorites();
    refreshFavoriteButtons();
  }
  async function toggleFavorite(type, id) {
    if (!authed) return gate();
    if (!backendConfigured) return toast('Сначала подключи Supabase.');
    var key = favoriteKey(type, id), old = favoriteMap[key] || null, adding = !old;
    var buttons = Array.from(document.querySelectorAll('[data-favorite-toggle]')).filter(function (button) {
      return button.dataset.itemType === type && button.dataset.itemId === id;
    });
    buttons.forEach(function (button) { button.disabled = true; });
    if (adding) favoriteMap[key] = { item_type:type, item_id:id, created_at:new Date().toISOString() };
    else delete favoriteMap[key];
    renderFavorites();
    refreshFavoriteButtons();
    try {
      var token = await accessToken();
      if (adding) {
        await backendRequest('/rest/v1/favorites', {
          method:'POST', headers:{ Prefer:'return=minimal' },
          body:JSON.stringify({ user_id:session.user.id, item_type:type, item_id:id })
        }, token);
        toast('Добавлено в избранное.');
      } else {
        var params = new URLSearchParams({ user_id:'eq.' + session.user.id, item_type:'eq.' + type, item_id:'eq.' + id });
        await backendRequest('/rest/v1/favorites?' + params.toString(), { method:'DELETE' }, token);
        toast('Убрано из избранного.');
      }
      favoriteLoadError = '';
    } catch (error) {
      if (old) favoriteMap[key] = old; else delete favoriteMap[key];
      favoriteLoadError = 'Избранное не подключено. Запусти supabase-favorites.sql в Supabase.';
      toast(favoriteLoadError);
    } finally {
      renderFavorites();
      refreshFavoriteButtons();
      document.querySelectorAll('[data-favorite-toggle]').forEach(function (button) {
        if (button.dataset.itemType === type && button.dataset.itemId === id) button.disabled = false;
      });
    }
  }

  /* ---------- local preferences and shared account service ---------- */
  var mem = { user:null, session:null };
  function read(k) { try { var v = localStorage.getItem('kino_' + k); if (v !== null) return v; } catch (e) {} return mem[k]; }
  function write(k, v) { mem[k] = v; try { if (v === null) localStorage.removeItem('kino_' + k); else localStorage.setItem('kino_' + k, v); } catch (e) {} }
  var authConfig = window.CINEMAHERE_SUPABASE || {};
  var authBase = String(authConfig.url || '').trim().replace(/\/+$/, '');
  var authKey = String(authConfig.anonKey || '').trim();
  var backendConfigured = /^https?:\/\//i.test(authBase) && authKey && authBase.indexOf('ВСТАВЬТЕ_') < 0 && authKey.indexOf('ВСТАВЬТЕ_') < 0;
  var session = null;
  var authed = false;

  function backendRequest(path, options, token) {
    options = options || {};
    var headers = Object.assign({}, options.headers || {}, { apikey:authKey });
    if (token) headers.Authorization = 'Bearer ' + token;
    else delete headers.Authorization;
    if (options.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json';
    return fetch(authBase + path, Object.assign({}, options, { headers:headers })).then(function (response) {
      return response.text().then(function (raw) {
        var data = null;
        try { data = raw ? JSON.parse(raw) : null; } catch (e) { data = { message:raw }; }
        if (!response.ok) {
          var error = new Error((data && (data.msg || data.message || data.error_description || data.error)) || 'Запрос не выполнен.');
          error.status = response.status;
          throw error;
        }
        return data;
      });
    });
  }
  function saveSession(value) {
    session = value;
    authed = !!(session && session.access_token && session.user);
    write('authSession', session ? JSON.stringify(session) : null);
  }
  function sessionFromResponse(data) {
    if (!data || !data.access_token || !data.refresh_token) return null;
    return {
      access_token:data.access_token,
      refresh_token:data.refresh_token,
      token_type:data.token_type || 'bearer',
      expires_at:data.expires_at || (Math.floor(Date.now() / 1000) + (+data.expires_in || 3600)),
      user:data.user || null
    };
  }
  async function refreshSession() {
    if (!session || !session.refresh_token) throw new Error('Сеанс завершён. Войдите ещё раз.');
    var data = await backendRequest('/auth/v1/token?grant_type=refresh_token', {
      method:'POST', body:JSON.stringify({ refresh_token:session.refresh_token })
    });
    var refreshed = sessionFromResponse(data);
    if (!refreshed) throw new Error('Не удалось обновить сеанс. Войдите ещё раз.');
    saveSession(refreshed);
    return session.access_token;
  }
  async function accessToken() {
    if (!session || !session.access_token) throw new Error('Сначала войдите в аккаунт.');
    if (+session.expires_at * 1000 < Date.now() + 60000) await refreshSession();
    return session.access_token;
  }
  async function restoreAuth() {
    var callback = new URLSearchParams(location.hash.replace(/^#/, ''));
    var callbackToken = callback.get('access_token');
    var callbackRefresh = callback.get('refresh_token');
    if (callbackToken && callbackRefresh) {
      session = {
        access_token:callbackToken,
        refresh_token:callbackRefresh,
        token_type:callback.get('token_type') || 'bearer',
        expires_at:+callback.get('expires_at') || (Math.floor(Date.now() / 1000) + (+callback.get('expires_in') || 3600)),
        user:null
      };
      var confirmedUser = await backendRequest('/auth/v1/user', { method:'GET' }, callbackToken);
      session.user = confirmedUser;
      saveSession(session);
      history.replaceState(null, '', location.pathname + location.search + '#new');
    } else {
      try { session = JSON.parse(read('authSession') || 'null'); } catch (e) { session = null; }
      if (session && session.access_token && session.refresh_token) {
        if (+session.expires_at * 1000 < Date.now() + 60000) await refreshSession();
        if (!session.user) session.user = await backendRequest('/auth/v1/user', { method:'GET' }, session.access_token);
        saveSession(session);
      } else saveSession(null);
    }
  }

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
    if (authed) {
      var email = session.user.email || '';
      var name = (session.user.user_metadata && session.user.user_metadata.display_name) || email.split('@')[0] || 'Зритель';
      $('acctmail').textContent = name;
      $('acctmail').title = email;
      $('welcomemail').textContent = name + (email ? ' · ' + email : '');
      if ($('commentOwnAvatar')) $('commentOwnAvatar').textContent = name.split(/\s+/).slice(0,2).map(function (part) { return part.charAt(0); }).join('').toLocaleUpperCase('ru');
    }
  }
  var mode = 'reg';
  function setMode(m) {
    mode = m;
    document.querySelectorAll('.seg button').forEach(function (b) { b.setAttribute('aria-selected', b.dataset.mode === m ? 'true' : 'false'); });
    $('pw2wrap').style.display = m === 'reg' ? 'grid' : 'none';
    $('displayNameWrap').hidden = m !== 'reg';
    $('signbtn').textContent = m === 'reg' ? 'Регистрация' : 'Войти';
    $('pw').autocomplete = m === 'reg' ? 'new-password' : 'current-password';
    $('signmsg').textContent = '';
  }
  document.querySelector('.seg').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) setMode(b.dataset.mode);
  });
  function err(t) { var m = $('signmsg'); m.textContent = t; m.className = 'msg err'; shake($('signup')); }
  function authError(error) {
    var message = String(error && error.message || 'Не удалось выполнить запрос.');
    if (/already registered|already exists/i.test(message)) return 'Эта почта уже зарегистрирована. Перейдите во вкладку «Вход».';
    if (/invalid login credentials/i.test(message)) return 'Проверьте почту и пароль.';
    if (/email not confirmed/i.test(message)) return 'Сначала подтвердите почту по ссылке из письма.';
    if (/failed to fetch|networkerror|load failed/i.test(message)) return 'Нет соединения с сервисом аккаунтов. Проверьте интернет и настройки подключения.';
    return message;
  }
  function setAuthBusy(busy) {
    $('signbtn').disabled = busy;
    document.querySelectorAll('.seg button').forEach(function (button) { button.disabled = busy; });
    if (busy) $('signbtn').textContent = 'Подождите…';
    else $('signbtn').textContent = mode === 'reg' ? 'Регистрация' : 'Войти';
  }
  function authNotice(message) {
    $('signmsg').textContent = message;
    $('signmsg').className = 'msg';
  }
  function commentCountLabel(count) {
    var lastTwo = count % 100, last = count % 10;
    var noun = lastTwo >= 11 && lastTwo <= 14 ? 'комментариев' : last === 1 ? 'комментарий' : last >= 2 && last <= 4 ? 'комментария' : 'комментариев';
    return count + ' ' + noun;
  }
  $('signup').addEventListener('submit', async function (e) {
    e.preventDefault();
    var em = $('em').value.trim().toLowerCase(), pw = $('pw').value;
    $('signmsg').className = 'msg';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) return err('Введите корректную почту.');
    if (pw.length < 8) return err('Пароль должен быть не короче 8 символов.');
    var isSignup = mode === 'reg';
    var displayName = $('displayName').value.trim().replace(/\s+/g, ' ');
    if (isSignup && (displayName.length < 2 || displayName.length > 32)) return err('Имя должно содержать от 2 до 32 символов.');
    if (isSignup && pw !== $('pw2').value) return err('Пароли не совпадают.');
    if (!backendConfigured) return err('Сервис аккаунтов ещё не подключён. Заполните supabase-config.js и настройте базу по инструкции в README.md.');
    setAuthBusy(true);
    try {
      var data;
      if (isSignup) {
        var redirectTo = location.origin + location.pathname + location.search;
        var signUpPath = '/auth/v1/signup?redirect_to=' + encodeURIComponent(redirectTo);
        data = await backendRequest(signUpPath, {
          method:'POST',
          body:JSON.stringify({ email:em, password:pw, data:{ display_name:displayName } })
        });
      } else {
        data = await backendRequest('/auth/v1/token?grant_type=password', {
          method:'POST', body:JSON.stringify({ email:em, password:pw })
        });
      }
      var nextSession = sessionFromResponse(data);
      if (!nextSession) {
        $('signup').reset();
        setMode('login');
        authNotice('Если адрес новый, подтвердите его по ссылке из письма, затем войдите.');
        return;
      }
      saveSession(nextSession);
      await loadFavorites();
      applyAuth();
      $('signup').reset();
      toast(isSignup ? 'Аккаунт создан. Добро пожаловать!' : 'С возвращением!');
      location.hash = '#new';
    } catch (error) {
      err(authError(error));
    } finally {
      setAuthBusy(false);
    }
  });
  $('logout').addEventListener('click', async function () {
    if (session && session.access_token && backendConfigured) {
      try { await backendRequest('/auth/v1/logout', { method:'POST' }, session.access_token); } catch (e) {}
    }
    saveSession(null);
    favoriteMap = {};
    favoriteLoadError = '';
    renderFavorites();
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
  function rememberMedia() {
    if (!currentMedia.item) return;
    write('lastMedia', JSON.stringify({
      type:currentMedia.type,
      id:currentMedia.item.id,
      season:currentMedia.season || 1,
      episode:currentMedia.episode ? currentMedia.episode.id : ''
    }));
  }
  function restoreMedia() {
    var saved = null;
    try { saved = JSON.parse(read('lastMedia') || 'null'); } catch (e) {}
    if (!saved || !catalog[saved.type]) return;
    var item = findItem(saved.type, saved.id);
    if (!item || item.id !== saved.id) return;
    var match = /^s(\d{2})e(\d{2})$/.exec(saved.episode || '');
    var season = match ? +match[1] : (+saved.season || 1);
    var episode = match ? { id:saved.episode, number:+match[2], label:'Серия ' + (+match[2]), description:'' } : null;
    currentMedia = { type:saved.type, item:item, episode:episode, season:season };
  }
  var commentLoadId = 0;
  function commentAuthor() {
    var user = session && session.user;
    return (user && user.user_metadata && user.user_metadata.display_name) || (user && user.email ? user.email.split('@')[0] : 'Зритель');
  }
  function commentStatus(message, isError) {
    var status = $('commentMessage');
    status.textContent = message || '';
    status.className = isError ? 'msg err' : 'msg';
  }
  function renderCommentRows(rows) {
    var list = $('commentsList');
    list.replaceChildren();
    $('commentCount').textContent = commentCountLabel(rows.length);
    if (!rows.length) {
      var empty = document.createElement('p');
      empty.className = 'comments-empty';
      empty.textContent = 'Пока никто не оставил комментарий. Будьте первым!';
      list.appendChild(empty);
      return;
    }
    rows.forEach(function (row) {
      var card = document.createElement('article');
      card.className = 'comment-card';
      var avatar = document.createElement('span');
      avatar.className = 'comment-avatar';
      avatar.setAttribute('aria-hidden', 'true');
      avatar.textContent = String(row.author_name || 'Зритель').trim().split(/\s+/).slice(0,2).map(function (part) { return part.charAt(0); }).join('').toLocaleUpperCase('ru');
      var content = document.createElement('div');
      content.className = 'comment-content';
      var header = document.createElement('div');
      header.className = 'comment-card-head';
      var author = document.createElement('b');
      author.textContent = row.author_name || 'Зритель';
      var time = document.createElement('time');
      var date = new Date(row.created_at);
      time.dateTime = row.created_at || '';
      time.textContent = Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('ru-RU', { dateStyle:'medium', timeStyle:'short' }).format(date);
      var body = document.createElement('p');
      body.textContent = row.body || '';
      header.append(author, time);
      content.append(header, body);
      card.append(avatar, content);
      list.appendChild(card);
    });
  }
  async function loadComments() {
    var loadId = ++commentLoadId;
    var item = currentMedia.item;
    var type = currentMedia.type;
    $('commentForm').hidden = !authed || !backendConfigured;
    $('commentCount').textContent = 'Загрузка…';
    $('commentsList').replaceChildren();
    commentStatus('');
    if (!backendConfigured) {
      $('commentCount').textContent = 'Не подключено';
      $('commentsList').textContent = 'Сначала настройте Supabase по инструкции в README.md.';
      return;
    }
    if (!authed || !item) {
      $('commentCount').textContent = 'Доступ закрыт';
      $('commentsList').textContent = 'Войдите в аккаунт, чтобы читать и писать комментарии.';
      return;
    }
    try {
      var params = new URLSearchParams();
      params.set('select', 'id,item_type,item_id,author_name,body,created_at');
      params.set('item_type', 'eq.' + type);
      params.set('item_id', 'eq.' + item.id);
      params.set('order', 'created_at.desc');
      params.set('limit', '100');
      var token = await accessToken();
      var rows = await backendRequest('/rest/v1/comments?' + params.toString(), { method:'GET' }, token);
      if (loadId !== commentLoadId) return;
      renderCommentRows(Array.isArray(rows) ? rows : []);
    } catch (error) {
      if (loadId !== commentLoadId) return;
      $('commentCount').textContent = 'Не удалось загрузить';
      $('commentsList').textContent = authError(error) + ' Проверьте SQL-схему и политики доступа.';
    }
  }
  $('commentForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    var body = $('commentBody').value.trim();
    if (body.length < 3 || body.length > 1200) return commentStatus('Комментарий должен содержать от 3 до 1200 символов.', true);
    if (!authed || !session || !session.user) return commentStatus('Войдите в аккаунт, чтобы оставить комментарий.', true);
    if (!backendConfigured) return commentStatus('Сервис комментариев ещё не подключён.', true);
    var item = currentMedia.item;
    var type = currentMedia.type;
    var submit = $('commentSubmit');
    submit.disabled = true;
    submit.textContent = 'Публикуем…';
    commentStatus('');
    try {
      var token = await accessToken();
      await backendRequest('/rest/v1/comments', {
        method:'POST',
        headers:{ Prefer:'return=minimal' },
        body:JSON.stringify({
          item_type:type,
          item_id:item.id,
          user_id:session.user.id,
          author_name:commentAuthor(),
          body:body
        })
      }, token);
      $('commentBody').value = '';
      if (currentMedia.item && currentMedia.item.id === item.id && currentMedia.type === type) await loadComments();
      commentStatus('Комментарий опубликован.');
    } catch (error) {
      commentStatus(authError(error) + ' Если это сообщение о политике доступа, запустите supabase-comments.sql.', true);
    } finally {
      submit.disabled = false;
      submit.textContent = 'Опубликовать';
    }
  });
  function setMovieScreen() {
    var item = currentMedia.item || films[0], type = currentMedia.type || 'film';
    var title = item.title;
    $('movieTitle').textContent = title + (currentMedia.episode ? ' · ' + currentMedia.episode.label : '');
    $('movieYear').textContent = item.year || item.meta.split('·').pop().trim() || '2026';
    $('movieGenre').textContent = item.genre || item.meta.split('·')[0].trim();
    $('movieDuration').textContent = currentMedia.episode ? 'Сезон ' + currentMedia.season : (item.duration || 'Сезон 1');
    $('movieAge').textContent = item.age || '16+';
    $('movieDescription').textContent = currentMedia.episode ? (currentMedia.episode.description || item.description || 'Описание серии пока не добавлено.') : (item.description || 'Описание появится здесь.');
    $('movieDescription').previousElementSibling.textContent = currentMedia.episode ? (type === 'series' ? 'О сериале' : 'Об аниме') : (type === 'series' ? 'Описание сериала' : type === 'anime' ? 'Описание аниме' : 'Описание фильма');
    $('movieCredits').textContent = item.credits || 'Нажмите «Смотреть», чтобы начать просмотр.';
    var frameEl = $('movieFrameCaption');
    frameEl.textContent = '';
    frameEl.setAttribute('aria-hidden', 'true');
    var frameShot = frameEl.querySelector('.frame-shot');
    if (!frameShot) {
      frameShot = document.createElement('img');
      frameShot.className = 'frame-shot';
      frameShot.alt = '';
      frameShot.draggable = false;
      frameEl.appendChild(frameShot);
    }
    var frameMap = assets.frames || {};
    var frameKey = currentMedia.episode ? type + '/' + item.id + '/' + currentMedia.episode.id : item.id;
    var frameUrl = frameMap[frameKey] || frameMap[item.id] || '';
    if (frameUrl) {
      frameEl.style.setProperty('--frame-image', 'url("' + frameUrl + '")');
      frameShot.hidden = false;
      frameShot.onerror = function () { frameShot.hidden = true; };
      frameShot.src = frameUrl;
    } else {
      frameEl.style.removeProperty('--frame-image');
      frameShot.hidden = true;
      frameShot.removeAttribute('src');
    }
    frameEl.classList.toggle('has-frame', !!frameUrl);
    $('moviePoster').style.setProperty('--h', item.hue || 215);
    var img = $('moviePosterImage');
    img.hidden = false;
    img.onerror = function () { img.hidden = true; };
    img.src = posterPath(type, item);
    $('moviePoster').querySelector('span').textContent = type === 'anime' ? 'постер аниме' : type === 'series' ? 'постер сериала' : 'постер';
    $('movieTitle').parentNode.querySelector('.rating').textContent = item.rating || '4.5';
    $('movieTitle').parentNode.querySelector('.rating').setAttribute('aria-label', 'Рейтинг ' + (item.rating || '4.5'));
    $('movieFavorite').dataset.itemType = type;
    $('movieFavorite').dataset.itemId = item.id;
    refreshFavoriteButtons();
    loadComments();
  }
  function openEpisodes(type, item) {
    currentMedia = { type:type, item:item, episode:null, season:1 };
    rememberMedia();
    $('episodesKind').textContent = type === 'anime' ? 'АНИМЕ' : 'СЕРИАЛ';
    $('episodesTitle').textContent = item.title;
    $('episodesTitle').nextElementSibling.textContent = (item.description ? item.description + ' ' : '') + 'Выберите сезон и серию. ' + seasonSummary(type, item);
    renderEpisodes(1);
    location.hash = '#episodes';
  }
  function seasonSummary(type, item) {
    var mediaType = type === 'film' ? 'films' : type;
    var entry = (media[mediaType] || {})[item.id] || {};
    var counts = entry.seasons || [8,8];
    var total = counts.reduce(function (sum, count) { return sum + count; }, 0);
    return 'Всего: ' + counts.length + ' сез. · ' + total + ' сер.';
  }
  function renderEpisodes() {
    var mediaType = currentMedia.type === 'film' ? 'films' : currentMedia.type;
    var entry = (media[mediaType] || {})[currentMedia.item.id] || {};
    var counts = entry.seasons || [8,8];
    var container = $('episodeGrid');
    container.innerHTML = '';
    counts.forEach(function (episodeCount, index) {
      var season = index + 1;
      var section = document.createElement('section');
      section.className = 'episode-season';
      var heading = document.createElement('div');
      heading.className = 'episode-season-heading';
      var title = (entry.seasonTitles && entry.seasonTitles[index]) || season + ' сезон';
      heading.innerHTML = '<h2>' + safeText(title) + '</h2><span class="episode-season-count">' + episodeCount + ' серий</span>';
      var grid = document.createElement('div');
      grid.className = 'episode-choice-grid';
      for (var number = 1; number <= episodeCount; number++) {
        var episodeId = 's' + String(season).padStart(2,'0') + 'e' + String(number).padStart(2,'0');
        var hasStream = !!((entry.episodes || {})[episodeId]);
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'episode-choice';
        button.dataset.episodePlay = episodeId;
        button.dataset.streamAvailable = hasStream ? 'true' : 'false';
        button.setAttribute('aria-label', 'Смотреть ' + title + ', серия ' + number);
        button.textContent = number + ' серия';
        grid.appendChild(button);
      }
      section.appendChild(heading);
      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  /* ---------- playable video sources ---------- */
  function mediaUrl(kind) {
    var type = currentMedia.type, item = currentMedia.item, entry = (media[type === 'film' ? 'films' : type] || {})[item.id] || {};
    if (kind === 'trailer') return entry.trailer || '';
    if (type === 'film') return entry.movie || '';
    return (entry.episodes || {})[currentMedia.episode ? currentMedia.episode.id : ''] || '';
  }
  function providerEmbedUrl(source) {
    var src = String(source || '').trim();
    var iframeMatch = src.match(/<iframe\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i);
    if (iframeMatch) src = iframeMatch[1].replace(/&amp;/g, '&');
    try {
      var url = new URL(src, location.href);
      var host = url.hostname.toLowerCase().replace(/^www\./, '');
      if (host === 'rutube.ru') {
        if (/^\/play\/embed\/[\w-]+\/?/.test(url.pathname)) return url.href;
        var rutubeId = (url.pathname.match(/^\/video\/(?:private\/)?([\w-]{8,})\/?$/i) || [])[1];
        if (rutubeId) {
          url.pathname = '/play/embed/' + rutubeId + '/';
          return url.href;
        }
      }
      if (host === 'vkvideo.ru' || host === 'vk.com' || host === 'vk.ru') {
        if (url.pathname === '/video_ext.php' && url.searchParams.get('oid') && url.searchParams.get('id')) return url.href;
      }
    } catch (error) { return ''; }
    return '';
  }
  function isDirectVideoFile(source) {
    try {
      var url = new URL(source, location.href);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return true;
      return /\.(?:mp4|webm|ogg|m4v)$/i.test(url.pathname);
    } catch (error) { return false; }
  }
  function openPlayer(kind) {
    var src = mediaUrl(kind);
    var video = $('playerVideo'), embed = $('playerEmbed'), hint = $('playerHint'), dialog = $('playerDialog');
    video.pause(); video.removeAttribute('src'); video.load();
    embed.hidden = true; embed.removeAttribute('src');
    var embedSrc = src ? providerEmbedUrl(src) : '';
    var directVideo = src && !embedSrc && isDirectVideoFile(src);
    if (embedSrc || directVideo) {
      dialog.showModal();
      hint.hidden = true;
      if (embedSrc) {
        video.hidden = true;
        embed.hidden = false;
        embed.src = embedSrc;
      } else {
        embed.hidden = true;
        video.hidden = false; video.src = src; video.load();
        var promise = video.play();
        if (promise && promise.catch) promise.catch(function () {});
      }
    } else {
      video.hidden = true; embed.hidden = true; hint.hidden = false;
      hint.textContent = src
        ? 'Ссылка не поддерживается. Используйте адрес плеера VK Видео или RUTUBE либо файл MP4.'
        : (kind === 'trailer'
          ? 'Трейлер пока не добавлен. Вставьте ссылку VK Видео или RUTUBE в media-config.js.'
          : (currentMedia.episode ? 'Для этой серии пока не добавлен источник. Добавьте разрешённую ссылку VK Видео или RUTUBE в media-config.js.' : currentMedia.type === 'film' ? 'Полный фильм пока не подключён. Добавьте разрешённую ссылку VK Видео или RUTUBE либо путь к MP4 в media-config.js.' : 'Добавьте разрешённую ссылку VK Видео или RUTUBE в media-config.js.'));
      dialog.showModal();
    }
  }
  $('watchTrailer').addEventListener('click', function () { openPlayer('trailer'); });
  $('watchMovie').addEventListener('click', function () { openPlayer('movie'); });
  $('playerClose').addEventListener('click', function () { $('playerDialog').close(); });
  $('playerDialog').addEventListener('click', function (e) {
    if (e.target === $('playerDialog')) $('playerDialog').close();
  });
  $('playerDialog').addEventListener('close', function () {
    $('playerVideo').pause();
    $('playerEmbed').removeAttribute('src');
  });
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
    if (sid === 'movie') {
      setMovieScreen();
      $('movie').querySelector('.wrap').appendChild($('commentsSection'));
    }
    if (sid === 'favorites') loadFavorites();
    if (sid === 'episodes' && currentMedia.item && currentMedia.type !== 'film') {
      $('episodesKind').textContent = currentMedia.type === 'anime' ? 'АНИМЕ' : 'СЕРИАЛ';
      $('episodesTitle').textContent = currentMedia.item.title;
      $('episodesTitle').nextElementSibling.textContent = (currentMedia.item.description ? currentMedia.item.description + ' ' : '') + 'Выберите сезон и серию. ' + seasonSummary(currentMedia.type, currentMedia.item);
      renderEpisodes(currentMedia.season || 1);
      $('episodes').querySelector('.wrap').appendChild($('commentsSection'));
      loadComments();
    }
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
    autoplay(sid === 'new' && !$('catalogSearch').value.trim());
  }
  window.addEventListener('hashchange', route);
  window.addEventListener('focus', function () { if (current === 'movie' || current === 'episodes') loadComments(); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden && (current === 'movie' || current === 'episodes')) loadComments(); });
  window.setInterval(function () { if (!document.hidden && (current === 'movie' || current === 'episodes')) loadComments(); }, 30000);

  /* ---------- catalog shelves and search ---------- */
  function cardMarkup(type, item, index) {
    var poster = posterPath(type, item);
    var kind = type === 'anime' ? 'аниме' : type === 'series' ? 'сериал' : 'фильм';
    var searchable = [item.title, item.meta, item.genre, item.description, kind].join(' ');
    return '<article class="card rise" style="--d:' + (index + 1) + '" data-item-type="' + type + '" data-item-id="' + safeText(item.id) + '" data-search="' + safeText(searchable) + '"><button class="card-open" type="button" data-open-item data-item-type="' + type + '" data-item-id="' + safeText(item.id) + '"><div class="poster" style="--h:' + item.hue + '"><img class="poster-image" src="' + safeText(poster) + '" alt="" onerror="this.hidden=true" loading="lazy">' + icon + '<span>постер</span></div><b>' + safeText(item.title) + '</b><em>' + safeText(item.meta) + '</em></button>' + favoriteButtonMarkup(type, item) + '</article>';
  }
  document.querySelectorAll('[data-shelf]').forEach(function (el, n) {
    var type = el.dataset.shelf === '2' ? 'series' : el.dataset.shelf === '3' ? 'anime' : 'film';
    var list = catalog[type];
    var html = '';
    for (var i = 0; i < list.length; i++) html += cardMarkup(type, list[(i + n) % list.length], i);
    el.innerHTML = html;
  });
  document.addEventListener('click', function (e) {
    var favorite = e.target.closest('[data-favorite-toggle]');
    if (!favorite) return;
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(favorite.dataset.itemType, favorite.dataset.itemId);
  });
  document.addEventListener('click', function (e) {
    var ep = e.target.closest('[data-episode-play]');
    if (!ep) return;
    currentMedia.episode = { id:ep.dataset.episodePlay, number:+ep.dataset.episodePlay.slice(-2), label:'Серия ' + (+ep.dataset.episodePlay.slice(-2)), description:'' };
    currentMedia.season = +ep.dataset.episodePlay.slice(1,3);
    rememberMedia();
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
      rememberMedia();
      location.hash = '#movie';
    } else openEpisodes(type, item);
  });

  $('catalogSearch').addEventListener('input', function () {
    var q = this.value.trim().toLocaleLowerCase('ru');
    var visible = 0;
    document.querySelectorAll('#new .collection-row .card[data-item-id]').forEach(function (card) {
      var haystack = (card.dataset.search || card.textContent).toLocaleLowerCase('ru');
      var match = !q || haystack.indexOf(q) >= 0;
      card.hidden = !match;
      if (match) visible++;
    });
    document.querySelectorAll('#new [data-collection]').forEach(function (row) {
      row.hidden = !!q && !row.querySelector('.card[data-item-id]:not([hidden])');
    });
    $('stage').hidden = !!q;
    $('dots').hidden = !!q;
    $('count').hidden = !!q;
    $('clearSearch').hidden = !q;
    $('searchStatus').textContent = q ? (visible ? 'Найдено карточек: ' + visible : 'Ничего не найдено') : 'Поиск по каталогу';
    autoplay(current === 'new' && !q);
  });
  $('clearSearch').addEventListener('click', function () {
    $('catalogSearch').value = '';
    $('catalogSearch').dispatchEvent(new Event('input'));
    $('catalogSearch').focus();
  });

  /* ---------- catalog-powered clapperboard ---------- */
  var genreOptions = {};
  Object.keys(catalog).forEach(function (type) {
    catalog[type].forEach(function (item) {
      String(item.genre || '').split(',').forEach(function (genre) {
        genre = genre.trim();
        if (genre && genre.toLocaleLowerCase('ru') !== 'аниме') genreOptions[genre.toLocaleLowerCase('ru')] = genre;
      });
    });
  });
  Object.keys(genreOptions).sort(function (a, b) { return genreOptions[a].localeCompare(genreOptions[b], 'ru'); }).forEach(function (key) {
    var option = document.createElement('option');
    option.value = key;
    option.textContent = genreOptions[key];
    $('clapperGenre').appendChild(option);
  });
  function itemYear(item) { return parseInt(item.year || String(item.meta || '').match(/\b(?:19|20)\d{2}\b/) || 0, 10) || 0; }
  var clapperTimer = null, lastClapperKey = '';
  function runClapper() {
    var type = $('clapperType').value;
    var genre = $('clapperGenre').value;
    var era = $('clapperEra').value;
    var options = [];
    Object.keys(catalog).forEach(function (kind) {
      if (type !== 'all' && kind !== type) return;
      catalog[kind].forEach(function (item) {
        var year = itemYear(item);
        var genreMatch = genre === 'all' || String(item.genre || '').toLocaleLowerCase('ru').indexOf(genre) >= 0;
        var eraMatch = era === 'all' || (era === 'classic' ? year > 0 && year < 2000 : year >= +era && year < +era + 10);
        if (genreMatch && eraMatch) options.push({ type:kind, item:item });
      });
    });
    var candidates = options.filter(function (entry) { return favoriteKey(entry.type, entry.item.id) !== lastClapperKey; });
    if (candidates.length) options = candidates;
    var pick = options.length ? options[Math.floor(Math.random() * options.length)] : null;
    if (pick) lastClapperKey = favoriteKey(pick.type, pick.item.id);
    var board = $('clapperboard');
    board.classList.remove('clapping');
    void board.offsetWidth;
    board.classList.add('clapping');
    $('clapperMessage').textContent = options.length ? 'Подходящих вариантов: ' + options.length + '. Хлопушка выбирает…' : 'С такой комбинацией пока нет картин в каталоге.';
    $('clapperResult').hidden = false;
    clearTimeout(clapperTimer);
    clapperTimer = setTimeout(function () {
      board.classList.remove('clapping');
      if (!pick) {
        $('clapperResultTitle').textContent = 'Нужен другой дубль';
        $('clapperResultCard').innerHTML = '<p class="clapper-empty">В каталоге пока нет подходящих картин. Измени формат, жанр или эпоху.</p>';
        return;
      }
      $('clapperResultTitle').textContent = pick.item.title;
      $('clapperResultCard').innerHTML = cardMarkup(pick.type, pick.item, 0);
      refreshFavoriteButtons();
    }, reduce ? 0 : 940);
  }
  $('clapperForm').addEventListener('submit', function (event) { event.preventDefault(); runClapper(); });
  $('clapperAgain').addEventListener('click', runClapper);

  /* ---------- carousel ---------- */
  var featuredFilms = films.slice(0, 5);
  var N = Math.min(5, featuredFilms.length), cur = 0, paused = false, timer = null;
  var track = $('track'), dotsEl = $('dots'), slides = [], dots = [];
  for (var i = 0; i < N; i++) {
    var f = featuredFilms[i], s = document.createElement('div');
    var still = (assets.frames || {})[f.id] || (assets.posters || {})[f.id] || '';
    s.className = 'slide'; s.dataset.i = i; s.style.setProperty('--h', f.hue);
    if (still) {
      s.classList.add('has-still');
      s.style.setProperty('--slide-image', 'url("' + still + '")');
    }
    s.innerHTML = '<div class="frame">' + icon + '<b>' + safeText(f.title) + '</b><em>' + safeText(f.meta) + '</em><a class="btn primary go" href="#movie" tabindex="-1" data-open-item data-item-type="film" data-item-id="' + f.id + '">Смотреть</a></div>';
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
    if (current !== 'new' || $('catalogSearch').value.trim() || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
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

  async function initializeApp() {
    setLogo();
    restoreMedia();
    if (backendConfigured) {
      try { await restoreAuth(); }
      catch (error) {
        saveSession(null);
        toast('Сеанс завершён. Войдите снова.');
      }
    } else saveSession(null);
    applyAuth();
    setMode(authed ? 'login' : 'reg');
    await loadFavorites();
    route();
  }
  initializeApp();
})();
