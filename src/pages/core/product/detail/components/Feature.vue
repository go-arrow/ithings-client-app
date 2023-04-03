<template>
  <div class="mt-4">
    <t-form class="mb-4" ref="form" :data="model" layout="inline" label-width="0">
      <t-form-item>
        <t-select v-model="model.type">
          <template #prefixIcon>
            <span style="margin-right: 4px" />
          </template>
          <t-option key="1" label="功能类型(全部)" value="1" />
          <t-option key="2" label="属性" value="2" />
          <t-option key="3" label="事件" value="3" />
          <t-option key="3" label="服务" value="4" />
        </t-select>
      </t-form-item>
    </t-form>

    <t-table class="border" row-key="index" :columns="columns" :data="data" :pagination="pagination" :hover="true">
      <template #op="{ row }">
        <t-link theme="primary" :underline="false" hover="color">查看</t-link>
      </template>
    </t-table>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'

const form = ref(null)

const model = ref({
  type: '1',
})

const columns = [
  { colKey: 'type', title: '功能类型' },
  { colKey: 'name', title: '功能名称' },
  { colKey: 'identifier', title: '标识符' },
  { colKey: 'dataType', title: '数据类型' },
  { colKey: 'data', title: '数据值定义', width: '400px' },
  { colKey: 'mode', title: '读写类型' },
  { colKey: 'op', title: '操作' },
]

const data = []
const total = 100

const pagination = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  total,
}

for (let i = 0; i < total; i++) {
  data.push({
    type: ['属性', '事件', '服务'][i % 3],
    name: ['温度', '地理位置', '能耗', '错误处理'][i % 4],
    identifier: ['Temperature', 'Address', 'Power', 'Error'][i % 4],
    dataType: ['float(浮点型)', '-', 'struct(结构体)', 'enum(枚举性)'][i % 4],
    data: ['取值范围：-55-80步长：0.1；单位：摄氏度 / °C', '事件类型：告警	', '服务调用'][i % 3],
    mode: ['只读', '-', '读写', '读写', '-'][i % 5],
  })
}

const add = () => {
  panel.value.show()
}

</script>
  
<style scoped></style>