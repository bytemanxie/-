<template>
  <div class="bread-crumb">
    <IconHeart/>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{props.item.first}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="props.item.second">{{props.item.second}}</el-breadcrumb-item>
    </el-breadcrumb>

    
  </div>
</template>

<script setup>
    const props = defineProps(['item'])
    import IconHeart from '@/components/IconHeart.vue';

</script>

<style lang="scss" scoped="scoped">
    .bread-crumb{
        height: 30px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        margin-left: 4px;
    }

    :deep(.el-breadcrumb__item){
        height: 30px;
        font-size: 14px;
        line-height: 30px; 
    }

    :deep(.bread-crumb__inner){
        font-weight: 500;
    }

    
</style>