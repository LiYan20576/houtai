<script setup>
import { useRouter } from "vue-router";
import { getIndexData, getWxCode } from "@/api/index";
import { useAppAbility } from "@/plugins/casl/useAppAbility";
// import { onBeforeRouteLeave } from 'vue'
const router = useRouter();

const contactUs = [
  {
    bookName: "UESG Fundamental Analyst<br>Curriculum 2023",
    bookType: "通用 ESG 标准基础分析师｜课程 2023 版",
    img: "https://www.uesg.org.cn/icon/0727/%E4%B8%8B%E5%8D%95-%E4%B9%A6%E6%9C%AC_%E7%94%BB%E6%9D%BF%201.svg",
    content: [
      {
        dantuan: "第一单元：ESG定义和概念 (学习时长 3 小时)",
        title: [
          {
            bigtitle: "1. 引言",
            monty:true,
          },
          {
            bigtitle: "2. 以个人角度诠释ESG意涵",
            monty:false,

          },
          {
            monty:false,
            bigtitle: "3. 以企业角度诠释ESG意涵",
            smalltitle: [
              "3.1 SE (Social enterprise)",
              "3.2 Social Engagement 与 Social enterprise区别",
              "3.3 从社会企业(SE)到企业社会责任(CSR)的转变",
              "3.4 Corporate Social Responsibility，CSR",
              "3.5 从CSR演化为ESG",
              "3.6 为什么CSR发展成为ESG的⾯向",
              "3.7共益企业/B型企业的崛起",
              "3.8关键的SDGs重头戏",
            ],
          },
          {
            monty:false,
            bigtitle: "4. 以国家角度诠释ESG的意涵",
          },
          {
            monty:false,
            bigtitle: "5. 总结",
          },
        ],
      },
      
    ],
  },
];

const gotobook = (item)=>{
  console.log(item);
  if(item.monty) {
    router.push({
      name: 'bookDetail',
      params: {
        id: "item"
      }
    })
  }
  
}
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
    <div
      style="
        background-color: #ffffff;
        margin-top: 32px;
        border-radius: 12px;
        padding: 62px 64px 32px;
      "
    >
      <div >
        <div
          style="font-size: 31px; line-height: 42px; color: #000000d9"
          v-html="contactUs[0].bookName"
        ></div>
        <div
          style="
            margin-top: 32px;
            color: #000000ff;
            font-size: 17px;
            line-height: 24px;
            display: flex;
          "
        >
          <img
            :src=contactUs[0].img
            alt=""
            style="width: 24px; height: 24px; margin-right: 10px"
          />
          <div>{{contactUs[0].bookType}}</div>
        </div>
        <div style="height: 1px;background-color: #00000080;margin: 32px 0;width: 100%;"></div>
        <div v-for="(item,index) in contactUs[0].content" :key="index" style="padding-bottom: 32px;">
            <div style="font-size: 17px;line-height: 24px;color: #000000D9;">
              {{item.dantuan}}
            </div>
            <div v-for="(item2,index2) in item.title" :key=index2 style="font-size: 17px;line-height: 24px;" :class="item2.monty? 'bule': 'grey'" @click="gotobook(item2)">
                <div>
                  {{item2.bigtitle}}
                  <div v-for="(item3,index3) in item2.smalltitle" :key="index3" style="text-indent: 20px;">
                    {{item3}}
                  </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.bule{
  color: #0066CCFF;
  cursor: pointer;
}
.grey{
  color: #00000040;
}
</style>

