import BaseService from '../baseService';
import { EBizType } from '../../common';

export default class Index extends BaseService {
  /**
   * 根据业务类型进行html格式清洗
   * @param bizType 业务类型
   * @param html html结构
   */
  formatHtmlByBizType(bizType: string, html: string) {
    switch (bizType) {
      case EBizType.JUEJIN:
        return this.service.spider.juejin.index.getLinks(html);
      case EBizType.SEGMENTFAULT:
        return this.service.spider.segmentfault.index.getLinks(html);
      case EBizType.ZHIHU:
        return this.service.spider.zhihu.index.getLinks(html);
      case EBizType.NEWCODER:
        return this.service.spider.newcoder.index.getLinks(html);
      case EBizType.GITHUBISSUES:
        return this.service.spider.githubIssues.index.getLinks(html);
      default:
        break;
    }
  }

  /**
   * 获取机器人token
   * @param bizType 业务类型
   */
  getBizTypeBoken(): string {
    return '1b7ff774-5ed2-4042-b0e9-f86c90183cdf'; // 企业微信群机器人
  }
}
