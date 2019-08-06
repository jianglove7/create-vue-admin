<template>
  <div class="LoginPage">
    <el-card class="LoginPage__wrap">
      <div slot="header" class="clearfix">
        <span>欢迎登陆</span>
      </div>
      <el-form>
        <el-form-item prop="userName">
          <el-input v-model="form.userName" placeholder="用户名" @keyup="handleKeyUp($event)">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input v-model="form.userName" placeholder="密码" @keyup="handleKeyUp($event)">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit()">登陆</el-button>
        </el-form-item>
        <p class="tips">任意输入用户名、密码</p>
      </el-form>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      returnUrl: '',
      value: '',
      form: {
        userName: '',
        passWord: ''
      }
    };
  },
  mounted() {
    if (this.$route.query.returnUrl) {
      this.returnUrl = this.$route.query.returnUrl;
    }
  },
  methods: {
    handleKeyUp(event) {
      if (event.keyCode === 13) {
        this.submit();
      }
    },
    submit() {
      this.$store.dispatch('Login', {
        userName: this.form.userName,
        passWord: this.form.passWord
      }).then(res => {
        if (this.returnUrl && this.returnUrl.length > 0) {
          window.location.href = this.returnUrl;
          if ((window.ActiveXObject || 'ActiveXObject' in window)) {
            location.reload();
          }
        } else {
          this.$router.push('/index');
        }
      });
    }
  }
};

</script>

<style lang="scss" scoped>
  .LoginPage {
    height: 100%;
    width: 100%;
    position: fixed;
    background: url('https://img.ccode.live/image/jpg/login.jpglogin-bg.29b543c1.jpg') no-repeat center center;
    &__wrap{
      
      position: absolute;
      right: 10%;
      top:50%;
      width: 330px;
      transform:translateY(-50%)
    }
    
  }

  .el-button {
    width: 100%;
  }
  .tips{
    color: #999;
    font-size: 12px;
  }

</style>
