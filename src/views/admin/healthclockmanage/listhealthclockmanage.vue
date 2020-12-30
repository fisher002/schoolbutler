<template>
  <div class="table-box">
    <div v-if="showType == false">
      <div class="box-top">
        <div class="top-left">
          <el-input
            placeholder="请输入班级名称"
            v-model="params.className"
            clearable
          ></el-input>
          <div style="width: 10px"></div>
          <el-input
            placeholder="请输入学生名"
            v-model="params.name"
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
            disabled
            >新增</el-button
          >
        </div>
      </div>
      <el-divider></el-divider>
      <div>
        <el-table
          v-loading="loading"
          :data="data.list"
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
            prop="studentName"
            align="center"
            sortable
            label="学生"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="className"
            align="center"
            sortable
            label="班级"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="temperature"
            align="center"
            sortable
            label="个人体温"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="others"
            align="center"
            sortable
            label="其他情况"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{ `${scope.row.others.substr(0, 20)}...` }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="location"
            align="center"
            sortable
            label="打卡位置"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="detailLocation"
            align="center"
            sortable
            label="详细位置"
            width="300"
          >
            <template slot-scope="scope">
              <span>{{ `${scope.row.detailLocation.substr(0, 30)}...` }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="clockInDate"
            align="center"
            sortable
            label="打卡时间"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            sortable
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <span
                :style="{
                  color: scope.row.status == '正常' ? '#1fca1f' : 'red',
                }"
                >{{ scope.row.status }}</span
              >
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="20">
            <template slot-scope="scope">
              <el-button
                @click="toDetail(scope.row, 'detail')"
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
          @current-change="pageNumChange"
          @size-change="pageSizeChange"
          :current-page="params.pageNum"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.total ? data.total : 0"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="学生打卡详情"
      :visible.sync="isShowDialog"
      width="30%"
      center
    >
      <el-form :model="detail">
        <el-form-item label="打卡学生">
          <span>{{ detail.studentName }}</span>
        </el-form-item>
        <el-form-item label="所在班级">
          <span>{{ detail.className }}</span>
        </el-form-item>
        <el-form-item label="个人体温">
          <span>{{ detail.temperature }}</span>
        </el-form-item>
        <el-form-item label="其他情况">
          <span>{{ detail.others || "无" }}</span>
        </el-form-item>
        <el-form-item label="打卡位置">
          <span>{{ detail.location }}</span>
        </el-form-item>
        <el-form-item label="详细位置">
          <span>{{ detail.detailLocation }}</span>
        </el-form-item>
        <el-form-item label="打卡时间">
          <span>{{ detail.clockInDate }}</span>
        </el-form-item>
        <el-form-item label="学生状态">
          <span
            :style="{
              color: detail.status == '正常' ? '#1fca1f' : 'red',
            }"
            >{{ detail.status }}</span
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="isShowDialog = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "./healthclockmanageUrl";
import comm from "@/util/util";
export default {
  components: {},
  data() {
    return {
      loading: false,
      showType: false,
      isShowDialog: false,
      data: "",
      selectionData: "",
      detail: {},
      params: {
        name: "",
        classId: "",
        className: "",
        studentName: "",
        studentId: "",
        pageNum: 1,
        pageSize: 10,
        isDesc: "",
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
      api.getPageList(this.checkParams(this.params)).then(
        (res) => {
          if (res.data.code == 10000) {
            this.loading = false;
            this.$message.success(res.data.msg);
            this.data = res.data.data;
            this.data.list.forEach((e) => {
              e.status = this.checkAbNormal(e);
            });
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
      this.detail = res;
      this.isShowDialog = true;
    },
    // 删除
    toDelete(res) {
      this.submitDel(res);
    },
    handleDelete() {},
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
    pageNumChange(res) {
      if (this.data.total <= 10) {
        return;
      }
      this.params.pageNum = res;
      this.getList();
    },
    // 页数改变
    pageSizeChange(res) {
      this.params.pageSize = res;
      if (this.data.total <= 10) {
        return;
      }
      this.getList();
    },
    // 异常学生筛选
    checkAbNormal(res) {
      if (res.temperature.includes("低热" || "中热" || "高热")) {
        return "异常";
      }
      if (
        res.others.includes(
          "感冒样" || "憋喘" || "高发地" || "确诊" || "心慌" || "腹泻" || "入境"
        )
      ) {
        return "异常";
      }
      return "正常";
    },
    ...comm,
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