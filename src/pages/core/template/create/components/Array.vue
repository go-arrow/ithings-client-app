<template>
  <div>
    <t-form ref="form" :rules="rules" :data="model" labelAlign="top" class="mb-[24px]">
      <t-form-item label="元素类型" name="type">
        <t-select v-model="model.type" placeholder="请选择元素类型">
          <t-option key="1" label="int(整数型)" value="int" />
          <t-option key="2" label="float(浮点型)" value="float" />
          <t-option key="3" label="string(字符串)" value="string" />
          <t-option key="3" label="bool(布尔型)" value="bool" />
          <t-option key="3" label="enum(枚举型)" value="enum" />
          <t-option key="3" label="struct(结构体)" value="struct" />
        </t-select>
      </t-form-item>

      <t-form-item label="元素个数" name="size">
        <t-input v-model="model.size" type="number" placeholder="请输入元素个数" />
      </t-form-item>
    </t-form>

    <Number ref="intField" v-show="model.type == 'int'" />
    <Number ref="floatField" v-show="model.type == 'float'" />
    <String ref="stringField" v-show="model.type == 'string'" />
    <Bool ref="boolField" v-show="model.type == 'bool'" />
    <Enum ref="enumField" v-show="model.type == 'enum'" />
    <Struct ref="structField" v-show="model.type == 'struct'" />

  </div>
</template>

<script setup>
import { ref } from 'vue'

import Number from './Number.vue'
import String from './String.vue'
import Bool from './Bool.vue'
import Enum from './Enum.vue'
import Struct from './Struct.vue'

const form = ref(null)

const intField = ref(null)
const floatField = ref(null)
const stringField = ref(null)
const boolField = ref(null)
const enumField = ref(null)
const structField = ref(null)

const rules = {
  type: [
    { required: true, message: '元素类型必填', type: 'error', trigger: 'blur' },
  ],
  size: [
    { required: true, message: '元素长度必填', type: 'error', trigger: 'blur' },
  ],
}

const data = {
  type: 'int',
  size: '',
}

const model = ref({ ...data })

const get = async () => {
  const result = await form.value.validate()
  if (result !== true) {
    return null
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
  } else if (model.value.type == 'struct') {
    specs = structField.value.get()
  }

  if (specs == null) {
    return null
  }

  if (model.value.type == 'struct') {
    return {
      size: model.value.size,
      item: {
        type: model.value.type,
        specs: [...specs],
      }
    }
  }

  return {
    size: model.value.size,
    item: {
      type: model.value.type,
      specs: { ...specs },
    }
  }
}

const inject = (params) => {
  model.value = {
    type: params.item.type,
    size: params.size
  }

  const t = model.value.type
  if (t == 'int') {
    intField.value.inject(params.item.specs)
  } else if (t == 'float') {
    floatField.value.inject(params.item.specs)
  } else if (t == 'string') {
    stringField.value.inject(params.item.specs)
  } else if (t == 'bool') {
    boolField.value.inject(params.item.specs)
  } else if (t == 'enum') {
    enumField.value.inject(params.item.specs)
  } else if (t == 'struct') {
    structField.value.inject(params.item.specs)
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
  structField.value.reset()
}

defineExpose({
  get,
  inject,
  reset,
})

</script>

<style scoped></style>