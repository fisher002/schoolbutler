<template>
  <div class="table-box">
    <div v-if="showType == false">
      <div class="box-top">
        <div class="top-left">
          <el-input
            placeholder="请输入专业名"
            v-model="params.name"
            clearable
          ></el-input>
          <div style="width: 10px"></div>
          <el-input
            placeholder="请输入二级学院名"
            v-model="params.collegeName"
            clearable
          ></el-input>
          <div style="width: 10px"></div>
          <el-button type="primary" icon="el-icon-search" @click="search()"
            >查询</el-button
          >
        </div>
        <div class="top-right">
          <span>
            已选择
            <span>{{ selectionData.length + " " }}</span
            >项
          </span>
          <div style="width: 10px"></div>
          <el-button
            size="mini"
            type="danger"
            :disabled="selectionData.length <= 0"
            icon="el-icon-delete"
            @click="handleDelete()"
            >删除</el-button
          >
          <div style="width: 10px"></div>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="toDetail(null, 'add')"
            >新增</el-button
          >
        </div>
      </div>
      <el-divider></el-divider>
      <div>
        <el-table
          v-loading="loading"
          :data="data.data"
          tooltip-effect="dark"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column
            type="selection"
            align="center"
            width="55"
          ></el-table-column>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="name"
            align="center"
            sortable
            label="专业名称"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="collegeName"
            align="center"
            sortable
            label="二级学院名称"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="createDate"
            align="center"
            sortable
            label="注册时间"
            width="200"
          >
            <template slot-scope="scope">
              <span>{{ formatDate(scope.row.createDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="editDate"
            align="center"
            sortable
            label="编辑时间"
            width="200"
          >
            <template slot-scope="scope">
              <span>{{ formatDate(scope.row.editDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="isDelete"
            align="center"
            sortable
            label="状态"
            width="150"
          >
            <template slot-scope="scope">
              <span
                :style="{
                  color: scope.row.isDelete == 'N' ? '#1fca1f' : 'red',
                }"
                >{{ scope.row.isDelete == "N" ? "可用" : "审核中" }}</span
              >
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="20">
            <template slot-scope="scope">
              <el-button
                @click="toDetail(scope.row.id, 'detail')"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button
                @click="toDelete(scope.row.id)"
                type="text"
                size="small"
                style="color: red"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-number">
        <el-pagination
          background
          @current-change="pageNumberChange"
          :current-page="params.pageNumber"
          layout="total, prev, pager, next, jumper"
          :total="data.data ? data.data.length : 0"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import api from "./specialitymanageUrl";
import comm from "@/util/util";
export default {
  components: {},
  data() {
    return {
      loading: false,
      showType: false,
      data: "",
      selectionData: "",
      params: {
        name: "",
        collegeName: "",
        collegeId: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      this.loading = true;
      api.getList(this.params).then(
        (res) => {
          if (res.data.code == 10000) {
            this.loading = false;
            this.$message.success(res.data.msg);
            this.data = res.data;
            return;
          }
          this.loading = false;
          this.$message.error(res.data.msg);
        },
        (res) => {
          this.loading = false;
        }
      );
    },
    search() {
      this.getList();
    },
    // 选中返回值
    handleSelectionChange(val) {
      this.selectionData = val;
    },
    toDetail(res, type) {
      this.$router.push({
        path: "/admin/detailspecialitymanage",
        query: {
          id: res,
          type: type,
        },
      });
    },
    // 删除
    toDelete(res) {
      // let ids = [];
      // ids.push(res);
      this.submitDel(res);
    },
    handleDelete() {
      // if (this.selectionData.length > 0) {
      //   let ids = [];
      //   this.selectionData.forEach((e) => {
      //     ids.push(e.id);
      //   });
      //   this.submitDel(ids);
      // }
    },
    // 确认删除
    submitDel(res) {
      this.$confirm("是否删除所选条项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          api.delete({ id: res }).then(
            (res) => {
              if (res.data.code == 10000) {
                this.$message.success(res.data.msg);
                this.getList();
                return;
              }
              this.$message.error(res.data.msg);
            },
            (res) => {}
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 页码改变
    pageNumberChange(res) {
      // if (this.data.total <= 10) {
      //   return;
      // }
      // this.params.pageNumber = res - 1;
      // this.getList();
    },
    // 日期格式化
    formatDate(res) {
      return comm.formatDateV1(res);
    },
  },
};
</script>
<style lang="scss" scoped>
.table-box {
  margin: 5px 2px 8px 2px;
  padding: 0 5px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  .box-top {
    display: flex;
    justify-content: space-between;
    padding: 5px 2px;
    .top-right {
      display: flex;
      align-items: center;
    }
    .top-left {
      display: flex;
    }
  }
  .page-number {
    width: 100%;
    padding: 15px 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>