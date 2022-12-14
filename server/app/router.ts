import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // 早报爬虫
  router.get('/morningPaper', controller.morningPaper.index);
  // 推送微信机器人消息
  router.get('/sendMsg2Weixin', controller.morningPaper.sendMsg2Weixin);
};
