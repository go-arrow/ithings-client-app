<template>
  <div class="mb-[22px]">
    <t-form ref="form" :rules="rules" :data="model" label-align="top">
      <t-row :gutter="20" class="mb-[22px]">
        <t-col :span="6">
          <t-form-item label="取值范围" name="min">
            <t-input v-model="model.min" type="number" placeholder="请输入最小值" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label=" " name="max" :requiredMark="false">
            <t-input v-model="model.max" type="number" placeholder="请输入最大值" />
          </t-form-item>
        </t-col>
      </t-row>

      <t-form-item label="步长">
        <t-input v-model="model.step" type="number" placeholder="请输入数据精度" />
      </t-form-item>

      <t-form-item label="单位">
        <t-select v-model="model.unit" placeholder="请选择单位">
          <t-option key="1" label="摄氏度(°C)" value="摄氏度(°C)" />
          <t-option key="2" label="湿度(%)" value="湿度(%)"/>
          <t-option key="3" label="速度(m/s)" value="速度(m/s)" />
        </t-select>
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref(null)

const rules = {
  min: [
    { required: true, message: '最小值必填', type: 'error', trigger: 'blur' },
  ],
  max: [
    { required: true, message: '最大值必填', type: 'error', trigger: 'blur' },
  ],
}

const data = {
  min: '',
  max: '',
  step: '',
  unit: ''
}

const model = ref({...data})

</script>

<style scoped>

</style>