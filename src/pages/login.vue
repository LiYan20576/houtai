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
  <div>

    <div>
      <div style="width: 100%;">
        <div
          style="
            background-color: #FFFFFFFF;
            border-radius: 12px;
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px 64px;
            margin-bottom: 32px;
            margin-top: 32px;
          "
        >
          <div style="font-size: 13px; color: #1D1D1FFF; line-height: 18px">
            UESG 需要您微信扫码关注“UESG优世界”官方公众号使用本平台更多功能。
          </div>
        </div>
      </div>
    </div>

    <div>

      <div
        style="
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <div style="position: relative;">
          <img src="https://www.uesg.org.cn/icon/0727/%E7%99%BB%E5%BD%95.png" style="width: 100%;">
          <div style="position: absolute; right: 145px;top: 147px;"> 
            <div style="font-size: 25px;line-height: 36px;color:#000000D9;text-align: center;margin-bottom: 16px;font-family: DINMedium;">
              微信扫码登录
            </div>
            <div style="border: 2px solid #00000080;width: 200px;height: 200px;border-radius: 12px;">
              <img :src="qrUrl" style="width: 100%; height: 100%;padding: 16px;" />
            </div>
            <div style="display: flex;align-items: center;justify-content: center;margin-top: 16px;">
              <img src="https://www.uesg.org.cn/icon/0727/%E6%89%AB%E7%A0%81.svg" style="width:18px;height: 21px;margin-left: 8px;">
              <span style="font-size: 15px;line-height: 21px;color: #5C5A68FF;">
                微信扫码关注公众号登录
              </span>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>

  </div>
</template>


<style>
.layout-content-wrapper {
  background-color: #fdfcfdff !important;
}
/* .page-content-container {
  background-color: #FFFFFFFF !important;
  box-shadow: 0px 5px 10px 0px #F0EFF2 !important;
  border-radius: 12px !important;
  margin-bottom: 30px;
  margin-top: 10px;
} */
</style>
<style lang="scss" scoped>
.avatar-center {
  position: absolute;
  border: 3px solid rgb(var(--v-theme-surface));
  inset-block-start: -2rem;
  inset-inline-start: 1rem;
}

// membership pricing
.member-pricing-bg {
  position: relative;
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
}

.membership-pricing {
  sup {
    inset-block-start: 9px;
  }
}

.v-btn {
  transform: none;
}
</style>
