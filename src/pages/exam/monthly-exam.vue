<template>
  <div class="exam-wrap">
    <h1 style="text-align: center; padding: 20px 0;">UESG证书考试</h1>
    <div class="exam">
      <div class="question-card">
        <div class="question-list">
          <ul>
            <li
              v-for="(question, index) in questions"
              :key="index"
              :class="{ active: index === currentQuestion }"
            >
              <button @click="changeQuestion(index)">{{ index + 1 }}</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="question-container">
        <div class="question">
          <h2>
            {{ currentQuestion + 1 }}. {{ questions[currentQuestion].title }}
          </h2>
          <ul>
            <li
              v-for="(option, optionIndex) in questions[currentQuestion]
                .options"
              :key="optionIndex"
            >
              <input
                type="radio"
                :id="'option-' + optionIndex"
                :value="optionIndex"
                v-model="selectedOption"
                :disabled="answered"
              />
              <label :for="'option-' + optionIndex">{{ option }}</label>
            </li>
          </ul>
        </div>
        <div class="navigation-buttons">
          <button @click="previousQuestion" :disabled="currentQuestion === 0">
            Previous
          </button>
          <button
            @click="nextQuestion"
            :disabled="currentQuestion === questions.length - 1"
          >
            Next
          </button>
        </div>
      </div>
      <div class="question-card">
        <div
          class="timer"
          style="
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <div class="countdown">{{ countdown }}</div>
          <p>诚信考试，杜绝作弊</p>
          <VBtn @click="submit"> 交卷 </VBtn>
        </div>
      </div>
      <div class="camera">
        <video ref="videoElement" autoplay width="80"></video>
        <canvas ref="canvasElement" width="80" height="60"></canvas>
        <button @click="captureImage">拍照</button>
        <!-- <button @click="uploadImage">Upload Image</button> -->
      </div>
    </div>
  </div>
  <VDialog v-model="isDialogVisible" width="500">
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="提示">
      <VCardText>
        诚信考试，杜绝作弊 剩余切屏次数：{{ total - now }}
      </VCardText>

      <VCardText class="d-flex justify-end">
        <VBtn @click="isDialogVisible = false"> 确定 </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
  <VDialog v-model="isDialogVisible2" width="500">
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible2 = !isDialogVisible2" />

    <!-- Dialog Content -->
    <VCard title="提示">
      <VCardText> 请允许打开摄像头，否则成绩不合格 </VCardText>

      <VCardText class="d-flex justify-end">
        <VBtn @click="isDialogVisible2 = false"> 确定 </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script>
export default {
  data() {
    return {
      currentQuestion: 0,
      selectedOption: null,
      answered: false,
      countdown: "30:00", // 初始倒计时时间
      timer: null,
      timeLimit: 30 * 60, // 倒计时时间限制（以秒为单位）
      questions: [
        {
          title: "Question 1",
          options: ["Option A", "Option B", "Option C", "Option D"],
        },
        {
          title: "Question 2",
          options: ["Option A", "Option B", "Option C", "Option D"],
        },
        {
          title: "Question 3",
          options: ["Option A", "Option B", "Option C", "Option D"],
        },
      ],
      answerCache: [], // 答案缓存数组

      stream: null,
      videoElement: null,
      canvasElement: null,

      cutScreenPopup: false,
      total: 3, //总共可以切屏
      now: 0, //现在切屏了几次
      num: "",
      isDialogVisible: false,
      isDialogVisible2: false,
    };
  },
  mounted() {
    // 开启摄像头
    this.startCamera();
    this.videoElement = this.$refs.videoElement;
    this.canvasElement = this.$refs.canvasElement;

    // "屏蔽"鼠标切屏
    const that = this;
    window.onblur = function () {
      that.cutScreen();
    };
    // 防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function () {
      history.pushState(null, null, document.URL);
    });

    this.startTimer();
    this.addEventListeners();
    if (this.answerCache.length > 0) {
      this.selectedOption = this.answerCache[this.currentQuestion];
    }
  },
  beforeDestroy() {
    this.cutScreen();
  },
  beforeUnmount() {
    this.removeEventListeners();
    this.stopCamera(); // 关闭摄像头
  },
  methods: {
    cutScreen() {
      this.isDialogVisible = true;
      if (this.now === this.total) {
        // this.$router.push({ path: "/Home" });
        window.location.href = "/";
        //处理剩余其他逻辑
      }
      //调用后台接口，传递当前页面数据，后台返回total，now，后台计算
      this.now++;
      this.cutScreenPopup = true;
    },

    submit() {
      window.location.href = "/";
    },
    stopCamera() {
      if (this.stream) {
        const tracks = this.stream.getTracks();
        tracks.forEach((track) => {
          track.stop(); // 停止摄像头轨道
        });
      }
    },
    startCamera() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.stream = stream;
          this.videoElement.srcObject = stream;
        })
        .catch((error) => {
          // window.location.href = "/";
          this.isDialogVisible2 = true;
          console.error("Failed to access camera: ", error);
        });
    },
    captureImage() {
      const videoWidth = 80;
      const videoHeight = 60;
      this.canvasElement.width = videoWidth;
      this.canvasElement.height = videoHeight;
      const context = this.canvasElement.getContext("2d");
      context.drawImage(this.videoElement, 0, 0, videoWidth, videoHeight);
    },
    uploadImage() {
      const imageDataURL = this.canvasElement.toDataURL(); // 获取图像数据URL
      console.log(imageDataURL);

      // 使用适当的方式将图像数据发送到服务器
      // 例如使用AJAX
      // axios.post('/upload', { image: imageDataURL })
      //   .then(response => {
      //     console.log('Image uploaded successfully');
      //   })
      //   .catch(error => {
      //     console.error('Failed to upload image: ', error);
      //   });
    },
    changeQuestion(index) {
      // 存储当前题目的答案到缓存
      this.answerCache[this.currentQuestion] = this.selectedOption;

      this.currentQuestion = index;
      this.answered = false;
      this.selectedOption = this.answerCache[this.currentQuestion];
    },
    previousQuestion() {
      if (this.currentQuestion > 0) {
        // 存储当前题目的答案到缓存
        this.answerCache[this.currentQuestion] = this.selectedOption;

        this.currentQuestion--;
        this.answered = false;
        this.selectedOption = this.answerCache[this.currentQuestion];
      }
    },
    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        // 存储当前题目的答案到缓存
        this.answerCache[this.currentQuestion] = this.selectedOption;

        this.currentQuestion++;
        this.answered = false;
        this.selectedOption = this.answerCache[this.currentQuestion];
      }
    },
    startTimer(initialSeconds = this.timeLimit) {
      let remainingSeconds = initialSeconds;
      this.timer = setInterval(() => {
        remainingSeconds--;
        if (remainingSeconds < 0) {
          this.stopTimer();
          alert("Time's up!");
          localStorage.removeItem("countdownTime"); // 清除存储的剩余时间
        } else {
          const minutes = Math.floor(remainingSeconds / 60);
          const seconds = remainingSeconds % 60;
          this.countdown = `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    handleCopy(event) {
      event.preventDefault();
    },
    handleRightClick(event) {
      event.preventDefault();
    },
    handleKeyDown(event) {
      if (event.key.startsWith("F")) {
        event.preventDefault();
      }
    },
    addEventListeners() {
      document.addEventListener("copy", this.handleCopy);
      document.addEventListener("contextmenu", this.handleRightClick);
      document.addEventListener("keydown", this.handleKeyDown);
      window.addEventListener("beforeunload", this.handleBeforeUnload);
    },
    removeEventListeners() {
      document.removeEventListener("copy", this.handleCopy);
      document.removeEventListener("contextmenu", this.handleRightClick);
      document.removeEventListener("keydown", this.handleKeyDown);
      window.removeEventListener("beforeunload", this.handleBeforeUnload);
    },
    handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = "";
    },
  },
};
</script>

<style>
.camera {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.exam-wrap {
  width: 80%;
  height: 100vh;
  margin: 50px auto;
}

.exam {
  display: flex;
  justify-content: space-between;
}

.question-card {
  flex: 0 0 200px;
  background-color: #f5f5f5;
  padding: 10px;
}

.question-list {
  margin-bottom: 20px;
}

.question-list ul {
  list-style: none;
  padding: 0;
}

.question-list li {
  margin-bottom: 5px;
}

.question-list button {
  width: 100%;
  padding: 5px 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  text-align: center;
}

.question-list button.active {
  background-color: #ccc;
}

.timer {
  text-align: center;
}

.countdown {
  font-size: 24px;
}

.question-container {
  flex: 1;
  padding: 10px;
}

.question {
  margin-bottom: 20px;
}

.question h2 {
  margin: 0 0 10px;
}

.question ul {
  list-style: none;
  padding: 0;
}

.question li {
  margin-bottom: 10px;
}

.navigation-buttons {
  text-align: center;
}

.navigation-buttons button {
  margin: 0 5px;
}
</style>

<route lang="yaml">
meta:
  layout: blank
  navActiveLink: exam-monthly-exam 
  check: true
</route>