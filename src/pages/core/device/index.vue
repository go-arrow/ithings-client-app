<template>
  <div>
    <t-card :bordered="false">
      <h1 class="text-xl font-bold mb-4">设备管理</h1>

      <div class="flex">
        <t-select v-model="product" class="w-[200px] mt-2">
          <t-option key="1" label="全部产品" value="1" />
          <t-option key="2" label="威傲流量计" value="2" />
          <t-option key="3" label="振动传感器" value="3" />
        </t-select>
        <div class="border-l ml-12 pl-4">
          <div class="text-gray-400 text-[14px] mb-1">设备总数</div>
          <div class="text-2xl font-bold">26</div>
        </div>
        <div class="border-l ml-12 pl-4">
          <div class="text-gray-400 text-[14px] mb-1">
            <div class="rounded-full w-2 h-2 bg-blue-600 inline-block"></div>
            激活设备数
          </div>
          <div class="text-2xl font-bold">3</div>
        </div>
        <div class="border-l ml-12 pl-4">
          <div class="text-gray-400 text-[14px] mb-1">
            <div class="rounded-full w-2 h-2 bg-green-600 inline-block"></div>
            在线设备数
          </div>
          <div class="text-2xl font-bold">14</div>
        </div>
      </div>

      <div class="border border-dashed my-4 -mx-6"></div>

      <div class="flex justify-between">
        <t-form class="mb-4" ref="form" :data="model" layout="inline" label-width="0">
          <t-form-item>
            <t-select v-model="model.type" class="w-[200px]">
              <t-option key="1" label="设备状态" value="1" />
              <t-option key="2" label="在线" value="2" />
              <t-option key="3" label="离线" value="3" />
              <t-option key="4" label="未激活" value="4" />
            </t-select>
            <t-input v-model="model.search" placeholder=" 请输入设备名称" class="ml-4">
              <template #suffix-icon>
                <search-icon class="cursor-pointer" />
              </template>
            </t-input>
          </t-form-item>
        </t-form>
        <t-button @click="add">新建设备</t-button>
      </div>

      <t-table class="border" row-key="index" :columns="columns" :data="data" :pagination="pagination" :hover="true">
        <template #status="{ row }">
          <div v-if="row.status == '1'">
            <div class="rounded-full w-2 h-2 bg-green-600 inline-block"></div>
            在线
          </div>
          <div v-else-if="row.status == '2'">
            <div class="rounded-full w-2 h-2 bg-red-600 inline-block"></div>
            离线
          </div>
          <div v-else-if="row.status == '3'">
            <div class="rounded-full w-2 h-2 bg-gray-600 inline-block"></div>
            未激活
          </div>
        </template>

        <template #op="{ row }">
          <div>
            <t-link theme="primary" :underline="false" hover="color">激活</t-link>
            <label class="px-2 text-gray-400">/</label>
            <t-link theme="primary" :underline="false" hover="color" @click="handleDetail(row)">详情</t-link>
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
import { useRouter } from 'vue-router'

import Panel from './components/Panel.vue'

const product = ref('1')

const form = ref(null)

const model = ref({
  type: '1',
  search: '',
})

const columns = [
  { colKey: 'name', title: '名称' },
  { colKey: 'product', title: '所属产品' },
  { colKey: 'status', title: '设备状态' },
  { colKey: 'nodeType', title: '节点类型' },
  { colKey: 'createAt', title: '添加时间' },
  { colKey: 'updateAt', title: '最近在线时间' },
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
    name: ['智能水井盖', '智能WiFi连接块', '电流电压采集器', 'PM2.5采集器'][i % 4],
    product: ['智能井盖', 'WiFi探针采集器', '智能仪表', '环境监测设备'][i % 4],
    status: ['1', '2', '3'][i % 3],
    nodeType: ['直连设备', '网关设备', '网关子设备'][i % 3],
    createAt: ['2022-01-12', '2023-11-22', '2022-08-07', '2023-04-02'][i % 4],
    updateAt: ['2022-01-12', '2023-11-22', '2022-08-07', '2023-04-02'][i % 4],
  })
}

const panel = ref(null)
const add = () => {
  panel.value.show()
}

const router = useRouter()

const handleDetail = (row) => {
  router.push({
    name: 'deviceDetail'
  })
}
</script>

<style scoped></style>