import { createApp } from "vue";
import App from "./App.vue";
import antdCompArr from "@/antd";

const app = createApp(App);
antdCompArr.forEach((comp) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  app.use(comp);
});

app.mount("#app");
