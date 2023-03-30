<template>
  <div>
    <t-drawer :header="title" v-model:visible="visible" size="470" :closeOnOverlayClick="false" :on-confirm="ok"
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
              <t-option key="4" label="bool(布尔型)" value="bool" />
              <t-option key="5" label="enum(枚举型)" value="enum" />
              <t-option key="6" label="struct(结构体)" value="struct" />
              <t-option key="7" label="array(数组型)" value="array" />
            </t-select>
          </t-form-item>
        </t-form>

        <Number ref="intField" v-show="model.type == 'int'" />
        <Number ref="floatField" v-show="model.type == 'float'" />
        <String ref="stringField" v-show="model.type == 'string'" />
        <Bool ref="boolField" v-show="model.type == 'bool'" />
        <Enum ref="enumField" v-show="model.type == 'enum'" />
        <Struct ref="structField" v-show="model.type == 'struct'" />
        <Array ref="arrayField" v-show="model.type == 'array'" />
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'

import Number from './Number.vue'
import String from './String.vue'
import Bool from './Bool.vue'
import Enum from './Enum.vue'
import Struct from './Struct.vue'
import Array from './Array.vue'

const props = defineProps({
  title: String,
})

const { title } = toRefs(props)

const emit = defineEmits(['create', 'update'])

const visible = ref(false)

const form = ref(null)

const intField = ref(null)
const floatField = ref(null)
const stringField = ref(null)
const boolField = ref(null)
const enumField = ref(null)
const structField = ref(null)
const arrayField = ref(null)

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

const ok = async () => {
  const result = await form.value.validate()
  if (result !== true) {
    return null
  }

  // 非编辑状态才去判断是否重复
  if (!editStatus) {
    let exist = false
    existItems.forEach(item => {
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
  } else if (model.value.type == 'struct') {
    specs = structField.value.get()
  } else if (model.value.type == 'array') {
    specs = await arrayField.value.get()
  }

  if (specs == null) {
    return null
  }

  if (editStatus) {
    emit('update', {
      identifier: historyIdentifier,
      item: {
        name: model.value.name,
        identifier: model.value.identifier,
        dataType: {
          type: model.value.type,
          specs: { ...specs }
        }
      }
    })
  } else {
    emit('create', {
      name: model.value.name,
      identifier: model.value.identifier,
      dataType: {
        type: model.value.type,
        specs: { ...specs }
      }
    })
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
  structField.value.reset()
  arrayField.value.reset()

  visible.value = false
}

let editStatus = false
let historyIdentifier = null

// 已经存在的项目,用来判断是否重复添加
let existItems = null

const show = (status, items) => {
  editStatus = status
  visible.value = true
  existItems = items
}

const inject = (params) => {
  historyIdentifier = params.identifier

  console.log(params)

  model.value = {
    type: params.dataType.type,
    name: params.name,
    identifier: params.identifier,
  }

  if (params.dataType.type == 'int') {
    intField.value.inject({ ...params.dataType.specs })
  } else if (params.dataType.type == 'float') {
    floatField.value.inject({ ...params.dataType.specs })
  } else if (params.dataType.type == 'string') {
    stringField.value.inject({ ...params.dataType.specs })
  } else if (params.dataType.type == 'bool') {
    boolField.value.inject({ ...params.dataType.specs })
  } else if (params.dataType.type == 'enum') {
    enumField.value.inject({ ...params.dataType.specs })
  } else if (params.dataType.type == 'struct') {
    structField.value.inject({ ...params.dataType.specs })
  } else if (params.dataType.type == 'array') {
    arrayField.value.inject({ ...params.dataType.specs })
  }

  visible.value = true
}

defineExpose({
  show,
  inject,
})

</script>

<style scoped></style>