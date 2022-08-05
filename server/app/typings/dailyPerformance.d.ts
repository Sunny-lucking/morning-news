interface DailyPerformanceWebData {
  'appname': string,
  'suc_rate': string,
  '50_front_first_frame': number,
  '90_front_first_frame': number,
  '50_front_page_load': number,
  '90_front_page_load': number,
  '50_front_white_screen': number,
  '90_front_white_screen': number,
  'onload_limit_rate': string,
  'client_suc_rate': string,
  '50_first_frame': number,
  '90_first_frame': number,
  '50_page_load': number,
  '90_page_load': number
}

interface DailyPerformanceCdnItem {
  'day': string,
  'android_web': DailyPerformanceWebData[],
  'ios_web': DailyPerformanceWebData[]
}

interface DailyPerformanceCdnRes {
  status: boolean,
  data: DailyPerformanceCdnItem
}

interface DailyPerformanceAppQuantile {
  'day': string,
  'front_first_frame': number,
  'front_page_load': number,
  'front_white_screen': number,
  'first_frame': number,
  'page_load': number
}

interface DailyPerformanceAppData {
  '50_echart': DailyPerformanceAppQuantile[],
  '90_echart': DailyPerformanceAppQuantile[],
  'success_rate': {
    'day': string,
    'suc_rate': number
  }[]
}

interface DailyPerformanceCompareDataItem {
  'suc_rate': number,
  '50_front_page_load': number,
  '90_front_page_load': number,
}

interface DailyPerformanceCompareData {
  'appName': string,
  'lastWeek': DailyPerformanceCompareDataItem,
  'last2Week': DailyPerformanceCompareDataItem
}
