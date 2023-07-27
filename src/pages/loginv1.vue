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
});
</script>



<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          style="
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 32px 50px;
            margin-bottom: 50px;
          "
        >
          <div
            style="
              font-family: 'DINMedium';
              font-size: 17px;
              line-height: 20px;
              color: #1d1d1f;
              position: absolute;
              left: 50px;
            "
          >
            登录系统
          </div>
          <div style="font-size: 15px; color: #1d1d1f; line-height: 21px">
            UESG 需要您微信扫码关注UESG官方公众号继续使用平台功能。
          </div>
        </VCard>
      </VCol>
    </VRow>

    <VRow
      style="
        /* height: 85vh;
        margin: 0;
        background-color: #ffffffff !important;
        box-shadow: 0px 5px 10px 0px #f0eff2 !important;
        border-radius: 12px !important; */
      "
    >
      <!-- 👉 Popular Uses Of The Internet -->
      <!-- <div style="width: 100%;display: flex;justify-content: center;align-items: center;">
      <img src="https://www.uesg.org.cn/img/Logo-04.svg" style="width: 103px;height: 144px;margin-top: 60px;" >
    </div>

    <div style="width: 100%;display: flex;flex-direction: column;justify-content: center;align-items: center;margin-top: 30px;">
      <div style="font-size: 30px;line-height: 37px;color: #5C5A68;font-weight: bold;margin-bottom: 10px;">
      Certification Center
      </div>
      <div style="font-size: 24px;line-height: 33px;color: #5C5A68;font-weight: 500;margin-bottom: 60px;">
        国际通用ESG标准认证中心
      </div>
      <div style="font-size: 35px;font-weight: 500;color: #5C5A68;line-height: 49px;margin-bottom: 30px;">
        微信扫码登录
      </div>
      <div style="margin-bottom: 30px;width: 210px;height: 210px;border-radius: 12px;border: 2px solid #A7A6AE;display: flex;align-items: center;justify-content: center;">
        <div style="width: 170px;height: 170px;background-color: #D8D8D8;">

        </div>
      </div>
      <div style="font-size: 17px;line-height: 24px;color: #5C5A68;margin-bottom: 110px;">
        微信扫码关注公众号进行登录
      </div>
    </div> -->

      <div
        style="
          width: 100%;
          height: 100%;
          scale: 0.8;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <div
          style="
            width: 500px;
            height: 641px;
            background-image: url(https://www.uesg.org.cn/img/loginv1.jpg);
            background-size: 100% 100%;
          "
        ></div>
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 500px;
            height: 641px;
            background-image: url(https://www.uesg.org.cn/img/loginbg.jpg);
            background-size: 100% 100%;
          "
        >
          <div
            style="
              font-size: 35px;
              line-height: 50px;
              color: #5c5a68;
              font-weight: 500;
              margin-bottom: 30px;
            "
          >
            微信扫码登录
          </div>
          <div
            style="
              width: 210px;
              height: 210px;
              border-radius: 12px;
              border: 4px solid #e6e6e6;
              margin-bottom: 30px;
            "
          >
            <img :src="qrUrl" style="width: 200px; height: 200px" />
          </div>
          <div style="font-size: 17px; line-height: 50px; color: #5c5a68">
            微信扫码关注公众号进行登录
          </div>
        </div>
      </div>
    </VRow>
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
