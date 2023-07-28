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

const Education = ref(false);

const inputValue = ref("")

const sale = (event) => {
  inputValue.value = event.target.value;
  if(!event.target.value) {
    Education.value = false
  } 
};

const pay = () => {
  dig.value = true

  const socket = new WebSocket("wss://weixin.uesg.cn/wss");
  // 监听 WebSocket 打开连接事件
  socket.addEventListener("open", () => {
    console.log("WebSocket 连接已打开");
    const unionid = localStorage.getItem('oid');
    console.log("unionid为",unionid);
    
    // const arr = JSON.stringify([{id:unionid,qty:1}])
    // var msg = "items:" + arr;
    var msg = "log:" + unionid
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
            完成支付后即刻使用 UESG 服务，开启您的 ESG 职场。
          </div>
        </div>
      </div>
    </div>

    <VDialog
      :model-value="dig"
      max-width="500"
      @update:model-value="dialogVisibleUpdate"
    >
      <!-- 👉 Dialog close btn -->
      <DialogCloseBtn @click="close" />

        <div style="background-color: #fff;padding: 82px 0;display: flex;flex-direction: column;justify-content: center;align-items: center;">
          <div style="font-family: DINMedium;font-size: 25px;line-height: 36px;color: #000000D9;text-align: center;margin-bottom: 32px;">
            微信扫码支付
          </div>
          <div style="width: 200px;height: 200px;border-radius: 12px;border: 2px solid rgba(0,0,0,0.5);">
            <img src="https://weixin.uesg.cn/order/CreatePayCode" style="display: block;width: 100%;height: 100%;padding: 16px;">
          </div>
          <VBtn
            color="#0066CCFF"
            @click="close"
            style="height: 42px; padding: 9px 58px;margin-top: 32px;"
          >
            <span
              style="
                color: #fff;
                font-size: 17px;
                font-family: DINMedium;
                line-height: 24px;
              "
            >
              已完成支付
            </span>
          </VBtn>
        </div>
        
        <!-- <div style="margin-bottom: 20px;font-size: 30px;line-height: 50px;text-align: center;color: #000;">请在 {{ formattedMinutes  }}:{{ formattedSeconds }} 内完成支付</div> -->
    </VDialog>

    <div
      style="
        border-radius: 12px;
        background-color: #ffffff;
        margin: auto;
      "
    >
      <div style="padding: 64px;">
        <div style="font-family: DINMedium; font-size: 31px; line-height: 42px;color: #000000D9;margin-bottom: 32px;">
          UESG Fundamental Analyst 
          <br>
          certificate services
        </div>
        <div
          style="
            font-family: DINMedium;
            font-size: 17px;
            line-height: 24px;
            display: flex;
            padding-bottom: 32px;
            color: #000000FF;
            border-bottom: 1px solid #00000080;
          "
        >
          <img
            src="https://www.uesg.org.cn/icon/0725/%E7%BB%BF%E8%89%B2%E5%A5%96%E7%89%8C_%E7%94%BB%E6%9D%BF%201.svg"
            alt=""
            style="width: 24px; height: 24px; margin-right: 10px;"
          />通用 ESG 标准基础分析师｜认证服务
        </div>

        <!-- 清单 -->
        <div
          style="
            margin-top: 32px;
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
              src="https://www.uesg.org.cn/icon/0727/%E4%B8%8B%E5%8D%95-%E4%B9%A6%E6%9C%AC_%E7%94%BB%E6%9D%BF%201.svg"
              alt=""
              style="width: 78px; height: 100px; margin: 0 48px"
            />
            <div style="font-family: DINMedium; color: #000000D9">
              <div style="font-size: 21px;line-height: 29px;">UESG 基础分析师课程</div>
              <div style="font-size: 21px;line-height: 29px;color: #00000040;" >
                <text style="color: #0066ccff"> RMB 0 </text>
                <span>/ <text style="text-decoration: line-through;">RMB 1250</text></span>
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            margin-top: 32px;
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
              src="https://www.uesg.org.cn/icon/0727/%E5%B0%8F%E8%AF%81%E4%B9%A6-%E7%BB%BF%E8%89%B2.jpeg"
              alt=""
              style="width: 78px; height: 100px; margin: 0 48px"
            />
            <div style="font-family: DINMedium; color: #000000D9">
              <div style="font-size: 21px;line-height: 29px;">UESG 基础分析师认证</div>
              <div style="font-size: 21px;line-height: 29px;color: #00000040;">
                <text style="color: #0066ccff"> RMB 3250 </text>
                <span v-show="Education">/ <text style="text-decoration: line-through;">RMB 1250</text></span>
              </div>
            </div>
          </div>
        </div>

        <div
          style="
            margin: 32px 0;
            height: 1px;
            background-color: #00000080;
          "
        ></div>
        <div
          style="
            display: flex;
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
              src="https://www.uesg.org.cn/icon/0727/%E8%B4%A6%E5%8D%95_%E7%94%BB%E6%9D%BF%201.svg"
              alt=""
              style="width: 24px; height: 24px; margin-right: 10px"
            />
            <ul class="gotomoneyUl">
              <li style="margin-bottom: 32px;">账单明细</li>
              <li style="display: flex; justify-content: space-between;margin-bottom: 16px;">
                <div style="font-family: DINMedium ;">基础分析师课程</div>
                <div style="color: #0066ccff">RMB 0 <span style="text-decoration: line-through;color: #00000040;">/ RMB 1250</span></div>
                
              </li>
              <li style="display: flex; justify-content: space-between;margin-bottom: 32px;">
                <div style="font-family: DINMedium ;">基础分析师认证</div>
                <div style="color: #0066ccff">RMB 3250 <span v-show="Education" style="text-decoration: line-through;color: #00000040;">/ RMB 3275</span></div>
              </li>
              <div
                style="
                  width: 318px;
                  height: 1px;
                  background-color: #00000080;
                  margin-bottom: 32px;
                "
              ></div>
              <li style="display: flex; justify-content: space-between">
                <div style="font-family: DINMedium ;">合计</div>
                <div style="color: #0066ccff" v-if="!Education">RMB 3250</div>
                <div style="color: #0066ccff" v-else>RMB 2275</div>
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
            <div style="margin-top: 56px;display: flex;justify-content: space-between;" class="gotomoneyinput">
              <div style="display: flex;flex-direction: column;align-items: center;">
                <input
                  @input="sale"
                  type="text"
                  placeholder="输入教育优惠代码"
                  :value="inputValue"
                  style="
                    color: #979797ff;
                    border-radius: 6px;
                    border: 1px solid #979797ff;
                    text-align: center;
                    width: 200px;
                    height: 42px;
                    line-height: 42px;
                    font-size: 17px;
                  "
                />
                <div v-if="!Education" style="font-size: 15px;line-height: 21px;color:#0066CCFF;margin-top: 16px;">
                  获取育优惠代码
                </div>
                <div v-else style="font-size: 15px;line-height: 21px;color:#000000D9;margin-top: 16px;">
                  教育优惠已生效
                </div>
              </div>
              
              <button
                :disabled="Education"
                :class="!Education ? 'btn-submit' : 'btn-disabled'"
                @click="Education = !Education"
              >
                提交
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
    font-size: 17px;
    line-height: 24px;
    color: #000000D9;
    font-family: DINMedium ;
  }
}
.gotomoneyinput input:focus-visible {
  border: 1px solid #979797ff !important;
}
.btn-submit {
  width: 134px;
  height: 42px;
  background-color: #e1f6e8ff;
  border-radius: 6px;
  font-size: 17px;
  line-height: 24px;
  color: #27c670ff;
  font-family: DINMedium;
  margin-left: 25px;
}
.btn-disabled {
  width: 134px;
  height: 42px;
  background-color: #0000000D;
  border-radius: 6px;
  font-size: 17px;
  line-height: 24px;
  color: #00000040;
  font-family: DINMedium;
  margin-left: 25px;
}
</style>
<route lang="yaml">
meta:
  check: true
</route>
