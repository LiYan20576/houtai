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
  if (i === index1.value) {
    index1.value = "";
  } else {
    index1.value = i;
    console.log(index1.value, "xxxxxxxxx");
  }
};

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
    type: "type1",
    img: "https://www.uesg.org.cn/img/0727/广告2.jpg",
    title: 'ESG的含义为“环境”、“社会”和“治理”。',
    tag: "科普",
    time: "2023 年 07 月 23 日",
  },
  {
    type: "type1",
    img: "https://www.uesg.org.cn/img/0727/广告4.jpg",
    title: "中国特色的ESG。",
    tag: "科普",
    time: "2023 年 07 月 20 日",
  },
  {
    type: "type2",
    card1: {
      img: "https://www.uesg.org.cn/img/0727/广告05.jpeg",
      title: "特斯拉可与清洁能源世界。",
      tag: "企业",
      time: "12 小时",
    },
    card2: {
      img: "https://www.uesg.org.cn/img/0727/广告06.jpeg",
      title: "负责人的科技，可持续的未来。",
      tag: "企业",
      time: "9 小时",
    },
  },
  {
    type: "type2",
    card1: {
      img: "https://www.uesg.org.cn/img/0727/广告7.jpg",
      title: "每一步，都有ESG创新。",
      tag: "企业",
      time: "12 小时",
    },
    card2: {
      img: "https://www.uesg.org.cn/img/0727/广告6.jpg",
      title: "ESG是双碳的基石。",
      tag: "企业",
      time: "12 小时",
    },
  },
  {
    type: "type1",
    img: "https://www.uesg.org.cn/img/0727/广告3.jpg",
    title: "中国特色的ESG。",
    tag: "数据",
    time: "12 小时",
  },
  {
    type: "type1",
    img: "https://www.uesg.org.cn/img/0727/广告5.jpg",
    title: "全球气候危机。",
    tag: "科普",
    time: "2023 年 07 月 23 日",
  },
]);

const gotoLogin = () => {
  window.location.href = '/loginv1'
}

const gotoDetail = () => {
  router.push('/newsDetail')
}

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
  <div style="padding-bottom: 64px;">
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
          <div style="font-family: DINMedium;font-size: 13px; color: #1D1D1FFF; line-height: 18px">
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

    <div style="font-size: 30px;line-height: 42px;color: #1D1D1FFF;font-family: DINMedium;margin-bottom: 32px;">
      最新消息
    </div>

    <VRow>
      <!-- 👉 banner -->
      <VCol cols="12">
        <div style="position: relative;" @click="gotoDetail">
          <img
            src="https://www.uesg.org.cn/img/0727/广告1.jpeg"
            style="width: 100%;display: block;border-radius: 12px;"
          />
          <div style="position: absolute;left: 32px;bottom: 32px;">
            <div style="font-size: 11px;line-height: 16px;color: #FFFFFFFF;font-family: DINMedium;margin-bottom: 8px;">
              愿景
            </div>
            <div style="font-family: DINSemiBold;color: #FFFFFFFF;font-size: 31px;line-height: 44px;font-weight: bold;">
              在全球范围传播 ESG 理念
              <br>
              培养与认证 ESG 人才
            </div>
            <div style="font-size: 13px;line-height: 18px;color: #FFFFFFFF;font-family: DINMedium;margin-top: 8px;">
              2023 年 07 月 23 日
            </div>
          </div>
        </div>
      </VCol>
      <template v-for="(item,index) in news" :key="index">
        <!-- 👉 type1 -->
        <VCol v-if="item.type == 'type1'" cols="12" md="4" sm="6">
          <!-- height: 305px; -->
          <div style="background-color: #FFFFFFFF;border-radius: 12px;">
            <div class="card">
              <img
                :src="item.img"
                class="card-img "
              />
              <div class="card-desc">
                <div class="box-top" style="margin-bottom: 10px;">
                  <div class="card-tag">{{ item.tag }}</div>
                  <div class="card-title" style="min-height: 52px;">
                    {{ item.title }}
                  </div>
                </div>
                <div class="card-time">
                  {{ item.time }}
                </div>
              </div>
            </div>
          </div>
        </VCol>
        <!-- 👉 type2 -->
        <VCol v-else cols="12" md="4" sm="6">
          <div class="card-wrap">
            <div style="border-radius: 12px;">
              <div class="card-type2" style="border-radius: 6px;">
                <img :src="item.card1.img" class="card-type2-img"/>
                <div class="card-type2-right">
                  <div style="margin-bottom: 12px;">
                    <div class="card-type2-tag">
                      {{ item.card1.tag }}
                    </div>
                    <div class="card-title">
                      {{ item.card1.title }}
                    </div>
                  </div>

                  <div class="card-time">
                    {{ item.card1.time }}
                  </div>
                </div>
              </div>
            </div>
            <div style="border-radius: 12px;">
              <div class="card-type2" style="border-radius: 6px;">
                <img :src="item.card2.img" class="card-type2-img"/>
                <div class="card-type2-right">
                  <div style="margin-bottom: 12px;">
                    <div class="card-type2-tag">
                      {{ item.card2.tag }}
                    </div>
                    <div class="card-title">
                      {{ item.card2.title }}
                    </div>
                  </div>

                  <div class="card-time">
                    {{ item.card2.time }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VCol>
      </template>
      
    </VRow>
  </div>
</template>

<style>
/* type1 */
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-radius: 12px;
}
.card-img {
  height: 50%;
  width: 100%;
  border-radius:12px 12px 0 0 ;
}
.card-desc {
  padding: 16px;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-tag {
  color: #00000080;
  font-size: 11px;
  line-height: 16px;
  font-family: DINMedium;
  margin-bottom: 8px;
}
.card-title {
  font-family: DINMedium;
  color: rgba(0, 0, 0, 0.85);
  font-size: 19px;
  line-height: 26px;
  /* margin-bottom: 25px; */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-time {
  font-family: DINMedium;
  font-size: 13px;
  line-height: 18px;
  color: #00000080;
}

/* type2 */
.card-wrap {
  background-color: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.card-type2 {
  background-color: #fff;
  width: 100%;
  /* margin-bottom: 24px; */
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card-type2-img {
  width: 90px;
  height: 90px;
  /* border: 1px dashed #333; */
  margin-right: 16px;
}
.card-type2-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-type2-tag {
  font-size: 11px;
  color: #00000080;
  line-height: 18px;
  font-family: DINMedium;
  margin-bottom: 8px;
}



.v-card,
.v-card-item__content {
  overflow: unset !important;
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
