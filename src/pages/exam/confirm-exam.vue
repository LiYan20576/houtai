<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter();
  const isLoading = ref(false);
  const isDialogVisible = ref(false);

  const checkCameraPermission = () => {
    return new Promise((resolve, reject) => {
      // 尝试获取用户媒体访问权限
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          // 用户允许访问摄像头
          stream.getTracks().forEach((track) => {
            track.stop(); // 停止访问摄像头的媒体流
          });
          resolve();
        })
        .catch((error) => {
          // 用户拒绝或浏览器不支持访问摄像头
          reject(error);
        });
    });
  }
  const gotoExam = () => {
    console.log(checkCameraPermission());
    isLoading.value = true;
    checkCameraPermission()
      .then(() => {
        isLoading.value = false;
        console.log("Camera permission granted");
        // 执行摄像头相关操作
        router.push("/exam/monthly-exam")
      })
      .catch((error) => {
        isLoading.value = false;
        console.error("Camera permission denied or not supported:", error);
        // 处理未授权或不支持的情况
        isDialogVisible.value = true;
      });
  }
</script>



<template>
  <div>
    <!-- 遮罩层 -->
    <div class="loading-overlay" v-if="isLoading">
      <VProgressCircular :size="60" color="primary" indeterminate />
    </div>
    <!-- 👉 Support -->
    <VCol>
      <VCard class="text-center">
        <VCardText class="d-flex flex-column justify-center align-center">
          <VAvatar
            color="error"
            variant="tonal"
            size="50"
            class="mb-4"
          >
            <VIcon
              size="2rem"
              icon="tabler-alert-circle"
            />
          </VAvatar>

          <h3 class="text-h3">
            考前须知
          </h3>
        </VCardText>

        <VCardText style="width: 70%; margin: auto;text-align: left;">
          <p class="item">
            1.考试前3天，配合监考教师完成软件测试，模拟进行身份核查、视频音频调试、试题发布、视频监控、考生答卷回收等工作。
          </p>
          <p class="item">
            2.按监考教师要求准备好草纸、答题纸、任课教师允许查阅的资料，保证手机的摄像头、麦克风及扬声器等可以正常使用，保持电量充足。
          </p>
          <p class="item">
            3.开考前20分钟登录指定视频监控软件，配合监考教师完成身份核查等工作。
          </p>
          <p class="item">
            4.按要求调整手机角度，以能够清楚看到考生面部、桌面情况为标准。
          </p>
        </VCardText>

        <VCardText class="justify-center">
          <VBtn color="error" variant="elevated" @click="gotoExam">
            我已知晓，确认考试
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>

    <VDialog v-model="isDialogVisible" width="500">
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="isDialogVisible2 = !isDialogVisible2" />

      <!-- Dialog Content -->
      <VCard title="提示">
        <VCardText> 请打开浏览器摄像头访问权限，否则无法参加考试 </VCardText>

        <VCardText class="d-flex justify-end">
          <VBtn @click="isDialogVisible = false"> 确定 </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
</style>

<route lang="yaml">
  meta:
    navActiveLink: exam-monthly-exam 
    check: true
</route>