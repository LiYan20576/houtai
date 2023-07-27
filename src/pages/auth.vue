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
</script>

<template>
  <div>
    <VRow>
      <VCol
        cols="12"
      >
        <VCard style="position: relative;;width: 100%;display: flex;justify-content: center; align-items: center;padding: 32px 50px;margin-bottom: 50px;">
          <div style="font-family: 'DINMedium';font-size: 17px;line-height: 20px;color: #1D1D1F;position: absolute;left: 50px;">
            认证服务
          </div>
          <div style="font-size: 15px;color: #1D1D1F;line-height: 21px;">
            UESG 针对18岁以上在校学生提供教育优惠，在官网价格的基础上7折提供服务。
            <span style="font-family: 'DINMedium';color: #0066CC;line-height: 21px;font-size: 15px;">了解详情 ></span>
          </div>
        </VCard>
      </VCol>
    </VRow>
    
    <VRow
      class="cardWrap"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 50px !important;
        padding-top: 0;
        margin-top: 0;
      "
    >
      <div style=" width: 75%; display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; margin-top: 50px;">
        <div style="display: flex; justify-content: center;flex-direction: column;" >
          <div
            style="
              font-family: DINMedium;
              color: #000000;
              font-size: 35px;
              line-height: 50px;
              margin-bottom: 25px;
            "
          >
            UESG Fundamental Analyst
          </div>
          <div style=" display: flex; align-items: center; margin-bottom: 25px;" >
            <img
              src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg"
              style="width: 24px; height: 24px; margin-right: 10px"
            />
            <span style="font-size: 20px;color: #000000;line-height: 24px;font-family: DINMedium;">
              通用 ESG 标准｜基础分析师
            </span>
            
          </div>
          <div style=" display: flex; align-items: center; " >
            <img
              src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg"
              style="width: 24px; height: 24px; margin-right: 10px"
            />
            <span style="font-size: 20px;color: #000000;line-height: 24px;font-family: DINMedium;">
              适用 ESG 行业新晋人员
            </span>
          </div>
        </div>
        <div>
          <VBtn
            color="#0066CCFF"
            @click="isCardDetailsVisible = !isCardDetailsVisible"
            style="height: 42px; padding: 11px 34px"
          >
            <span
              style="
                color: #fff;
                font-size: 17px;
                font-family: DINMedium;
                line-height: 20px;
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
          width: 75%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 44px;
        "
      >
        <img
          src="https://www.uesg.org.cn/img/0725/auth3.jpg"
          style="width: auto; height: 413px"
        />
        <img
          src="https://www.uesg.org.cn/img/0725/auth4.jpg"
          style="width: auto; height: 413px"
        />
      </div>
      <VExpandTransition >
        <div v-show="isCardDetailsVisible" style="width: 100%;">
          <div style="width: 75%; margin: 0 auto;border-bottom: 1px solid #00000080; margin-bottom: 50px;"></div>
          <div style="width: 75%; margin: 0 auto;">
            <div style="display: flex;margin-bottom: 50px;">
              <img
                src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg"
                style="width: 28px; height: 28px; margin-right: 6px"
              />
              <div>
                <div
                  style="
                    font-size: 20px;
                    font-family: DINMedium;
                    color: #000000D9;
                    line-height: 28px;
                    margin-bottom: 10px;
                  "
                >
                  学习方式
                </div>
                <div
                  style="
                    font-size: 17px;
                    color: #00000080;
                    line-height: 24px;
                  "
                >
                  登录“UESG”中文版官网进行在线ESG课程学习。
                  <br>
                  基础分析师认证学习时长48小时。
                  <span
                    style="
                      font-family: DINMedium;
                      color: #0066CCFF;
                      font-size: 17px;
                      line-height: 24px;
                      text-decoration: underline;
                    "
                    >查看课纲</span
                  >。
                </div>
              </div>
            </div>
            <div style="display: flex;margin-bottom: 50px;">
              <img
                src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg"
                style="width: 28px; height: 28px; margin-right: 6px"
              />
              <div>
                <div
                  style="
                    font-size: 20px;
                    font-family: DINMedium;
                    color: #000000D9;
                    line-height: 28px;
                    margin-bottom: 10px;
                  "
                >
                  认证方式
                </div>
                <div
                  style="
                    font-size: 17px;
                    color: #00000080;
                    line-height: 24px;
                  "
                >
                  每月一次2小时线上机考，机考形式为100项选择题。
                  <br>
                  准确率超过80%即通过认证。
                </div>
              </div>
            </div>
            <div style="display: flex;margin-bottom: 50px;">
              <img
                src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg"
                style="width: 28px; height: 28px; margin-right: 6px"
              />
              <div>
                <div
                  style="
                    font-size: 20px;
                    font-family: DINMedium;
                    color: #000000D9;
                    line-height: 28px;
                    margin-bottom: 10px;
                  "
                >
                  证书派发
                </div>
                <div
                  style="
                    font-size: 17px;
                    color: #00000080;
                    line-height: 24px;
                  "
                >
                  通过认证后可通过“UESG”官网下载电子版本证书。
                  <br>
                  “UESG”将于30日内通过EMS邮寄纸质证书。
                </div>
              </div>
            </div>
          </div>
          <div style=" width: 100%;background: #f7f7f7;box-shadow: 0px 2px 4px 0px #f7f6f7;border-radius: 0px 0px 24px 24px;">
            <div style="width: 75%; padding: 49px 0 60px; margin: 0 auto">
              <div
                style="
                  font-size: 25px;
                  font-family: DINMedium;
                  color: rgba(0,0,0,0.85);
                  line-height: 36px;
                  margin-bottom: 25px;
                "
              >
                学习与认证费用
              </div>
              <div
                style="
                  font-family: DINMedium;
                  font-size: 35px;
                  font-weight: bold;
                  color: #0066CCFF;
                  line-height: 50px;
                  margin-bottom: 25px;
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
                    style="margin-right: 25px; padding: 9px 54px; height: 44px"
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
                      font-size: 17px;
                      line-height: 24px;
                      color: #5C5A68;
                      margin-right: 20px;
                    "
                  >
                    学生优惠 RMB 2275
                  </span>
                  
                </div>
                <div
                  style="
                    text-decoration: underline;
                    font-size: 17px;
                    line-height: 24px;
                    color: rgba(0,0,0,0.85);
                    cursor: pointer;
                  "
                  @click="isCardDetailsVisible = !isCardDetailsVisible"
                >
                  收起
                </div>
              </div>
            </div>
          </div>
        </div>
      </VExpandTransition>
    </VRow>

    <VRow
      class="cardWrap"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 50px !important;
        padding-top: 0;
        margin-top: 0;
      "
    >
      <div style=" width: 75%; display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; margin-top: 50px;">
        <div style="display: flex; justify-content: center;flex-direction: column;" >
          <div
            style="
              font-family: DINMedium;
              color: #000000;
              font-size: 35px;
              line-height: 50px;
              margin-bottom: 25px;
            "
          >
            UESG Advanced Analyst
          </div>
          <div style=" display: flex; align-items: center; margin-bottom: 25px;" >
            <img
              src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg"
              style="width: 24px; height: 24px; margin-right: 10px"
            />
            <span style="font-size: 20px;color: #000000;line-height: 24px;font-family: DINMedium;">
              通用 ESG 标准｜基础分析师
            </span>
            
          </div>
          <div style=" display: flex; align-items: center; " >
            <img
              src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg"
              style="width: 24px; height: 24px; margin-right: 10px"
            />
            <span style="font-size: 20px;color: #000000;line-height: 24px;font-family: DINMedium;">
              适用 ESG 行业新晋人员
            </span>
          </div>
        </div>
        <div>
          <VBtn
            color="#0066CCFF"
            @click="isCardDetailsVisible1 = !isCardDetailsVisible1"
            style="height: 42px; padding: 11px 34px"
          >
            <span
              style="
                color: #fff;
                font-size: 17px;
                font-family: DINMedium;
                line-height: 20px;
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
          width: 75%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 44px;
        "
      >
        <img
          src="https://www.uesg.org.cn/img/0725/auth2.jpg"
          style="width: auto; height: 413px"
        />
        <img
          src="https://www.uesg.org.cn/img/0725/auth1.jpg"
          style="width: auto; height: 413px"
        />
      </div>
      <VExpandTransition >
        <div v-show="isCardDetailsVisible1" style="width: 100%;">
          <div style="width: 75%; margin: 0 auto;border-bottom: 1px solid #00000080; margin-bottom: 50px;"></div>
          <div style="width: 75%; margin: 0 auto;">
            <div style="display: flex;margin-bottom: 50px;">
              <img
                src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg"
                style="width: 28px; height: 28px; margin-right: 6px"
              />
              <div>
                <div
                  style="
                    font-size: 20px;
                    font-family: DINMedium;
                    color: #000000D9;
                    line-height: 28px;
                    margin-bottom: 10px;
                  "
                >
                  学习方式
                </div>
                <div
                  style="
                    font-size: 17px;
                    color: #00000080;
                    line-height: 24px;
                  "
                >
                  登录“UESG”中文版官网进行在线ESG课程学习。
                  <br>
                  基础分析师认证学习时长60小时。
                  <span
                    style="
                      font-family: DINMedium;
                      color: #0066CCFF;
                      font-size: 17px;
                      line-height: 24px;
                      text-decoration: underline;
                    "
                    >查看课纲</span
                  >。
                </div>
              </div>
            </div>
            <div style="display: flex;margin-bottom: 50px;">
              <img
                src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg"
                style="width: 28px; height: 28px; margin-right: 6px"
              />
              <div>
                <div
                  style="
                    font-size: 20px;
                    font-family: DINMedium;
                    color: #000000D9;
                    line-height: 28px;
                    margin-bottom: 10px;
                  "
                >
                  认证方式
                </div>
                <div
                  style="
                    font-size: 17px;
                    color: #00000080;
                    line-height: 24px;
                  "
                >
                  每月一次2小时线上机考，机考形式为100项选择题。
                  <br>
                  准确率超过80%即通过认证。
                </div>
              </div>
            </div>
            <div style="display: flex;margin-bottom: 50px;">
              <img
                src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg"
                style="width: 28px; height: 28px; margin-right: 6px"
              />
              <div>
                <div
                  style="
                    font-size: 20px;
                    font-family: DINMedium;
                    color: #000000D9;
                    line-height: 28px;
                    margin-bottom: 10px;
                  "
                >
                  证书派发
                </div>
                <div
                  style="
                    font-size: 17px;
                    color: #00000080;
                    line-height: 24px;
                  "
                >
                  通过认证后可通过“UESG”官网下载电子版本证书。
                  <br>
                  “UESG”将于30日内通过EMS邮寄纸质证书。
                </div>
              </div>
            </div>
          </div>
          <div style=" width: 100%;background: #f7f7f7;box-shadow: 0px 2px 4px 0px #f7f6f7;border-radius: 0px 0px 24px 24px;">
            <div style="width: 75%; padding: 49px 0 60px; margin: 0 auto">
              <div
                style="
                  font-size: 25px;
                  font-family: DINMedium;
                  color: rgba(0,0,0,0.85);
                  line-height: 36px;
                  margin-bottom: 25px;
                "
              >
                学习与认证费用
              </div>
              <div
                style="
                  font-family: DINMedium;
                  font-size: 35px;
                  font-weight: bold;
                  color: #0066CCFF;
                  line-height: 50px;
                  margin-bottom: 25px;
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
                    style="margin-right: 25px; padding: 9px 54px; height: 44px"
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
                      font-size: 17px;
                      line-height: 24px;
                      color: #5C5A68;
                      margin-right: 20px;
                    "
                  >
                    学生优惠 RMB 3745
                  </span>
                  
                </div>
                <div
                  style="
                    text-decoration: underline;
                    font-size: 17px;
                    line-height: 24px;
                    color: rgba(0,0,0,0.85);
                    cursor: pointer;
                  "
                  @click="isCardDetailsVisible1 = !isCardDetailsVisible1"
                >
                  收起
                </div>
              </div>
            </div>
          </div>
        </div>
      </VExpandTransition>
    </VRow>

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
