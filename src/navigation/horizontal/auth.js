export default [
    { heading: 'UESG认证' },
    {
        title: '认证介绍',
        icon: { icon: 'ic:round-home',url: 'https://www.uesg.org.cn/icon/0726/证书介绍2.svg' },
        hoverIcon: { url: 'https://www.uesg.org.cn/icon/0726/证书介绍1.svg' },
        to: 'auth' ,
        // children: [
        //     { title: '基础分析师', to: 'course-optional-courses',icon: { url: 'https://www.uesg.org.cn/icon/9_画板 1.svg' },hoverIcon: { url: 'https://www.uesg.org.cn/icon/9_画板 1.svg' }, },
        //     { title: '高级分析师', to: 'course-selected-courses',icon: { url: 'https://www.uesg.org.cn/icon/9_画板 1.svg' },hoverIcon: { url: 'https://www.uesg.org.cn/icon/9_画板 1.svg' }, },
        // ],
    },
    {
        title: '学习课件',
        icon: { icon: 'ic:round-home',url: 'https://www.uesg.org.cn/icon/0726/学习2.svg' },
        to: 'pages-help-center' ,
        hoverIcon: { url: 'https://www.uesg.org.cn/icon/0726/学习1.svg' }
    },
    {
        title: '考试时间',
        icon: { icon: 'ic:round-home',url: 'https://www.uesg.org.cn/icon/0726/日历2.svg' },
        to: 'apps-calendar' ,
        hoverIcon: { url: 'https://www.uesg.org.cn/icon/0726/日历1.svg' }
    },
    {
        title: '我的证书',
        icon: { icon: 'ic:round-home',url: 'https://www.uesg.org.cn/icon/0726/证书2.svg' },
        to: 'my-auth' ,
        hoverIcon: { url: 'https://www.uesg.org.cn/icon/0726/证书1.svg' }
    },
  ]