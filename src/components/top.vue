<template>
  <div class="index_top">
    <div class="img_ico">
      <img src="../../static/img/index_ico.png" />
    </div>
    <div class="menu_one">
      <el-menu
        :default-active="active"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#434950"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu
          v-for="item in menuData"
          :key="item.name"
          :index="item.name"
          v-show="item.children"
        >
          <template slot="title">{{ item.label }}</template>
          <el-menu-item
            v-for="(it, i) in item.children"
            :key="i"
            :index="it.path"
            @click="handleSelect(item, it)"
            >{{ it.label }}</el-menu-item
          >
        </el-submenu>
        <el-menu-item
          v-for="(item, index) in menuData"
          :key="index"
          :index="item.path"
          v-show="item.children == null"
          @click="handleSelect(item)"
          >{{ item.label }}</el-menu-item
        >
      </el-menu>
    </div>
  </div>
</template>
<script>
import adminMenu from "@/datas/menuAdmin";
import teacherMenu from "@/datas/menuTeacher"
export default {
  props: ["userType"],
  data() {
    return {
      active: "basedata",
      menuData: [],
    };
  },
  created() {
    // 检查登录类型
    if (sessionStorage.getItem("user_type")) {
      let menu =
        sessionStorage.getItem("user_type") === "admin" ? adminMenu : teacherMenu;
      this.menuData = [...menu];
    }
  },
  methods: {
    // 用户选择二级菜单后
    handleSelect(item, child) {
      this.$store.commit("clearIndexBreakData"); // 先清除面包屑缓存
      let breakData = [{ label: item.label }];
      if (item.path) {
        breakData[0].path = item.path;
        this.$emit("callBackBreak", item.path);
      }
      if (child != undefined) {
        breakData.push({ label: child.label, path: child.path });
        this.$emit("callBackBreak", child.path);
      }
      this.$store.commit("setIndexBreakData", breakData);
    },
  },
};
</script>
<style lang="scss" scoped>
.index_top {
  width: 100%;
  display: flex;
  background-color: rgb(67, 73, 80);
  padding: 5px 0;
  .img_ico {
    padding: 0 5px;
  }
  .menu_one {
    color: #fff;
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}
</style>