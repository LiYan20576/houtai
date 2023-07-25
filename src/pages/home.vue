<script setup>
import { useRouter } from "vue-router";
import { getIndexData } from "@/api/index";
import { useAppAbility } from "@/plugins/casl/useAppAbility";

const router = useRouter();
const ability = useAppAbility();
const avatars = ref("");

const isCardDetailsVisible = ref(false);

const length = ref("");

const index1 = ref("");

const aaa = (i) => {
  if(i===index1.value) {
    index1.value = ''
  } else {
    index1.value = i;
    console.log(index1.value,"xxxxxxxxx");
  }
  
}

const getData = async () => {
  const { data: res } = await getIndexData();
  avatars.value = res;
  avatars.value.reverse();
  length.value = avatars.value.length;
};

const info = (index) => {
  router.push("/inner/" + index);
};

const news = ref([
  {
    type: "news",
    img: "https://www.uesg.org.cn/img/0725/2.jpeg",
    title: "ESG的含义。",
    tag: "科普",
    time: "2023.07.23",
    views: "9K+",
    desc: "ESG解释为“Environmental环境”、“Social社会”和“Governance治理”。",
  },
  {
    type: "news",
    img: "https://www.uesg.org.cn/img/0725/3.jpeg",
    title: "中国特色的ESG。",
    tag: "科普",
    time: "2023.07.23",
    views: "9K+",
    desc: "中国是世界上最大、最有活力的经济体之一，中国企业更是中国经济发展的重要动力。以对环境友好、对社会负责任的方式促进中国和世界繁荣。",
  },
  {
    type: "news",
    img: "https://www.uesg.org.cn/img/0725/4.jpeg",
    title: "ESG对企业的作用。",
    tag: "科普",
    time: "2023.07.23",
    views: "9K+",
    desc: "全球气候危机当前，每个国家、每个企业乃至每个人都责无旁贷。企业应不断完善脱碳策略和举措，减少企业运营和价值链对环境的影响，引领企业绿色转型。",
  },
  {
    type: "report",
    img: "https://www.uesg.org.cn/img/0725/5.jpeg",
    title: "负责人的科技，可持续的未来。",
    tag: "倡导ESG的企业",
    time: "2023.07.23",
    views: "9K+",
    desc: "变化之中也有不变，这正是我们始终的坚持。ESG将成为控股集团与业务集团的治理纽带和价值纽带，推动阿里巴巴持续做“好公司”，成为可持续发展领域的领军者。",
  },
  {
    type: "report",
    img: "https://www.uesg.org.cn/img/0725/6.jpeg",
    title: "三管齐下，齐头并进。",
    tag: "倡导ESG的企业",
    time: "2023.07.23",
    views: "9K+",
    desc: "过去一年中，腾讯在环境、社会及管治（ESG）方面均取得稳步进展。腾讯于本周发布其2022年度ESG报告，全面阐述了自身的举措与成果，包括推进碳中和发展，保护生物多样性，提升多元、平等与共融（DEI），推动可持续社会价值创新。",
  },
  {
    type: "report",
    img: "https://www.uesg.org.cn/img/0725/7.jpeg",
    title: "为用户、员工、乃至全人类提供支持。",
    tag: "倡导ESG的企业",
    time: "2023.07.23",
    views: "9K+",
    desc: "小米作为一家以智能手机、智能硬件和IoT平台为核心的消费电子及智能制造公司，努力凭借公司在规模和运作效率上的优势，不断促进可持续经济的发展，为我们的用户、员工、公司本身乃至全人类提供支持。",
  },
]);


onMounted(() => {
  // 在页面加载时执行的方法
  getData();

  const userAbilities = [
    {
      action: "manage",
      subject: "all",
    },
  ];
  localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
  ability.update(userAbilities);
  // localStorage.setItem("info_islogin", true);
});
</script>

<template>
  <VRow>
    <!-- 👉 Popular Uses Of The Internet -->
    <div style="padding: 12px">
      <img
        src="https://www.uesg.org.cn/img/0725/1.jpeg"
        style="width: 100%; border-radius: 6px; display: block"
        alt=""
      />
    </div>

    <VCol cols="12" md="4" sm="6" v-for="(item, index) in news" :key="index">
      <VCard v-if="item.type == 'news'">
        <VImg :src="item.img" style="border-radius: 6px;"/>

        <VCardItem>
          <VCardTitle class="cardTitle">{{ item.title }}</VCardTitle>
          <div class="tools">
            <div class="left">
              <span class="tag">
                {{ item.tag }}
              </span>
              <span style="padding: 0 5px;font-size: 13px;line-height: 18px;color: #00000040;">|</span>
              <span class="time">{{ item.time }}</span>
            </div>

            <div class="right">
              <img
                src="https://www.uesg.org.cn/icon/0725/view_%E7%94%BB%E6%9D%BF%201.svg"
                style="width: 20px; height: 15px"
              />
              <span style="font-size: 12px; color: rgba(47, 43, 61, 0.42)">
                {{ item.views }}
              </span>
            </div>
          </div>
        </VCardItem>

        <VCardText>
          {{ item.desc }}
        </VCardText>

        <VCardActions>
          <VBtn @click="aaa(index)">
            查看更多
          </VBtn>

          <VSpacer />

          <VBtn
            icon
            size="small"
            @click="isCardDetailsVisible = !isCardDetailsVisible"
          >
            <VIcon
              :icon="
                isCardDetailsVisible
                  ? 'tabler-chevron-up'
                  : 'tabler-chevron-down'
              "
            />
          </VBtn>
        </VCardActions>

        <VExpandTransition>
          <div v-show="index === index1">
            <VDivider />
            <VCardText>
              {{ item.desc }}
            </VCardText>
          </div>
        </VExpandTransition>
      </VCard>
      <VCard v-else>
        <VImg :src="item.img" style="border-radius: 6px;"/>

        <VCardItem>
          <VCardTitle class="cardTitle">{{ item.title }}</VCardTitle>
          <div class="tools">
            <div class="left">
              <span class="tag1">
                {{ item.tag }}
              </span>
              <span style="padding: 0 5px;font-size: 13px;line-height: 18px;color: #00000040;">|</span>
              <span class="time">{{ item.time }}</span>
            </div>

            <div class="right">
              <img
                src="https://www.uesg.org.cn/icon/0725/view_%E7%94%BB%E6%9D%BF%201.svg"
                style="width: 20px; height: 15px"
              />
              <span style="font-size: 12px; color: rgba(47, 43, 61, 0.42)">
                {{ item.views }}
              </span>
            </div>
          </div>
        </VCardItem>

        <VCardText>
          {{ item.desc }}
        </VCardText>

        <VCardActions v-if="item.type == 'news'">
          <VBtn @click="isCardDetailsVisible = !isCardDetailsVisible">
            查看更多
          </VBtn>

          <VSpacer />

          <VBtn
            icon
            size="small"
            @click="isCardDetailsVisible = !isCardDetailsVisible"
          >
            <VIcon
              :icon="
                isCardDetailsVisible
                  ? 'tabler-chevron-up'
                  : 'tabler-chevron-down'
              "
            />
          </VBtn>
        </VCardActions>
        <VCardText v-else>
          <VBtn size="small" > 查看报告 </VBtn>
        </VCardText>


        <VExpandTransition>
          <div v-show="isCardDetailsVisible">
            <VDivider />
            <VCardText>
              {{ item.desc }}
            </VCardText>
          </div>
        </VExpandTransition>
      </VCard>
    </VCol>
  </VRow>
</template>

<style>
.v-card,.v-card-item__content {
  overflow:unset !important;
}
.cardTitle {
  font-size: 20px !important ;
  color: #5c5a68 !important;
  font-weight: 500 !important;
  line-height: 28px !important;
  padding-top: 0 !important;
  padding-bottom: 4px !important;
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
  content: '';
  position: absolute;
  display: inline-block;
  margin-right: 10px;
  width: 3px;
  height: 14px;
  background-color: #30D158FF;
  vertical-align: middle;
  margin-bottom: 1px;
  left: -24px;
  top: 1px;
}
.tag1 {
  position: relative;
  color: #7367F0FF;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}
.tag1::before {
  content: '';
  position: absolute;
  display: inline-block;
  margin-right: 10px;
  width: 3px;
  height: 14px;
  background-color: #7367F0FF;
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
