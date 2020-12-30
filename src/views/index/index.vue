<template>
  <div>
    <el-container>
      <el-header style="height: aotu; padding: 0">
        <my-top userType="123" @callBackBreak="callBackBreak"></my-top>
      </el-header>
      <el-container>
        <el-aside :width="isHide ? '30px' : '230px'" class="left_side">
          <my-left></my-left>
          <div class="right_btn" @click.stop="isHide = !isHide">
            <i :class="isHide ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </div>
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
import left from "@/components/left";
export default {
  components: {
    "my-top": top,
    "my-left": left,
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
        this.$router.replace({ path: res });
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
  padding: 5px 0;
  font-size: 14px;
  display: flex;
  .now_location {
    line-height: 1;
    color: #606266;
  }
}
.left_side {
  margin: 5px 2px 8px;
  padding: 0px 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  border-radius: 5px;
  width: auto;
  transition: width 1s;
  overflow: hidden;
  position: relative;
}
.left_side:hover .right_btn {
  opacity: 1;
}
.el-divider--vertical {
  margin: 5px 8px !important;
  height: auto !important;
}
.right_btn {
  position: absolute;
  top: 50%;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  z-index: 9999;
  background: #dcdcdc;
  cursor: pointer;
  line-height: 30px;
  opacity: 0;
  transition: opacity 1s;
}
</style>