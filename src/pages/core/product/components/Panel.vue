<template>
  <div>
    <t-drawer header="添加功能点" v-model:visible="visible" size="500" :closeOnOverlayClick="false" :on-confirm="ok"
      @close="cancel">

      <div>
        <t-form ref="form" :rules="rules" :data="model" label-align="top">
          <t-form-item label="产品名称" name="name">
            <t-input v-model="model.name" placeholder="请输入产品名称" />
          </t-form-item>

          <t-form-item label="节点类型" name="nodeType">
            <t-select v-model="model.nodeType" placeholder="请选择节点类型">
              <t-option key="1" label="直连设备" value="1" />
              <t-option key="2" label="网关设备" value="2" />
              <t-option key="3" label="网关子设备" value="3" />
            </t-select>
          </t-form-item>

          <t-form-item label="联网方式" name="network">
            <t-select v-model="model.network" placeholder="请选择联网方式">
              <t-option key="1" label="蜂窝网络" value="Cellular" />
              <t-option key="2" label="以太网" value="Ethernet" />
              <t-option key="3" label="WiFi" value="WiFi" />
              <t-option key="3" label="NBIOT" value="NBIOT" />
            </t-select>
          </t-form-item>

          <t-form-item label="接入协议" name="accessProtocol">
            <t-select v-model="model.accessProtocol" placeholder="请选择接入协议">
              <t-option key="1" label="MQTT" value="MQTT" />
              <t-option key="2" label="HTTP" value="HTTP" />
              <t-option key="3" label="CoAP" value="CoAP" />
              <t-option key="3" label="LwM2M" value="LwM2M" />
            </t-select>
          </t-form-item>

          <t-form-item label="数据格式" name="dataFormat">
            <t-select v-model="model.dataFormat" placeholder="请选择数据格式">
              <t-option key="1" label="PlainText" value="PlainText" />
              <t-option key="2" label="JSON" value="JSON" />
              <t-option key="3" label="Binary" value="Binary" />
              <t-option key="3" label="Modbus" value="Modbus" />
            </t-select>
          </t-form-item>

          <t-form-item label="厂商名称">
            <t-input v-model="model.manufacturers" placeholder="请输入厂商名称" />
          </t-form-item>

          <t-form-item label="产品型号">
            <t-input v-model="model.model" placeholder="请输入产品型号" />
          </t-form-item>

          <t-form-item label="产品描述">
            <t-textarea v-model="model.desc" placeholder="请输入产品描述信息" :autosize="{ minRows: 3, maxRows: 5 }" />
          </t-form-item>
        </t-form>
      </div>
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
  nodeType: [
    { required: true, message: '节点类型必填', type: 'error', trigger: 'blur' },
  ],
  network: [
    { required: true, message: '联网方式必填', type: 'error', trigger: 'blur' },
  ],
  accessProtocol: [
    { required: true, message: '接入协议必填', type: 'error', trigger: 'blur' },
  ],
  dataFormat: [
    { required: true, message: '数据格式必填', type: 'error', trigger: 'blur' },
  ],
}

const data = {
  name: '',
  nodeType: '',
  network: '',
  accessProtocol: '',
  dataFormat: '',
  manufacturers: '',
  model: '',
  desc: '',
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