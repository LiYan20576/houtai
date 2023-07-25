// resizeRedirect.js
import { onUnmounted } from 'vue';

const resizeRedirect = {
  install: (app, options) => {
    // 设置默认的移动端页面 URL
    const mobileURL = options.mobileURL || '/mobile'; // 在这里替换成你想要跳转的 URL

    // 监听窗口尺寸变化事件
    const handleResize = () => {
      const isMobile = window.innerWidth <= options.mobileBreakpoint;
      if (isMobile && window.location.pathname !== mobileURL) {
        window.location.href = mobileURL;
      }
    };

    // 初始化时检查一次
    handleResize();

    // 监听窗口尺寸变化事件
    window.addEventListener('resize', handleResize);

    // 在应用销毁时移除事件监听
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });
  },
};

export default resizeRedirect;
