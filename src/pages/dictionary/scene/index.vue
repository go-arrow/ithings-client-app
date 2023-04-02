<template>
  <div>
    <t-card :bordered="false">
      <div class="flex justify-between">
        <h1 class="text-xl font-bold mb-4">应用场景</h1>
        <div class="flex">
          <t-select class="mr-4" value="1">
            <t-option key="1" label="行业类型(全部)" value="1" />
            <t-option key="2" label="智慧园区" value="2" />
            <t-option key="3" label="智慧工业" value="3" />
            <t-option key="3" label="智慧水务" value="4" />
            <t-option key="3" label="智慧城市" value="5" />
          </t-select>
          <t-button>新建场景</t-button>
        </div>
      </div>

      <t-table class="border" row-key="index" :columns="columns" :data="data" :pagination="pagination" :hover="true">
        <template #op="{ row }">
          <t-link theme="primary" :underline="false" hover="color">编辑</t-link>
          <label class="px-2 text-gray-400">/</label>
          <t-popconfirm content="确认删除吗">
            <t-link theme="primary" :underline="false" hover="color">删除</t-link>
          </t-popconfirm>
        </template>
      </t-table>
    </t-card>
  </div>
</template>

<script setup>
const columns = [
  { colKey: 'id', title: 'ID' },
  { colKey: 'industry', title: '所属行业' },
  { colKey: 'scene', title: '应用名称' },
  { colKey: 'createAt', title: '创建时间' },
  { colKey: 'updateAt', title: '更新时间' },
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
    id: i,
    industry: [' 智慧城市 ', ' 智慧生活 ', ' 智慧工业 ', ' 智慧园区 '][i % 4],
    scene: [' 气表制造 ', ' 智慧市政 ', ' 日常办公 ', ' 安全社区 '][i % 4],
    createAt: ['2022-01-12', '2023-11-22', '2022-08-07', '2023-04-02'][i % 4],
    updateAt: ['2023-08-26', '2022-11-02', '2022-07-02', '2022-06-01'][i % 4],
  })
}
</script>

<style scoped></style>