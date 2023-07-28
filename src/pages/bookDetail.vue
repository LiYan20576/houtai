<script setup>
import { useRouter ,useRoute} from "vue-router";
import { getIndexData, getWxCode } from "@/api/index";
import { useAppAbility } from "@/plugins/casl/useAppAbility";
// import { onBeforeRouteLeave } from 'vue'
const router = useRouter();
const route = useRoute();


const contactUs =[
    {
        content: "<p>ESG （Environmental, Social, and Governance）意指环境、社会和公司治理三个面向，是对企业和投资者产生影响的关键因素。</p><p>在学习ESG之前，确立自己的目的和角度非常重要。ESG是一个多维度的概念，其理解可以涉及个人、企业和整体社会的不同层面。然而，正是因为其多样性和复杂性，导致了人们在理解和应用ESG时的困惑和误解。</p><p>ESG议题在当今社会中被广泛讨论，但很多人对它的理解并不准确。有时甚至存在对ESG的排斥和误解，这可能是因为我们一开始就没有正确地理解ESG的核心概念。在信息混乱的环境中，即使我们站在正确的立场上，也会感到无力和困惑，似乎无法抓住关键的要点。当国际上对ESG议题展开热烈的讨论时，我们可能会逐渐意识到，事实上，很少有人完全正确地理解ESG，而这主要是因为我们最初的切入角度存在偏差。</p><p>ESG议题涵盖广泛且复杂，理解它并非易事，且可能导致对ESG的误解和片面观点。因此，我们需要准确定位ESG，关注企业的环境、社会和治理绩效，并鼓励企业在这些方面采取积极行动。</p><p>随着我们逐渐认识到对ESG理解的困难和争议，我们应以开放的态度接受不同观点，努力获取全面客观的信息。通过学习和了解，我们能逐步消除对ESG的误解，形成更准确全面的理解，并在实际行动中推动ESG议题的发展。</p><p>总的来说，对ESG议题的广泛讨论和争议，源于对其核心概念的理解存在困难。我们应以开放的态度审视ESG的关注点，并通过准确理解ESG来评估企业的可持续发展，推动社会和经济的进步。</p>"
       
    }
]
onMounted(() => {
  // 在页面加载时执行的方法

  console.log(route.params.id,'xxxxxxxxxxxx');
});
const gotobook = (item)=>{

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
          
        >引言</div>
        
        <div style="height: 1px;background-color: #00000080;margin: 32px 0;width: 100%;"></div>
        <div style="padding-bottom: 32px;">
            <div style="font-size: 17px;line-height: 24px;color:#000000D9;text-indent: 20px;" v-html="contactUs[0].content">
             
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

