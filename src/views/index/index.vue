<template>
  <div>
    <el-container>
      <el-header style="height: aotu; padding: 0">
        <my-top userType="123" @callBackBreak="callBackBreak"></my-top>
      </el-header>
      <el-container>
        <el-aside :width="isHide ? '15px' : '200px'" class="left_side">
          <el-button
            type="primary"
            style="width: 100%"
            :icon="isHide ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="isHide = !isHide"
          ></el-button>
        </el-aside>
        <el-main style="padding: 0 3px">
          <div class="bread_crumb">
            <span class="now_location">当前位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item
                v-for="(item, index) in breakData"
                :key="index"
                >{{ item.label }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import top from "@/components/top";
export default {
  components: {
    "my-top": top,
  },
  data() {
    return {
      breakData: [],
      isHide: false,
    };
  },
  created() {
    // 页面f5刷新后更新breakData
    if (sessionStorage.getItem("storeState")) {
      this.breakData =
        JSON.parse(sessionStorage.getItem("storeState")).indexBreakData ||
        this.$store.getters.getIndexBreakData;
    }
  },
  methods: {
    callBackBreak(res) {
      if (res) {
        this.breakData = this.$store.getters.getIndexBreakData;
        this.$router.push({ path: res });
      }
    },
    addBreak() {
      this.breakData.push({ label: "xx详情", path: "/xx/xxx" });
    },
  },
};
</script>
<style scoped lang="scss">
.bread_crumb {
  width: 100%;
  padding: 5px 0;
  font-size: 14px;
  display: flex;
  .now_location {
    line-height: 1;
    color: #606266;
  }
}
.left_side {
  padding: 5px 3px;
  width: auto;
  transition: width 1s;
  overflow: hidden;
}
</style>