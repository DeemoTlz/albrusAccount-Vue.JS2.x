<template>
  <el-container>
    <el-main>
      <vueCanvasNest :config="NESTCONFIG"/>
      <img src="../assets/logo.png" alt="Albrus">
      <el-row :gutter="20">
        <el-col :span="6" :offset="9" class="block">
          <el-input style="margin-bottom: 15px;" placeholder="请输入账号" autofocus="true" size="medium" prefix-icon="fa fa-user-circle-o" v-model="form.username"/>
          <el-input style="margin-bottom: 15px;" type="password" placeholder="请输入密码" size="medium" prefix-icon="fa fa-key" v-model="form.password"/>
          <div class="drag" style="margin-bottom: 15px;">
            <div class="drag-bg"></div>
            <div class="drag-fly" ref="moveFly" @mousedown="mouseDown($event)" :style="{color : color}">
                <i class="fa" :class="[confirmSuccess ? 'fa-check-circle' : 'fa-fighter-jet']"/>
            </div>
            <div class="drag-move" ref="moveDiv">
              <span class="drag-text" :class="{'drag-not-confirm' : !confirmSuccess}">{{ confirmWords }}</span>
            </div>
          </div>

          <el-button type="primary" size="small" @click="toLogin">登录</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import store from '@/store/index';
import { ajaxLogin } from '@/utils/getResult';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: 'albrus',
        password: '123456',
      },
      beginClientX: 0,
      maxWidth: 0,
      mouseMoveStatus: false,
      confirmSuccess: false,
      confirmWords: '请按住滑块，拖拽到最右边',
      color: '#737383',
    };
  },
  methods: {
    toLogin() {
      if (this.confirmSuccess) {
        ajaxLogin('/login', this.form)
          .then((res) => {
            console.log(res);
            store.commit('setMenu', res.data.data);
            this.$router.push({ path: '/' });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    mouseDown(e) {
      if (!this.confirmSuccess) {
        // 阻止文字选中等浏览器默认事件
        e.preventDefault && e.preventDefault();
        this.mouseMoveStatus = true;
        this.beginClientX = e.clientX;
      }
    },
    mouseMove(e) {
      if (this.mouseMoveStatus) {
        const width = e.clientX - this.beginClientX;
        if (width > 0 && width <= this.maxwidth) {
          document.getElementsByClassName('drag-fly')[0].style.left = `${width}px`;
          document.getElementsByClassName('drag-bg')[0].style.width = `${width}px`;
        } else if (width > this.maxwidth) {
          this.successFunction();
        }
      }
    },
    mouseUp(e) {
      this.mouseMoveStatus = false;
      const width = e.clientX - this.beginClientX;
      if (width < this.maxwidth) {
        document.getElementsByClassName('drag-fly')[0].style.left = `${0}px`;
        document.getElementsByClassName('drag-bg')[0].style.width = `${0}px`;
      }
    },
    successFunction() {
      this.mouseMoveStatus = false;
      this.confirmSuccess = true;
      this.color = '#67C23A';
      this.confirmWords = '验证通过';
      if (window.addEventListener) {
        document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMove);
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.mouseUp);
      } else {
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', () => {
        });
      }
      document.getElementsByClassName('drag-text')[0].style.color = '#fff';
      document.getElementsByClassName('drag-fly')[0].style.left = `${this.maxwidth}px`;
      document.getElementsByClassName('drag-bg')[0].style.width = `${this.maxwidth}px`;
    },
  },
  mounted() {
    this.maxwidth = this.$refs.moveDiv.clientWidth - this.$refs.moveFly.clientWidth - 2;
    document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMove);
    document.getElementsByTagName('html')[0].addEventListener('mouseup', this.mouseUp);
  },
};
</script>

<style scoped>
  .block {
    padding: 24px;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
  }

  .drag {
    position: relative;
    background-color: #e8e8e8;
    border-radius: 4px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
  }

  .drag-bg {
    background-color: #7ac23c;
    position: absolute;
    height: 36px;
    width: 0;
  }

  .drag-fly {
    position: absolute;
    height: 34px;
    line-height: 34px;
    width: 38px;
    color: #737383;
    background: #fff;
    border: 1px solid #ccc;
    z-index: 2;
    cursor: move;
  }

  .drag-move {
    font-size: 12px;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
    line-height: 36px;
    cursor: pointer;
  }

  .drag-text {
    display: inline-block;
    width: 100%;
    font-size: 12px;
  }

  .drag-not-confirm {
     background: -webkit-gradient(linear, left top, right top, color-stop(0, #4d4d4d), color-stop(.4, #4d4d4d), color-stop(.5, #fff), color-stop(.6, #4d4d4d), color-stop(1, #4d4d4d));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: slideToUnlock 3s linear infinite;
    -moz-animation: slideToUnlock 3s linear infinite;
    -o-animation: slideToUnlock 3s linear infinite;
    animation: slideToUnlock 3s linear infinite;
  }

  @-webkit-keyframes slideToUnlock {
    0% {
      background-position: -200px 0
    }
    100% {
      background-position: 200px 0
    }
  }

  @-moz-keyframes slideToUnlock {
    0% {
      background-position: -200px 0
    }
    100% {
      background-position: 200px 0
    }
  }

  @-ms-keyframes slideToUnlock {
    0% {
      background-position: -200px 0
    }
    100% {
      background-position: 200px 0
    }
  }

  @keyframes slideToUnlock {
    0% {
      background-position: -200px 0
    }
    100% {
      background-position: 200px 0
    }
  }
</style>
