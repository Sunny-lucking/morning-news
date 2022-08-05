// import { EBizType } from '@/common';
import BaseService from '../baseService';
import * as puppeteer from 'puppeteer';

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
/**
 * 通过puppeteer获取html结构
 */
export default class Index extends BaseService {
  viewport = {
    width: 1920,
    height: 1080,
  };
  launch = {
    headless: true,
  };
  args = ['--no-sandbox', '--disable-setuid-sandbox'];
  userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36';

  /**
   * 获取页面html结构
   * @param link 页面链接
   * @param bizType 类型
   * @param waitTime 超时时间
   */
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
}

