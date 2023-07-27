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
  <section>
    <!-- 👉 Search -->
    <AppSearchHeader
      v-model="faqSearchQuery"
      title="你好，我们能帮忙吗？"
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
            <VIcon
              :icon="faq.faqIcon"
              :size="20"
              start
            />
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
              <VAvatar
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
              </VAvatar>

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

    <!-- 👉 You still have a question? -->
    <div class="text-center pt-15">
      <VChip
        label
        color="primary"
        size="small"
        class="mb-2"
      >
        问题？
      </VChip>

      <h5 class="text-h5 mb-2">
        你还有问题吗？
      </h5>
      <p>
        如果您在我们的常见问题解答中找不到问题，您可以联系我们。我们很快就会回答您！
      </p>

      <!-- contacts -->
      <VRow class="mt-4">
        <VCol
          v-for="contact in contactUs"
          :key="contact.icon"
          sm="6"
          cols="12"
        >
          <VCard
            flat
            class="bg-var-theme-background"
          >
            <VCardText>
              <VAvatar
                rounded
                color="primary"
                variant="tonal"
                class="me-3"
              >
                <VIcon :icon="contact.icon" />
              </VAvatar>
            </VCardText>
            <VCardText>
              <h6 class="text-h6 mb-2">
                {{ contact.via }}
              </h6>
              <span>{{ contact.tagLine }}</span>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </div>
  </section>
</template>

<style lang="scss">
.faq-v-window {
  .v-window__container {
    z-index: 0;
  }
}
</style>
