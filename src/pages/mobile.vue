<script setup>
import { useRouter } from "vue-router";
import { getIndexData, getWxCode, getInfo } from "@/api/index";
import { useAppAbility } from "@/plugins/casl/useAppAbility";
// import { onBeforeRouteLeave } from 'vue'

const router = useRouter();
const ability = useAppAbility();
const avatars = ref("");

const isCardDetailsVisible = ref(false);

const length = ref("");

const getData = async () => {
  const { data: res } = await getIndexData();
  avatars.value = res;
  avatars.value.reverse();
  length.value = avatars.value.length;
};

const info = (index) => {
  router.push("/inner/" + index);
};

const qrUrl = ref("");

onMounted(async () => {
  // 在页面加载时执行的方法

  const { data: res } = await getWxCode();
  console.log(res);

  qrUrl.value = "https://weixin.uesg.cn/auth/member?sid=" + res.id;

  const socket = new WebSocket("wss://weixin.uesg.cn/wss");

  // 监听 WebSocket 打开连接事件
  socket.addEventListener("open", async () => {
    console.log("WebSocket 连接已打开");
    var msg = "log:" + res.id;
    socket.send(msg);
    console.log(res.id);

    // // 在连接打开后，立即发送第一次心跳消息
    // sendHeartbeat();
    // // 设置心跳定时器，在指定间隔时间后发送心跳消息
    // heartbeatTimer = setInterval(sendHeartbeat, heartbeatInterval);
  });

  // 监听 WebSocket 接收到消息事件
  socket.addEventListener("message", async (event) => {
    console.log("接收到消息：", event.data);
    // socket.close();
    console.log(JSON.parse(event.data));
    const res = JSON.parse(event.data);

    if (res.oid) {
      localStorage.setItem("userStatus", 200);
      localStorage.setItem("oid", res.oid);

      const { data: result } = await getInfo(res.oid);
      const nickname = result.nickname;
      const avatarUrl = "https://weixin.uesg.cn/account/avator?unionID=" + result.oid;
      const userData = {
        avatar: avatarUrl,
        nickname: nickname,
      };
      const userDataJSON = JSON.stringify(userData);
      localStorage.setItem("userData", userDataJSON);
      socket.close();

      window.location.href = "/pages/user-profile/profile";
      // router.push('/pages/user-profile/profile');
    }
  });

  // 监听 WebSocket 关闭连接事件
  socket.addEventListener("close", (event) => {
    console.log("WebSocket 连接已关闭");
    console.log("WebSocket closed:", event);
  });

  // 监听 WebSocket 错误事件
  socket.addEventListener("error", (error) => {
    console.error("WebSocket 错误：", error);
  });

  const login = localStorage.getItem("oid");
  if(login) {
    window.location.href = '/'
  }

});
</script>



<template>
  <div style="display: flex;align-items: center;justify-content: center;height: 100vh;">
    <div style="display: flex;align-items: center;">
        <img src="https://lovemedicine.cn/public/uesg/7.23/%E9%A6%96%E9%A1%B5/%E6%84%9F%E5%8F%B9%E5%8F%B7-icon.svg" style="width: 24px;height: 24px;">
        <div style="font-size: 20px;line-height: 30px;color: #000;">
            请在pc端中打开
        </div>
    </div>
  </div>
</template>


<style>
.layout-content-wrapper {
  background-color: #fdfcfdff !important;
}

</style>

<route lang="yaml">
    meta:
        layout: blank
</route>