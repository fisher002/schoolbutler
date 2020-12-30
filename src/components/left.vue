<template>
  <div class="left_box">
    <div class="user_msg" v-if="userdata">
      <img width="50" height="50" :src="userdata.avatar" />
      <div class="box_msg">
        <el-dropdown trigger="hover" @command="myOperation">
          <span class="el-dropdown-link font-size"
            >{{ userdata.name }} | 欢迎您</span
          >
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="myMsg">个人中心</el-dropdown-item>
            <el-dropdown-item command="outLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="other"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userdata: {
        avatar: "../../static/img/2023.jpg",
        name: "",
      },
    };
  },
  created() {
    this.userdata.name =
      sessionStorage.getItem("teacherName") == "null"
        ? "管理员"
        : sessionStorage.getItem("teacherName");
  },
  methods: {
    // 获取教师信息
    getTeacher() {},
    myOperation(res) {
      switch (res) {
        case "myMsg":
          break;
        case "outLogin":
          sessionStorage.clear();
          this.$store.commit("resetState");
          this.$router.replace({ path: "/" });
          location.reload();
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.left_box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .user_msg {
    width: 100%;
    cursor: pointer;
    height: 50px;
    border-radius: 5px;
    background: #434950;
    display: flex;
    justify-content: center;
    img {
      border-radius: 50%;
    }
    .box_msg {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      .font-size {
        font-size: 16px;
        color: #fff;
      }
    }
  }
  .other {
    width: 100%;
  }
}
</style>