import mock from '@/@fake-db/mock'

const database = [
  {
    faqTitle: '考证前',
    // faqIcon: 'tabler-credit-card',
    faqSubtitle: '获得考证前帮助',
    faqs: [
      {
        question: 'UESG是什么单位？',
        answer: 'UESG是考证机构。',
      },
      {
        question: 'UESG是否提供课程培训？',
        answer: '不做培训，我们有很多合作的培训机构，可以帮您就近推荐。',
      },
      {
        question: '什么是UESG的ESG考试?',
        answer: '我们有完整的ESG职业生涯规划证书，详情请见<a href="https://lovemedicine.cn/public/uesg/pdfh5-master/pdf.html?file=https://lovemedicine.cn/public/uesg/pdf/UESG%E8%AE%A4%E8%AF%81%E4%BD%93%E7%B3%BB.pdf">官网</>。',
      },
      {
        question: '考生能报考多个级别吗?',
        answer: '需具备国际通用 ESG 基础分析师认证资格后，便可考取其他级别证书',
      },
      {
        question: '报名名额是否有限制?',
        answer: '限额报名，先到先得。考位容量有限，根据各考点的容量报名，报满为止。',
      },
      {
        question: '考试费用是多少?支付方式是什么?',
        answer: '证书级别不一对应考证费用不同，针对在校学生有七折教育优惠。',
      },
      {
        question: '如何报名参加考试?',
        answer: '需提供个人实名信息，详情请咨询UESG官方客服人员。',
      },
      {
        question: 'UESG的ESG考试每年举办几次?',
        answer: '每月一次，详情请咨询UESG的官方客服',
      },
      {
        question: '需要具备什么样的条件才能报名考试？',
        answer: '报名没有年龄、行业、地区、国籍等限制，UESG提供完整的ESG认证体系，并且适合不同人群的各个阶段。',
      },
      
    ],
  },
  {
    faqTitle: '关于考证',
    // faqIcon: 'tabler-shopping-cart',
    faqSubtitle: '获得关于考证帮助',
    faqs: [
      {
        question: '考试方式可以只选择线上吗？',
        answer: 'UESG的证书可以选择线上，TUV证书必须线下。',
      },
      {
        question: '各个级别的证书有没有期限？',
        answer: 'UESG的各个级别国际通用 ESG资格证书终身有效。',
      },
    ],
  },
  {
    faqTitle: '考证后',
    // faqIcon: 'tabler-refresh',
    faqSubtitle: '获得考证后帮助',
    faqs: [
      {
        question: '考试通过后颁发什么证书？',
        answer: '根据考生所选证书性质，颁发相应的UESG或TUV的国际证照。',
      },
      {
        question: '如未通过考试，何时可复考？',
        answer: '五天后可以再次预约。',
      },
      {
        question: '考试通过后，多长时间拿到证书',
        answer: 'UESG证书为电子版，一个工作日左右颁发；TUV证书为纸质版，由TUV总部颁发，一个月左右时间由TUV总部发至UESG，可自取或快递。',
      }
    ],
  },
]

mock.onGet('/pages/faqs').reply(config => {
  const { q = '' } = config.params ?? {}
  const queryLowered = q.toLowerCase()
  const filteredData = []

  Object.entries(database).forEach(([_, faqObj]) => {
    const filteredQAndA = faqObj.faqs.filter(obj => {
      return obj.question.toLowerCase().includes(queryLowered)
    })

    if (filteredQAndA.length)
      filteredData.push({ ...faqObj, faqs: filteredQAndA })
  })
  
  return [200, filteredData]
})
