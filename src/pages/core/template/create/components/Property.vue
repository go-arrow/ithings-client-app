<template>
  <div>
    <t-form ref="form" :rules="rules" :data="model" label-align="top" class="mb-[24px]">
      <t-form-item label="数据类型" name="type">
        <t-select v-model="model.type" placeholder="请选择数据类型">
          <t-option key="1" label="int(整数型)" value="int" />
          <t-option key="2" label="float(浮点型)" value="float"/>
          <t-option key="3" label="string(字符串)" value="string" />
          <t-option key="3" label="bool(布尔型)" value="bool" />
          <t-option key="3" label="enum(枚举型)" value="enum" />
          <t-option key="3" label="struct(结构体)" value="struct" />
          <t-option key="3" label="array(数组型)" value="array" />
        </t-select>
      </t-form-item>

      <Number ref="intField" v-show="model.type == 'int'" />
      <Number ref="floatField" v-show="model.type == 'float'" />
      <String ref="stringField" v-show="model.type == 'string'"/>
      <Bool ref="boolField" v-show="model.type == 'bool'"/>
      <Enum ref="enumField" v-show="model.type == 'enum'"/>
      <Struct ref="structField" v-show="model.type == 'struct'" />
      <Array ref="arrayField" v-show="model.type == 'array'" />

      <t-form-item label="读写类型" name="mode">
        <t-select v-model="model.mode" placeholder="请选择读写类型">
          <t-option key="1" label="读写" value="rw" />
          <t-option key="2" label="只读" value="r"/>
        </t-select>
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import Number from './Number.vue'
import String from './String.vue'
import Bool from './Bool.vue'
import Enum from './Enum.vue'
import Struct from './Struct.vue'
import Array from './Array.vue'

const form = ref(null)

const intField = ref(null)
const floatField = ref(null)
const stringField = ref(null)
const boolField = ref(null)
const enumField = ref(null)
const structField = ref(null)
const arrayField = ref(null)

const rules = {
  type: [
    { required: true, message: '数据类型必填', type: 'error', trigger: 'blur' },
  ],
  mode: [
    { required: true, message: '读写类型必填', type: 'error', trigger: 'blur' },
  ],
}

const data = {
  type: 'int',
  mode: 'rw',
}

const model = ref({...data})

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
  } else if (model.value.type == 'array') {
    specs = await arrayField.value.get()
  }

  if (specs == null) {
    return null
  }

  if (model.value.type == 'struct') {
    return {
      type: model.value.type,
      accessMode: model.value.mode,
      specs: [...specs],
    }
  }

  return {
    type: model.value.type,
    accessMode: model.value.mode,
    specs: {...specs},
  }
}

const inject = (params) => {
  model.value.type = params.type
  model.value.mode = params.accessMode

  if (params.type == 'int') {
    intField.value.inject({...params.specs})
  } else if (params.type == 'float') {
    floatField.value.inject({...params.specs})
  } else if (params.type == 'string') {
    stringField.value.inject({...params.specs})
  } else if (params.type == 'bool') {
    boolField.value.inject({...params.specs})
  } else if (params.type == 'enum') {
    enumField.value.inject({...params.specs})
  } else if (params.type == 'struct') {
    structField.value.inject({...params.specs})
  } else if (params.type == 'array') {
    arrayField.value.inject({...params.specs})
  }
}

const reset = () => {
  form.value.clearValidate()
  model.value = {...data}

  intField.value.reset()
  floatField.value.reset()
  stringField.value.reset()
  boolField.value.reset()
  enumField.value.reset()
  structField.value.reset()
  arrayField.value.reset()

  console.log('property reset...');
}

defineExpose({
  get,
  inject,
  reset,
})

</script>

<style scoped>

</style>