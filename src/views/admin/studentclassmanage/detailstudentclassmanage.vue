<template>
  <div class="form-box">
    <div v-if="params.type == 'add'">
      <el-form
        :model="data"
        :rules="rules"
        ref="checkFor"
        label-width="120px"
        class="demo-ruleForm center"
        label-position="left"
      >
        <el-form-item label="班级名称" prop="name">
          <el-input
            v-model="data.name"
            class="input-width"
            placeholder="请输入班级名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="请选择校区" prop="schoolId">
          <el-select
            class="select-width"
            v-model="data.schoolId"
            clearable
            placeholder="请选择"
            @change="handleSchool"
          >
            <el-option
              v-for="item in schooldata"
              :key="item.id"
              :label="item.schoolName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="请选择二级学院"
          prop="collegeId"
          v-if="data.schoolId"
        >
          <el-select
            class="select-width"
            v-model="data.collegeId"
            clearable
            placeholder="请选择"
            @change="handleCollege"
          >
            <el-option
              v-for="item in collegedata"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="请选择所属专业"
          prop="specialityId"
          v-if="data.collegeId"
        >
          <el-select
            class="select-width"
            v-model="data.specialityId"
            clearable
            placeholder="请选择"
            @change="handleSpeciality"
          >
            <el-option
              v-for="item in specialitydata"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="请选择班主任"
          prop="teacherId"
          v-if="data.collegeId"
        >
          <el-select
            class="select-width"
            v-model="data.teacherId"
            clearable
            placeholder="请选择"
            @change="handleTeacher"
          >
            <el-option
              v-for="item in teacherdata"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择年级" prop="grade">
          <el-select
            class="select-width"
            v-model="data.grade"
            clearable
            placeholder="请选择"
          >
            <el-option label="大一" :value="1"></el-option>
            <el-option label="大二" :value="2"></el-option>
            <el-option label="大三" :value="3"></el-option>
            <el-option label="大四" :value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="cancel-width">
        <el-button type="primary" @click="submitForm('checkFor')"
          >立即添加</el-button
        >
        <el-button @click="resetForm('checkFor')">重置</el-button>
        <el-button type="primary" @click="back()">返回</el-button>
      </div>
    </div>
    <div v-if="params.type == 'detail'">
      <div class="cancel-width">
        <el-button @click="cancelEdit()" icon="el-icon-edit">{{
          isShowEdit ? "取消编辑" : "编辑"
        }}</el-button>
      </div>
      <el-form
        :model="data"
        :rules="rules"
        ref="checkFor"
        label-width="100px"
        class="demo-ruleForm center"
        label-position="left"
      >
        <el-form-item label="班级名称">
          <span v-if="isShowEdit == false">{{ data.name }}</span>
          <el-input
            v-else
            v-model="data.name"
            class="input-width"
            clearable
          ></el-input>
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
          <span v-if="isShowEdit == false">{{ formatGrade(data.grade) }}</span>
          <el-select
            class="select-width"
            v-model="data.grade"
            clearable
            v-else
            placeholder="请选择"
          >
            <el-option label="大一" :value="1"></el-option>
            <el-option label="大二" :value="2"></el-option>
            <el-option label="大三" :value="3"></el-option>
            <el-option label="大四" :value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="cancel-width">
        <el-button
          v-show="isShowEdit"
          type="primary"
          @click="submitForm('checkFor')"
          >保存</el-button
        >
        <el-button v-show="isShowEdit" @click="resetForms()">重置</el-button>
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
      data: {
        name: "",
        schoolId: "",
        schoolName: "",
        collegeId: "",
        collegeName: "",
        specialityId: "",
        specialityName: "",
        teacherId: "",
        teacherName: "",
        grade: "",
        createDate: "",
        editDate: "",
        isDelete: "N",
      },
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
    this.getSchoolList();
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
    // 获取school list
    getSchoolList() {
      api.getSchoolList().then((res) => {
        this.schooldata = res.data.data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过 新增或编辑
          api.update(this.data, this.params.type).then(
            (res) => {
              if (res.data.code == 10000) {
                this.$message.success(res.data.msg);
                this.back();
              } else {
                this.$message.error(res.data.msg);
              }
            },
            (res) => {
              this.$message.error("error");
            }
          );
        }
      });
    },
    // 选择校区后
    handleSchool(res) {
      if (res) {
        this.data.schoolName = this.schooldata.find(
          (it) => it.id == this.data.schoolId
        ).schoolName;
        // 获取二级学院
        api.getCollegeList({ schoolId: res }).then((res) => {
          this.collegedata = res.data.data;
        });
      }
    },
    // 选择二级学院后
    handleCollege(res) {
      if (res) {
        this.data.collegeName = this.collegedata.find(
          (it) => it.id == this.data.collegeId
        ).name;
        // 获取专业
        api.getSpecialityList({ collegeId: res }).then((res) => {
          this.specialitydata = res.data.data;
        });
        // 获取教师
        api.getTeacherList({ collegeId: res }).then((res) => {
          this.teacherdata = res.data.data;
        });
      }
    },
    // 选择专业后
    handleSpeciality(res) {
      if (res)
        this.data.specialityName = this.specialitydata.find(
          (it) => it.id == res
        ).name;
    },
    // 选择教师后
    handleTeacher(res) {
      if (res)
        this.data.teacherName = this.teacherdata.find(
          (it) => it.id == res
        ).name;
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 重置表单
    resetForms() {
      this.getDetail();
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