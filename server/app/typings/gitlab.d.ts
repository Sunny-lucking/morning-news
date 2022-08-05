interface Repository {
  name: string;
  description: string;
  homepage: string;
  git_http_url: string;
  git_ssh_url: string;
  url: string;
  visibility_level: number;
}

interface Commit {
  id: string;
  message: string;
  timestamp: string;
  url: string;
  author: object;
  added: Array<any>;
  modified: Array<any>;
  removed: Array<any>;
}

interface User {
  name: string;
  username: string;
  avatar_url: string;
}

interface Source {
  name: string;
  ssh_url: string;
  http_url: string;
  web_url: string;
  namespace: string;
  visibility_level: number;
}

/**
 * 收到push通知时的http body
 */
interface PushBody {
  object_kind: string;
  before: string;
  after: string;
  ref: string;
  checkout_sha: string;
  user_name: string;
  user_id: number;
  user_email: string;
  project_id: number;
  repository: Repository;
  commits: Array<Commit>;
  total_commits_count: number;
}

interface MRBody {
  object_kind: string;
  user: User;
  object_attributes: {
    // 这里并不包括所有的object_attribute，因为实在太多了暂时只列出我们需要的几个属性
    id: number;
    target_branch: string;
    source_branch: string;
    title: string;
    created_at: string;
    updated_at: string;
    merge_status: string;
    description: string;
    url: string;
    source: Source;
    action: string; // action 可能是open/update/close/reopen
  };
}

interface IssueBody {
  user: User;
  repository: Repository;
  object_attributes: {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    merge_status: string;
    description: string;
    url: string;
    state: string;
    action: string; // action 可能是open/update/close/reopen
  };
}
