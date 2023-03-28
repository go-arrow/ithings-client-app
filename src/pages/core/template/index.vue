<template>
  <div>
    <t-card :bordered="false">
      <h1 class="text-xl font-bold mb-4">功能模板</h1>
      
      <t-alert class="mb-4 rounded" message="模板库提供已发布的标准物模版查看功能，开发者可在页面查看各行业/场景下的品类物模版功能定义信息，同时可提交新品类物模版申请，通过审核的物模版将会在平台上正式发布。" />
      
      <t-row>
        <t-col :span="6">
          <t-form class="mb-4" ref="form" :data="model" layout="inline"  label-width="0">
            <t-form-item>
              <t-select v-model="model.industry">
                <t-option key="1" label="行业类型(全部)" value="1" />
                <t-option key="2" label="智慧园区" value="2"/>
                <t-option key="3" label="智慧工业" value="3" />
                <t-option key="3" label="智慧水务" value="4" />
                <t-option key="3" label="智慧城市" value="5" />
              </t-select>
            </t-form-item>

            <t-form-item>
              <t-select v-model="model.scene">
                <t-option key="1" label="应用场景(全部)" value="1" />
                <t-option key="2" label="公共服务" value="2"/>
                <t-option key="3" label="能源管理" value="3" />
                <t-option key="4" label="气表制造" value="4" />
                <t-option key="5" label="人工智能" value="5" />
              </t-select>
            </t-form-item>

            <t-form-item>
              <t-input v-model="model.search" placeholder="请输入搜索条件">
                <template #suffix-icon>
                  <search-icon class="cursor-pointer"/>
                </template>
              </t-input>
            </t-form-item>
          </t-form>
        </t-col>
        <t-col :span="6" class="flex justify-end">
          <t-button>新建模板</t-button>
        </t-col>
      </t-row>

      <t-table class="border" row-key="index" :columns="columns" :data="data" :pagination="pagination" :hover="true">
        <template #op="{row}">
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SearchIcon } from 'tdesign-icons-vue-next'

const form = ref(null)

const model = ref({
  industry: '1',
  scene: '1',
  search: '',
})

const columns = [
  { colKey: 'name', title: '名称' },
  { colKey: 'industry', title: '行业类型' },
  { colKey: 'scene', title: '应用场景' },
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
    index: i,
    name: ['智能井盖', 'WiFi探针采集器', '智能仪表', '环境监测设备'][i % 4],
    industry: ['智慧工业', '智慧城市', '能源电力', '其它行业'][i % 4],
    scene: ['气表制造', '智慧工业', '水务市政', '环境感知'][i % 4], 
  })
}


</script>

<style scoped></style>