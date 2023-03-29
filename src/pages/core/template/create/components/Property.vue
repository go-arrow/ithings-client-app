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
    </t-form>

    <Number v-if="model.type == 'int'" />
    <Number v-else-if="model.type == 'float'" />
    <String v-else-if="model.type == 'string'"/>
    <Bool v-else-if="model.type == 'bool'"/>
    <Enum v-else-if="model.type == 'enum'"/>

  </div>
</template>

<script setup>
import { ref } from 'vue'

import Number from './Number.vue'
import String from './String.vue'
import Bool from './Bool.vue'
import Enum from './Enum.vue'

const form = ref(null)

const rules = {
  type: [
    { required: true, message: '数据类型必填', type: 'error', trigger: 'blur' },
  ],
}

const data = {
  type: 'int',
}

const model = ref({...data})

</script>

<style scoped>

</style>