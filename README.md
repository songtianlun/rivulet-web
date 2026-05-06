# Rivulet

<p align="center">
  <img src="web/admin/src/assets/logo.png" width="120" alt="Rivulet Logo" />
</p>

[![codecov](https://codecov.io/gh/songtianlun/rivulet/graph/badge.svg?token=78qRn2zmPD)](https://codecov.io/gh/songtianlun/rivulet)

溪流记账（Rivulet）是一款极简但强大的个人财务管理软件：快速记录收支，支持多账户、多账本与共享账本；提供预算管理、投资记录与财务分析，让你的钱流向清晰可控。

Rivulet is a minimalist yet powerful personal finance app. Track income and expenses fast, organize with multiple accounts and ledgers, and collaborate via shared ledgers. Stay on top of budgets, log investments, and unlock clear analytics to understand where your money goes.

## 快速开始 | Quick Start

最简单的方式是直接构建镜像并运行容器，映射宿主机 `2212` 到容器 `2212`。

The quickest way is to build the image and run the container with port `2212` mapped to the host.

```bash
docker run --rm \
	-p 2212:2212 \
	-e RIVULET_JWT_SECRET=change-me \
	rivulet:latest
```

访问 `http://localhost:2212`。

Open `http://localhost:2212`.

### 使用 PostgresQL 数据库 | Using PostgreSQL Database

默认情况下，Rivulet 使用内置的 SQLite 数据库。要使用 PostgreSQL，可以设置相关环境变量。

By default, Rivulet uses an embedded SQLite database. To use PostgreSQL, set the relevant environment variables.

```bash
docker run --rm \
	-p 2212:2212 \
    -e RIVULET_JWT_SECRET=change-me \
    -e RIVULET_DB_DRIVER=postgres \
    -e RIVULET_DB_DSN="host=your-postgres-host user=your-user password=your-password dbname=your-db sslmode=disable" \
    rivulet:latest
```

### 持久化数据和配置 | Persisting Data and Config

如果需要保留 SQLite 数据，并把配置文件放在宿主机目录中，可以同时挂载数据目录和配置文件。

To persist SQLite data and keep the config on the host, mount both the data directory and the config file.

```bash
mkdir -p ./data
cp rivulet.example.yaml ./rivulet.yaml

docker run -d \
	--name rivulet \
	-p 2212:2212 \
	-v $(pwd)/data:/app/data \
	-v $(pwd)/rivulet.yaml:/app/rivulet.yaml:ro \
	rivulet:latest
```

数据会写入宿主机的 `./data` 目录，程序会读取容器内的 `/app/rivulet.yaml`。

Data is stored in the host `./data` directory, and the app reads `/app/rivulet.yaml` inside the container.

## 配置方法 | Configuration Methods

### 1. .env

使用 `.env` 适合通过环境变量配置容器。变量名统一使用 `RIVULET_` 前缀，可参考 `example.env`。

Use `.env` when you want to configure the container with environment variables. All variables use the `RIVULET_` prefix. See `example.env`.

```bash
docker run --rm \
	-p 2212:2212 \
	--env-file .env \
	rivulet:latest
```

### 2. config

使用配置文件适合集中管理完整配置。可基于 `rivulet.example.yaml` 创建 `rivulet.yaml`，并挂载到 `/app/rivulet.yaml`。

Use a config file when you want one complete, explicit config. Copy `rivulet.example.yaml` to `rivulet.yaml` and mount it to `/app/rivulet.yaml`.

```bash
docker run --rm \
	-p 2212:2212 \
	-v $(pwd)/rivulet.yaml:/app/rivulet.yaml:ro \
	rivulet:latest
```

环境变量和配置文件都可用；容器部署优先推荐 `.env`，需要完整静态配置时推荐 `rivulet.yaml`。

Both methods work; prefer `.env` for container-style deployment, and `rivulet.yaml` for a complete static config.

## 测试覆盖率图示 | Coverage Visualization

[![Coverage icicle](https://codecov.io/gh/songtianlun/rivulet/graphs/icicle.svg?token=78qRn2zmPD)](https://codecov.io/gh/songtianlun/rivulet)


