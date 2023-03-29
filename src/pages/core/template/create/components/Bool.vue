<template>
  <div class="mb-[24px]">
    <t-form ref="form" :rules="rules" :data="model" label-align="top">
      <t-form-item label="布尔值" name="true">
        <t-input v-model="model.true" label="true: " placeholder="请输入真值含义" />
      </t-form-item>

      <t-form-item name="false" :requiredMark="false">
        <t-input v-model="model.false" label="false: " placeholder="请输入假值含义" />
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref(null)

const rules = {
  true: [
    { required: true, message: '真值描述必填', type: 'error', trigger: 'blur' },
  ],
  false: [
    { required: true, message: '假值描述必填', type: 'error', trigger: 'blur' },
  ],
}

const data = {
  true: '',
  false: '',
}

const model = ref({ ...data })
</script>

<style scoped>

</style>