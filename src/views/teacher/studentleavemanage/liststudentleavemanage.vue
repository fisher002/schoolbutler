<template>
  <div class="table-box">
    <div v-if="showType == false">
      <div class="box-top">
        <div class="top-left">
          <el-select
            class="select-width"
            v-model="params.classId"
            placeholder="请选择班级"
          >
            <el-option
              v-for="item in classdata"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
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
            prop="others"
            align="center"
            sortable
            label="请假理由"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{ `${scope.row.reason.substr(0, 20)}...` }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="detailLocation"
            align="center"
            sortable
            label="详情描述"
            width="300"
          >
            <template slot-scope="scope">
              <span>{{ `${scope.row.content.substr(0, 30)}...` }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="leaveStartDate"
            align="center"
            sortable
            label="开始时间"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="leaveEndDate"
            align="center"
            sortable
            label="结束时间"
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
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="20">
            <template slot-scope="scope">
              <el-button
                @click="toDetail(scope.row, 'detail')"
                type="text"
                size="small"
                >查看</el-button
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
        <el-form-item label="申请学生">
          <span>{{ detail.studentName }}</span>
        </el-form-item>
        <el-form-item label="所在班级">
          <span>{{ detail.className }}</span>
        </el-form-item>
        <el-form-item label="请假理由">
          <span>{{ detail.reason || "无" }}</span>
        </el-form-item>
        <el-form-item label="详情描述">
          <span>{{ detail.content }}</span>
        </el-form-item>
        <el-form-item label="申请时间">
          <span>{{ detail.createDate }}</span>
        </el-form-item>
        <el-form-item label="开始时间">
          <span>{{ detail.leaveStartDate }}</span>
        </el-form-item>
        <el-form-item label="结束时间">
          <span>{{ detail.leaveEndDate }}</span>
        </el-form-item>
        <el-form-item label="申请状态">
          <el-radio-group v-model="detail.isAgree">
            <el-radio label="editing">审核中</el-radio>
            <el-radio label="Y">同意申请</el-radio>
            <el-radio label="N">不同意</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="toConfirmDetail()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "./studentleavemanageUrl";
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
      classdata: [],
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
    this.getClassList();
  },
  methods: {
    // 获取班级
    getClassList() {
      if (sessionStorage.getItem("teacherId")) {
        api
          .getClassList({ teacherId: sessionStorage.getItem("teacherId") })
          .then((res) => {
            this.classdata = res.data.data;
            this.params.classId = res.data.data[0].id;
            this.getList();
          });
      }
    },
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
              e.status = this.formatAgree(e.isAgree);
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
    // 同意
    toConfirmDetail() {
      api.update(this.detail).then((res) => {
        this.isShowDialog = false;
        this.getList();
      });
    },
    handleDelete() {},
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
    formatAgree(res) {
      if (res === "N") return "不同意";
      if (res === "Y") return "同意";
      if (res === "editing") return "审核中";
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