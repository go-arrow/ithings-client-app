<template>
  <div class="mb-[22px]">
    <t-form ref="form" :rules="rules" :data="model" label-align="top">
      <t-form-item label="数据长度" name="length">
        <t-input v-model="model.length" type="number" placeholder="请输入字符长度" />
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref(null)

const rules = {
  length: [
    { required: true, message: '数据长度必填', type: 'error', trigger: 'blur' },
  ],
}

const data = {
  length: '',
}

const model = ref({ ...data })
</script>

<style scoped>

</style>