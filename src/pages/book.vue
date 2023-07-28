<script setup>
import { useRouter } from "vue-router";
import { getIndexData, getWxCode } from "@/api/index";
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

const dig = ref(false);

const pay = () => {
  dig.value = true;
  startTimer();

  const socket = new WebSocket("wss://weixin.uesg.cn/wss");
  // 监听 WebSocket 打开连接事件
  socket.addEventListener("open", () => {
    console.log("WebSocket 连接已打开");
    const unionid = localStorage.getItem("oid");
    console.log("unionid为", unionid);

    const arr = JSON.stringify([{ id: unionid, qty: 1 }]);
    var msg = "items:" + arr;
    console.log("发送的消息为", msg);
    socket.send(msg);
  });

  // 监听 WebSocket 接收到消息事件
  socket.addEventListener("message", (event) => {
    console.log("接收到消息：", event.data);
    // console.log(JSON.parse(event.data));
    // const res = JSON.parse(event.data);

    // if (res.oid) {
    //   localStorage.setItem("userStatus", 200);
    //   localStorage.setItem("oid", res.oid);
    //   socket.close();
    //   window.location.href = "/pages/user-profile/profile";
    // }
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
};

const close = () => {
  dig.value = false;
  stopTimer();
};

onMounted(async () => {
  // 在页面加载时执行的方法
  // getData();

  // const userAbilities = [
  //   {
  //     action: "manage",
  //     subject: "all",
  //   },
  // ];
  // localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
  // ability.update(userAbilities);
  // localStorage.setItem("info_islogin", true);

  const { data: res } = await getWxCode();
  console.log(res);

  qrUrl.value = "https://weixin.uesg.cn/auth/member?sid=" + res.id;
});

const paymentDeadline = 5 * 60; // 5 minutes in seconds
const remainingTime = ref(paymentDeadline);
let timer;

const updateRemainingTime = () => {
  remainingTime.value = Math.max(remainingTime.value - 1, 0);
};

const remainingTimeMinutes = computed(() =>
  Math.floor(remainingTime.value / 60)
);
const remainingTimeSeconds = computed(() => remainingTime.value % 60);

const formattedMinutes = computed(() =>
  remainingTimeMinutes.value.toString().padStart(2, "0")
);
const formattedSeconds = computed(() =>
  remainingTimeSeconds.value.toString().padStart(2, "0")
);

const isTimerRunning = ref(false);

const startTimer = () => {
  isTimerRunning.value = true;
  timer = setInterval(() => {
    updateRemainingTime();
    if (remainingTime.value === 0) {
      stopTimer();
    }
  }, 1000);
};

const stopTimer = () => {
  dig.value = false;
  isTimerRunning.value = false;
  clearInterval(timer);
  remainingTime.value = paymentDeadline;
};

const gotoBook = () => {
  router.push('/bookTitle')
}

onBeforeUnmount(() => {
  clearInterval(timer);
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
            购买服务后可查看完成课程。
          </div>
        </div>
      </div>
    </div>



    <div style="height: 266px;background-color: #ffffff;margin-top: 32px;border-radius: 12px;display: flex;padding: 62px 64px 0;justify-content: space-between;">
            <div >
             <div style="font-size: 31px;line-height: 42px;color: #000000D9;">
              UESG Fundamental Analyst
               <br>Curriculum 2023
             </div>
             <div style="margin-top: 32px;color: #000000FF;font-size: 17px;line-height: 24px;display: flex;">
                <img src="https://www.uesg.org.cn/icon/0727/%E4%B8%8B%E5%8D%95-%E4%B9%A6%E6%9C%AC_%E7%94%BB%E6%9D%BF%201.svg" alt="" style="width: 24px;height: 24px;margin-right: 10px;">
                <div>
                  通用 ESG 标准基础分析师｜课程 2023 版
                </div>
             </div>
            </div>
            <div>
              <button @click="gotoBook(0)" style="border-radius: 6px;background-color: #0066CCFF;color: #ffffff;font-size: 17px;line-height: 24px;width: 132px;height: 42px;"> 
                试看
              </button>
            </div>
    </div>
    <div style="height: 266px;background-color: #ffffff;margin-top: 32px;border-radius: 12px;display: flex;padding: 62px 64px 0;justify-content: space-between;">
            <div >
             <div style="font-size: 31px;line-height: 42px;color: #000000D9;">
              UESG Advanced Analys
               <br>Curriculum 2023
             </div>
             <div style="margin-top: 32px;color: #000000FF;font-size: 17px;line-height: 24px;display: flex;">
                <img src="https://www.uesg.org.cn/icon/0727/%E4%B8%8B%E5%8D%95-%E4%B9%A6%E6%9C%AC_%E7%94%BB%E6%9D%BF%201.svg" alt="" style="width: 24px;height: 24px;margin-right: 10px;">
                <div>
                  通用 ESG 标准高级分析师｜课程 2023 版
                </div>
             </div>
            </div>
            <div>
              <button style="border-radius: 6px;background-color: #0066CCFF;color: #ffffff;font-size: 17px;line-height: 24px;width: 132px;height: 42px;"> 
                试看
              </button>
            </div>
    </div>
  
  </div>
</template>

<style lang="scss">
.gotomoneyUl {
  li {
    list-style-type: none;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 25px;
    font-family: DINMedium;
  }
}
.gotomoneyinput input:focus-visible {
  border: 1px solid #979797ff !important;
}
</style>

