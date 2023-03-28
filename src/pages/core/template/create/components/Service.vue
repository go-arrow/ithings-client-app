<template>
  <div class="mb-3">
    <t-form ref="form" :rules="rules" :data="model" label-align="top">
      <t-form-item label="调用方式" name="type">
        <t-select v-model="model.type">
          <t-option key="1" label="同步" value="sync" />
          <t-option key="2" label="异步" value="async"/>
        </t-select>
      </t-form-item>

      <div class="flex">
        <label>输入参数</label>
        <label class="subtitle">(最多支持30个参数)</label>
      </div>

      <t-link theme="primary" :underline="false" hover="color" class="mt-4 cursor-pointer" @click="addInputParams">
        <add-icon slot="prefix-icon" size="large"></add-icon>
        <span class="text-sm">添加参数</span>
      </t-link>

      <div class="flex mt-4">
        <label>输出参数</label>
        <label class="subtitle">(最多支持30个参数)</label>
      </div>

      <t-link theme="primary" :underline="false" hover="color" class="mt-4 cursor-pointer" @click="addOutputParams">
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
    { required: true, message: '调用方式必填', type: 'error', trigger: 'blur' },
  ],
}

const addInputParams = () => {

}

const addOutputParams = () => {

}

</script>

<style scoped>

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