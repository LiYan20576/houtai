<script setup>
import { ref } from "vue"
import { changePassword } from '@/api/index'

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const passwordRequirements = [
  '至少有一个小写字符',
  '至少有一个大写字符',
  '至少有一个数字',
  '至少有一个特殊符号或空白字符',
  '最少8个字符长-越多越好',
]
const require1 = new RegExp("^(?=.*[a-z]).*$");
const require2 = new RegExp("^(?=.*[A-Z]).*$");
const require3 = new RegExp("^(?=.*[0-9]).*$");
const require4 = new RegExp("^(?=.*[!@#$%&*()]).*$");
const length = new RegExp("(?=.{8,}).*");
const validPassword = ref("false")

const isOneTimePasswordDialogVisible = ref(false)

const isRequirementMet = (requirement) => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  validPassword.value = regExp.test(newPassword.value)


  if (requirement === '至少有一个小写字符') {
    return require1.test(newPassword.value);
  } else if (requirement === '至少有一个大写字符') {
    return require2.test(newPassword.value);
  } else if (requirement === '至少有一个数字') {
    return require3.test(newPassword.value);
  } else if (requirement === '至少有一个特殊符号或空白字符') {
    return require4.test(newPassword.value);
  } else if (requirement === '最少8个字符长-越多越好') {
    return length.test(newPassword.value);
  }
  return false;
};


// const confirm = () => {
//   if(newPassword == confirmPassword) {
//     validPassword.value = true
//   } else {
//     validPassword.value = false
//   }
// }

const change = async () => {
  const { data:res } = await changePassword(currentPassword.value,newPassword.value,confirmPassword.value);
  console.log(res);
}

</script>

<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="修改密码">
        <VForm>
          <VCardText class="pt-0">
            <!-- 👉 Current Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 current password -->
                <AppTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  label="当前密码"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                />
              </VCol>
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 new password -->
                <AppTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  label="新密码"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 confirm password -->
                <AppTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  label="确认新密码"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                  @input="confirm"
                />

                <div v-if="newPassword != confirmPassword" style="margin-top: 5px; color: rgb(234, 84, 85);">
                    两次密码不同
                </div>
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <!-- <VCardText>
            <h6 class="text-base font-weight-medium mb-3">
              密码要求:
            </h6>

            <VList class="card-list">
              <VListItem
                v-for="item in passwordRequirements"
                :key="item"
                :title="item"
                class="text-medium-emphasis"
              >
                <template #prepend>
                  <VIcon
                    size="8"
                    icon="tabler-circle"
                    class="me-3"
                  />
                </template>
              </VListItem>
            </VList>
          </VCardText> -->
          <VCardText>
            <h6 class="text-base font-weight-medium mb-3">
              密码要求:
            </h6>

            <VList class="card-list">
              <VListItem
                v-for="item in passwordRequirements"
                :key="item"
                :title="item"
                :class="{'text-success': isRequirementMet(item)}"
              >
                <template #prepend>
                  <VIcon
                    size="8"
                    :icon="isRequirementMet(item) ? 'tabler-check' : 'tabler-circle'"
                    class="me-3"
                  />
                </template>
              </VListItem>
            </VList>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn :disabled="!validPassword || newPassword != confirmPassword" @click="change">保存修改</VBtn>

            <VBtn
              type="reset"
              color="secondary"
              variant="tonal"
            >
              重置
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Two-steps verification -->
    <!-- <VCol cols="12">
      <VCard title="Two-steps verification">
        <VCardText>
          <h6 class="text-base font-weight-medium mb-3">
            Two factor authentication is not enabled yet.
          </h6>
          <p>
            Two-factor authentication adds an additional layer of security to your account by
            <br>
            requiring more than just a password to log in.
            <a
              href="javascript:void(0)"
              class="text-decoration-none"
            >Learn more.</a>
          </p>

          <VBtn @click="isOneTimePasswordDialogVisible = true">
            Enable 2FA
          </VBtn>
        </VCardText>
      </VCard>
    </VCol> -->
    <!-- !SECTION -->

  </VRow>

  <!-- SECTION Enable One time password -->
  <TwoFactorAuthDialog v-model:isDialogVisible="isOneTimePasswordDialogVisible" />
  <!-- !SECTION -->
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 5px;
}

.server-close-btn {
  inset-inline-end: 0.5rem;
}
</style>
