<template>
  <div class="form-box">
    <div>
      <el-form
        :model="data"
        :rules="rules"
        ref="checkFor"
        label-width="100px"
        class="demo-ruleForm center"
        label-position="left"
      >
        <el-form-item label="班级名称">
          <span>{{ data.name }}</span>
        </el-form-item>
        <el-form-item label="校区" prop="schoolId">
          <span>{{ data.schoolName }}</span>
        </el-form-item>
        <el-form-item label="二级学院">
          <span>{{ data.collegeName }}</span>
        </el-form-item>
        <el-form-item label="所属专业">
          <span>{{ data.specialityName }}</span>
        </el-form-item>
        <el-form-item label="班主任">
          <span>{{ data.teacherName }}</span>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <span>{{ formatGrade(data.grade) }}</span>
        </el-form-item>
      </el-form>
      <div class="cancel-width">
        <el-button type="primary" @click="back()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "./studentclassmanageUrl";
import util from "@/util/util";
export default {
  data() {
    return {
      isShowEdit: false,
      data: {},
      schooldata: [],
      collegedata: [],
      specialitydata: [],
      teacherdata: [],
      params: {
        id: "",
        type: "",
      },
      rules: {
        name: [
          { required: true, message: "专业名不能为空", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        schoolId: [
          { required: true, message: "请选择学校", trigger: "change" },
        ],
        collegeId: [
          { required: true, message: "请选择二级学院", trigger: "change" },
        ],
        specialityId: [
          { required: true, message: "请选择专业", trigger: "change" },
        ],
        teacherId: [
          { required: true, message: "请选择教师", trigger: "change" },
        ],
        grade: [{ required: true, message: "请选择年级", trigger: "change" }],
        createDate: [{ required: false, message: "", trigger: "blur" }],
        editDate: [{ required: false, message: "", trigger: "blur" }],
      },
    };
  },
  created() {
    // 参数赋值
    let params = this.$route.query;
    for (let i in params) {
      this.params[i] = params[i];
    }
    this.getDetail();
  },
  methods: {
    // 通过id获取college
    getDetail() {
      if (this.params.id && this.params.id != null) {
        api.getDetail(this.params.id).then((res) => {
          if (res.data.code == 10000) {
            this.data = res.data.data;
            return;
          }
          this.$message.error(res.data.msg);
        });
        return;
      }
    },
    // 路由回退
    back() {
      this.$router.go(-1);
    },
    cancelEdit() {
      this.isShowEdit = !this.isShowEdit;
      if (this.isShowEdit == false) {
        this.getDetail();
      }
    },
    // 日期格式化
    formatDate(res) {
      return util.formatDate(res);
    },
    // 年级格式化
    formatGrade(res) {
      return util.formatGrade(res);
    },
  },
};
</script>
<style lang="scss" scoped>
.form-box {
  margin: 5px 2px 8px;
  padding: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  border-radius: 5px;
  min-height: 450px;
  span {
    float: left;
  }
}
.input-width {
  width: 30%;
  float: left;
}
.cancel-width {
  width: 100%;
  text-align: left;
  padding: 10px 0;
}
.select-width {
  width: 15%;
  float: left;
}
</style>