Содержание
Установка

Основные команды и диагностика

Образы (Images)

Контейнеры (Containers)

Сети (Networks)

Порты (Ports)

Тома (Volumes)

Docker Compose

Docker Hub

Очистка (Prune)

Полезные советы

🐳 Установка
Linux (Ubuntu / Debian) — официальный репозиторий
Установка через официальный репозиторий гарантирует актуальную версию и удобное обновление.

bash
# 1. Удаление старых версий (если были установлены)
sudo apt-get remove docker docker-engine docker.io containerd runc

# 2. Установка зависимостей
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg

# 3. Добавление официального GPG-ключа
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# 4. Добавление репозитория
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 5. Установка Docker Engine и плагинов
sudo apt-get update
sudo apt-get install -y \
  docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin
Пост-настройка (обязательно)
Чтобы не писать sudo перед каждой командой, добавьте пользователя в группу docker:

bash
sudo usermod -aG docker $USER
newgrp docker           # применить немедленно
# или перелогиниться
Проверка установки:

bash
docker run hello-world
docker version
docker compose version
Windows / macOS
Скачайте Docker Desktop с docker.com.

Windows: требуются Windows 10 22H2+ / Windows 11 (64-bit), включённая виртуализация (VT-x/AMD-V в BIOS) и WSL 2.

Запустите установщик → перезагрузка → запустите Docker Desktop.

Дождитесь, пока значок кита в трее перестанет анимироваться — движок готов.

Проверка ресурсов
bash
docker info                  # драйвер хранилища, ядро, cgroup
docker system df             # использование диска
docker context ls            # активный контекст (local / remote)
🧭 Основные команды и диагностика
Команда	Описание
docker version	Версия клиента и сервера (демона)
docker info	Полная информация о движке
docker help <command>	Встроенная справка по команде
docker system df	Использование диска (образы/контейнеры/тома/кэш)
docker system df -v	Детализация по каждому объекту
docker events	Поток событий движка в реальном времени
docker context ls	Список контекстов (локальный/удалённые хосты)
📦 Образы (Images)
Скачивание и просмотр
bash
docker pull nginx:alpine                 # загрузка конкретного тега
docker pull nginx                        # по умолчанию :latest
docker images                            # локальные образы
docker images --filter "dangling=true"   # «висячие» образы без тега
docker inspect nginx:alpine              # метаданные (JSON)
docker history nginx:alpine              # история слоёв и размеров
Сборка
bash
docker build -t myapp:v1 .                       # из ./Dockerfile
docker build -f Dockerfile.prod -t myapp:prod .  # альтернативный Dockerfile
docker build --no-cache -t myapp:v1 .            # без кэша
docker build --build-arg VERSION=1.0 -t myapp .  # с build-arg
docker buildx build --platform linux/amd64,linux/arm64 -t myapp .  # мультиарх
Тегирование и передача
bash
docker tag myapp:v1 username/myapp:v1              # локальный тег
docker tag myapp:v1 registry.example.com/myapp:v1  # для приватного реестра

docker save -o myapp.tar myapp:v1   # сохранить в tar
docker load -i myapp.tar            # загрузить из tar

docker push username/myapp:v1       # отправить в реестр
Удаление
bash
docker rmi nginx:alpine        # удалить образ
docker rmi -f nginx:alpine     # принудительно, даже если есть контейнеры
docker image prune             # удалить dangling-образы
docker image prune -a          # удалить все неиспользуемые образы
🏃 Контейнеры (Containers)
Запуск: ключевые опции docker run
Опция	Описание
-d	Фоновый режим (detached)
-it	Интерактивный TTY (обычно с sh/bash)
--rm	Удалить контейнер после остановки
--name web	Имя контейнера (иначе — случайное)
-p 8080:80	Проброс порта хост:контейнер
-P	Случайные порты на хост для всех EXPOSE
-v myvol:/data	Именованный том
-v $(pwd):/app	Bind mount директории хоста
--mount type=bind,source=...,target=...	Явный синтаксис монтирования
-e MY_VAR=value	Переменная окружения
--env-file .env	Загрузить переменные из файла
--network mynet	Подключить к пользовательской сети
--restart unless-stopped	Политика перезапуска
--memory 512m --cpus 1.0	Ограничения ресурсов
--entrypoint /bin/sh	Переопределить ENTRYPOINT
-u 1000:1000	Запуск от пользователя UID:GID
Примеры
bash
# Веб-сервер в фоне
docker run -d --name web -p 8080:80 nginx:alpine

# Интерактивный одноразовый контейнер
docker run -it --rm alpine sh

# С переменными окружения и томом
docker run -d \
  --name pg \
  -e POSTGRES_PASSWORD=secret \
  -v pgdata:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:16

# С авто-перезапуском и лимитами
docker run -d --restart unless-stopped \
  --memory 512m --cpus 1.0 \
  --name app myapp:v1
Жизненный цикл и управление
bash
docker ps                              # запущенные
docker ps -a                           # все, включая остановленные
docker ps -a --filter "status=exited"  # фильтр по статусу

docker start web                       # запустить
docker stop web                        # мягкая остановка (SIGTERM → SIGKILL)
docker kill web                        # жёсткая остановка (SIGKILL)
docker restart web                     # перезапуск
docker pause web / docker unpause web  # пауза / снятие паузы

docker rm web                          # удалить остановленный
docker rm -f web                       # принудительно (даже запущенный)
docker container prune                 # удалить все остановленные
Отладка и взаимодействие
bash
docker exec -it web sh                       # войти в контейнер
docker exec -u root web whoami               # выполнить от root
docker exec web env                          # переменные окружения
docker logs web                              # логи
docker logs -f --tail 100 web                # последние 100 строк + follow
docker logs --since 10m web                  # за последние 10 минут
docker stats                                 # CPU/RAM/сеть в реальном времени
docker stats --no-stream                     # одноразовый снимок
docker top web                               # процессы внутри
docker inspect web                           # полный JSON
docker inspect -f '{{.State.Status}}' web    # конкретное поле
docker cp web:/etc/nginx/nginx.conf .        # из контейнера на хост
docker cp ./nginx.conf web:/etc/nginx/       # с хоста в контейнер
docker diff web                              # изменения файловой системы
docker port web                              # правила проброса портов
docker attach web                            # подключиться к stdio (осторожно!)
🌐 Сети (Networks)
Команда	Описание
docker network ls	Список сетей
docker network create mynet	Создать bridge-сеть
docker network create --driver overlay myoverlay	Overlay-сеть (Swarm)
docker network create --subnet 172.20.0.0/16 mynet	С заданной подсетью
docker network inspect mynet	Детали: контейнеры, подсеть, шлюз
docker network connect mynet web	Подключить работающий контейнер
docker network disconnect mynet web	Отключить
docker network rm mynet	Удалить сеть
docker network prune	Удалить неиспользуемые сети
Запуск в сети
bash
docker run -d --network mynet --name api myapi:v1
docker run -d --network host nginx      # сеть хоста (без изоляции)
docker run -d --network none alpine     # без сети
Ключевой момент — DNS по имени
В пользовательской сети (не default bridge) работает встроенный DNS: контейнеры обращаются друг к другу по имени контейнера или по алиасу.

bash
docker network create appnet
docker run -d --network appnet --name db postgres:16
docker run -d --network appnet --name api myapi:v1

# Внутри api:
#   psql -h db -U postgres   ✅ работает по имени
В сети default bridge DNS по имени не работает — нужен IP или устаревший --link.

Алиасы
bash
docker run -d --network appnet --network-alias database --name db postgres:16
# теперь из api доступно и "db", и "database"
🔌 Порты (Ports)
Параметр / Команда	Описание
-p 8080:80	Порт 8080 хоста → 80 контейнера
-p 127.0.0.1:8080:80	Только на loopback (не доступен извне)
-p 8080:80/udp	UDP вместо TCP
-p 80	Случайный порт хоста → 80 контейнера
-P	Случайный порт для каждого EXPOSE
--network host	Без NAT — контейнер использует порты хоста напрямую
Просмотр
bash
docker port web
# 80/tcp -> 0.0.0.0:8080
# 80/tcp -> [::]:8080
Несколько портов
bash
docker run -d -p 8080:80 -p 8443:443 nginx
Важно
Конфликт портов хоста → ошибка bind: address already in use.

EXPOSE в Dockerfile — это документация, а не публикация. Публикует только -p или -P.

В пользовательской сети контейнеры видят друг друга по всем портам без публикации — публикация нужна только для доступа с хоста/извне.

💾 Тома (Volumes)
Три способа хранения данных
Тип	Синтаксис	Когда использовать
Named volume	-v myvol:/data	Продакшн, БД, постоянные данные
Bind mount	-v $(pwd):/app	Разработка, синхронизация кода
tmpfs	--tmpfs /tmp	Временные данные в памяти
Команды
bash
docker volume create mydata
docker volume ls
docker volume inspect mydata        # Mountpoint на хосте
docker volume rm mydata             # удалить том (если не используется)
docker volume prune                 # удалить все неиспользуемые ⚠️
Примеры
bash
# Именованный том
docker run -d -v mydata:/var/lib/mysql mysql:8

# Bind mount (разработка)
docker run -d -v $(pwd)/src:/app/src -p 3000:3000 node:20

# Только для чтения
docker run -d -v mydata:/data:ro nginx

# Явный синтаксис (рекомендуется в Compose и сложных случаях)
docker run -d \
  --mount type=bind,source=/host/path,target=/container/path,readonly \
  nginx

# tmpfs (в памяти, исчезает при остановке)
docker run -d --tmpfs /tmp:rw,size=64m alpine
Резервное копирование тома
bash
# Бэкап: монтируем том и папку хоста, пакуем
docker run --rm \
  -v mydata:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/mydata.tar.gz -C /data .

# Восстановление
docker run --rm \
  -v mydata:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/mydata.tar.gz -C /data
⚠️ docker volume prune необратимо удаляет данные. Всегда проверяйте docker volume ls перед запуском.

🐙 Docker Compose
Современный синтаксис — docker compose (v2). Старый docker-compose (v1, с дефисом) устарел.

Минимальный docker-compose.yml
yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
    depends_on:
      - api

  api:
    build: ./api
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/app
    networks:
      - appnet

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - appnet

volumes:
  pgdata:

networks:
  appnet:
Основные команды
Команда	Описание
docker compose up -d	Запустить всё в фоне
docker compose up -d --build	Пересобрать образы и запустить
docker compose up --force-recreate	Пересоздать контейнеры
docker compose ps	Статус контейнеров проекта
docker compose logs -f web	Логи сервиса в реальном времени
docker compose logs --tail 50	Последние 50 строк по всем сервисам
docker compose exec web sh	Войти в контейнер сервиса
docker compose run --rm web npm test	Одноразовая команда
docker compose restart web	Перезапустить сервис
docker compose stop / start	Остановить / запустить без удаления
docker compose down	Остановить и удалить контейнеры + сети
docker compose down -v	+ удалить тома ⚠️
docker compose down --rmi all	+ удалить образы
docker compose config	Проверить и вывести итоговый YAML
docker compose pull	Обновить образы
docker compose build	Только сборка
docker compose top	Процессы всех сервисов
docker compose up -d --scale worker=3	Масштабировать сервис
Несколько файлов (base + override)
bash
# docker-compose.yml (база) + docker-compose.prod.yml (переопределения)
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
Профили (запуск части сервисов)
yaml
services:
  debug:
    image: busybox
    profiles: ["debug"]
bash
docker compose --profile debug up -d
🐳 Docker Hub
Аккаунт и вход
bash
docker login                       # интерактивно
docker login -u USER -p PASS       # неинтерактивно (не рекомендуется)
echo $TOKEN | docker login -u USER --password-stdin   # безопасно (CI)
docker logout
Публикация образа
bash
# 1. Собрать
docker build -t myapp:v1 .

# 2. Присвоить тег в формате username/repo:tag
docker tag myapp:v1 username/myapp:v1

# 3. Отправить
docker push username/myapp:v1

# 4. (опционально) latest
docker tag myapp:v1 username/myapp:latest
docker push username/myapp:latest
Загрузка своего образа
bash
docker pull username/myapp:v1
docker run --rm username/myapp:v1
Создание репозитория
Войдите на hub.docker.com.

Create Repository → имя (например, myapp) → Public/Private.

Полный путь образа: username/myapp.

Приватный реестр (пример)
bash
docker login registry.example.com
docker tag myapp:v1 registry.example.com/team/myapp:v1
docker push registry.example.com/team/myapp:v1
🧹 Очистка (Prune)
Перед любой очисткой выполните docker system df и docker system df -v, чтобы понимать, что будет удалено.

Пошаговая безопасная последовательность
bash
# 1. Диагностика
docker system df -v

# 2. Остановленные контейнеры
docker container prune

# 3. Dangling-образы (без тегов, не привязанные к контейнерам)
docker image prune

# 4. Неиспользуемые образы (все, что не нужны контейнерам)
docker image prune -a

# 5. Неиспользуемые тома ⚠️ ДАННЫЕ БУДУТ УДАЛЕНЫ
docker volume prune

# 6. Неиспользуемые сети
docker network prune

# 7. Кэш сборки
docker builder prune
docker builder prune -a       # включая все кэши
Комплексная очистка
Команда	Что удаляет
docker system prune	Остановленные контейнеры + dangling-образы + неиспользуемые сети + кэш сборки
docker system prune -a	То же + все неиспользуемые образы
docker system prune -a --volumes	То же + все неиспользуемые тома ⚠️
Флаги prune
Флаг	Значение
-f, --force	Без подтверждения
-a, --all	Удалять все неиспользуемые (не только dangling)
--filter "until=24h"	Только старше 24 часов
--volumes	Включить тома (только для system prune)
Пример с фильтром
bash
docker image prune -a --filter "until=168h"   # старше 7 дней
docker container prune --filter "until=24h"   # остановленные > 24ч
💡 Полезные советы
Форматирование вывода docker inspect
bash
docker inspect -f '{{.State.Status}}' web
docker inspect -f '{{.NetworkSettings.IPAddress}}' web
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web
docker inspect -f '{{.Config.Env}}' web
docker inspect -f '{{json .Mounts}}' web | jq
Форматирование docker ps
bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
docker ps -a --format "{{.Names}}: {{.Status}}"
Фильтры
bash
docker ps --filter "name=web"
docker ps --filter "status=exited"
docker images --filter "reference=nginx:*"
docker images --filter "dangling=true"
Алиасы (добавить в ~/.bashrc / ~/.zshrc)
bash
alias d='docker'
alias dc='docker compose'
alias dps='docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'
alias dlogs='docker logs -f --tail 100'
alias dclean='docker system prune -af'
Частые ошибки и решения
Ошибка	Решение
permission denied /var/run/docker.sock	sudo usermod -aG docker $USER + перелогин
bind: address already in use	Занят порт хоста → сменить -p или остановить процесс
no space left on device	docker system prune -a --volumes
Контейнер сразу падает	docker logs <name>, docker inspect -f '{{.State.ExitCode}}' <name>
Не видно контейнер	docker ps -a (запущен ли? какой exit code?)
Не работает DNS по имени	Контейнеры не в одной пользовательской сети
pull access denied	Приватный образ → docker login
Проверка перед продакшном
bash
docker system df -v                         # место на диске
docker ps --filter "status=exited"          # упавшие контейнеры
docker inspect -f '{{.HostConfig.RestartPolicy.Name}}' <name>  # политика рестарта
docker stats --no-stream                    # ресурсы
