<template>
  <el-container>
    <vueCanvasNest :config="NESTCONFIG"/>
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <MenuTree v-for="menu in menus" :key="menu.id" :menu="menu"/>
      </el-menu>
    </el-header>
    <el-main>
      <div class="hello">
        <h1>{{ msg }}</h1>
        <el-row>
          <el-button type="primary" size="small" @click="toLogin">登录</el-button>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import MenuTree from '@/components/MenuTree.vue';
import store from '@/store/index';
import { ajaxGet } from '@/utils/getResult';

export default {
  name: 'HelloWorld',
  /* props: {
    msg: String,
  }, */
  components: { MenuTree },
  data() {
    return {
      activeIndex: '111',
      msg: 'Welcome to Your Vue.js App',
      menus: store.state.menu,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toLogin() {
      // this.$http.get('/login')
      ajaxGet('/login');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
