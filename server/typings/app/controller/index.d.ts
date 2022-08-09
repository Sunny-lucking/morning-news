// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController from '../../../app/controller/baseController';
import ExportMorningPaper from '../../../app/controller/morningPaper';

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController;
    morningPaper: ExportMorningPaper;
  }
}
