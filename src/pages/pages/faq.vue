<script setup>
import axios from '@axios'
import sittingGirlWithLaptop from '@images/illustrations/sitting-girl-with-laptop.png'

const faqSearchQuery = ref('')
const faqs = ref([])

const fetchFaqs = () => {
  return axios.get('/pages/faqs', { params: { q: faqSearchQuery.value } }).then(response => {
    faqs.value = response.data
  }).catch(error => {
    console.error(error)
  })
}

const activeTab = ref('考证前')
const activeQuestion = ref(0)

watch(activeTab, () => activeQuestion.value = 0)
watch(faqSearchQuery, fetchFaqs, { immediate: true })

const contactUs = [
  {
    icon: 'tabler-phone',
    via: '+ (86) xxxx xxxx',
    tagLine: '我们总是乐于助人！',
  },
  {
    icon: 'tabler-mail',
    via: 'xxx@xxx.com',
    tagLine: '更快得到答案的最佳方式！',
  },
]



</script>

<template>
  
  <section class="faq">
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
          <div
            style="
              font-family: 'DINMedium';
              font-size: 13px;
              line-height: 18px;
              color: #1d1d1f;
              position: absolute;
              left: 50px;
            "
          >
            常见问题
          </div>
          <div style="font-size: 13px; color: #1D1D1FFF; line-height: 18px">
            若“常见问题”处理指南未能帮您解决问题，请联系微信公众号在线客服处理。
          </div>
        </div>
      </div>
    </div>

    <!-- 👉 Search -->
    <AppSearchHeader
      v-model="faqSearchQuery"
      title="你好，请输入关键字检索帮助。"
      subtitle="或者选择一个类别以快速找到您需要的帮助"
      custom-class="mb-7"
    />

    <!-- 👉 Faq sections and questions -->
    <VRow>
      <VCol
        v-show="faqs.length"
        cols="12"
        sm="4"
        lg="3"
        class="position-relative"
      >
        <!-- 👉 Tabs -->
        <VTabs
          v-model="activeTab"
          direction="vertical"
          class="v-tabs-pill"
          grow
        >
          <VTab
            v-for="faq in faqs"
            :key="faq.faqTitle"
            :value="faq.faqTitle"
            class="text-high-emphasis"
          >
            <!-- <VIcon
              :icon="faq.faqIcon"
              :size="20"
              start
            /> -->
            {{ faq.faqTitle }}
          </VTab>
        </VTabs>
        
      </VCol>

      <VCol
        cols="12"
        sm="8"
        lg="9"
      >
        <!-- 👉 Windows -->
        <VWindow
          v-model="activeTab"
          class="faq-v-window disable-tab-transition"
        >
          <VWindowItem
            v-for="faq in faqs"
            :key="faq.faqTitle"
            :value="faq.faqTitle"
          >
            <div class="d-flex align-center mb-6">
              <!-- <VAvatar
                rounded
                color="primary"
                variant="tonal"
                class="me-3"
                size="large"
              >
                <VIcon
                  :size="32"
                  :icon="faq.faqIcon"
                />
              </VAvatar> -->

              <div>
                <h6 class="text-h6">
                  {{ faq.faqTitle }}
                </h6>
                <span class="text-sm">{{ faq.faqSubtitle }}</span>
              </div>
            </div>

            <VExpansionPanels
              v-model="activeQuestion"
              multiple
            >
              <VExpansionPanel
                v-for="item in faq.faqs"
                :key="item.question"
              >
                <VExpansionPanelTitle>{{ item.question }}</VExpansionPanelTitle>
                <VExpansionPanelText>
                  <div v-html="item.answer"> </div>
                </VExpansionPanelText>
              </VExpansionPanel>
              <!-- <VExpansionPanel
                v-for="item in faq.faqs"
                :key="item.question"
                :title="item.question"
                :text="item.answer"
              /> -->
            </VExpansionPanels>
          </VWindowItem>
        </VWindow>
      </VCol>

      <VCol
        v-show="!faqs.length"
        cols="12"
        :class="!faqs.length ? 'd-flex justify-center align-center' : ''"
      >
        <VIcon
          icon="tabler-help"
          start
          size="20"
        />
        <span class="text-base font-weight-medium">
          No Results Found!!
        </span>
      </VCol>
    </VRow>

    
  </section>
</template>

<style lang="scss">
.faq-v-window {
  .v-window__container {
    z-index: 0;
  }
}
.faq .v-expansion-panel__shadow {
 box-shadow: none !important;
}
</style>
