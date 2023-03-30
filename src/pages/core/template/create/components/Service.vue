<template>
  <div class="mb-3">
    <t-form ref="form" :rules="rules" :data="model" label-align="top">
      <t-form-item label="调用方式" name="type">
        <t-select v-model="model.type">
          <t-option key="1" label="同步" value="sync" />
          <t-option key="2" label="异步" value="async" />
        </t-select>
      </t-form-item>
    </t-form>

    <div class="flex mt-[22px]">
      <label>输入参数</label>
      <label class="subtitle">(最多支持30个参数)</label>
    </div>

    <t-row v-for="(item, i) in inputItems" :key="i" class="w-full mt-2 bg-light-blue-50 px-4 py-1">
      <t-col :span="3">{{ item.name }}</t-col>
      <t-col :span="3">{{ item.identifier }}</t-col>
      <t-col :span="3">{{ item.dataType.type }}</t-col>
      <t-col :span="3">
        <div class="flex justify-center">
          <t-link theme="primary" :underline="false" hover="color" @click="editInputItem(i)">编辑</t-link>
          <label class="px-2 text-gray-400">/</label>
          <t-popconfirm content="确认删除吗" @confirm="removeInputItem(i)">
            <t-link theme="primary" :underline="false" hover="color">删除</t-link>
          </t-popconfirm>
        </div>
      </t-col>
    </t-row>

    <t-link theme="primary" :underline="false" hover="color" class="mt-4 cursor-pointer" @click="addInputParams">
      <add-icon slot="prefix-icon" size="large"></add-icon>
      <span class="text-sm">添加参数</span>
    </t-link>

    <div class="flex mt-4">
      <label>输出参数</label>
      <label class="subtitle">(最多支持30个参数)</label>
    </div>

    <t-row v-for="(item, i) in outputItems" :key="i" class="w-full mt-2 bg-light-blue-50 px-4 py-1">
      <t-col :span="3">{{ item.name }}</t-col>
      <t-col :span="3">{{ item.identifier }}</t-col>
      <t-col :span="3">{{ item.dataType.type }}</t-col>
      <t-col :span="3">
        <div class="flex justify-center">
          <t-link theme="primary" :underline="false" hover="color" @click="editOutputItem(i)">编辑</t-link>
          <label class="px-2 text-gray-400">/</label>
          <t-popconfirm content="确认删除吗" @confirm="removeOutputItem(i)">
            <t-link theme="primary" :underline="false" hover="color">删除</t-link>
          </t-popconfirm>
        </div>
      </t-col>
    </t-row>

    <t-link theme="primary" :underline="false" hover="color" class="mt-4 cursor-pointer" @click="addOutputParams">
      <add-icon slot="prefix-icon" size="large"></add-icon>
      <span class="text-sm">添加参数</span>
    </t-link>

    <Parameter title="添加服务输入参数" ref="inputParameter" @create="createInputParameter" @update="updateInputParameter" />
    <Parameter title="添加服务输出参数" ref="outputParameter" @create="createOutputParameter" @update="updateOutputParameter" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AddIcon } from 'tdesign-icons-vue-next'
import Parameter from './Parameter.vue'

const form = ref(null)

const data = {
  type: 'sync'
}

const model = ref({ ...data })

const rules = {
  type: [
    { required: true, message: '调用方式必填', type: 'error', trigger: 'blur' },
  ],
}

const inputItems = ref([])
const outputItems = ref([])

const inputParameter = ref(null)
const outputParameter = ref(null)

const addInputParams = () => {
  inputParameter.value.show(false, inputItems.value)
}

const addOutputParams = () => {
  outputParameter.value.show(false, outputItems.value)
}

const createInputParameter = (item) => {
  inputItems.value.push(item)
}

const updateInputParameter = (item) => {
  let index = 0
  inputItems.value.forEach((tmp, i) => {
    if (item.identifier == tmp.identifier) {
      index = i
      return
    }
  })

  const data = { ...item.item }
  inputItems.value.splice(index, 1, data)
}

const createOutputParameter = (item) => {
  outputItems.value.push(item)
}

const updateOutputParameter = (item) => {
  let index = 0
  outputItems.value.forEach((tmp, i) => {
    if (item.identifier == tmp.identifier) {
      index = i
      return
    }
  })

  const data = { ...item.item }
  outputItems.value.splice(index, 1, data)
}

const editInputItem = (i) => {
  inputParameter.value.inject(inputItems.value[i])
  inputParameter.value.show(true, inputItems.value)
}

const removeInputItem = (i) => {
  inputItems.value.splice(i, 1)
}

const editOutputItem = (i) => {
  outputParameter.value.inject(outputItems.value[i])
  outputParameter.value.show(true, outputItems.value)
}

const removeOutputItem = (i) => {
  outputItems.value.splice(i, 1)
}

const get = () => {
  if (inputItems.value.length == 0 && outputItems.value.length == 0) {
    return null
  }

  return {
    callType: model.value.type,
    inputData: [...inputItems.value],
    outputData: [...outputItems.value]
  }
}

const inject = (params) => {
  model.value.type = params.callType

  for (let i = 0; i < params.inputData.length; i++) {
    inputItems.value.push({ ...params.inputData[i] })
  }

  for (let i = 0; i < params.outputData.length; i++) {
    outputItems.value.push({ ...params.outputData[i] })
  }
}

const reset = () => {
  form.value.clearValidate()
  model.value = { ...data }

  inputItems.value.splice(0, inputItems.value.length)
  outputItems.value.splice(0, outputItems.value.length)
}

defineExpose({
  get,
  inject,
  reset,
})

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