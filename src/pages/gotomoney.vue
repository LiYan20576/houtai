<script setup>
import { useRouter } from "vue-router";
import { getIndexData, getWxCode } from "@/api/index";
import { useAppAbility } from "@/plugins/casl/useAppAbility";
import { text } from "@/views/demos/components/button/demoCodeButton";
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
  dig.value = true
  startTimer();

  const socket = new WebSocket("wss://weixin.uesg.cn/wss");
  // 监听 WebSocket 打开连接事件
  socket.addEventListener("open", () => {
    console.log("WebSocket 连接已打开");
    const unionid = localStorage.getItem('oid');
    console.log("unionid为",unionid);
    
    const arr = JSON.stringify([{id:unionid,qty:1}])
    var msg = "items:" + arr;
    console.log("发送的消息为",msg);
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
}

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

const remainingTimeMinutes = computed(() => Math.floor(remainingTime.value / 60));
const remainingTimeSeconds = computed(() => remainingTime.value % 60);

const formattedMinutes = computed(() => remainingTimeMinutes.value.toString().padStart(2, '0'));
const formattedSeconds = computed(() => remainingTimeSeconds.value.toString().padStart(2, '0'));

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
  dig.value = false
  isTimerRunning.value = false;
  clearInterval(timer);
  remainingTime.value = paymentDeadline;
};

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template>
  <div>
    <VDialog
      :model-value="dig"
      max-width="800"
      @update:model-value="dialogVisibleUpdate"
    >
      <!-- 👉 Dialog close btn -->
      <DialogCloseBtn @click="close" />

      <VCard class="share-project-dialog pa-5 pa-sm-8">
        <div style="margin-bottom: 20px;font-size: 30px;line-height: 50px;text-align: center;color: #000;">请在 {{ formattedMinutes  }}:{{ formattedSeconds }} 内完成支付</div>
        <img src="https://weixin.uesg.cn/order/CreatePayCode" style="display: block;width: 300px;height: 300px;margin: 0 auto;">
      </VCard>
    </VDialog>

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
            margin-bottom: 38px;
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
            确认订单  
          </div>
          <div style="font-size: 15px; color: #1d1d1f; line-height: 21px">
            请使用微信扫码完成付款。
          </div>
        </VCard>
      </VCol>
    </VRow>

    <div
      style="
        /* max-width: 1300px; */
        border-radius: 12px;
        background-color: #ffffff;
        margin: auto;
      "
    >
      <div style="padding-top: 50px; padding-left: 190px">
        <div style="font-family: DINMedium; font-size: 35px; line-height: 50px">
          UESG Fundamental Analyst certificate services
        </div>
        <div
          style="
            font-family: DINMedium;
            font-size: 20px;
            line-height: 24px;
            margin-top: 25px;
            display: flex;
          "
        >
          <img
            src="https://www.uesg.org.cn/icon/0725/%E7%BB%BF%E8%89%B2%E5%A5%96%E7%89%8C_%E7%94%BB%E6%9D%BF%201.svg"
            alt=""
            style="width: 24px; height: 24px; margin-right: 10px"
          />通用 ESG 标准基础分析师｜认证服务
        </div>
        <div
          style="
            font-family: DINMedium;
            font-size: 20px;
            line-height: 24px;
            margin-top: 25px;
            display: flex;
          "
        >
          <img
            src="https://www.uesg.org.cn/icon/0725/%E7%BB%BF%E8%89%B2%E5%A5%96%E7%89%8C_%E7%94%BB%E6%9D%BF%201.svg"
            alt=""
            style="width: 24px; height: 24px; margin-right: 10px"
          />共计<text style="color: #0066ccff; margin: 0 5px">2</text>项服务
        </div>
        <div
          style="
            margin-top: 25px;
            width: 1000px;
            height: 150px;
            border: 1px solid #00000080;
            border-radius: 12px;
          "
        >
          <div
            style="
              display: flex;
              align-items: center;
              height: 100%;
              position: relative;
            "
          >
            <img
              src="https://www.uesg.org.cn/icon/0725/%E7%BB%BF%E8%89%B2%E5%A5%96%E7%89%8C_%E7%94%BB%E6%9D%BF%201.svg"
              alt=""
              style="width: 24px; height: 24px; position: absolute; right: 50px"
            />
            <img
              src="https://www.uesg.org.cn/img/0725/auth3.jpg"
              alt=""
              style="width: 78px; height: 100px; margin: 0 46px"
            />
            <div style="font-family: DINMedium; color: #00000080">
              <div>
                48 Hours UESG Fundamental Analyst Online Learning Services
              </div>
              <div>48 小时UESG基础分析师在线学习服务</div>
              <div><text style="color: #0066ccff"> RMB 0 </text>/ RMB 1250</div>
            </div>
          </div>
        </div>
        <div
          style="
            margin-top: 25px;
            width: 1000px;
            height: 150px;
            border: 1px solid #00000080;
            border-radius: 12px;
          "
        >
          <div
            style="
              display: flex;
              align-items: center;
              height: 100%;
              position: relative;
            "
          >
            <img
              src="https://www.uesg.org.cn/icon/0725/%E7%BB%BF%E8%89%B2%E5%A5%96%E7%89%8C_%E7%94%BB%E6%9D%BF%201.svg"
              alt=""
              style="width: 24px; height: 24px; position: absolute; right: 50px"
            />

            <img
              src="https://www.uesg.org.cn/img/0725/auth3.jpg"
              alt=""
              style="width: 78px; height: 100px; margin: 0 46px"
            />
            <div style="font-family: DINMedium; color: #00000080">
              <div>UESG Fundamental Analyst Certificate Services</div>
              <div>UESG基础分析师认证服务</div>
              <div style="color: #0066ccff">RMB 3250</div>
            </div>
          </div>
        </div>
        <div
          style="
            margin: 50px 0;
            width: 1000px;
            height: 1px;
            background-color: #00000080;
          "
        ></div>
        <div
          style="
            display: flex;
            max-width: 1000px;
            justify-content: space-between;
          "
        >
          <div
            style="
              font-family: DINMedium;
              font-size: 20px;
              line-height: 24px;
              display: flex;
            "
          >
            <img
              src="https://www.uesg.org.cn/icon/0725/%E7%BB%BF%E8%89%B2%E5%A5%96%E7%89%8C_%E7%94%BB%E6%9D%BF%201.svg"
              alt=""
              style="width: 24px; height: 24px; margin-right: 10px"
            />
            <ul class="gotomoneyUl">
              <li>账单明细</li>
              <li style="display: flex; justify-content: space-between">
                <div>Online Learning Services</div>
                <div style="color: #0066ccff">RMB 0</div>
              </li>
              <li style="display: flex; justify-content: space-between">
                <div>Certificate Services</div>
                <div style="color: #0066ccff">RMB 3250</div>
              </li>
              <div
                style="
                  width: 318px;
                  height: 1px;
                  background-color: #00000080;
                  margin-bottom: 25px;
                "
              ></div>
              <li style="display: flex; justify-content: space-between">
                <div>Total</div>
                <div style="color: #0066ccff">RMB 3250</div>
              </li>
              <li style="margin-top: 50px">
                <button
                  @click="pay()"
                  style="
                    width: 318px;
                    height: 42px;
                    background-color: #0066ccff;
                    border-radius: 6px;
                    font-size: 17px;
                    line-height: 24px;
                    color: #ffffff;
                    font-family: DINMedium;
                  "
                >
                  立刻支付
                </button>
              </li>
            </ul>
          </div>
          <div>
            <div style="margin-top: 90px" class="gotomoneyinput">
              <input
                type="text"
                placeholder="粘贴教育优惠代码"
                style="
                  color: #979797ff;
                  border-radius: 6px;
                  border: 1px solid #979797ff;
                  text-align: center;
                  width: 250px;
                  height: 42px;
                  line-height: 42px;
                  font-size: 17px;
                "
              />
              <button
                style="
                  width: 134px;
                  height: 42px;
                  background-color: #e1f6e8ff;
                  border-radius: 6px;
                  font-size: 17px;
                  line-height: 24px;
                  color: #27c670ff;
                  font-family: DINMedium;
                  margin-left: 25px;
                "
              >
                提交代码
              </button>
            </div>
          </div>
        </div>
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

