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
            width="200"
          ></el-table-column>
          <el-table-column
            prop="grade"
            align="center"
            sortable
            label="年级"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ formatGrade(scope.row.grade) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            align="center"
            sortable
            label="反馈标题"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="content"
            align="center"
            sortable
            label="反馈详情"
            width="350"
          >
            <template slot-scope="scope">
              <span>{{ `${scope.row.content.substr(0, 30)}...` }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="editDate"
            align="center"
            sortable
            label="编辑时间"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{ formatDateV1(scope.row.editDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="isDelete"
            align="center"
            sortable
            label="状态"
            width="100"
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
  </div>
</template>
<script>
import api from "./teachfeedbackUrl";
import comm from "@/util/util";
export default {
  components: {},
  data() {
    return {
      loading: false,
      showType: false,
      data: "",
      selectionData: "",
      classdata: [],
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
        path: "/teacher/detailteachfeedbackmanage",
        query: {
          id: res,
          type: type,
        },
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