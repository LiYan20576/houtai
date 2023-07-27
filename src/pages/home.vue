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
    img: "https://www.uesg.org.cn/img/0727/%E5%B9%BF%E5%91%8A01.jpeg",
    title: 'ESG的含义为"环境"、"社会"和"治理"。',
    tag: "科普",
    time: "2023年7月23日",
  },
  {
    type: "type1",
    img: "https://www.uesg.org.cn/img/0725/3.jpeg",
    title: "中国市场需要有自身特色的ESG。",
    tag: "科普",
    time: "2023年7月20日",
  },
  {
    type: "type1",
    img: "https://www.uesg.org.cn/img/0725/4.jpeg",
    title: "ESG就业一片蓝海，未来三年将涌现出数百万ESG岗位。",
    tag: "数据",
    time: "2023年7月20日",
  },
  {
    type: "type2",
    card1: {
      img: "https://www.uesg.org.cn/img/0726/type2-1.jpg",
      title: "特斯拉可与清洁能源世界。",
      tag: "ESG企业",
      time: "2023年7月20日",
    },
    card2: {
      img: "https://www.uesg.org.cn/img/0726/type2-2%20.png",
      title: "负责人的科技，可持续的未来。",
      tag: "ESG企业",
      time: "2023年7月20日",
    },
  },
  {
    type: "type2",
    card1: {
      img: "https://www.uesg.org.cn/img/0726/type2-1.jpg",
      title: "特斯拉可与清洁能源世界。",
      tag: "ESG企业",
      time: "2023年7月20日",
    },
    card2: {
      img: "https://www.uesg.org.cn/img/0726/type2-2%20.png",
      title: "负责人的科技，可持续的未来。",
      tag: "ESG企业",
      time: "2023年7月20日",
    },
  },
  {
    type: "type2",
    card1: {
      img: "https://www.uesg.org.cn/img/0726/type2-1.jpg",
      title: "特斯拉可与清洁能源世界。",
      tag: "ESG企业",
      time: "2023年7月20日",
    },
    card2: {
      img: "https://www.uesg.org.cn/img/0726/type2-2%20.png",
      title: "负责人的科技，可持续的未来。",
      tag: "ESG企业",
      time: "2023年7月20日",
    },
  },
  {
    type: "type1",
    img: "https://www.uesg.org.cn/img/0725/5.jpeg",
    title: "全球气候危机当前，每个国家、每个企业乃至每个人都责无旁贷。",
    tag: "科普",
    time: "2023年7月23日",
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
            margin-bottom: 26px;
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
            Newsroom
          </div>
          <div style="font-size: 15px; color: #1d1d1f; line-height: 21px">
            UESG Newsroom 需要您关注UESG官方公众号了解更多最新资讯。
            <span
              style="
                font-family: 'DINMedium';
                color: #0066cc;
                line-height: 21px;
                font-size: 15px;
              "
              >立刻关注 ></span
            >
          </div>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <!-- 👉 banner -->
      <VCol cols="12" md="8">
        <VCard>
          <img
            src="https://www.uesg.org.cn/img/0727/%E5%B9%BF%E5%91%8A01.jpeg"
            style="width: 100%; height: 305px;border-radius: 6px; display: block"
          />
          <div style="">
            在全球范围传播 ESG 理念
            <br>
            培养与认证 ESG 人才
          </div>
        </VCard>
      </VCol>
      <template v-for="(item,index) in news" :key="index">
        <!-- 👉 type1 -->
        <VCol v-if="item.type == 'type1'" cols="12" md="4" sm="6">
          <VCard style="height: 305px;">
            <div class="card">
              <img
                :src="item.img"
                class="card-img "
              />
              <div class="card-desc">
                <div class="box-top">
                  <div class="card-tag">{{ item.tag }}</div>
                  <div class="card-title">
                    {{ item.title }}
                  </div>
                </div>
                <div class="card-time">
                  {{ item.time }}
                </div>
              </div>
            </div>
          </VCard>
        </VCol>
        <!-- 👉 type2 -->
        <VCol v-else cols="12" md="4" sm="6">
          <div class="card-wrap">
            <VCard>
              <div class="card-type2" style="border-radius: 6px;">
                <img :src="item.card1.img" class="card-type2-img"/>
                <div class="card-type2-right">
                  <div>
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
            </VCard>
            <VCard>
              <div class="card-type2" style="border-radius: 6px;">
                <img :src="item.card2.img" class="card-type2-img"/>
                <div class="card-type2-right">
                  <div>
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
            </VCard>
          </div>
        </VCol>
      </template>
      
    </VRow>
  </div>
</template>

<style>
@font-face {
  font-family: "DINRegular";
  src: url("https://www.uesg.org.cn/font/0725/D-DIN-PRO-400-Regular.ttf")
    format("truetype");
}
@font-face {
  font-family: "DINMedium";
  src: url("https://www.uesg.org.cn/font/0725/D-DIN-PRO-500-Medium.ttf")
    format("truetype");
}
</style>

<style>
/* type1 */
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.card-img {
  height: 50%;
  width: 100%;
  border-radius: 6px;
}
.card-desc {
  padding: 16px;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-tag {
  color: #6236ffff;
  font-size: 13px;
  line-height: 18px;
  font-family: 'DINMedium';
  margin-bottom: 8px;
}
.card-title {
  font-family: 'DINMedium';
  color: rgba(0, 0, 0, 0.85);
  font-size: 17px;
  line-height: 24px;
  /* margin-bottom: 25px; */
}
.card-time {
  font-size: 13px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.5);
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
  padding: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card-type2-img {
  width: 160px;
  height: 160px;
  /* border: 1px dashed #333; */
  margin-right: 25px;
}
.card-type2-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-type2-tag {
  font-size: 15px;
  color: #5bb439;
  line-height: 21px;
  font-family: 'DINMedium';
  margin-bottom: 15px;
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
