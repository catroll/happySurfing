# ShadowSocks

官网：<http://shadowsocks.org/en/index.html>
Github：<https://github.com/shadowsocks/>

ShadowSocks 有不同的服务器端和客户端，我使用的是 [@clowwindy](https://github.com/clowwindy) 同志发起开源项目 **[shadowsocks-python](https://github.com/shadowsocks/shadowsocks)**（基于 Apache 协议 2.0），同时包括服务器端和括客户端，操作简单，且各平台通用。

可以等翻出去之后查阅官网，获得更多信息：

- ShadowSocks [服务器](http://shadowsocks.org/en/download/servers.html)
- ShadowSocks [客户端](http://shadowsocks.org/en/download/clients.html)
- shadowsocks-python 项目 [wiki](https://github.com/shadowsocks/shadowsocks/wiki)  
  上面说明够细致了，翻出去之后可以看一看。

## 一、安装

- 通过 PIP 安装

    ```sh
    pip install shadowsocks
    ```

- 通过 GitHub 下载源码安装

    ```sh
    git clone https://github.com/shadowsocks/shadowsocks.git
    cd shadowsocks
    python setup.py
    ```

## 二、配置

### 1. `/etc/shadowsocks.json`

```js
{
    "server": "my_host",
    "server_port": 8388,
    "local_address": "0.0.0.0",
    "local_port": 1080,
    "password": "my_password",
    "timeout": 300,
    "method": "aes-256-cfb",
    "verbose": 0,
    "fast_open": false,
    "workers": 1
}
```

### 2. 配置项说明

- `server`: 字符串，服务器端主机名或 IP 地址，默认是 `0.0.0.0`。
- `server_port`: 数值，服务器端端口号，默认是 `8388`。
- `local_address`: 字符串，客户端 IP 地址，默认是 `127.0.0.1`。
- `local_port`: 数值，客户端端口号，默认是 `1080`。
- `password`: 字符串，通讯密码。
- **`port_password`**：字典，服务器端端口号对通讯密码，估计是用于通过多个端口对外提供服务。
    如果配置文件中有该字段，则会自动忽略 `server_port` 和 `password` 配置。
- `timeout`: 数值，通讯超时时间，单位是秒，默认是 `300`。
- `method`: 字符串（大小写不敏感），加密方法，默认是 `AES-256-CFB`。
    查看所有支持的方法：

    ```python
    > import shadowsocks.encrypt
    > print sorted(shadowsocks.encrypt.method_supported.keys())
    ['aes-128-cfb', 'aes-128-cfb1', 'aes-128-cfb8', 'aes-128-ctr', 'aes-128-ofb', 'aes-192-cfb', 'aes-192-cfb1', 'aes-192-cfb8', 'aes-192-ctr', 'aes-192-ofb', 'aes-256-cfb', 'aes-256-cfb1', 'aes-256-cfb8', 'aes-256-ctr', 'aes-256-ofb', 'bf-cfb', 'camellia-128-cfb', 'camellia-192-cfb', 'camellia-256-cfb', 'cast5-cfb', 'chacha20', 'des-cfb', 'idea-cfb', 'rc2-cfb', 'rc4', 'rc4-md5', 'salsa20', 'salsa20-ctr', 'seed-cfb', 'table']
    ```

    其中 `rc4` 和 `table` 是两种不安全的加密方法，不推荐使用。
    如果使用的加密方法不支持，可能需要安装额外的包，例如：`apt-get install python-m2crypto`。
- `verbose`：数值，标识记录日志的级别。
    参见：`/usr/local/lib/python2.7/dist-packages/shadowsocks/utils.py`
- `fast_open`：布尔值，是否使用 TFO（TCP Fast Open）特性。
    参见：<http://en.wikipedia.org/wiki/TCP_Fast_Open>
- `workers`：数值，进程数，默认为 1，即使用单进程模式。

说明：

1. 上述配置文件只是为了说明支持的配置项，并不是每项都必须，比如，纯服务器端不需要 `local_address` 字段。而且，服务器端使用默认配置就够了，然后相应地，客户端只用设置服务器端地址。
2. 配置文件需要手动创建，如果使用配置文件启动。

### 3. 分享给局域网内的其他用户

你的 shadowsocks 应该绑定到 IP 上，也就是说 `local_address` 应该是 `0.0.0.0`。

然后局域网小伙伴们的 shadowsocks 设置中，`server` 这一项应该是你的局域网 IP 地址。

## 三、启动

### 1. 服务器端

```sh
nohup ssserver -c /etc/shadowsocks.json 1>/var/log/shadowsocks/server.log 2>&1 &
```

### 2. 客户端

```sh
nohup sslocal -c /etc/shadowsocks.json 1>/var/log/shadowsocks/client.log 2>&1 &
```

### 3. supervistor

我使用的这种方法，避免万一服务挂了需要手动重启服务。但是涉及另一个模块的用法，一两句说不清，不再这里累赘。

## 四、Windows GUI 客户端

Windows 下有图形化客户端可以使用，我看使用 Windows 的同事用过，还可以，提两句。

~~官方提供的下载地址：`http://sourceforge.net/projects/shadowsocksgui/files/dist/`，当前最新版是 2.3.1（[下载](http://sourceforge.net/projects/shadowsocksgui/files/dist/Shadowsocks-win-2.3.1.zip/download)）。~~

官方提供的下载地址：<https://github.com/shadowsocks/shadowsocks-windows/releases>

该库的 `resources` 目录中也备份了一个最新版本，文件名为 `shadowsocks.exe`（[点击下载](/catroll/gfw/raw/master/resources/Shadowsocks.exe)）。
