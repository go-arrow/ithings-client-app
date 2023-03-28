<template>
  <div>
    <t-drawer header="添加功能点" v-model:visible="visible" size="500" :closeOnOverlayClick="false" :destroyOnClose="true"
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

          <Property v-if="model.type == 'property'" />

          <Event v-else-if="model.type == 'event'" />

          <Service v-else-if="model.type == 'service'" />

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
import Property from './Property.vue'
import Event from './Event.vue'
import Service from './Service.vue'

const form = ref(null)

const model = ref({
  type: 'property',
  name: '',
  identifier: '',
  desc: ''
})

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

const visible = ref(false)

const ok = async () => {
  const result = await form.value.validate()
  if (result !== true) {
    return
  }

  visible.value = false

  form.value.reset()
}

const cancel = () => {
  form.value.reset()
  model.value.type = 'property'
}

const show = () => {
  visible.value = true
}

defineExpose({
  show,
})

</script>

<style scoped>

</style>