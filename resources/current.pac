var proxy = "SOCKS5 127.0.0.1:1080";
var direct = 'DIRECT';
var domains = {
    // twitter
    "twitter.com": 1,
    "twimg.com": 1,
    "t.co": 1,

    // meida
    "bbc.com": 1,
    "bbc.co.uk": 1,
    "nytimes.com": 1,
    "chinadigitaltimes.net": 1,
    "reuters.com": 1,

    // google
    "google.com": 1,
    "google.com.hk": 1,
    "google.jp": 1,
    "google.co.jp": 1,
    "gstatic.com": 1,
    "googleusercontent.com": 1,
    "googleadservices.com": 1,
    "google-analytics.com": 1,
    "gmail.com": 1,
    "googleapis.com": 1,
    "googlecode.com": 1,

    // youtube
    "youtube.com": 1,
    "ytimg.com": 1,
    "googlevideo.com": 1,
    // "ggpht.com": 1,
    // fackbook
    "instagram.com": 1,
    "cdninstagram.com": 1,
    "facebook.com": 1,
    "facebook.net": 1,

    // trumble
    "trumble.com": 1,

    // line
    "line.naver.jp": 1,
    "line.md": 1,

    // video
    "nicovideo.jp": 1,
    "vimeo.com": 1,

    // blog
    "fanyue.info": 1,
    "blogger.com": 1,
    "wordpress.com": 1,
    "wp.com": 1,
    "gravatar.com": 1,

    // other app
    "dropbox.com": 1,
    "feedly.com": 1,

    "slideshare.net": 1,
    "slidesharecdn.com": 1,

    // japan
    "fc2.com": 1,

    // short url
    "goo.gl": 1,
    "bit.ly": 1,

    // wikipedia
    "wikipedia.org": 1,
    "wikisource.org": 1,
    "wikimedia": 1,
    "w.wiki": 1,

    // tech
    "amazonaws.com": 1, // => aws.amazon.com, AWS
    "appspot.com": 1, // => appengine.google.com
    "golang.org": 1,
    "github.com": 1,
    "angularjs.org": 1,

    // about gfw
    "whatblocked.com": 1,
    "getfoxyproxy.org": 1,
    "hikinggfw.org": 1,
    "greatfire.org": 1,
    "ifanqiang.com": 1,
    "feedburner.com": 1,

    // etc
    "thepiratebay.org": 1  // 海盗湾
};

var hasOwnProperty = Object.hasOwnProperty;

function FindProxyForURL(url, host) {
    var suffix;
    var pos = host.lastIndexOf('.');
    pos = host.lastIndexOf('.', pos - 1);
    while (1) {
        if (pos <= 0) {
            if (hasOwnProperty.call(domains, host)) {
                return proxy;
            } else {
                return direct;
            }
        }
        suffix = host.substring(pos + 1);
        if (hasOwnProperty.call(domains, suffix)) {
            return proxy;
        }
        pos = host.lastIndexOf('.', pos - 1);
    }
}
