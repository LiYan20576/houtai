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
    window.location.href = "/wizard-examples/checkout";
}


</script>

<template>
    <div>
        <VRow class="cardWrap" style="display: flex;flex-direction: column;align-items: center;margin-bottom: 50px !important;">
    <div style="width: 70%;display: flex;align-items: flex-end;justify-content: space-between;margin-bottom: 58px;margin-top: 60px;">
        <div style="display: flex;align-items: center;justify-content: center;">
            <img src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg" style="width: 50px;height: 50px;margin-right: 10px;">
            <div>
                <div style="font-weight: bold;color: #5C5A68;font-size: 35px;line-height: 50px;">Fundamental Analyst</div>
                <div style="font-size: 24px;font-weight: 600;color: #5C5A68;line-height: 34px;">国际通用 ESG 标准｜基础分析师</div>
            </div>
        </div>
        <div>
            <VBtn color="#0B9A4DFF" @click="isCardDetailsVisible = !isCardDetailsVisible" style="height: 42px;padding: 11px 34px;">
                <span style="color: #fff;font-size: 17px;font-weight: 500;line-height: 20px;">
                    了解详情
                </span>
            </VBtn>
        </div>
    </div>
    <div style="width: 70%;display: flex;justify-content:space-between;align-items: center;margin-bottom: 54px;">
        <img src="https://lovemedicine.cn/public/uesg/7.23/%E8%AF%81%E4%B9%A6/%E7%BB%BF%E8%AF%81%E4%B9%A61.jpeg" style="width: auto;height: 413px;">
        <img src="https://lovemedicine.cn/public/uesg/7.23/%E8%AF%81%E4%B9%A6/%E7%BB%BF%E8%AF%81%E4%B9%A62.jpeg" style="width: auto;height: 413px;">
    </div>
    <VExpandTransition>
        <div v-show="isCardDetailsVisible" style="width: 100%;">
            <div style="width: 70%;margin: 0 auto;">
                <div style="display: flex;justify-content: space-between;align-items: flex-end;margin-bottom: 60px;">
                <div style="display: flex;">
                    <img src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg" style="width: 50px;height: 50px;margin-right: 20px;">
                    <div>
                        <div style="font-size: 30px;font-weight: 500;color: #5C5A68;line-height: 50px;margin-bottom: 10px;">适合人群</div>
                        <div style="font-size: 17px;font-weight: 400;color: #5C5A68;line-height: 28px;">
                            “UESG”基础分析师认证适用于ESG行业<span style="color: #0066CCFF;font-size: 17px;line-height: 28px;font-weight: 600;text-decoration: underline;">新晋人员</span>。
                        </div>
                    </div>
                </div>
                <div style="color: #0066CCFF;font-size: 20px;font-weight: 400;line-height: 28px;cursor: pointer;">
                    了解更多 >
                </div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: flex-end;margin-bottom: 60px;">
                <div style="display: flex;">
                    <img src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg" style="width: 50px;height: 50px;margin-right: 20px;">
                    <div>
                        <div style="font-size: 30px;font-weight: 500;color: #5C5A68;line-height: 50px;margin-bottom: 10px;">认证方式</div>
                        <div style="font-size: 17px;font-weight: 400;color: #5C5A68;line-height: 28px;">
                            每月一次2小时线上机考，机考形式为100项选择题，准确率超过80%即通过认证。
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: flex-end;margin-bottom: 60px;">
                <div style="display: flex;">
                    <img src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg" style="width: 50px;height: 50px;margin-right: 20px;">
                    <div>
                        <div style="font-size: 30px;font-weight: 500;color: #5C5A68;line-height: 50px;margin-bottom: 10px;">学习方式</div>
                        <div style="font-size: 17px;font-weight: 400;color: #5C5A68;line-height: 28px;">
                            访问“UESG”中文版官网进行在线ESG课程学习。
                            <br>
                            基础分析师认证学习时长48小时。
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: flex-end;margin-bottom: 60px;">
                <div style="display: flex;">
                    <img src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg" style="width: 50px;height: 50px;margin-right: 20px;">
                    <div>
                        <div style="font-size: 30px;font-weight: 500;color: #5C5A68;line-height: 50px;margin-bottom: 10px;">证书派发</div>
                        <div style="font-size: 17px;font-weight: 400;color: #5C5A68;line-height: 28px;">
                            通过认证后可通过“UESG”官网下载电子版本证书。
                            <br>        
                            “UESG”将于30日内通过EMS邮寄纸质证书。
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div style="width: 100%;background: #F7F7F7;box-shadow: 0px 2px 4px 0px #F7F6F7;border-radius: 0px 0px 24px 24px;">
                <div style="width: 70%;padding: 49px 0 60px; margin: 0 auto;">
                    <div style="font-size: 35px;font-weight: 500;color: #000000;line-height: 50px;margin-bottom: 30px;">
                        学习与认证费用
                    </div>
                    <div style="font-size: 35px;font-weight: bold;color: #0066CC;line-height: 50px;margin-bottom: 30px;">
                        RMB 3250
                    </div>
                    <div style="display: flex;justify-content: space-between;align-items: center;">
                        <div style="display: flex;align-items: center;">
                            <VBtn color="#0066CCFF" style="margin-right: 50px;padding: 8px 80px;height: 44px;" @click="gotoPay">
                                <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 28px;">
                                    即刻报名
                                </span>
                            </VBtn>
                            <span style="font-size: 20px;line-height: 28px;color: #000000FF;margin-right: 20px;">
                                学生优惠 RMB 2275
                            </span>
                            <span style="font-size: 20px;font-weight: 400;color: #0066CC;line-height: 28px;cursor: pointer;">
                                详情 >
                            </span>
                        </div>
                        <div style="text-decoration: underline;font-size: 20px;line-height: 28px;color: #5C5A68FF;cursor: pointer;" @click="isCardDetailsVisible = !isCardDetailsVisible">
                            收起
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </VExpandTransition>
  </VRow>
  

  <VRow class="cardWrap" style="display: flex;flex-direction: column;align-items: center;margin-bottom: 30px !important;">
    <div style="width: 70%;display: flex;align-items: flex-end;justify-content: space-between;margin-bottom: 58px;margin-top: 60px;">
        <div style="display: flex;align-items: center;justify-content: center;">
            <img src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg" style="width: 50px;height: 50px;margin-right: 10px;">
            <div>
                <div style="font-weight: bold;color: #5C5A68;font-size: 35px;line-height: 50px;">Advanced Analyst</div>
                <div style="font-size: 24px;font-weight: 600;color: #5C5A68;line-height: 34px;">国际通用 ESG 标准｜高级分析师</div>
            </div>
        </div>
        <div>
            <VBtn color="#2169B0FF" @click="isCardDetailsVisible1 = !isCardDetailsVisible1" style="height: 42px;padding: 11px 34px;">
                <span style="color: #fff;font-size: 17px;font-weight: 500;line-height: 20px;height: 20px;" >了解详情</span>
            </VBtn>
        </div>
    </div>
    <div style="width: 70%;display: flex;justify-content:space-between;align-items: center;margin-bottom: 54px;">
        <img src="https://lovemedicine.cn/public/uesg/7.23/%E8%AF%81%E4%B9%A6/%E8%93%9D%E8%AF%81%E4%B9%A61.jpeg" style="width: auto;height: 413px;">
        <img src="https://lovemedicine.cn/public/uesg/7.23/%E8%AF%81%E4%B9%A6/%E8%93%9D%E8%AF%81%E4%B9%A62.jpeg" style="width: auto;height: 413px;">
    </div>
    <VExpandTransition>
        <div v-show="isCardDetailsVisible1" style="width: 100%;">
            <div style="width: 70%;margin: 0 auto;">
                <div style="display: flex;justify-content: space-between;align-items: flex-end;margin-bottom: 60px;">
                <div style="display: flex;">
                    <img src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg" style="width: 50px;height: 50px;margin-right: 20px;">
                    <div>
                        <div style="font-size: 30px;font-weight: 500;color: #5C5A68;line-height: 50px;margin-bottom: 10px;">适合人群</div>
                        <div style="font-size: 17px;font-weight: 400;color: #5C5A68;line-height: 28px;">
                            “UESG”基础分析师认证适用于ESG行业<span style="color: #0066CCFF;font-size: 20px;line-height: 28px;font-weight: 600;text-decoration: underline;">进阶人员</span>。
                        </div>
                    </div>
                </div>
                <div style="color: #0066CCFF;font-size: 17px;font-weight: 400;line-height: 28px;cursor: pointer;">
                    了解更多 >
                </div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: flex-end;margin-bottom: 60px;">
                <div style="display: flex;">
                    <img src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg" style="width: 50px;height: 50px;margin-right: 20px;">
                    <div>
                        <div style="font-size: 30px;font-weight: 500;color: #5C5A68;line-height: 50px;margin-bottom: 10px;">认证方式</div>
                        <div style="font-size: 17px;font-weight: 400;color: #5C5A68;line-height: 28px;">
                            每月一次2小时线上机考，机考形式为100项选择题，准确率超过80%即通过认证。
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: flex-end;margin-bottom: 60px;">
                <div style="display: flex;">
                    <img src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg" style="width: 50px;height: 50px;margin-right: 20px;">
                    <div>
                        <div style="font-size: 30px;font-weight: 500;color: #5C5A68;line-height: 50px;margin-bottom: 10px;">学习方式</div>
                        <div style="font-size: 17px;font-weight: 400;color: #5C5A68;line-height: 28px;">
                            访问“UESG”中文版官网进行在线ESG课程学习。
                            <br>
                            基础分析师认证学习时长60小时。
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: flex-end;margin-bottom: 60px;">
                <div style="display: flex;">
                    <img src="https://www.uesg.org.cn/icon/0725/绿色奖牌_画板 1.svg" style="width: 50px;height: 50px;margin-right: 20px;">
                    <div>
                        <div style="font-size: 30px;font-weight: 500;color: #5C5A68;line-height: 50px;margin-bottom: 10px;">证书派发</div>
                        <div style="font-size: 17px;font-weight: 400;color: #5C5A68;line-height: 28px;">
                            通过认证后可通过“UESG”官网下载电子版本证书。
                            <br>
                            “UESG”将于30日内通过EMS邮寄纸质证书。
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div style="width: 100%;background: #F7F7F7;box-shadow: 0px 2px 4px 0px #F7F6F7;border-radius: 0px 0px 24px 24px;">
                <div style="width: 70%;padding: 49px 0 60px; margin: 0 auto;">
                    <div style="font-size: 35px;font-weight: 500;color: #000000;line-height: 50px;margin-bottom: 30px;">
                        学习与认证费用
                    </div>
                    <div style="font-size: 35px;font-weight: bold;color: #0066CC;line-height: 50px;margin-bottom: 30px;">
                        RMB 5350
                    </div>
                    <div style="display: flex;justify-content: space-between;align-items: center;">
                        <div style="display: flex;align-items: center;">
                            <VBtn color="#0066CCFF" style="margin-right: 50px;padding: 8px 80px;height: 44px;" @click="gotoPay">
                                <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 28px;">
                                    即刻报名
                                </span>
                            </VBtn>
                        </div>
                        <div style="text-decoration: underline;font-size: 20px;line-height: 28px;color: #5C5A68FF;cursor: pointer;" @click="isCardDetailsVisible1 = !isCardDetailsVisible1">
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

<!-- <style>
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
</style> -->

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
