(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{432:function(e,t,a){"use strict";a.r(t);var r=a(42),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"rxjs学习-之-operators"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rxjs学习-之-operators"}},[e._v("#")]),e._v(" RXJS学习 之 Operators")]),e._v(" "),a("blockquote",[a("p",[e._v("Operators")])]),e._v(" "),a("p",[e._v("所有的Operators来自"),a("code",[e._v("rxjs/operators")]),e._v("，"),a("strong",[e._v("要在pipe中使用.")])]),e._v(" "),a("h3",{attrs:{id:"取值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#取值"}},[e._v("#")]),e._v(" 取值")]),e._v(" "),a("ul",[a("li",[e._v("take: 取第 N 个值.然后结束")]),e._v(" "),a("li",[e._v("first: 无参时 = take(1), 有函数参数时, 类似于find()")]),e._v(" "),a("li",[e._v("skip: 跳过前 N 个值")]),e._v(" "),a("li",[e._v("takeLast：和take相反，取最后几个")]),e._v(" "),a("li",[e._v("last：和first相反")])]),e._v(" "),a("h3",{attrs:{id:"取值终止"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#取值终止"}},[e._v("#")]),e._v(" 取值终止")]),e._v(" "),a("p",[e._v("takeUntil：取值，直到...为止")]),e._v(" "),a("p",[e._v("在某件事情发生时，让一个 observable 直送出 完成(complete)讯息")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  let stopInteval = fromEvent(document, 'click');  \n\n  interval(1000)\n  .pipe(\n    takeUntil(stopInteval)\n  )\n  .subscribe({\n      next: (value) => { console.log(value); },\n      error: (err) => { console.log('Error: ' + err); },\n      complete: () => { console.log('complete'); }\n  });\n")])])]),a("h3",{attrs:{id:"扁平列阵"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#扁平列阵"}},[e._v("#")]),e._v(" 扁平列阵")]),e._v(" "),a("ul",[a("li",[e._v("concatAll: 将二维阵列的子列阵摊平成一维阵列.\n"),a("ul",[a("li",[e._v("（concat 和 concatAll 都要等待前一个 observable 完成(complete)，才会继续下一个）")])])]),e._v(" "),a("li",[e._v("mergeAll: 类似于concatAll，不需要等待observable完成")]),e._v(" "),a("li",[e._v("switchAll：只能订阅最近的内部可观察量")]),e._v(" "),a("li",[e._v("concatMap 相当于 concatAll + map")]),e._v(" "),a("li",[e._v("mergeMap 相当于 mergeAll + map")]),e._v(" "),a("li",[e._v("switchMap 相当于 switchAll + map")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  const clicks = fromEvent(document, 'click');\n  const higherOrder = clicks.pipe(\n    map(ev => interval(1000).pipe(take(4))),\n  );\n  // 此时 higherOrder 是二维列阵: 一维列阵 = click, 二维列阵 = 1, 2, 3, 4\n\n  higherOrder.subscribe(console.log)\n  // Observable {_isSca...\n  // 订阅的是一维列阵\n\n  const firstOrder = higherOrder.pipe(concatAll());\n  firstOrder.subscribe(x => console.log(x));\n  // 0 -> 1 -> 2 -> 3\n  // 订阅了二维列阵\n")])])]),a("h3",{attrs:{id:"仿原生方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#仿原生方法"}},[e._v("#")]),e._v(" 仿原生方法")]),e._v(" "),a("ul",[a("li",[e._v("reduce：相当于原生的 reduce")]),e._v(" "),a("li",[e._v("scan: 类似于 reduce，但每次取值都会推送结果")]),e._v(" "),a("li",[e._v("map: 相当于原生的 map")]),e._v(" "),a("li",[e._v("filter： 相当于 filter")])]),e._v(" "),a("h3",{attrs:{id:"startwith"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#startwith"}},[e._v("#")]),e._v(" startWith")]),e._v(" "),a("p",[e._v("startWith：在 observable 最前面塞入要发送的元素")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  interval(1000).pipe(startWith('一', '二')).subscribe(console.log)\n\n  // 一 二 1 2 3\n")])])]),a("h3",{attrs:{id:"防抖"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#防抖"}},[e._v("#")]),e._v(" 防抖")]),e._v(" "),a("ul",[a("li",[e._v("debounce：根据是否传入新值防抖")]),e._v(" "),a("li",[e._v("debounceTime：根据时间防抖")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  fromEvent(document, 'click')\n  .pipe(debounceTime(300))\n  .subscribe(x => console.log(x));\n")])])]),a("h3",{attrs:{id:"节流"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#节流"}},[e._v("#")]),e._v(" 节流")]),e._v(" "),a("ul",[a("li",[e._v("throttle: 参考防抖")]),e._v(" "),a("li",[e._v("throttleTime: 参考防抖")]),e._v(" "),a("li")]),e._v(" "),a("h3",{attrs:{id:"剔重"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#剔重"}},[e._v("#")]),e._v(" 剔重")]),e._v(" "),a("p",[e._v("distinct([keySelector])： 剔重\ndistinctUntilChanged([keySelector])：剔重，直到改变为止")]),e._v(" "),a("h3",{attrs:{id:"分组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分组"}},[e._v("#")]),e._v(" 分组")]),e._v(" "),a("p",[e._v("groupBy(fn)，根据fn返回的key进行分组，返回多个")]),e._v(" "),a("h3",{attrs:{id:"缓存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存"}},[e._v("#")]),e._v(" 缓存")]),e._v(" "),a("p",[e._v("缓存observable的元素，触发时输出缓存数组")]),e._v(" "),a("ul",[a("li",[e._v("buffer(ob)， 在接受到ob参数前。先将observer的数据缓存起来")]),e._v(" "),a("li",[e._v("bufferTime(时间毫秒数)，根据缓存队列的时间是否到达来触发observable")]),e._v(" "),a("li",[e._v("bufferCount(num)，根据缓存队列的数量是否到达来触发observable\n"),a("ul",[a("li",[e._v("如果是2个参数： bufferSize: number, startBufferEvery")])])]),e._v(" "),a("li",[e._v("还有window家族，使用方法和buffer一样，会返回一个Observable")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  const clicks = fromEvent(document, 'click');\n  const buffered = clicks.pipe(bufferCount(2));\n  buffered.subscribe(x => console.log(x));\n")])])]),a("h3",{attrs:{id:"捕获"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#捕获"}},[e._v("#")]),e._v(" 捕获")]),e._v(" "),a("ul",[a("li",[e._v("catchError(fn)：捕获错误的回调\n"),a("ul",[a("li",[e._v("就算copy的API文档也会报错："),a("code",[e._v("Maximum call stack size exceeded")])])])]),e._v(" "),a("li",[e._v("retry(num)：重试num次")]),e._v(" "),a("li",[e._v("retryWhen(fn): 在fn吐出observable值后重试")])]),e._v(" "),a("h3",{attrs:{id:"重复"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#重复"}},[e._v("#")]),e._v(" 重复")]),e._v(" "),a("p",[e._v("repeat(num): 重复num次")]),e._v(" "),a("h3",{attrs:{id:"延迟"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#延迟"}},[e._v("#")]),e._v(" 延迟")]),e._v(" "),a("ul",[a("li",[e._v("delay： 延迟 N 毫秒后发送元素")]),e._v(" "),a("li",[e._v("delayWhen：在delay的基础上可以定义每个元素的延迟方式")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  from([1, 2, 3, 4, 5]).pipe(\n    delayWhen(e => {\n      return interval(e * 1000)\n    }),\n  ).subscribe(console.log)\n")])])]),a("h3",{attrs:{id:"主从关系"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#主从关系"}},[e._v("#")]),e._v(" 主从关系")]),e._v(" "),a("p",[e._v("withLatestFrom： 主从关系，等待observable发送事件")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  const itv = interval(1000);\n  \n  fromEvent(document, 'click')\n  .pipe(\n    withLatestFrom(itv)\n  )\n  .subscribe(x => console.log(x));\n\n  // interval一直在执行\n  // 等点击一次，就输出一次\n")])])])])}),[],!1,null,null,null);t.default=s.exports}}]);