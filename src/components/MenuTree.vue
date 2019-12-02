<template>
  <el-submenu v-if="menu.childs && menu.childs.length > 0" :index="menu.id + ''" :key="menu.id">
    <template slot="title">{{ menu.name }}</template>
      <MenuTree v-for="child in menu.childs" :key="child.id" :menu="child"/>
  </el-submenu>
  <el-menu-item v-else :index="menu.id + ''" :key="menu.id">{{ menu.name }}</el-menu-item>
</template>

<script>
export default {
  name: 'MenuTree',
  props: ['menu'],
};
</script>

<style scoped>

</style>
