<template>
  <div>
    <div class="flex">
      <label class="title">枚举项</label>
      <label class="subtitle">至少添加1项</label>
    </div>

    <t-form ref="form" :rules="rules" :data="model" label-align="top">
      <t-row v-for="(item, i) in items" :key="i" :gutter="20" class="mb-4">
        <t-col :span="4">
          <t-form-item label="参数值" :name="item.keyName">
            <t-input v-model="model[item.keyName]" type="number" placeholder="请输入参数值" />
          </t-form-item>
        </t-col>

        <t-col :span="6">
          <t-form-item label="参数描述" :name="item.valueName">
            <t-input v-model="model[item.valueName]" placeholder="请输入参数描述" />
          </t-form-item>
        </t-col>

        <t-col :span="2" class="flex self-end">
          <t-button shape="square" variant="dashed" @click="remove(i, item.id)">
            <remove-icon slot="icon" />
          </t-button>
        </t-col>
      </t-row>
    </t-form>

    <t-link theme="primary" :underline="false" hover="color" class="my-4" @click="add">
      <add-icon slot="prefix-icon" size="large"></add-icon>
      <span class="text-sm">添加枚举项</span>
    </t-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AddIcon, RemoveIcon } from 'tdesign-icons-vue-next'

const form = ref(null)

const rules = ref({})

const data = {}

const model = ref({ ...data })

const items = ref([])

let global = 0

const add = () => {
  rules.value[`k${global}`] = [
    { required: true, message: '请输入参数值', type: 'error', trigger: 'blur' },
  ]

  rules.value[`v${global}`] = [
    { required: true, message: '请输入参数描述', type: 'error', trigger: 'blur' },
  ]

  items.value.push({ id: global, keyName: `k${global}`, valueName: `v${global}` })

  global += 1
}

const remove = (i, id) => {
  items.value.splice(i, 1)

  delete rules.value[`k${id}`]
  delete rules.value[`v${id}`]

  delete model.value[`k${id}`]
  delete model.value[`v${id}`]
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
}
</style>