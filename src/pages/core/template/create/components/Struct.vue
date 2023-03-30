<template>
  <div>
    <div class="flex">
      <label class="title">结构体对象</label>
      <label class="subtitle">至少添加1项</label>
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

    <t-link theme="primary" :underline="false" hover="color" class="my-4" @click="add">
      <add-icon slot="prefix-icon" size="large"></add-icon>
      <span class="text-sm">添加参数</span>
    </t-link>

    <t-drawer header="添加参数" v-model:visible="visible" size="450" :closeOnOverlayClick="false" :on-confirm="ok"
      @close="cancel">
      <div>
        <t-form ref="form" :rules="rules" :data="model" label-align="top" class="mb-4">
          <t-form-item label="参数名称" name="name">
            <t-input v-model="model.name" placeholder="请输入参数名称" />
          </t-form-item>

          <t-form-item label="标识符" name="identifier">
            <t-input v-model="model.identifier" placeholder="请输入标识符" />
          </t-form-item>

          <t-form-item label="数据类型" name="type">
            <t-select v-model="model.type" placeholder="请选择数据类型">
              <t-option key="1" label="int(整数型)" value="int" />
              <t-option key="2" label="float(浮点型)" value="float" />
              <t-option key="3" label="string(字符串)" value="string" />
              <t-option key="3" label="bool(布尔型)" value="bool" />
              <t-option key="3" label="enum(枚举型)" value="enum" />
            </t-select>
          </t-form-item>
        </t-form>

        <Number ref="intField" v-show="model.type == 'int'" />
        <Number ref="floatField" v-show="model.type == 'float'" />
        <String ref="stringField" v-show="model.type == 'string'" />
        <Bool ref="boolField" v-show="model.type == 'bool'" />
        <Enum ref="enumField" v-show="model.type == 'enum'" />
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AddIcon } from 'tdesign-icons-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'

import Number from './Number.vue'
import String from './String.vue'
import Bool from './Bool.vue'
import Enum from './Enum.vue'

const form = ref(null)

const intField = ref(null)
const floatField = ref(null)
const stringField = ref(null)
const boolField = ref(null)
const enumField = ref(null)

const rules = {
  name: [
    { required: true, message: '参数名称必填', type: 'error', trigger: 'blur' },
  ],
  identifier: [
    { required: true, message: '标识符必填', type: 'error', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '数据类型必填', type: 'error', trigger: 'blur' },
  ],
}

const data = {
  name: '',
  identifier: '',
  type: 'int',
}

const model = ref({ ...data })

const visible = ref(false)

const items = ref([])

const add = () => {
  visible.value = true
}

let editStatus = false
let editIdx = 0

const edit = (i) => {
  const obj = items.value[i]

  model.value = {
    name: obj.name,
    identifier: obj.identifier,
    type: obj.dataType.type
  }

  editStatus = true
  editIdx = i

  visible.value = true

  const t = model.value.type
  const specs = obj.dataType.specs

  if (t == 'int') {
    intField.value.inject(specs)
  } else if (t == 'float') {
    floatField.value.inject(specs)
  } else if (t == 'string') {
    stringField.value.inject(specs)
  } else if (t == 'bool') {
    boolField.value.inject(specs)
  } else if (t == 'enum') {
    enumField.value.inject(specs)
  }
}

const remove = (i) => {
  items.value.splice(i, 1)
}

const ok = async () => {
  const result = await form.value.validate()
  if (result !== true) {
    return
  }

  // 非编辑状态才去判断是否重复
  if (!editStatus) {
    let exist = false
    items.value.forEach(item => {
      if (model.value.identifier == item.identifier) {
        MessagePlugin.error({ content: `标识符名称'${model.value.identifier}'已存在` })
        exist = true
        return
      }
    })
    if (exist) {
      return
    }
  }

  let specs = {}

  if (model.value.type == 'int') {
    specs = await intField.value.get()
  } else if (model.value.type == 'float') {
    specs = await floatField.value.get()
  } else if (model.value.type == 'string') {
    specs = await stringField.value.get()
  } else if (model.value.type == 'bool') {
    specs = await boolField.value.get()
  } else if (model.value.type == 'enum') {
    specs = await enumField.value.get()
  }

  if (specs == null) {
    return
  }

  const item = {
    identifier: model.value.identifier,
    name: model.value.name,
    dataType: {
      type: model.value.type,
      specs: { ...specs }
    }
  }

  if (editStatus) {
    items.value[editIdx] = item

    editStatus = false
    editIdx = 0
  } else {
    items.value.push(item)
  }

  cancel()
}

const cancel = () => {
  form.value.clearValidate()
  model.value = { ...data }

  intField.value.reset()
  floatField.value.reset()
  stringField.value.reset()
  boolField.value.reset()
  enumField.value.reset()

  visible.value = false
}

const get = () => {
  if (items.value.length == 0) {
    return null
  }

  return [...items.value]
}

const inject = (params) => {
  for (let i = 0; i < params.length; i++) {
    items.value.push({ ...params[i] })
  }
}

const reset = () => {
  form.value.clearValidate()
  model.value = { ...data }

  intField.value.reset()
  floatField.value.reset()
  stringField.value.reset()
  boolField.value.reset()
  enumField.value.reset()
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
}
</style>