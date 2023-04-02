<template>
  <div>
    <t-card :bordered="false">
      <h1 class="text-xl font-bold mb-4">产品管理</h1>

      <t-alert class="mb-4 rounded" message="产品是一组具有相同功能定义的设备集合，创建产品是使用平台的第一步，快速创建产品后可定义产品物模型、添加对应设备。" />

      <div class="flex justify-between">
        <t-form class="mb-4" ref="form" :data="model" layout="inline" label-width="0">
          <t-form-item>
            <t-select v-model="model.type" class="w-[112px]">
              <template #prefixIcon>
                <span style="margin-right: 4px" />
              </template>
              <t-option key="1" label="产品名称" value="1" />
              <t-option key="2" label="产品厂商" value="2" />
              <t-option key="3" label="产品型号" value="3" />
            </t-select>
            <t-input v-model="model.search" placeholder="请输入搜索条件" class="-mx-1">
              <template #suffix-icon>
                <search-icon class="cursor-pointer" />
              </template>
            </t-input>
          </t-form-item>
        </t-form>
        <t-button @click="add">新建产品</t-button>
      </div>

      <t-table class="border" row-key="index" :columns="columns" :data="data" :pagination="pagination" :hover="true">
        <template #op="{ row }">
          <div>
            <t-link theme="primary" :underline="false" hover="color">详情</t-link>
            <label class="px-2 text-gray-400">/</label>
            <t-popconfirm content="确认删除吗">
              <t-link theme="primary" :underline="false" hover="color">删除</t-link>
            </t-popconfirm>
          </div>
        </template>
      </t-table>
    </t-card>

    <Panel ref="panel" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SearchIcon } from 'tdesign-icons-vue-next'
import Panel from './components/Panel.vue'

const form = ref(null)

const model = ref({
  type: '1',
  search: '',
})

const columns = [
  { colKey: 'id', title: 'ID' },
  { colKey: 'name', title: '名称' },
  { colKey: 'industry', title: '行业类型' },
  { colKey: 'scene', title: '应用场景' },
  { colKey: 'nodeType', title: '节点类型' },
  { colKey: 'accessProtocol', title: '接入协议' },
  { colKey: 'dataFormat', title: '数据格式' },
  { colKey: 'deviceNum', title: '设备数量' },
  { colKey: 'createAt', title: '创建时间' },
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
    id: 'MSNoWK1vIo',
    name: ['智能井盖', 'WiFi探针采集器', '智能仪表', '环境监测设备'][i % 4],
    industry: ['智慧工业', '智慧城市', '能源电力', '其它行业'][i % 4],
    scene: ['气表制造', '智慧工业', '水务市政', '环境感知'][i % 4],
    nodeType: ['直连设备', '网关设备', '网关子设备'][i % 3],
    linkProtocol: ['HTTP', 'MQTT', 'LwM2M', 'CoAP', 'TCP'][i % 5],
    dataFormat: ['PlainText', 'Binary', 'JSON', 'Modbus', '其它'][i % 5],
    deviceNum: ['2', '10', '0', '1', '4'][i % 5],
    createAt: ['2022-01-12', '2023-11-22', '2022-08-07', '2023-04-02'][i % 4],
  })
}

const panel = ref(null)

const add = () => {
  panel.value.show()
}
</script>

<style scoped></style>