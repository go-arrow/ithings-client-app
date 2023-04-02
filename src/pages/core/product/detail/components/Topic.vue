<template>
  <div class="mt-4">
    <table>
      <tr>
        <th>功能</th>
        <th>Topic类</th>
        <th>操作权限</th>
        <th>描述</th>
      </tr>
      <tr>
        <td rowspan="2">属性上报</td>
        <td>/sys/a1J3zJpJxSJ/${deviceName}/thing/event/property/post</td>
        <td>发布</td>
        <td>设备属性上报</td>
      </tr>
      <tr>
        <td>/sys/a1J3zJpJxSJ/${deviceName}/thing/event/property/post_reply</td>
        <td>订阅</td>
        <td>云端响应属性上报</td>
      </tr>
      <tr>
        <td>属性设置</td>
        <td>/sys/a1J3zJpJxSJ/${deviceName}/thing/service/property/set</td>
        <td>订阅</td>
        <td>设备属性设置</td>
      </tr>
      <tr>
        <td rowspan="2">事件上报</td>
        <td>/sys/a1J3zJpJxSJ/${deviceName}/thing/event/${tsl.event.identifier}/post</td>
        <td>发布</td>
        <td>设备事件上报</td>
      </tr>
      <tr>
        <td>/sys/a1J3zJpJxSJ/${deviceName}/thing/event/property/post</td>
        <td>订阅</td>
        <td>云端响应事件上报</td>
      </tr>
      <tr>
        <td rowspan="2">服务调用</td>
        <td>/sys/a1J3zJpJxSJ/${deviceName}/thing/service/${tsl.service.identifier}</td>
        <td>订阅</td>
        <td>设备服务调用</td>
      </tr>
      <tr>
        <td>/sys/a1J3zJpJxSJ/${deviceName}/thing/service/${tsl.service.identifier}_reply</td>
        <td>发布</td>
        <td>设备端响应服务调用</td>
      </tr>
    </table>
  </div>
</template>

<script setup>

</script>

<style scoped>
table {
  width: 100%;
}

table,
th,
td {
  border: 1px solid #ebebeb;
  padding: 5px;
  padding: 12px 16px;
  font-size: 13px;
}

th {
  color: #73777a;
  padding: 8px 16px;
  background-color: #fafafa;
}
</style>