
import { Controller } from 'egg';
export default class BaseController extends Controller {
  /**
   * 成功
   * @param data 响应数据
   */
  success(data) {
    this.ctx.status = 200;
    this.ctx.body = {
      success: true,
      ...data,
    };
    return;
  }

  /**
   * 失败
   * @param data 响应数据
   */
  fail(data) {
    this.ctx.status = 500;
    this.ctx.body = {
      success: false,
      ...data,
    };
    return;
  }
}
