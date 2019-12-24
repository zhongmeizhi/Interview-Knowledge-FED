# webpack

> webpack 最出色的功能之一就是，除了 `JavaScript`，还可以通过 `loader` 引入**任何其他类型的文件**。

### Webpack 核心概念：

* `Entry`（入口）：Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
* `Module`（模块）：在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
* `Chunk`（代码块）：一个 Chunk 由多个模块组合而成，用于代码合并与分割。
* `Loader`（模块转换器）：用于把模块原内容按照需求转换成新内容。
* `Plugin`（扩展插件）：在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件，并改变输出结果


### Webpack 执行流程

webpack从启动到结束会依次执行以下流程：
1. 初始化：解析webpack配置参数，生产 `Compiler` 实例
2. 注册插件：调用插件的`apply`方法，给插件传入`compiler`实例的引用，插件通过compiler调用Webpack提供的API，让插件可以监听后续的所有事件节点。
3. 开始编译：读取入口文件
4. 解析文件：使用`loader`将文件解析成抽象语法树 `AST`
5. 生成依赖图谱：找出每个文件的依赖项（遍历）
7. 输出：根据转换好的代码，生成 `chunk`
8. 生成最后打包代码

ps：由于 webpack 是根据依赖图动态加载所有的依赖项，所以，每个模块都可以明确表述自身的依赖，可以避免打包未使用的模块。


### Babel

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 `JavaScript` 语法，以便能够运行在当前和旧版本的浏览器或其他环境中：

主要功能
* 语法转换
* 通过 `Polyfill` 方式在目标环境中添加缺失的特性 (通过 `@babel/polyfill` 模块)
* 源码转换 (`codemods`)

主要模块
* `@babel/parser`：负责将代码解析为抽象语法树
* `@babel/traverse`：遍历抽象语法树的工具，我们可以在语法树中解析特定的节点，然后做一些操作
* `@babel/core`：代码转换，如ES6的代码转为ES5的模式


### Webpack 打包结果

在使用 webpack 构建的典型应用程序或站点中，有三种主要的代码类型：
1. 源码：你或你的团队编写的源码。
2. 依赖：你的源码会依赖的任何第三方的 `library` 或 "`vendor`" 代码。
3. 管理文件：`webpack` 的 `runtime` 使用 `manifest` 管理所有模块的交互。


`runtime`：在模块交互时，连接模块所需的**加载和解析逻辑**。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑。

`manifest`：当编译器(compiler)开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "Manifest"，
当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。无论你选择哪种模块语法，那些 import 或 require 语句现在都已经转换为 __webpack_require__ 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块。


其中：
* `import` 或 `require` 语句会转换为 `__webpack_require__`
* 异步导入会转换为 `require.ensure`（在Webpack 4 中会使用 Promise 封装）


### 比较

* `gulp` 是任务执行器(task runner)：就是用来自动化处理常见的开发任务，例如项目的检查(lint)、构建(build)、测试(test)
* `webpack` 是打包器(bundler)：帮助你取得准备用于部署的 JavaScript 和样式表，将它们转换为适合浏览器的可用格式。例如，JavaScript 可以压缩、拆分 chunk 和懒加载，


### Webpack 优化

##### DllPlugin + DllReferencePlugin

为了极大减少构建时间，进行分离打包。

DllReferencePlugin 和 DLL插件DllPlugin 都是在_另外_的 webpack 设置中使用的。

`DllPlugin`这个插件是在一个额外的独立的 webpack 设置中创建一个只有 dll 的 bundle(dll-only-bundle)。 这个插件会生成一个名为 manifest.json 的文件，这个文件是用来让 `DLLReferencePlugin` 映射到相关的依赖上去的。

webpack.vendor.config.js

```
  new webpack.DllPlugin({
    context: __dirname,
    name: "[name]_[hash]",
    path: path.join(__dirname, "manifest.json"),
  })
```

webpack.app.config.js

```
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require("./manifest.json"),
    name: "./my-dll.js",
    scope: "xyz",
    sourceType: "commonjs2"
  })
```


##### CommonsChunkPlugin

通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存到缓存中供后续使用。这个带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，而不是每次访问一个新页面时，再去加载一个更大的文件。

如果把公共文件提取出一个文件，那么当用户访问了一个网页，加载了这个公共文件，再访问其他依赖公共文件的网页时，就直接使用文件在浏览器的缓存，这样公共文件就只用被传输一次。

```
  entry: {
    vendor: ["jquery", "other-lib"], // 明确第三方库
    app: "./entry"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      // filename: "vendor.js"
      // (给 chunk 一个不同的名字)

      minChunks: Infinity,
      // (随着 entry chunk 越来越多，
      // 这个配置保证没其它的模块会打包进 vendor chunk)
    })
  ]

  // 打包后的文件
  <script src="vendor.js" charset="utf-8"></script>
  <script src="app.js" charset="utf-8"></script>
```


##### UglifyJSPlugin

基本上脚手架都包含了该插件,该插件会分析JS代码语法树，理解代码的含义，从而做到去掉无效代码、去掉日志输入代码、缩短变量名等优化。

```
  const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
  //...
  plugins: [
      new UglifyJSPlugin({
          compress: {
              warnings: false,  //删除无用代码时不输出警告
              drop_console: true,  //删除所有console语句，可以兼容IE
              collapse_vars: true,  //内嵌已定义但只使用一次的变量
              reduce_vars: true,  //提取使用多次但没定义的静态值到变量
          },
          output: {
              beautify: false, //最紧凑的输出，不保留空格和制表符
              comments: false, //删除所有注释
          }
      })
  ]
```


##### ExtractTextPlugin + PurifyCSSPlugin

ExtractTextPlugin 从 bundle 中提取文本（CSS）到单独的文件，PurifyCSSPlugin纯化CSS（其实用处没多大）

```
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  localIdentName: 'purify_[hash:base64:5]',
                  modules: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      ...,
      new PurifyCSSPlugin({
        purifyOptions: {
          whitelist: ['*purify*']
        }
      })
    ]
  };
```


##### DefinePlugin

> DefinePlugin能够自动检测环境变化，效率高效。

在前端开发中，在不同的应用环境中，需要不同的配置。如：开发环境的API Mocker、测试流程中的数据伪造、打印调试信息。如果使用人工处理这些配置信息，不仅麻烦，而且容易出错。


使用`DefinePlugin`配置的全局常量

注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。通常，有两种方式来达到这个效果，使用 `' "production" '`, 或者使用 `JSON.stringify('production')`。

```
    new webpack.DefinePlugin({

        // 当然，在运行node服务器的时候就应该按环境来配置文件
        // 下面模拟的测试环境运行配置

        'process.env':JSON.stringify('dev'),
        WP_CONF: JSON.stringify('dev'),
    }),
```

测试`DefinePlugin`：编写

```
    if (WP_CONF === 'dev') {
        console.log('This is dev');
    } else {
        console.log('This is prod');
    }
```

打包后`WP_CONF === 'dev'`会编译为`false`

```
    if (false) {
        console.log('This is dev');
    } else {
        console.log('This is prod');
    }
```


##### 清除不可达代码

当使用了`DefinePlugin`插件后，打包后的代码会有很多冗余。可以通过`UglifyJsPlugin`**清除不可达代码**。

```
    [
        new UglifyJsPlugin({
            uglifyOptions: {
            compress: {
                warnings: false, // 去除warning警告
                dead_code: true, // 去除不可达代码
            },
            warnings: false
            }
        })
    ]
```

最后的打包打包代码会变成`console.log('This is prod')`


附Uglify文档：https://github.com/mishoo/UglifyJS2

使用DefinePlugin区分环境 + UglifyJsPlugin清除不可达代码，以减轻打包代码体积



##### HappyPack

[HappyPack](https://github.com/amireh/happypack)可以**开启多进程Loader转换**，将任务分解给多个子进程，最后将结果发给主进程。

使用
```
  exports.plugins = [
    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders: [ 'babel-loader' ]
    }),

    new HappyPack({
      id: 'styles',
      threads: 2,
      loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
    })
  ];

  exports.module.rules = [
    {
      test: /\.js$/,
      use: 'happypack/loader?id=jsx'
    },

    {
      test: /\.less$/,
      use: 'happypack/loader?id=styles'
    },
  ]
```


##### ParallelUglifyPlugin

[ParallelUglifyPlugin](https://github.com/gdborton/webpack-parallel-uglify-plugin)可以**开启多进程压缩JS文件**

```
  import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin';

  module.exports = {
    plugins: [
      new ParallelUglifyPlugin({
        test,
        include,
        exclude,
        cacheDir,
        workerCount,
        sourceMap,
        uglifyJS: {
        },
        uglifyES: {
        }
      }),
    ],
  };
```


##### BundleAnalyzerPlugin

webpack打包结果分析插件

```
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
  module.exports = {
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  }
```


##### 外部扩展(externals)

这玩意不是插件，是wenpack的配置选项

externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。此功能通常对 library 开发人员来说是最有用的，然而也会有各种各样的应用程序用到它。

```
  entry: {
    entry: './src/main.js',
    vendor: ['vue', 'vue-router', 'vuex']
  },
  externals: {
    // 从输出的 bundle 中排除 echarts 依赖
    echarts: 'echarts',
  }
```


##### test & include & exclude

减小文件搜索范围，从而提升速度

示例
```
  {
    test: /\.css$/,
    include: [
      path.resolve(__dirname, "app/styles"),
      path.resolve(__dirname, "vendor/styles")
    ]
  }
```

### Webpack HMR 原理解析

> Hot Module Replacement（简称 HMR)

包含以下内容：
1. 热更新图
2. 热更新步骤讲解

![热更新](/md/img/hot_loader.jpg)

##### 第一步：webpack 对文件系统进行 watch 打包到内存中

webpack-dev-middleware 调用 webpack 的 api 对文件系统 watch，当文件发生改变后，webpack 重新对文件进行编译打包，然后保存到内存中。

webpack 将 bundle.js 文件打包到了内存中，不生成文件的原因就在于访问内存中的代码比访问文件系统中的文件更快，而且也减少了代码写入文件的开销。

这一切都归功于[memory-fs](https://github.com/webpack/memory-fs)，memory-fs 是 webpack-dev-middleware 的一个依赖库，webpack-dev-middleware 将 webpack 原本的 outputFileSystem 替换成了MemoryFileSystem 实例，这样代码就将输出到内存中。

webpack-dev-middleware 中该部分源码如下:
```
  // compiler
  // webpack-dev-middleware/lib/Shared.js
  var isMemoryFs = !compiler.compilers &&
                  compiler.outputFileSystem instanceof MemoryFileSystem;
  if(isMemoryFs) {
      fs = compiler.outputFileSystem;
  } else {
      fs = compiler.outputFileSystem = new MemoryFileSystem();
  }
```

##### 第二步：devServer 通知浏览器端文件发生改变

在启动 devServer 的时候，[sockjs]((https://github.com/sockjs/sockjs-client)) 在服务端和浏览器端建立了一个 webSocket 长连接，以便将 webpack 编译和打包的各个阶段状态告知浏览器，最关键的步骤还是 webpack-dev-server 调用 webpack api 监听 compile的 done 事件，当compile 完成后，webpack-dev-server通过 _sendStatus 方法将编译打包后的新模块 hash 值发送到浏览器端。

```
  // webpack-dev-server/lib/Server.js
  compiler.plugin('done', (stats) => {
    // stats.hash 是最新打包文件的 hash 值
    this._sendStats(this.sockets, stats.toJson(clientStats));
    this._stats = stats;
  });
  ...
  Server.prototype._sendStats = function (sockets, stats, force) {
    if (!force && stats &&
    (!stats.errors || stats.errors.length === 0) && stats.assets &&
    stats.assets.every(asset => !asset.emitted)
    ) { return this.sockWrite(sockets, 'still-ok'); }
    // 调用 sockWrite 方法将 hash 值通过 websocket 发送到浏览器端
    this.sockWrite(sockets, 'hash', stats.hash);
    if (stats.errors.length > 0) { this.sockWrite(sockets, 'errors', stats.errors); } 
    else if (stats.warnings.length > 0) { this.sockWrite(sockets, 'warnings', stats.warnings); }      else { this.sockWrite(sockets, 'ok'); }
  };
```

##### 第三步：webpack-dev-server/client 接收到服务端消息做出响应

webpack-dev-server 修改了webpack 配置中的 entry 属性，在里面添加了 webpack-dev-client 的代码，这样在最后的 bundle.js 文件中就会接收 websocket 消息的代码了。

webpack-dev-server/client 当接收到 type 为 hash 消息后会将 hash 值暂存起来，当接收到 type 为 ok 的消息后对应用执行 reload 操作。

在 reload 操作中，webpack-dev-server/client 会根据 hot 配置决定是刷新浏览器还是对代码进行热更新（HMR）。代码如下：

```
  // webpack-dev-server/client/index.js
  hash: function msgHash(hash) {
      currentHash = hash;
  },
  ok: function msgOk() {
      // ...
      reloadApp();
  },
  // ...
  function reloadApp() {
    // ...
    if (hot) {
      log.info('[WDS] App hot update...');
      const hotEmitter = require('webpack/hot/emitter');
      hotEmitter.emit('webpackHotUpdate', currentHash);
      // ...
    } else {
      log.info('[WDS] App updated. Reloading...');
      self.location.reload();
    }
  }
```

##### 第四步：webpack 接收到最新 hash 值验证并请求模块代码

首先 webpack/hot/dev-server（以下简称 dev-server） 监听第三步 webpack-dev-server/client 发送的 `webpackHotUpdate` 消息，调用 webpack/lib/HotModuleReplacement.runtime（简称 HMR runtime）中的 check 方法，检测是否有新的更新。

在 check 过程中会利用 webpack/lib/JsonpMainTemplate.runtime（简称 jsonp runtime）中的两个方法 hotDownloadManifest 和 hotDownloadUpdateChunk。

hotDownloadManifest 是调用 AJAX 向服务端请求是否有更新的文件，如果有将发更新的文件列表返回浏览器端。该方法返回的是最新的 hash 值。

hotDownloadUpdateChunk 是通过 jsonp 请求最新的模块代码，然后将代码返回给 HMR runtime，HMR runtime 会根据返回的新模块代码做进一步处理，可能是刷新页面，也可能是对模块进行热更新。该 方法返回的就是最新 hash 值对应的代码块。

最后将新的代码块返回给 HMR runtime，进行模块热更新。

附：为什么更新模块的代码不直接在第三步通过 websocket 发送到浏览器端，而是通过 jsonp 来获取呢？

我的理解是，功能块的解耦，各个模块各司其职，dev-server/client 只负责消息的传递而不负责新模块的获取，而这些工作应该有 HMR runtime 来完成，HMR runtime 才应该是获取新代码的地方。再就是因为不使用 webpack-dev-server 的前提，使用 webpack-hot-middleware 和 webpack 配合也可以完成模块热更新流程，在使用 webpack-hot-middleware 中有件有意思的事，它没有使用 websocket，而是使用的 EventSource。综上所述，HMR 的工作流中，不应该把新模块代码放在 websocket 消息中。

##### 第五步：HotModuleReplacement.runtime 对模块进行热更新

这一步是整个模块热更新（HMR）的关键步骤，而且模块热更新都是发生在HMR runtime 中的 hotApply 方法中

```
  // webpack/lib/HotModuleReplacement.runtime
  function hotApply() {
      // ...
      var idx;
      var queue = outdatedModules.slice();
      while(queue.length > 0) {
          moduleId = queue.pop();
          module = installedModules[moduleId];
          // ...
          // remove module from cache
          delete installedModules[moduleId];
          // when disposing there is no need to call dispose handler
          delete outdatedDependencies[moduleId];
          // remove "parents" references from all children
          for(j = 0; j < module.children.length; j++) {
              var child = installedModules[module.children[j]];
              if(!child) continue;
              idx = child.parents.indexOf(moduleId);
              if(idx >= 0) {
                  child.parents.splice(idx, 1);
              }
          }
      }
      // ...
      // insert new code
      for(moduleId in appliedUpdate) {
          if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
              modules[moduleId] = appliedUpdate[moduleId];
          }
      }
      // ...
  }
```

模块热更新的错误处理，如果在热更新过程中出现错误，热更新将回退到刷新浏览器，这部分代码在 dev-server 代码中，简要代码如下：

```
  module.hot.check(true).then(function(updatedModules) {
    if(!updatedModules) {
        return window.location.reload();
    }
    // ...
  }).catch(function(err) {
      var status = module.hot.status();
      if(["abort", "fail"].indexOf(status) >= 0) {
          window.location.reload();
      }
  });
```

##### 第六步：业务代码需要做些什么？

当用新的模块代码替换老的模块后，但是我们的业务代码并不能知道代码已经发生变化，也就是说，当 hello.js 文件修改后，我们需要在 index.js 文件中调用 HMR 的 accept 方法，添加模块更新后的处理函数，及时将 hello 方法的返回值插入到页面中。代码如下

```
  // index.js
  if(module.hot) {
      module.hot.accept('./hello.js', function() {
          div.innerHTML = hello()
      })
  }
```
