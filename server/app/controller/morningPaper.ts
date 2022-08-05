import Controller from './baseController';

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
