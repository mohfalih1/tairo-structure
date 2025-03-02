 <script setup lang="ts">
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const props = defineProps<{
  label?: String
}>()

const model = defineModel()
const toolbars: string[] = [
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
]
const onUploadImg = async (files: FileList, callback) => {
  console.log(files)
};

</script>

<template>
  <div>
    <span class="nui-input-label text-label pb-1 text-[#94a3b8cc] block"> {{ props.label }} </span>
    <MdEditor v-model="model" theme="dark" language="en-US" dir="ltr" :toolbars="toolbars" @onUploadImg="onUploadImg" />
  </div>
</template> 
