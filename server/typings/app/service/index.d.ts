// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBaseService from '../../../app/service/baseService';
import ExportMorningPaperIndex from '../../../app/service/morningPaper/index';
import ExportPuppeteerPage from '../../../app/service/puppeteer/page';
import ExportSendMsgWeixin from '../../../app/service/sendMsg/weixin';
import ExportSpiderGithubIssuesIndex from '../../../app/service/spider/githubIssues/index';
import ExportSpiderJuejinIndex from '../../../app/service/spider/juejin/index';
import ExportSpiderNewcoderIndex from '../../../app/service/spider/newcoder/index';
import ExportSpiderSegmentfaultIndex from '../../../app/service/spider/segmentfault/index';
import ExportSpiderZhihuIndex from '../../../app/service/spider/zhihu/index';

declare module 'egg' {
  interface IService {
    baseService: AutoInstanceType<typeof ExportBaseService>;
    morningPaper: {
      index: AutoInstanceType<typeof ExportMorningPaperIndex>;
    }
    puppeteer: {
      page: AutoInstanceType<typeof ExportPuppeteerPage>;
    }
    sendMsg: {
      weixin: AutoInstanceType<typeof ExportSendMsgWeixin>;
    }
    spider: {
      githubIssues: {
        index: AutoInstanceType<typeof ExportSpiderGithubIssuesIndex>;
      }
      juejin: {
        index: AutoInstanceType<typeof ExportSpiderJuejinIndex>;
      }
      newcoder: {
        index: AutoInstanceType<typeof ExportSpiderNewcoderIndex>;
      }
      segmentfault: {
        index: AutoInstanceType<typeof ExportSpiderSegmentfaultIndex>;
      }
      zhihu: {
        index: AutoInstanceType<typeof ExportSpiderZhihuIndex>;
      }
    }
  }
}
