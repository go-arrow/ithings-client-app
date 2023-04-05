<template>
  <div>
    <t-drawer header="创建设备" v-model:visible="visible" size="500" :closeOnOverlayClick="false" :on-confirm="ok"
      @close="cancel">

      <t-form ref="form" :rules="rules" :data="model" label-align="top">
        <t-form-item label="设备名称" name="name">
          <t-input v-model="model.name" placeholder="请输入设备名称" />
        </t-form-item>

        <t-form-item label="所属产品" name="product">
          <t-select v-model="model.product" placeholder="请选择所属产品">
            <t-option key="1" label="智能仪表" value="1" />
            <t-option key="2" label="振动传感器" value="2" />
            <t-option key="3" label="水浸传感器" value="3" />
          </t-select>
        </t-form-item>

        <t-form-item label="设备描述">
          <t-textarea v-model="model.desc" placeholder="请输入设备描述信息" :autosize="{ minRows: 3, maxRows: 5 }" />
        </t-form-item>

        <t-form-item label="位置信息">
          <t-input v-model="model.address" placeholder="请输入详细地址" />
        </t-form-item>

        <img src="@/assets/map.png" class="mt-2" alt="">

      </t-form>
    </t-drawer>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'

const form = ref(null)

const visible = ref(false)

const rules = {
  name: [
    { required: true, message: '产品名称必填', type: 'error', trigger: 'blur' },
  ],
  product: [
    { required: true, message: '产品类型必填', type: 'error', trigger: 'blur' },
  ],
}

const data = {
  name: '',
  product: '',
  desc: '',
  address: '',
}

const model = ref({ ...data })

const ok = async () => {
  visible.value = false
}

const cancel = () => {

}

const show = () => {
  visible.value = true
}

defineExpose({
  show,
})

</script>
  
<style scoped></style>