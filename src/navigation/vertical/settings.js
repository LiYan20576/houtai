export default [
    { heading: '设置' },
    // {
    //     title: '站内信',
    //     icon: { icon: 'ic:round-home',url: 'https://lovemedicine.cn/public/uesg/7.23/study/6.svg' },
    //     to: 'exam-monthly-exam' ,
    //     hoverIcon: { url: 'https://www.uesg.org.cn/icon/6-%E7%B4%AB%E8%89%B2.svg' }
    // },
    {
        title: '常见问题',
        icon: { icon: 'ic:round-home',url: 'https://www.uesg.org.cn/icon/6_画板 1.svg' },
        to: 'pages-faq' ,
        hoverIcon: { url: 'https://www.uesg.org.cn/icon/6_画板 1.svg' }
    },
    {
        title: '个人中心',
        icon: { icon: 'ic:round-home',url: 'https://www.uesg.org.cn/icon/7_画板 1.svg' },
        // to: 'loginv1' ,
        to: { name: 'pages-user-profile-tab', params: { tab: 'profile' } },
        hoverIcon: { url: 'https://www.uesg.org.cn/icon/7_画板 1.svg' }
    },
    
  ]