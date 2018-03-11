# Raspberry PiにVisionect Software Suiteをダウンロード
Visionect Software SuiteはDockerで実行するため，まずはRaspberry PiにDockerをインストールする．

参考サイト（Visionect Knowledge Base）

[https://docs.visionect.com/VisionectSoftwareSuite/Installation.html](https://docs.visionect.com/VisionectSoftwareSuite/Installation.html)

# Raspberry Pi2にdockerをインストール
## Dockerのインストールの前に
初期設定としてラズパイのIPアドレスを固定

` sudo vi /etc/dhcpcd.conf`
などで

## Dockerのインストール
次のコマンドを入力

`$ curl -sSL https://get.docker.com/ | sh`

インストール完了

試しにraspbian:jessieを起動

`$ sudo docker run -ti resin/rpi-raspbian:jessie /bin/bash`

起動完了

# docker-composeを導入
まず，docker-composeをcloneしてローカルへファイルを準備

`$ git clone https://github.com/docker/compose.git`

次にARMへ対応するようにDockerfileの内容を置換

`$ cd compose`

`$ cp -i Dockerfile Dockerfile.armhf`

`$ sed -i -e 's/^FROM debian\:/FROM armhf\/debian:/' Dockerfile.armhf`

`$ sed -i -e 's/x86_64/armel/g' Dockerfile.armhf`

ビルドして走らせる（結構時間かかる）

`$ sudo docker build -t docker-compose:armhf -f Dockerfile.armhf .`

`$ sudo docker run --rm --entrypoint="script/build/linux-entrypoint" -v $(pwd)/dist:/code/dist -v $(pwd)/.git:/code/.git "docker-compose:armhf"`

dist以下ファイルをbinへ移動させ，コマンドで起動できるようにする

`$ ls -l dist/`

`$ sudo cp dist/docker-compose-Linux-armv7l /usr/local/bin/docker-compose`

`$ sudo chown root:root /usr/local/bin/docker-compose`

`$ sudo chmod 0755 /usr/local/bin/docker-compose`

終了後以下のようになればいいらしい
```
$ docker-compose version
docker-compose version 1.13.0dev, build ae2cc6b
docker-py version: 2.2.1
CPython version: 2.7.13
OpenSSL version: OpenSSL 1.0.1t  3 May 2016
```

## connect: permission denied.などのエラーが出た際は
`sudo usermod -a -G docker $USER`
を入力して再起動
（$USERはラズパイのユーザ名）

参考サイト
[https://techoverflow.net/2017/03/01/solving-docker-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket/](https://techoverflow.net/2017/03/01/solving-docker-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket/)

## Visionect Software Suiteのダウンロード
参考サイト（Visionect Knowledge Base）

[https://docs.visionect.com/VisionectSoftwareSuite/Installation.html](https://docs.visionect.com/VisionectSoftwareSuite/Installation.html)

参考サイトの **Embedded Boards (Raspberry Pi 2 and others)** より以下を入力（sudoを忘れずに）

```
# create postgres container
docker run -d --restart=always -e POSTGRES_PASSWORD=visionect -e POSTGRES_USER=visionect --name vserver_postgres zsoltm/postgresql-armhf:9.4
# export environment variables
export POSTGRES_PORT_5432_TCP_ADDR=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' vserver_postgres)
export POSTGRES_PORT_5432_TCP_PORT=5432
# create the server database
docker exec vserver_postgres sh -c 'exec psql -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U visionect -c "CREATE DATABASE koala WITH owner=visionect;"'
# create data container  named 'vdata' (persistent volumes for things like, log files, firmware packages and configuration files)
docker create --name vdata visionect/visionect-server-v3-armhf
# run docker container
docker run --privileged --cap-add=MKNOD --cap-add SYS_ADMIN --device /dev/fuse -d --restart=always -p 8081:8081 -p 11112:11112 -p 11113:11113 --link vserver_postgres:db2_1 --volumes-from vdata --name vserver visionect/visionect-server-v3-armhf
```