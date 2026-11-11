# 1. Удаление старых версий
sudo apt-get remove docker docker-engine docker.io containerd runc

# 2. Зависимости
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg

# 3. GPG-ключ
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# 4. Репозиторий
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 5. Установка
sudo apt-get update
sudo apt-get install -y \
  docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin

shell
apt-get install docker-engine docker-compose
⚠️ В Linux не забудьте добавить пользователя в группу docker, чтобы работать без sudo:

shell
sudo usermod -aG docker $USER
newgrp docker

shell
docker version
docker --version
docker compose version
docker run hello-world

docker version
