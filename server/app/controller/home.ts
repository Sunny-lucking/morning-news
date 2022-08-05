import Controller from './baseController';

export default class HomeController extends Controller {
  public async index() {
    const link = this.ctx.query.link && decodeURIComponent(this.ctx.query.link);
    if (!link) {
      this.fail({
        msg: 'error params',
      });
      return;
    }
    const html = await this.service.puppeteer.page.getHtml(link);
    this.success({
      data: html,
    });
    return;
  }
}
