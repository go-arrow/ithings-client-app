<template>
  <div>
    <t-card :bordered="false">
      <div class="flex justify-between">
        <h1 class="text-xl font-bold mb-4">行业类型</h1>
        <t-button>新建行业</t-button>
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
  { colKey: 'name', title: '名称' },
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
    name: [' 智慧城市 ', ' 智慧生活 ', ' 智慧工业 ', ' 智慧园区 '][i % 4],
    createAt: ['2022-01-12', '2023-11-22', '2022-08-07', '2023-04-02'][i % 4],
    updateAt: ['2023-08-26', '2022-11-02', '2022-07-02', '2022-06-01'][i % 4],
  })
}
</script>

<style scoped></style>