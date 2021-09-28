<template>
    <el-tooltip 
        class="item" popper-class="blue-light" effect="dark"
        :content="content" 
        placement="right-end">
        <span>{{ label }} <span v-if="required" class="text-danger">*</span> </span>
    </el-tooltip>
</template>

<script>
export default {
    props: {
        label: '',
        content: '',
        required: Boolean
    }
}
</script>

<style>

</style>