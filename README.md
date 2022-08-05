[toc]
## 项目功能介绍


![image](https://user-images.githubusercontent.com/44115602/183071618-3a52fac6-98d5-4f8e-9902-77908d07313f.png)

当点击掘金的时候，就会获取掘金当前推荐的前端文章

![](https://files.mdnice.com/user/3934/6e08a87e-8e18-4796-a339-467b89e2d22a.png)

当点击牛客网的时候，就会获取到最新的前端面经

![](https://files.mdnice.com/user/3934/8ef820c5-5ce3-4f19-a522-2146c852a718.png)

点击【查看】就会跳到文章详情页


![](https://files.mdnice.com/user/3934/b5ffaf4c-0213-41fe-a804-5b44a6a3062b.png)





勾选后点击确认，就会把文章标题拼接到右边的输入框中，然后点击发送，就会将信息发送到学习群里供大家阅读。



![](https://files.mdnice.com/user/3934/292acd11-4b03-4934-8cb5-c642be6dd9d7.png)


## 技术栈介绍

本项目采用的是前后端分离方案

前端使用：vue3 + ts + antd

后端使用：egg.js + puppeter

## 前端实现

### 创建项目

使用vue-cli 创建vue3的项目。


![](https://files.mdnice.com/user/3934/5366da0d-c7d7-426b-98e4-6b51f2ed9d78.png)

### 按需引入antd组件

借助babel-plugin-import实现按需引入


```
npm install babel-plugin-import --dev
```

然后创建配置.babelrc文件就可以了。


```js
{
  "plugins": [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
  ]
}
```

我们可以把需要引入的组件统一写在一个文件里

**antd.ts**


```js
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  Checkbox,
  Card,
  Spin,
  Modal,
} from "ant-design-vue";

const FormItem = Form.Item;

export default [
  Button,
  Row,
  Col,
  Input,
  Form,
  FormItem,
  Checkbox,
  Card,
  Spin,
  Modal,
];
```


然后在入口文件里面use应用它们
**main.js**

```
import { createApp } from "vue";
import App from "./App.vue";
import antdCompArr from "@/antd";

const app = createApp(App);
antdCompArr.forEach((comp) => {
  app.use(comp);
});

app.mount("#app");
```




### 首页

其实就一个页面，所以，直接写在App.vue了

布局比较简单，直接亮html

```html
<template>
  <div class="pape-wrap">
    <a-row :gutter="16">
      <a-col :span="16">
        <a-card
          v-for="group in paperList"
          :key="group.name"
          class="box-card"
          shadow="always"
        >
          <div class="clearfix">
            <span>{{ group.name }}</span>
          </div>
          <div class="channels">
            <a-button
              :style="{ 'margin-top': '10px', 'margin-left': '10px' }"
              size="large"
              v-for="item in group.list"
              :key="item.href"
              class="btn-channel"
              @click="onClick(item)"
            >
              {{ item.name }}
            </a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-form>
          <a-form-item
            :laba-col="{ span: 24 }"
            label="支持markdown输入"
            label-align="left"
          >
            <a-textarea
              v-model:value="content"
              placeholder="暂支持mardown语法"
              show-count
            />
          </a-form-item>
          <a-form-item>
            <a-button @click="handleSendMsg"> 发消息 </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>

    <a-modal
      v-model:visible="visible"
      custom-class="post-modal"
      title="文章列表"
      @ok="handleComfirm"
    >
      <a-spin tip="Loading..." :spinning="isLoading">
        <div class="post-list">
          <div :style="{ borderBottom: '1px solid #E9E9E9' }">
            <a-checkbox
              v-model="checkAll"
              :indeterminate="indeterminate"
              @change="handleCheckAll"
              >全选</a-checkbox
            >
          </div>
          <br />
          <a-checkbox-group v-model:value="checkedList">
            <a-checkbox
              :value="item.value"
              v-for="item in checkoptions"
              :key="item.value"
            >
              {{ item.label }}
              <a
                class="a-button--text"
                style="font-size: 14px"
                target="_blank"
                :href="item.value"
                @click.stop
              >
                &nbsp; &nbsp;查看</a
              >
            </a-checkbox>
          </a-checkbox-group>
        </div>
      </a-spin>

      <span>
        <a-button @click="handleComfirm">确认</a-button>
      </span>
    </a-modal>
  </div>
</template>
```

主要就是遍历了paperList，而paperList的值是前端写死的。在constant文件里


```js
export const channels = [
  {
    name: "前端",
    list: [
      {
        name: "掘金",
        bizType: "juejin",
        url: "https://juejin.cn/frontend",
      },
      {
        name: "segmentfault",
        bizType: "segmentfault",
        url: "https://segmentfault.com/channel/frontend",
      },
      {
        name: "Chrome V8 源码",
        bizType: "zhihu",
        url: "https://zhuanlan.zhihu.com/v8core",
      },
      {
        name: "github-Sunny-Lucky前端",
        bizType: "githubIssues",
        url: "https://github.com/Sunny-lucking/blog/issues",
      },
    ],
  },
  {
    name: "Node",
    list: [
      {
        name: "掘金-后端",
        bizType: "juejin",
        url: "https://juejin.cn/frontend/Node.js",
      },
    ],
  },
  {
    name: "面经",
    list: [
      {
        name: "牛客网",
        bizType: "newcoder",
        url: "https://www.nowcoder.com/discuss/experience?tagId=644",
      },
    ],
  },
];

```



![](https://files.mdnice.com/user/3934/5ced0156-45bf-4494-8b19-06581dcbc951.png)


点击按钮的时候，出现弹窗，然后向后端发起请求，获取相应的文章。

点击方法如下：
```js
const onClick = async (item: any) => {
  visible.value = true;
  currentChannel.value = item.url;
  if (cache[currentChannel.value]?.list.length > 0) {
    const list = cache[currentChannel.value].list;
    state.checkedList = cache[currentChannel.value].checkedList || [];
    state.postList = list;
    return list;
  }
  isLoading.value = true;
  state.postList = [];
  const { data } = await getPostList({
    link: item.url,
    bizType: item.bizType,
  });
  if (data.success) {
    isLoading.value = false;
    const list = data.data || [];
    state.postList = list;
    cache[currentChannel.value] = {};
    cache[currentChannel.value].list = list;
  } else {
    message.error("加载失败!");
  }
};
```


获得文章渲染之后，勾选所选项之后，点击确认，会将所勾选的内容拼接到content里


```js
const updateContent = () => {
  const date = moment().format("YYYY/MM/DD");
  // eslint-disable-next-line no-useless-escape
  const header = `<font color=\"#389e0d\">前端早报-${date}</font>，欢迎大家阅读。\n>`;
  const tail = `本服务由**前端阳光**提供技术支持`;
  const body = state.preList
    .map((item, index) => `#### ${index + 1}. ${item}`)
    .join("\n");
  state.content = `${header}***\n${body}\n***\n${tail}`;
};

const handleComfirm = () => {
  visible.value = false;
  const selectedPosts = state.postList.filter((item: any) =>
    state.checkedList.includes(item.href as never)
  );
  const selectedList = selectedPosts.map((item, index) => {
    return `[${item.title.trim()}](${item.href})`;
  });
  state.preList = [...new Set([...state.preList, ...selectedList])];
  updateContent();
};
```

然后点击发送，就可以将拼接的内容发送给后端了，后端拿到后再转发给企业微信群


```js
const handleSendMsg = async () => {
  const params = {
    content: state.content,
  };
  await sendMsg(params);
  message.success("发送成功!");
};
```


前端的内容就讲到这里，大家可以直接去看源码：https://github.com/Sunny-lucking/morning-news


## 后端实现

### 创建项目

后端是使用egg框架实现的

快速生成项目


```
npm init egg
```


可以直接看看morningController的业务逻辑，其实主要实现了两个方法，一个是获取文章列表页返回给前端，一个是发送消息。


```js
export default class MorningPaper extends Controller {
  public async index() {
    const link = this.ctx.query.link;
    const bizType = this.ctx.query.bizType;
    let html = '';
    if (!link) {
      this.fail({
        msg: '入参校验不通过',
      });
      return;
    }
    const htmlResult = await this.service.puppeteer.page.getHtml(link);
    if (htmlResult.status === false) {
      this.fail({
        msg: '爬取html失败，请稍后重试或者调整超时时间',
      });
      return;
    }
    html = htmlResult.data as string;
    const links = this.service.morningPaper.index.formatHtmlByBizType(bizType, html) || [];
    this.success({
      data: links.filter(item => !item.title.match('招聘')),
    });
    return;
  }

  /**
   * 推送微信机器人消息
   */
  async sendMsg2Weixin() {
    const content = this.ctx.query.content;
    if (!content) {
      this.fail({
        resultObj: {
          msg: '入参数据异常',
        },
      });
      return;
    }
    const token = this.service.morningPaper.index.getBizTypeBoken();
    const status = await this.service.sendMsg.weixin.index(token, content);
    if (status) {
      this.success({
        resultObj: {
          msg: '发送成功',
        },
      });
      return;
    }

    this.fail({
      resultObj: {
        msg: '发送失败',
      },
    });
    return;
  }
}
```

### 文章的获取
先看看文章是怎么获取的。


首先是调用了puppeter.page的getHtml方法

该方法是利用puppeter生成一个模拟的浏览器，然后模拟浏览器去浏览页面的逻辑。


```js
 public async getHtml(link) {
    const browser = await puppeteer.launch(this.launch);
    const page: any = await browser.newPage();
    await page.setViewport(this.viewport);
    await page.setUserAgent(this.userAgent);
    await page.goto(link);
    await waitTillHTMLRendered(page);
    const html = await page.evaluate(() => {
      return document?.querySelector('html')?.outerHTML;
    });
    await browser.close();
    return {
      status: true,
      data: html,
    };
  }
```

这里需要注意的是，需要`await waitTillHTMLRendered(page);`，它的作用是检查页面是否已经加载完毕。

因为，进入页面，page.evaluate的返回可能是页面还在加载列表当中，所以需要waitTillHTMLRendered判断当前页面的列表是否加载完毕。

看看这个方法的实现：每隔一秒钟就判断页面的长度是否发生了变化，如果三秒内没有发生变化，默认页面已经加载完毕


```js
const waitTillHTMLRendered = async (page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    const html = await page.content();
    const currentHTMLSize = html.length;

    // eslint-disable-next-line no-loop-func
    const bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

    console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, ' body html size: ', bodyHTMLSize);

    if (lastHTMLSize !== 0 && currentHTMLSize === lastHTMLSize) { countStableSizeIterations++; } else { countStableSizeIterations = 0; } // reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      console.log('Page rendered fully..');
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitForTimeout(checkDurationMsecs);
  }
};
```


### 分析html，获取文章列表

上述的行为只会获取了那个页面的整个html，接下来需要分析html，然后获取文章列表。

html的分析其实 是用到了cheerio，cheerio的用法和jQuery一样，只不过它是在node端使用的。

已获取掘金文章列表为例子：可以看到是非常简单地就获取到了文章列表，接下来只要返回给前端就可以了。


```js
  getHtmlContent($): Link[] {
    const articles: Link[] = [];
    $('.entry-list .entry').each((index, ele) => {
      const title = $(ele).find('a.title').text()
        .trim();
      const href = $(ele).find('a.title').attr('href');
      if (title && href) {
        articles.push({
          title,
          href: this.DOMAIN + href,
          index,
        });
      }
    });
    return articles;
  }
```


### 发送信息到企业微信群


这个业务逻辑主要有两步，

首先要获取我们企业微信群的机器人的token，

接下来就将token 拼接成下面这样一个url

```
`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${token}`
```

然后利用egg 的curl方法发送信息就可以了


```js
export default class Index extends BaseService {
  public async index(token, content): Promise<boolean> {
    const url = `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${token}`;
    const data = {
      msgtype: 'markdown',
      markdown: {
        content,
      },
    };
    const result: any = await this.app.curl(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
    if (result.status !== 200) {
      return false;
    }
    return true;
  }
}
```

后端的实现大抵如此，大家可以看看源码实现：https://github.com/Sunny-lucking/morning-news

## 总结
至此，一个伟大的工程就打造完毕。

群员在我的带领下，技术突飞猛进。。。

撒花撒花
