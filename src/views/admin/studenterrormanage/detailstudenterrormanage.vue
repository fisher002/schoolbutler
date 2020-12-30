<template>
  <div class="form-box">
    <div v-if="params.type == 'add'">
      <el-form
        :model="commData"
        :rules="rules"
        ref="checkFor"
        label-width="120px"
        class="demo-ruleForm center"
        label-position="left"
      >
        <div class="comm_select">
          <el-form-item label="请选择校区" prop="schoolId">
            <el-select
              class="select-width"
              v-model="commData.schoolId"
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
          <div class="demo_width"></div>
          <el-form-item
            label="请选择二级学院"
            prop="collegeId"
            v-if="commData.schoolId"
          >
            <el-select
              class="select-width"
              v-model="commData.collegeId"
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
          <div class="demo_width"></div>
          <el-form-item
            label="请选择专业"
            prop="specialityId"
            v-if="commData.collegeId"
          >
            <el-select
              class="select-width"
              v-model="commData.specialityId"
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
          <div class="demo_width"></div>
          <el-form-item
            label="请选择班级"
            prop="classId"
            v-if="commData.specialityId"
          >
            <el-select
              class="select-width"
              v-model="commData.classId"
              clearable
              placeholder="请选择"
              @change="handleClass"
            >
              <el-option
                v-for="item in classdata"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-divider></el-divider>
        <div class="list_data" v-if="data">
          <div class="list_item" v-for="(item, index) in data" :key="index">
            <div>
              <el-form-item label="违纪学生">
                <el-select
                  v-model="item.studentId"
                  clearable
                  placeholder="请选择学生"
                  @change="handleStudent(item)"
                >
                  <el-option
                    v-for="it in studentdata"
                    :key="it.id"
                    :label="it.name"
                    :value="it.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="违纪类别">
                <el-select
                  class="select-width"
                  v-model="item.errorType"
                  clearable
                  placeholder="请选择"
                >
                  <el-option label="警告" value="警告"></el-option>
                  <el-option label="严重警告" value="严重警告"></el-option>
                  <el-option label="记过处分" value="记过处分"></el-option>
                  <el-option label="开除学籍" value="开除学籍"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="违纪原因">
                <el-input
                  v-model="item.reason"
                  placeholder="请输入违纪原因"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="违纪详情">
                <el-input
                  v-model="item.content"
                  placeholder="请输入违纪详情"
                  type="textarea"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
            <div class="item_btn_box">
              <div class="item_btn item_plus" @click.stop="addDataItem">
                <i class="el-icon-plus"></i>
              </div>
              <div
                class="item_btn item_minus"
                @click.stop="minuDataItem(index)"
              >
                <i class="el-icon-minus"></i>
              </div>
            </div>
          </div>
        </div>
      </el-form>
      <div class="cancel-width">
        <el-button type="primary" @click="submitForm('checkFor')"
          >立即添加</el-button
        >
        <el-button @click="resetForm('checkFor')">重置</el-button>
        <el-button type="primary" @click="back()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "./studenterrormanageUrl";
import util from "@/util/util";
export default {
  data() {
    return {
      isShowEdit: false,
      data: [
        {
          studentId: "",
          studentName: "",
          classId: "",
          className: "",
          reason: "",
          content: "",
          grade: "",
        },
      ],
      commData: {
        schoolId: "",
        schoolName: "",
        collegeId: "",
        collegeName: "",
        specialityId: "",
        specialityName: "",
        classId: "",
        className: "",
      },
      schooldata: [],
      collegedata: [],
      specialitydata: [],
      classdata: [],
      studentdata: [],
      number: 1,
      params: {
        id: "",
        type: "",
      },
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
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
        classId: [{ required: true, message: "请选择班级", trigger: "change" }],
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
    this.getSchoolList();
  },
  methods: {
    // 获取school list
    getSchoolList() {
      api.getSchoolList().then((res) => {
        this.schooldata = res.data.data;
      });
    },
    submitForm(formName) {
      if (formName)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 校验通过 新增或编辑
            api.update(this.data, this.params.type).then((res) => {
              if (res.data.code == 10000 || res.data.code == null) {
                this.$message.success(res.data.msg);
                this.back();
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        });
      else
        api.update(this.data, this.params.type).then((res) => {
          if (res.data.code == 10000 || res.data.code == null) {
            this.$message.success(res.data.msg);
            this.back();
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 选择校区后
    handleSchool(res) {
      if (res) {
        this.commData.schoolName = this.schooldata.find(
          (it) => it.id == this.commData.schoolId
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
        this.commData.collegeName = this.collegedata.find(
          (it) => it.id == res
        ).name;
        // 获取专业
        api.getSpecialityList({ collegeId: res }).then((res) => {
          this.specialitydata = res.data.data;
        });
      }
    },
    // 选择专业后
    handleSpeciality(res) {
      if (res)
        this.commData.specialityName = this.specialitydata.find(
          (it) => it.id == res
        ).name;
      api.getClassList({ specialityId: res }).then((res) => {
        this.classdata = res.data.data;
      });
    },
    // 选择班级后
    handleClass(res) {
      if (res) {
        this.commData.className = this.classdata.find(
          (it) => it.id == res
        ).name;
      }
      for (let i in this.commData) {
        this.data[0][i] = this.commData[i];
      }
      api.getStudentList({ classId: res }).then((res) => {
        this.studentdata = res.data.data;
      });
    },
    // 选择学生后
    handleStudent(item) {
      item.studentName = this.studentdata.find(
        (it) => it.id == item.studentId
      ).name;
      item.grade = this.studentdata.find((it) => it.id == item.studentId).grade;
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
    // 增加data条数
    addDataItem() {
      const item = {
        studentId: "",
        studentName: "",
        classId: "",
        className: "",
        reason: "",
        content: "",
        grade: "",
      };
      for (let i in this.commData) {
        if (this.commData[i] === "") {
          this.$message.error("请从校区开始选择！");
          return;
        }
        item[i] = this.commData[i];
      }
      this.data.push(item);
    },
    // 去除data条数
    minuDataItem(res) {
      if (res === 0) {
        return; // 默认第一项不删除
      }
      // 通过下标来删除指定条项
      this.number--;
      this.data.splice(
        this.data.findIndex((it) => it === res),
        1
      );
    },
    ...util,
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
  .comm_select {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
  .list_data {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    .list_item {
      display: flex;
      padding: 20px 15px;
      .item_btn_box {
        padding: 0 5px;
      }
      .item_btn {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        color: #fff;
        font-size: 22px;
        line-height: 35px;
        cursor: pointer;
      }
      .item_plus {
        background-color: rgb(0, 170, 0);
      }
      .item_minus {
        background-color: rgb(255, 0, 0);
        margin-top: 5px;
        opacity: 0;
        transition: opacity 1s;
      }
    }
    .list_item:hover .item_minus {
      opacity: 1;
    }
  }
}
.input-width {
  width: 90%;
  float: left;
}
.input-widths {
  width: 30%;
  float: left;
}
.cancel-width {
  width: 100%;
  text-align: left;
  padding: 10px 0;
}
.select-width {
  float: left;
}
.demo_width {
  width: 15px;
}
</style>