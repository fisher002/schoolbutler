<template>
  <div ref="loginbody" class="login_body">
    <div class="login_box">
      <div class="left_content">
        <p class="left_author left_font">{{ proData.pro_author }}</p>
        <p class="left_font">{{ proData.pro_name }}</p>
        <p class="left_detail left_font">{{ proData.pro_detail }}</p>
        <p class="left_date left_font">
          开始时间：{{ proData.pro_start_date }}
        </p>
        <p class="left_date left_font">截止时间：{{ proData.pro_end_date }}</p>
      </div>
      <div class="right_login_form">
        <div class="form_tabs">账号密码登录</div>
        <div class="form_input">
          <div class="form_input_item">
            <el-input
              class="input_pad"
              placeholder="请输入账号"
              v-model="userData.username"
              clearable
            >
            </el-input>
            <el-input
              class="input_pad"
              placeholder="请输入密码"
              v-model="userData.password"
              show-password
              @keyup.enter.native="checkInput"
            ></el-input>
            <div class="forget_password">
              <span title="忘记密码？点击可找回" class="for_font"
                >忘记密码?</span
              >
            </div>
            <el-button
              @click="checkInput"
              class="login_btn input_pad"
              type="primary"
              size="medium"
              >立即登录</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { proData } from "@/datas/projectdata";
import api from "./loginUrl";
export default {
  data() {
    return {
      height: 0,
      width: 0,
      activeName: "user",
      userData: {
        username: "",
        password: "",
      },
      proData: proData ? proData : "",
    };
  },
  created() {
    this.height = window.screen.availHeight - 71;
    this.width = document.body.clientWidth;
  },
  mounted() {
    this.handleBgColor(this.$refs.loginbody);
  },
  methods: {
    /**处理背景渐变,$refs只有在vue实例挂载后才生效 */
    handleBgColor(bg) {
      const bgcolor = ["#7878f3", "#A0EEE1", "#D6D5B7", "#BEE7E9"];
      bg.style.height = this.height + "px";
      let i = 0;
      setInterval(() => {
        bg.style.backgroundColor = bgcolor[i];
        i++;
        if (i >= 3) {
          i = 0;
        }
      }, 6000);
    },
    checkInput() {
      if (this.userData.username === "" || this.userData.password === "") {
        return this.$message.error("账号或密码不能为空");
      }
      this.setToken("f5f5f5f5f5ggga546");
      let mdata = {
        username: this.userData.username,
        password: this.$md5(this.userData.password),
      };
      api.checkLogin(mdata).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 获取token
    setToken(token) {
      this.$store.commit("setToken", token);
      sessionStorage.setItem("token", this.$store.getters.getToken);
    },
  },
};
</script>
<style scoped lang="scss">
.login_body {
  width: 100%;
  height: auto;
  background-color: #7878f3;
  transition: background-color 3s;
  -webkit-transition: background-color 3s;
  -moz-transition: background-color 3s;
  display: flex;
  justify-content: center;
  .login_box {
    max-width: 850px;
    height: 500px;
    border-radius: 3px;
    margin-top: 200px;
    display: flex;
    overflow: hidden;
    justify-content: center;
    .left_content {
      width: 40%;
      background: rgba(0, 0, 0, 0.4);
      padding: 20px 15px;
      letter-spacing: 0.5px;
      .left_font {
        text-align: left;
        color: #fff;
      }
      .left_author {
        font-size: 22px;
        font-weight: bold;
      }
      .left_detail {
        line-height: 34px;
      }
      .left_date {
        padding: 5px 0;
      }
    }
    .right_login_form {
      width: 60%;
      background: azure;
      padding: 30px 5px;
      .form_tabs {
        width: 100%;
        font-size: 18px;
        padding: 20px 0;
      }
      .form_input {
        width: 100%;
        display: flex;
        justify-content: center;
        .form_input_item {
          width: 55%;
        }
      }
    }
  }
}
.input_pad {
  margin: 10px 0;
}
.login_btn {
  width: 100%;
}
.forget_password {
  width: 100%;
  text-align: end;
  font-size: 14px;
}
.for_font {
  cursor: pointer;
}
.for_font:hover {
  color: #7878f3;
}
</style>