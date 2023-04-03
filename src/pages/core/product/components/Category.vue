<template>
  <div>
    <t-drawer header="选择物模板" v-model:visible="visible" size="470" :closeOnOverlayClick="false" :on-confirm="ok"
      @close="cancel">
      <div>
        <t-form ref="form" :rules="rules" :data="model" label-align="top">
          <t-form-item label="行业类型" name="industry">
            <t-select v-model="model.industry">
              <t-option key="1" label="行业类型(全部)" value="1" />
              <t-option key="2" label="智慧园区" value="2" />
              <t-option key="3" label="智慧工业" value="3" />
              <t-option key="3" label="智慧水务" value="4" />
              <t-option key="3" label="智慧城市" value="5" />
            </t-select>
          </t-form-item>

          <t-form-item label="应用场景" name="scene">
            <t-select v-model="model.scene">
              <t-option key="1" label="应用场景(全部)" value="1" />
              <t-option key="2" label="公共服务" value="2" />
              <t-option key="3" label="能源管理" value="3" />
              <t-option key="4" label="气表制造" value="4" />
              <t-option key="5" label="人工智能" value="5" />
            </t-select>
          </t-form-item>
        </t-form>
      </div>

      <t-table class="border text-sm mt-8" row-key="index" :columns="columns" :data="tableData" :hover="true">
        <template #op="{ row }">
          <div>
            <t-link theme="primary" :underline="false" hover="color" @click="handleChoose(row)">选择</t-link>
          </div>
        </template>
      </t-table>
      <t-pagination class="-mx-16 mt-4" :total="30"
        theme="simple"
        :totalContent="false"
        showPreviousAndNextBtn
        :showPageSize="false"
        :showPageNumber="false"
        showJumper
        showFirstAndLastPageBtn />
    </t-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref(null)

const visible = ref(false)

const rules = {
  industry: [
    { required: true, message: '行业类型必填', type: 'error', trigger: 'blur' },
  ],
  scene: [
    { required: true, message: '应用场景必填', type: 'error', trigger: 'blur' },
  ],
}

const data = {
  industry: '1',
  scene: '',
}

const model = ref({ ...data })

const columns = [
  { colKey: 'name', title: '模板名称', width: '160px' },
  { colKey: 'industry', title: '行业类型' },
  { colKey: 'scene', title: '应用场景' },
  { colKey: 'op', title: '操作', width: '70px' },
]

const total = 10

const tableData = []

for (let i = 0; i < total; i++) {
  tableData.push({
    index: i,
    name: ['智能井盖', 'WiFi探针采集器', '智能仪表', '环境监测设备'][i % 4],
    industry: ['智慧工业', '智慧城市', '能源电力', '其它行业'][i % 4],
    scene: ['气表制造', '智慧工业', '水务市政', '环境感知'][i % 4],
  })
}

const handleChoose = () => {
  visible.value = false
}

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