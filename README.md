# create-vue-admin
## 1.功能情况
### 配置
- √ 配置多环境变量
- √ 配置基础 vue.config.js
- √ 配置 proxy 跨域
- √ 图片压缩
- √ gzip压缩
- √ 发布环境去除console



### 系统功能

- √ 登陆功能
- √ 静态mock功能，api模块化功能
- √ 多语言
- √ 侧边栏



### TODO

- 全站CDN加速





## 2.功能说明







## 3.项目安装
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```



## 发布

### 1.编写 nginx.conf 配置
```
#user  nobody;

worker_processes  2;

#工作模式及连接数上线
events {
    worker_connections  1024;   #单个工作进程 处理进程的最大并发数
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，
    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    # 开启GZIP
    gzip  on;

    # # 监听 80 端口，转发请求到 3000 端口
    server {
        #监听端口
        listen      80;
        #编码格式
        charset utf-8;

        # 前端静态文件资源
        location / {
	    root  /usr/src/app;
            index index.html index.htm;
            try_files $uri $uri/ @rewrites;
        }
        # 配置如果匹配不到资源，将url指向 index.html， 在 vue-router 的 history 模式下使用，就不会显示404
        location @rewrites {
            rewrite ^(.*)$ /index.html last;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}

```







## 4.运用技术及参考资料

1. [vue](https://cn.vuejs.org/)
2. [vuex](https://vuex.vuejs.org/zh/)
3. [vue-router](https://router.vuejs.org/zh/)
4. [element-ui](http://element-cn.eleme.io/#/zh-CN)
5. [axios](https://www.kancloud.cn/yunye/axios/234845)
6. [vue-i18n](https://www.jianshu.com/p/0324115fcd4e)
7. [echarts](https://echarts.baidu.com/)
8. [tinymce](https://www.tiny.cloud/docs/quick-start/)
9. [mxgraph](https://github.com/jgraph/mxgraph)
10. [moment](http://momentjs.cn/)
11. [lodash](https://www.lodashjs.com/) [lodash-webpack-plugin](https://www.npmjs.com/package/lodash-webpack-plugin)
12. [pdf.js](https://github.com/mozilla/pdf.js/) [pdf.js-简书](https://www.jianshu.com/p/528537a8b736)
13. [gantt](https://docs.dhtmlx.com/gantt/index.html)
