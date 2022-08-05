<template>
  <div class="pape-wrap">
    <a-row :gutter="16">
      <a-col :span="16">
        <a-card
          v-for="group in paperList"
          :key="group.name"
          class="box-card"
          shadow="always"
        >
          <div class="clearfix">
            <span>{{ group.name }}</span>
          </div>
          <div class="channels">
            <a-button
              :style="{ 'margin-top': '10px', 'margin-left': '10px' }"
              size="large"
              v-for="item in group.list"
              :key="item.href"
              class="btn-channel"
              @click="onClick(item)"
            >
              {{ item.name }}
            </a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-form>
          <a-form-item
            :laba-col="{ span: 24 }"
            label="支持markdown输入"
            label-align="left"
          >
            <a-textarea
              v-model:value="content"
              placeholder="暂支持mardown语法"
              show-count
            />
          </a-form-item>
          <a-form-item>
            <a-button @click="handleSendMsg"> 发消息 </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>

    <a-modal
      v-model:visible="visible"
      custom-class="post-modal"
      title="文章列表"
      @ok="handleComfirm"
    >
      <a-spin tip="Loading..." :spinning="isLoading">
        <div class="post-list">
          <div :style="{ borderBottom: '1px solid #E9E9E9' }">
            <a-checkbox
              v-model="checkAll"
              :indeterminate="indeterminate"
              @change="handleCheckAll"
              >全选</a-checkbox
            >
          </div>
          <br />
          <a-checkbox-group v-model:value="checkedList">
            <a-checkbox
              :value="item.value"
              v-for="item in checkoptions"
              :key="item.value"
            >
              {{ item.label }}
              <a
                class="a-button--text"
                style="font-size: 14px"
                target="_blank"
                :href="item.value"
                @click.stop
              >
                &nbsp; &nbsp;查看</a
              >
            </a-checkbox>
          </a-checkbox-group>
        </div>
      </a-spin>

      <span>
        <a-button @click="handleComfirm">确认</a-button>
      </span>
    </a-modal>
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { defineComponent, reactive, ref, computed, watch, toRefs } from "vue";
import { channels } from "@/constant/news";
import { getPostList, sendMsg } from "@/api/paper";
import { message } from "ant-design-vue";
const cache: any = {};

type State = {
  paperList: Array<any>;
  postList: Array<any>;
  bizType: string;
  indeterminate: boolean;
  checkAll: boolean;
  checkedList: Array<any>;
  preList: Array<any>;
  content: string;
};
export default defineComponent({
  name: "App",
  setup() {
    const state = reactive<State>({
      paperList: channels,
      postList: [],
      bizType: "frontend-test",
      indeterminate: false,
      checkAll: false,
      checkedList: [],
      preList: [],
      content: "",
    });
    const visible = ref(false);
    const isLoading = ref(false);
    const currentChannel = ref("");
    const checkoptions = computed(() => {
      return state.postList.map((post: any) => {
        return { label: post.title, value: post.href };
      });
    });
    watch(
      () => state.checkedList,
      (val) => {
        state.indeterminate =
          !!val.length && val.length < checkoptions.value.length;
        state.checkAll = val.length === checkoptions.value.length;
      }
    );
    const handleCheckAll = (e: any) => {
      const all = checkoptions.value.map((item) => item.value);
      Object.assign(state, {
        checkedList: e.target.checked ? all : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    };
    const onClick = async (item: any) => {
      visible.value = true;
      currentChannel.value = item.url;
      if (cache[currentChannel.value]?.list.length > 0) {
        const list = cache[currentChannel.value].list;
        state.checkedList = cache[currentChannel.value].checkedList || [];
        state.postList = list;
        return list;
      }
      isLoading.value = true;
      state.postList = [];
      const { data } = await getPostList({
        link: item.url,
        bizType: item.bizType,
      });
      if (data.success) {
        isLoading.value = false;
        const list = data.data || [];
        state.postList = list;
        cache[currentChannel.value] = {};
        cache[currentChannel.value].list = list;
      } else {
        message.error("加载失败!");
      }
    };
    const updateContent = () => {
      const date = moment().format("YYYY/MM/DD");
      // eslint-disable-next-line no-useless-escape
      const header = `<font color=\"#389e0d\">前端早报-${date}</font>，欢迎大家阅读。\n>`;
      const tail = `本服务由**前端阳光**提供技术支持`;
      const body = state.preList
        .map((item, index) => `#### ${index + 1}. ${item}`)
        .join("\n");
      state.content = `${header}***\n${body}\n***\n${tail}`;
    };

    const handleComfirm = () => {
      visible.value = false;
      const selectedPosts = state.postList.filter((item: any) =>
        state.checkedList.includes(item.href as never)
      );
      const selectedList = selectedPosts.map((item, index) => {
        return `[${item.title.trim()}](${item.href})`;
      });
      state.preList = [...new Set([...state.preList, ...selectedList])];
      updateContent();
    };
    const handleSendMsg = async () => {
      const params = {
        content: state.content,
      };
      await sendMsg(params);
      message.success("发送成功!");
    };
    return {
      ...toRefs(state),
      visible,
      isLoading,
      currentChannel,
      checkoptions,
      onClick,
      handleComfirm,
      handleCheckAll,
      handleSendMsg,
    };
  },
});
</script>

<style lang="scss">
.pape-wrap {
  padding: 30px 20px;
}
.box-card:not(:first-of-type) {
  margin-top: 30px;
}
::v-deep {
  .btn-channel {
    margin-bottom: 16px;
  }

  .post-modal {
    font-size: 14px;
    line-height: 1.5;

    .post-list {
      height: 300px;
      overflow-y: auto;
    }
  }
}

.ant-checkbox-wrapper {
  margin-left: 0 !important;
}
</style>
