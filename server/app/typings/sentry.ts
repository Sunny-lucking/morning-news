interface SentryInterfacesUser {
  username: string;
  id: string;
  ip_address: string;
  name: string;
  email: string;
}

interface SentryInterfacesMessage {
  message: string;
}

interface EmptyMap {}

interface Session {
  foo: string;
}

interface Extra {
  emptyList: any[];
  unauthorized: boolean;
  emptyMap: EmptyMap;
  url: string;
  results: number[];
  length: number;
  session: Session;
}

interface Modules {
  'my.package': string;
}

interface Env {
  ENV: string;
}

interface Data {
  hello: string;
}

interface SentryInterfacesHttp {
  cookies: string[][];
  url: string;
  headers: string[][];
  env: Env;
  query_string: string;
  data: Data;
  method: string;
  inferred_content_type: string;
}

interface SentryInterfacesTemplate {
  abs_path: string;
  pre_context: string[];
  post_context: string[];
  filename: string;
  lineno: number;
  context_line: string;
}

interface Extra2 {
  go_deeper: any[][];
  user: string;
  loadavg: number[];
}

interface V {
  message: string;
  params: any[];
}

interface SentryInterfacesMessage2 {
  message: string;
  params: any[];
}

interface Data2 {
  'sentry.interfaces.Message': SentryInterfacesMessage2;
  message: string;
}

interface SentryInterfacesMessage3 {
  message: string;
  params: any[];
}

interface Result {
  'sentry.interfaces.Message': SentryInterfacesMessage3;
  message: string;
}

interface Extra3 {
  go_deeper: any[][];
  user: string;
  loadavg: number[];
}

interface Kwargs {
  message: string;
  level: number;
  extra: Extra3;
  tags?: any;
  data?: any;
  stack?: boolean;
}

interface Options {
  tags?: any;
  data?: any;
}

interface Vars {
  frames: string;
  culprit?: any;
  event_type: string;
  handler: string;
  date: string;
  extra: Extra2;
  v: V;
  stack: boolean;
  event_id: string;
  tags?: any;
  time_spent?: any;
  self: string;
  data: Data2;
  result: Result;
  kwargs: Kwargs;
  k: string;
  public_key?: any;
  message: string;
  client: string;
  options: Options;
  root: string;
  parser: string;
  dsn: string;
  opts: string;
  args: string[];
}

interface Frame {
  function: string;
  abs_path: string;
  pre_context: string[];
  vars: Vars;
  post_context: string[];
  filename: string;
  module: string;
  in_app: boolean;
  context_line: string;
  lineno: number;
}

interface SentryInterfacesStacktrace {
  frames: Frame[];
}

interface Metadata {
  title: string;
}

interface Event {
  received: number;
  'sentry.interfaces.User': SentryInterfacesUser;
  'sentry.interfaces.Message': SentryInterfacesMessage;
  errors: any[];
  extra: Extra;
  event_id: string;
  fingerprint: string[];
  modules: Modules;
  id: number;
  'sentry.interfaces.Http': SentryInterfacesHttp;
  'sentry.interfaces.Template': SentryInterfacesTemplate;
  version: string;
  _ref_version: number;
  _ref: number;
  'sentry.interfaces.Stacktrace': SentryInterfacesStacktrace;
  tags: string[][];
  metadata: Metadata;
}

interface ISSUESRES {
  project: string;
  project_name: string;
  culprit: string;
  project_slug: string;
  url: string;
  logger?: any;
  level: string;
  message: string;
  id: string;
  event: Event;
}
