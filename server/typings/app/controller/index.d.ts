// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController from '../../../app/controller/baseController';
import ExportHome from '../../../app/controller/home';
import ExportMorningPaper from '../../../app/controller/morningPaper';

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController;
    home: ExportHome;
    morningPaper: ExportMorningPaper;
  }
}
