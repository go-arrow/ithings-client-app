<template>
  <div>
    <t-drawer header="添加功能点" v-model:visible="visible" size="500" :closeOnOverlayClick="false"
      :on-confirm="ok" @close="cancel">

      <div>
        <t-form ref="form" :rules="rules" :data="model" label-align="top">
          <t-form-item label="功能类型" name="type">
            <t-select v-model="model.type" placeholder="请选择功能类型">
              <t-option key="1" label="属性类型" value="property" />
              <t-option key="2" label="事件类型" value="event"/>
              <t-option key="3" label="服务类型" value="service" />
            </t-select>
          </t-form-item>

          <t-form-item label="功能名称" name="name">
            <t-input v-model="model.name" placeholder="请输入功能名称"/>
          </t-form-item>

          <t-form-item label="标识符" name="identifier">
            <t-input v-model="model.identifier" placeholder="请输入标识符"/>
          </t-form-item>

          <Property ref="property" v-show="model.type == 'property'" />

          <Event ref="event" v-show="model.type == 'event'" />

          <Service ref="service" v-show="model.type == 'service'" />

          <t-form-item label="描述信息">
            <t-textarea
                v-model="model.desc"
                placeholder="请输入描述信息"
                :autosize="{ minRows: 3, maxRows: 5 }"
              />
          </t-form-item>
        </t-form>
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'

import Property from './Property.vue'
import Event from './Event.vue'
import Service from './Service.vue'

const emit = defineEmits(['create', 'update'])

const form = ref(null)

const property = ref(null)

const event = ref(null)

const service = ref(null)

const visible = ref(false)

const rules = {
  type: [
    { required: true, message: '功能类型必填', type: 'error', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '功能名称必填', type: 'error', trigger: 'blur' },
  ],
  identifier: [
    { required: true, message: '标识符必填', type: 'error', trigger: 'blur' },
  ],
}

const data = {
  type: 'property',
  name: '',
  identifier: '',
  desc: ''
}

const model = ref({...data})

const ok = async () => {
  // 校验表单
  const result = await form.value.validate()
  if (result !== true) {
    return
  }

  // 非编辑状态才去判断是否重复
  if (!editStatus) {
    if (model.value.type == 'property') {
      let exist = false
      properties.value.forEach(item => {
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
  }

  // 判断功能类型
  if (model.value.type == 'property') {
    const specs = await property.value.get()

    if (specs == null) {
      return
    }

    if (editStatus) {
      emit('update', {
        identifier: historyIdentifier,
        type: model.value.type,
        item: {
          name: model.value.name,
          identifier: model.value.identifier,
          desc: model.value.desc,
          dataType: {...specs}
        }
      })
    } else {
      emit('create', {
        type: model.value.type,
        item: {
          name: model.value.name,
          identifier: model.value.identifier,
          desc: model.value.desc,
          dataType: {...specs}
        }
      })
    }
  } else if (model.value.type == 'event') {

  } else if (model.value.type == 'service') {

  }

  visible.value = false
  
  form.value.clearValidate()
  model.value = {...data}

  property.value.reset()
}

const cancel = () => {
  form.value.clearValidate()
  model.value = {...data}
  property.value.reset()

  model.value.type = 'property'
}

let editStatus = false
const properties = ref([])
const events = ref([])
const services = ref([])

const show = (status, p, e, s) => {
  editStatus = status

  properties.value = p
  events.value = e
  services.value = s

  visible.value = true
}

let historyIdentifier = null

const inject = (type, params) => {
  historyIdentifier = params.identifier

  model.value = {
    type: type,
    name: params.name,
    identifier: params.identifier,
    desc: params.desc
  }

  if (type == 'property') {
    property.value.inject({accessMode: params.accessMode, ...params.dataType})
  }

  visible.value = true
}

defineExpose({
  show,
  inject,
})

</script>

<style scoped>

</style>