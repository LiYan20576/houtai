<script setup>
import { useRouter } from "vue-router";
import { getIndexData } from "@/api/index";
import { useAppAbility } from "@/plugins/casl/useAppAbility";

const router = useRouter();
const ability = useAppAbility();
const avatars = ref("");

const isCardDetailsVisible = ref(false);
const isCardDetailsVisible1 = ref(false);

const length = ref("");
const gotoPay = () => {
  // router.push('/wizard-examples/checkout')
  window.location.href = "/gotomoney";
};

const contentContainer = ref(null);

const scrollToBottom = () => {
  isCardDetailsVisible.value = !isCardDetailsVisible.value
  if(isCardDetailsVisible.value){
    setTimeout(() => {
      const contentHeight = contentContainer.value.scrollHeight;
      window.scrollTo(
        {
          top:contentHeight-500,
          left:0,
          behavior: "smooth"
        }
      );
    }, 200);
  }
  
};

const contentContainer1 = ref(null);

const scrollToBottom1 = () => {
  isCardDetailsVisible1.value = !isCardDetailsVisible1.value
  if(isCardDetailsVisible1.value){
    // 延迟 1000 毫秒后滚动
    setTimeout(() => {
      const contentHeight = contentContainer1.value.scrollHeight;
      window.scrollTo({
        top:4000,
        left:0,
        behavior: "smooth"
      });
    }, 200);
  }
  
};
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
            UESG 提供两种 ESG 资格认证，分别对应不同的可持续发展岗位。
            <span
              @click="gotoLogin"
              style="
                font-family: DINMedium;
                color: #0066cc;
                line-height: 18px;
                font-size: 13px;
                cursor: pointer;
              "
              >了解岗位薪酬 ></span
            >
          </div>
        </div>
      </div>
    </div>
    
    <div
      ref="contentContainer"
      class="cardWrap"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 50px !important;
        padding-top: 0;
        margin-top: 0;
        box-shadow: none !important;
        scroll-behavior: smooth !important;
      "
    >
      <div style="width: 100%;padding-top: 64px;padding-left: 64px;padding-right: 64px;display: flex; justify-content: space-between; margin-bottom: 48px;">
        <div style="display: flex; justify-content: center;flex-direction: column;" >
          <div
            style="
              font-family: DINMedium;
              color: #000000D9;
              font-size: 31px;
              line-height: 42px;
              margin-bottom: 32px;
            "
          >
            UESG Fundamental Analyst
          </div>
          <div style=" display: flex; align-items: center; margin-bottom: 16px;" >
            <img
              src="https://www.uesg.org.cn/icon/0727/%E8%AF%81%E4%B9%A6%E7%BB%BF%E8%89%B2.svg"
              style="width: 24px; height: 24px; margin-right: 8px"
            />
            <span style="font-size: 17px;color: #000000FF;line-height: 24px;font-family: DINMedium;">
              通用 ESG 标准｜基础分析师
            </span>
            
          </div>
          <div style=" display: flex; align-items: center; " >
            <img
              src="https://www.uesg.org.cn/icon/0727/%E6%89%93%E6%8B%9B%E5%91%BC%E7%9A%84%E4%BA%BA_%E7%94%BB%E6%9D%BF%201.svg"
              style="width: 24px; height: 24px; margin-right: 8px"
            />
            <span style="font-size: 17px;color: #000000;line-height: 24px;font-family: DINMedium;">
              适用 ESG 行业新晋人员
            </span>
          </div>
        </div>
        <div>
          <VBtn
            color="#0066CCFF"
            @click="scrollToBottom "
            style="height: 42px; padding: 9px 32px"
          >
            <span
              style="
                color: #fff;
                font-size: 17px;
                font-family: DINMedium;
                line-height: 24px;
              "
            >
              了解详情
            </span>
          </VBtn>
        </div>
      </div>
      <!-- 证书图片 -->
      <div
        style="
          width: 100%;
          margin-bottom: 58px;
          padding: 0 64px;
        "
      >
        <img src="https://www.uesg.org.cn/icon/0727/%E5%A4%A7%E8%AF%81%E4%B9%A6-%E7%BB%BF%E8%89%B2.png" style="width: 100%;">
      </div>
      <VExpandTransition >
        <div v-show="isCardDetailsVisible" style="width: 100%;">
          <div style="width: 100%;padding: 0 64px;">
            <div style="width: 100%; margin: 0 auto;border-bottom: 1px solid #00000080; margin-bottom: 50px;"></div>
            <div style="width: 100%; margin: 0 auto;">
              <div style="display: flex;margin-bottom: 32px;">
                <img
                  src="https://www.uesg.org.cn/icon/0727/%E8%AF%BE%E7%A8%8B01.svg"
                  style="width: 28px; height: 28px; margin-right: 6px"
                />
                <div>
                  <div
                    style="
                      font-size: 17px;
                      font-family: DINMedium;
                      color: #000000D9;
                      line-height: 24px;
                      margin-bottom: 8px;
                    "
                  >
                    学习方式
                  </div>
                  <div
                    style="
                      font-size: 17px;
                      color: #000000D9;
                      line-height: 24px;
                    "
                  >
                    登录 UESG 中国官网进行线上 ESG 课程学习。
                    <br>
                    基础分析师认证学习时长 48 小时。
                    <br>
                    <span
                      style="
                        font-family: DINMedium;
                        color: #0066CCFF;
                        font-size: 17px;
                        line-height: 24px;
                        cursor: pointer;
                      "
                      >查看课纲</span>
                  </div>
                </div>
              </div>

              <div style="display: flex;margin-bottom: 32px;">
                <img
                  src="https://www.uesg.org.cn/icon/0727/%E8%AE%A4%E8%AF%81%E6%96%B9%E5%BC%8F.svg"
                  style="width: 28px; height: 28px; margin-right: 6px"
                />
                <div>
                  <div
                    style="
                      font-size: 17px;
                      font-family: DINMedium;
                      color: #000000D9;
                      line-height: 24px;
                      margin-bottom: 8px;
                    "
                  >
                    认证方式
                  </div>
                  <div
                    style="
                      font-size: 17px;
                      color: #000000D9;
                      line-height: 24px;
                    "
                  >
                    每月一次 2 小时线上机考，机考形式为 100 项选择题。
                    <br>
                    准确率超过 80% 即通过认证。
                    <br>
                    <span
                      style="
                        font-family: DINMedium;
                        color: #0066CCFF;
                        font-size: 17px;
                        line-height: 24px;
                        cursor: pointer;
                      "
                      >模拟考试</span>
                  </div>
                </div>
              </div>

              <div style="display: flex;margin-bottom: 32px;">
                <img
                  src="https://www.uesg.org.cn/icon/0727/%E8%AF%81%E4%B9%A6%E6%B4%BE%E5%8F%91.svg"
                  style="width: 28px; height: 28px; margin-right: 6px"
                />
                <div>
                  <div
                    style="
                      font-size: 17px;
                      font-family: DINMedium;
                      color: #000000D9;
                      line-height: 24px;
                      margin-bottom: 8px;
                    "
                  >
                    证书派发
                  </div>
                  <div
                    style="
                      font-size: 17px;
                      color: #000000D9;
                      line-height: 24px;
                    "
                  >
                    通过认证后可通过 UESG 中国官网下载电子版本证书。
                    <br>
                    UESG 将于 30 日内通过 EMS 邮寄纸质证书。
                    <br>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div style=" width: 100%;background: #F3F3F3FF;box-shadow: 0px 2px 4px 0px #f7f6f7;border-radius: 0px 0px 12px 12px;">
            <div style="padding: 49px 64px 60px; margin: 0 auto">
              <div style="display: flex; margin-bottom: 16px;align-items: center;">
                <img src="https://www.uesg.org.cn/icon/0727/%E8%B4%B9%E7%94%A8_%E7%94%BB%E6%9D%BF%201.svg" style="width: 24px;height: 24px;margin-right: 8px;">
                <div style=" font-size: 17px; font-family: DINMedium; color: #000000D9; line-height: 24px; " > 服务费 </div>
              </div>
              <div
                style="
                  font-family: DINMedium;
                  font-size: 35px;
                  color: #0066CCFF;
                  line-height: 50px;
                  margin-bottom: 16px;
                "
              >
                RMB 3250
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <div style="display: flex; align-items: center">
                  <VBtn
                    color="#0066CCFF"
                    style="margin-right: 16px; padding: 9px 54px; height: 44px"
                    @click="gotoPay"
                  >
                    <span
                      style="
                        color: #fff;
                        font-size: 17px;
                        font-family: DINMedium;
                        line-height: 24px;
                      "
                    >
                      即刻报名
                    </span>
                  </VBtn>
                  <span
                    style="
                      font-family: DINMedium;
                      font-size: 15px;
                      line-height: 21px;
                      color: #5C5A68FF;
                      margin-right: 8px;
                    "
                  >
                    学生优惠 RMB 2275
                  </span>
                  <span style="color: #0066CCFF;font-size: 15px;line-height: 21px;">
                    如何获取
                  </span>
                </div>
                <div
                  style="
                    font-size: 17px;
                    line-height: 24px;
                    color: rgba(0,0,0,0.85);
                    cursor: pointer;
                  "
                  @click="isCardDetailsVisible = !isCardDetailsVisible"
                >
                  <img src="https://www.uesg.org.cn/icon/0727/%E7%AE%AD%E5%A4%B4-%E5%90%91%E4%B8%8A_%E7%94%BB%E6%9D%BF%201.svg" style="width: 24px;height: 24px;">
                </div>
              </div>
            </div>
          </div>
        </div>
      </VExpandTransition>
    </div>

    <div
      ref="contentContainer1"
      class="cardWrap"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 50px !important;
        padding-top: 0;
        margin-top: 0;
        box-shadow: none !important;
        scroll-behavior: smooth !important;
      "
    >
      <div style="width: 100%;padding-top: 64px;padding-left: 64px;padding-right: 64px;display: flex; justify-content: space-between; margin-bottom: 48px;">
        <div style="display: flex; justify-content: center;flex-direction: column;" >
          <div
            style="
              font-family: DINMedium;
              color: #000000D9;
              font-size: 31px;
              line-height: 42px;
              margin-bottom: 32px;
            "
          >
            UESG Advanced Analyst
          </div>
          <div style=" display: flex; align-items: center; margin-bottom: 16px;" >
            <img
              src="https://www.uesg.org.cn/icon/0727/%E8%AF%81%E4%B9%A6%E8%93%9D%E8%89%B2.svg"
              style="width: 24px; height: 24px; margin-right: 8px"
            />
            <span style="font-size: 17px;color: #000000FF;line-height: 24px;font-family: DINMedium;">
              通用 ESG 标准｜高级分析师
            </span>
            
          </div>
          <div style=" display: flex; align-items: center; " >
            <img
              src="https://www.uesg.org.cn/icon/0727/%E6%89%93%E6%8B%9B%E5%91%BC%E7%9A%84%E4%BA%BA_%E7%94%BB%E6%9D%BF%201.svg"
              style="width: 24px; height: 24px; margin-right: 8px"
            />
            <span style="font-size: 17px;color: #000000;line-height: 24px;font-family: DINMedium;">
              适用 ESG 行业进阶人员
            </span>
          </div>
        </div>
        <div>
          <VBtn
            color="#0066CCFF"
            @click="scrollToBottom1"
            style="height: 42px; padding: 9px 32px"
          >
            <span
              style="
                color: #fff;
                font-size: 17px;
                font-family: DINMedium;
                line-height: 24px;
              "
            >
              了解详情
            </span>
          </VBtn>
        </div>
      </div>
      <!-- 证书图片 -->
      <div
        style="
          width: 100%;
          margin-bottom: 58px;
          padding: 0 64px;
        "
      >
        <img src="https://www.uesg.org.cn/icon/0727/%E5%A4%A7%E8%AF%81%E4%B9%A6-%E8%93%9D%E8%89%B2.png" style="width: 100%;">
      </div>
      <VExpandTransition >
        <div v-show="isCardDetailsVisible1" style="width: 100%;">
          <div style="width: 100%;padding: 0 64px;">
            <div style="width: 100%; margin: 0 auto;border-bottom: 1px solid #00000080; margin-bottom: 50px;"></div>
            <div style="width: 100%; margin: 0 auto;">
              <div style="display: flex;margin-bottom: 32px;">
                <img
                  src="https://www.uesg.org.cn/icon/0727/%E8%AF%BE%E7%A8%8B01.svg"
                  style="width: 28px; height: 28px; margin-right: 6px"
                />
                <div>
                  <div
                    style="
                      font-size: 17px;
                      font-family: DINMedium;
                      color: #000000D9;
                      line-height: 24px;
                      margin-bottom: 8px;
                    "
                  >
                    学习方式
                  </div>
                  <div
                    style="
                      font-size: 17px;
                      color: #000000D9;
                      line-height: 24px;
                    "
                  >
                    登录 UESG 中国官网进行线上 ESG 课程学习。
                    <br>
                    基础分析师认证学习时长 60 小时。
                    <br>
                    <span
                      style="
                        font-family: DINMedium;
                        color: #0066CCFF;
                        font-size: 17px;
                        line-height: 24px;
                        cursor: pointer;
                      "
                      >查看课纲</span>
                  </div>
                </div>
              </div>

              <div style="display: flex;margin-bottom: 32px;">
                <img
                  src="https://www.uesg.org.cn/icon/0727/%E8%AE%A4%E8%AF%81%E6%96%B9%E5%BC%8F.svg"
                  style="width: 28px; height: 28px; margin-right: 6px"
                />
                <div>
                  <div
                    style="
                      font-size: 17px;
                      font-family: DINMedium;
                      color: #000000D9;
                      line-height: 24px;
                      margin-bottom: 8px;
                    "
                  >
                    认证方式
                  </div>
                  <div
                    style="
                      font-size: 17px;
                      color: #000000D9;
                      line-height: 24px;
                    "
                  >
                    每月一次 2 小时线上机考，机考形式为 100 项选择题。
                    <br>
                    准确率超过 80% 即通过认证。
                    <br>
                    <span
                      style="
                        font-family: DINMedium;
                        color: #0066CCFF;
                        font-size: 17px;
                        line-height: 24px;
                        cursor: pointer;
                      "
                      >模拟考试</span>
                  </div>
                </div>
              </div>

              <div style="display: flex;margin-bottom: 32px;">
                <img
                  src="https://www.uesg.org.cn/icon/0727/%E8%AF%81%E4%B9%A6%E6%B4%BE%E5%8F%91.svg"
                  style="width: 28px; height: 28px; margin-right: 6px"
                />
                <div>
                  <div
                    style="
                      font-size: 17px;
                      font-family: DINMedium;
                      color: #000000D9;
                      line-height: 24px;
                      margin-bottom: 8px;
                    "
                  >
                    证书派发
                  </div>
                  <div
                    style="
                      font-size: 17px;
                      color: #000000D9;
                      line-height: 24px;
                    "
                  >
                    通过认证后可通过 UESG 中国官网下载电子版本证书。
                    <br>
                    UESG 将于 30 日内通过 EMS 邮寄纸质证书。
                    <br>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div style=" width: 100%;background: #F3F3F3FF;box-shadow: 0px 2px 4px 0px #f7f6f7;border-radius: 0px 0px 12px 12px;">
            <div style="padding: 49px 64px 60px; margin: 0 auto">
              <div style="display: flex; margin-bottom: 16px;align-items: center;">
                <img src="https://www.uesg.org.cn/icon/0727/%E8%B4%B9%E7%94%A8_%E7%94%BB%E6%9D%BF%201.svg" style="width: 24px;height: 24px;margin-right: 8px;">
                <div style=" font-size: 17px; font-family: DINMedium; color: #000000D9; line-height: 24px; " > 服务费 </div>
              </div>
              <div
                style="
                  font-family: DINMedium;
                  font-size: 35px;
                  color: #0066CCFF;
                  line-height: 50px;
                  margin-bottom: 16px;
                "
              >
                RMB 5350
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <div style="display: flex; align-items: center">
                  <VBtn
                    color="#0066CCFF"
                    style="margin-right: 16px; padding: 9px 54px; height: 44px"
                    @click="gotoPay"
                  >
                    <span
                      style="
                        color: #fff;
                        font-size: 17px;
                        font-family: DINMedium;
                        line-height: 24px;
                      "
                    >
                      即刻报名
                    </span>
                  </VBtn>
                  <span
                    style="
                      font-family: DINMedium;
                      font-size: 15px;
                      line-height: 21px;
                      color: #5C5A68FF;
                      margin-right: 8px;
                    "
                  >
                    学生优惠 RMB 3745
                  </span>
                  <span style="color: #0066CCFF;font-size: 15px;line-height: 21px;">
                    如何获取
                  </span>
                </div>
                <div
                  style="
                    font-size: 17px;
                    line-height: 24px;
                    color: rgba(0,0,0,0.85);
                    cursor: pointer;
                  "
                  @click="isCardDetailsVisible1 = !isCardDetailsVisible1"
                >
                  <img src="https://www.uesg.org.cn/icon/0727/%E7%AE%AD%E5%A4%B4-%E5%90%91%E4%B8%8A_%E7%94%BB%E6%9D%BF%201.svg" style="width: 24px;height: 24px;">
                </div>
              </div>
            </div>
          </div>
        </div>
      </VExpandTransition>
    </div>

  </div>
</template>

<style>
.cardWrap {
  /* height: 500px; */
  margin: 0;
  background-color: #ffffffff !important;
  box-shadow: 0px 5px 10px 0px #f0eff2 !important;
  border-radius: 12px !important;
}

.v-card,
.v-card-item__content {
  overflow: unset !important;
}
.cardTitle {
  font-size: 20px;
  color: #5c5a68;
  font-weight: 500;
  line-height: 28px;
  padding-top: 0;
  padding-bottom: 4px;
}
.tools {
  display: flex;
  justify-content: space-between;
}
.tag {
  position: relative;
  color: #30d158ff;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}
.tag::before {
  content: "";
  position: absolute;
  display: inline-block;
  margin-right: 10px;
  width: 3px;
  height: 14px;
  background-color: #30d158ff;
  vertical-align: middle;
  margin-bottom: 1px;
  left: -24px;
  top: 1px;
}
.tag1 {
  position: relative;
  color: #7367f0ff;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}
.tag1::before {
  content: "";
  position: absolute;
  display: inline-block;
  margin-right: 10px;
  width: 3px;
  height: 14px;
  background-color: #7367f0ff;
  vertical-align: middle;
  margin-bottom: 1px;
  left: -24px;
  top: 1px;
}
.time {
  font-size: 13px;
  line-height: 18px;
  color: #00000040;
}
.right {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss" scoped>
// .v-card-text {
//   padding-top: 0 !important;
// }
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
