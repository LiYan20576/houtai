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
            background-color: #FFFFFF;
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
            关注“UESG优世界”官方公众号了解更多最新资讯。
            <span
              @click="gotoLogin"
              style="
                font-family: DINMedium;
                color: #0066cc;
                line-height: 18px;
                font-size: 13px;
                cursor: pointer;
              "
              >立刻关注 ></span
            >
          </div>
        </div>
      </div>
    </div>


    <div
      style="
        color: #6236ffff;
        padding: 0 170px;
        font-size: 13px;
        line-height: 18px;
      "
    >
      科普
    </div>
    <div
      style="
        color: #000000d9;
        padding: 0 170px;
        font-size: 31px;
        line-height: 44px;
        margin-top: 16px;
      "
    >
      UESG 在全球范围传播 ESG 理念，培养与认证 ESG 人才。
    </div>
    <div
      style="
        color: #00000080;
        padding: 0 170px;
        font-size: 21px;
        line-height: 29px;
        margin-top: 16px;
      "
    >
      共建一个优质、绿色、和谐、永续的世界。
    </div>

    <img
      src="https://www.uesg.org.cn/img/0727/%E6%96%B0%E9%97%BB-%E5%B9%BF%E5%91%8A01.jpeg"
      alt=""
      style="width: 100%; margin: 32px 0; border-radius: 12px"
    />
    <div
      style="
        color: #000000d9;
        padding: 0 170px;
        font-size: 17px;
        line-height: 24px;
      "
    >
      <div style="font-family: 'DINMedium'">1. 起源</div>
      <div>
        <p>
          “UESG”英语全称：Universal ESG Standard，中文译为：通用 ESG
          标准。致力于在全球范围内传播和推动 ESG 理念。
        </p>
        <p>
          “UESG”由“UNGC｜联合国全球契约组织”与“UNEP｜联合国环境规划署”支持成立。
        </p>
      </div>

      <div style="font-family: 'DINMedium'">2. 中国</div>
      <div>
        <p>
          2023年，“UESG｜优世界”获得“UESG”独家授权于中国上海成立，旨在传播和推动ESG理念，打造ESG联盟，助力企业ESG转型，认证ESG人才，推动ESG人才就业。
        </p>
        <p>“UESG｜优世界”中文寓意：共建一个优质、绿色、和谐、永续的世界。</p>
      </div>
      <div style="font-family: 'DINMedium'">3. 使命</div>
      <div>
        <p>- 传播和推动 ESG 理念。</p>
        <p>- 对 ESG 相关政策、新闻、可持续发展案例进行全媒体公示。</p>
        <p>- 打造 ESG 联盟，助力企业 ESG 转型。</p>
        <p>- 建立“UESG优世界”研修院，培养与认证 ESG 人才。</p>
        <p>- 推动 ESG 人才就业。</p>
      </div>

      <div style="font-family: 'DINMedium'">4. 愿景</div>
      <div>
        <p>
          基于中国企业对于可持续发展等更高目标的认知与共同期望，“UESG优世界”将对目标企业的
          ESG 现状展开分析调研，协助企业梳理 ESG 与自身业务的关系，制定企业 ESG
          战略的中、长期的目标与计划，以及通过业务模式的调整、专业人员的指导、完善组织保障等方式，助力企业全面完成
          ESG 的生态转型。
        </p>
        <p>
          随着中国政府不断出台 ESG 新政策，未来三年中国市场将出现数百万个 ESG
          工作岗位需求。“UESG优世界”将每月举办一次 ESG
          人才专场招聘会并邀请ESG联盟会员单位面向社会、面向高校招募更多 ESG
          人才，推动 ESG 人才就业。
        </p>
        <p>
          通过“百城百校 ESG
          专题”宣讲活动，与全国各大院校建立紧密合作关系，从源头培养与认证 ESG
          人才。
        </p>
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

