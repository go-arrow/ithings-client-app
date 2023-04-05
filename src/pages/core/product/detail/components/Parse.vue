<template>
  <div>
    <div class="bg-gray-100 p-3">
      脚本语言: <span class="font-bold">Python 3.x</span>
    </div>

    <codemirror v-model="code" :language="python" :style="{ height: '350px', fontSize: '16px' }" :autofocus="true"
      :indent-with-tab="true" :tab-size="4" :extensions="editorExtensions" />

    <t-row>
      <t-col :span="6" class="border">
        <div class="bg-gray-100 p-2 font-bold">模拟输入</div>
        <codemirror v-model="input" :language="python" placeholder="// 二进制数据以0x开头的十六进制输入，字符串数据输入原始字符串"
          :style="{ height: '200px', fontSize: '13px' }" :autofocus="true" :indent-with-tab="true" :tab-size="4"
          :extensions="inputExtensions" />
      </t-col>
      <t-col :span="6" class="border">
        <div class="bg-gray-100 p-2 font-bold">结果输出</div>
        <div class="h-[200px] pl-2 pt-[6px] text-gray-400 text-[13px]">输出内容:</div>
      </t-col>
    </t-row>

    <div class="mt-4">
      <t-button theme="success" class="mr-2">
        <template #icon><caret-right-icon /></template>
        执行
      </t-button>
      <t-button>
        <template #icon><save-icon /></template>
        保存</t-button>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import { CaretRightIcon, SaveIcon } from 'tdesign-icons-vue-next'

import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { autocompletion } from '@codemirror/autocomplete'

const code = ref(`print('hello, world')`)

const editorExtensions = [python(), autocompletion({ activateOnTyping: true }), oneDark]

const input = ref('')
const inputExtensions = [python()]

</script>

<style scoped></style>