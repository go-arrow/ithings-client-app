<template>
  <div class="mb-3">
    <t-form ref="form" :rules="rules" :data="model" label-align="top">
      <t-form-item label="事件类型" name="type">
        <t-select v-model="model.type">
          <t-option key="1" label="信息" value="info" />
          <t-option key="2" label="告警" value="warn"/>
          <t-option key="3" label="故障" value="error" />
        </t-select>
      </t-form-item>

      <div class="flex">
        <label class="title">输出参数</label>
        <label class="subtitle">(至少添加1项)</label>
      </div>

      <t-link theme="primary" :underline="false" hover="color" class="mt-4 cursor-pointer" @click="add">
        <add-icon slot="prefix-icon" size="large"></add-icon>
        <span class="text-sm">添加参数</span>
      </t-link>
    </t-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AddIcon } from 'tdesign-icons-vue-next'

const form = ref(null)

const model = ref({
  type: '',
})

const rules = {
  type: [
    { required: true, message: '功能类型必填', type: 'error', trigger: 'blur' },
  ],
}

const add = () => {

}

</script>

<style scoped>
.title {
  color: #000000E6;
}

label.title::before {
  content: '*';
  color: #d54941;
  margin-right: 4px;
}

.subtitle {
  font-size: 12px;
  padding-top: 1px;
  margin-left: 4px;
  color: #6B7280;
}
</style>