# 代理自动配置

参见：<https://zh.wikipedia.org/wiki/代理自动配置>

## gfwlist

转换成 pac 文件：

```sh
wget https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt
sudo pip install gfwlist2pac
gfwlist2pac -i gfwlist.txt -f gfwlist.pac -p 127.0.0.1:1080
```

可以把 127.0.0.1:1080 换成你的 Socks5 代理地址，这个值会作为 proxy（代理）变量值填写到 PAC 文件中。

注：本项目的 resources 路径下存放了我获取的 [gfwlist.txt](./resources/gfwlist.txt) 和转换好的 [gfwlist.pac](./resources/gfwlist.pac) 文件。2016/12/20

## 其他

- [lwr/autopac.sh](https://gist.github.com/lwr/9719111)：生成自定义 PAC 的辅助脚本
