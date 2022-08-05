import axios from "axios";
const request = axios.create({
  baseURL: "/", // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
});

interface PostListType {
  link: string;
  bizType: string;
}
export function getPostList(params: PostListType) {
  return request({
    url: "/morningPaper",
    method: "get",
    params,
  });
}

export function sendMsg(params: any) {
  return request({
    url: "/sendMsg2Weixin",
    method: "get",
    params,
  });
}
