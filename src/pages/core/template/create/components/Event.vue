<template>
  <div class="mb-3">
    <t-form ref="form" :rules="rules" :data="model" label-align="top">
      <t-form-item label="事件类型" name="type">
        <t-select v-model="model.type">
          <t-option key="1" label="信息" value="info" />
          <t-option key="2" label="告警" value="warn" />
          <t-option key="3" label="故障" value="error" />
        </t-select>
      </t-form-item>
    </t-form>

    <div class="flex mt-[22px]">
      <label class="title">输出参数</label>
      <label class="subtitle">(至少添加1项)</label>
    </div>

    <t-row v-for="(item, i) in items" :key="i" class="w-full mt-2 bg-light-blue-50 px-4 py-1">
      <t-col :span="3">{{ item.name }}</t-col>
      <t-col :span="3">{{ item.identifier }}</t-col>
      <t-col :span="3">{{ item.dataType.type }}</t-col>
      <t-col :span="3">
        <div class="flex justify-center">
          <t-link theme="primary" :underline="false" hover="color" @click="edit(i)">编辑</t-link>
          <label class="px-2 text-gray-400">/</label>
          <t-popconfirm content="确认删除吗" @confirm="remove(i)">
            <t-link theme="primary" :underline="false" hover="color">删除</t-link>
          </t-popconfirm>
        </div>
      </t-col>
    </t-row>

    <t-link theme="primary" :underline="false" hover="color" class="mt-4 cursor-pointer" @click="add">
      <add-icon slot="prefix-icon" size="large"></add-icon>
      <span class="text-sm">添加参数</span>
    </t-link>

    <Parameter title="添加事件输出参数" ref="parameter" @create="create" @update="update" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AddIcon } from 'tdesign-icons-vue-next'
import Parameter from './Parameter.vue'

const form = ref(null)

const data = {
  type: 'info',
}

const model = ref({ ...data })

const rules = {
  type: [
    { required: true, message: '功能类型必填', type: 'error', trigger: 'blur' },
  ],
}

const parameter = ref(null)

const items = ref([])

const add = () => {
  parameter.value.show(false, items.value)
}

const create = (item) => {
  items.value.push(item)
}

const update = (item) => {
  let index = 0
  items.value.forEach((tmp, i) => {
    if (item.identifier == tmp.identifier) {
      index = i
      return
    }
  })

  const data = { ...item.item }
  items.value.splice(index, 1, data)
}

const edit = (i) => {
  parameter.value.inject(items.value[i])
  parameter.value.show(true, items.value)
}

const remove = (i) => {
  items.value.splice(i, 1)
}

const get = () => {
  if (items.value.length == 0) {
    return null
  }

  return {
    type: model.value.type,
    outputData: [...items.value]
  }
}

const inject = (params) => {
  model.value.type = params.type

  for (let i = 0; i < params.outputData.length; i++) {
    items.value.push({ ...params.outputData[i] })
  }
}

const reset = () => {
  form.value.clearValidate()
  model.value = { ...data }

  items.value.splice(0, items.value.length)
}

defineExpose({
  get,
  inject,
  reset,
})

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