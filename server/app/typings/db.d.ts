interface ResponseData {
  status: boolean;
  code?: number,
  data?: any;
  msg?: string;
  total?: number
}

interface DatabaseResponse {
  status: boolean;
  data?: any;
  msg?: string;
  pageIndex?: number;
  pageSize?: number;
  total?: number;
}