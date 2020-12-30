<template>
  <div class="form-box">
    <div>
      <div class="cancel-width">
        <el-button @click="cancelEdit()" icon="el-icon-edit">{{
          isShowEdit ? "取消编辑" : "编辑"
        }}</el-button>
      </div>
      <el-form
        label-width="100px"
        class="demo-ruleForm center"
        label-position="left"
      >
        <el-form-item label="课程">
          <span>{{ data.courseName }}</span>
        </el-form-item>
        <el-form-item label="所属专业" prop="specialityId">
          <span>{{ data.specialityName }}</span>
        </el-form-item>
        <el-form-item label="所在班级" prop="classId">
          <span>{{ data.className }}</span>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <span>{{ formatGrade(data.grade) }}</span>
        </el-form-item>
        <el-form-item label="开始时间" prop="startClassDate">
          <span v-if="isShowEdit == false">{{
            formatDate(data.startClassDate)
          }}</span>
          <el-date-picker
            v-model="data.startClassDate"
            class="select-width"
            type="datetime"
            placeholder="选择日期时间"
            clearable
            value-format="yyyy-MM-dd HH:mm:ss"
            v-else
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endClassDate">
          <span v-if="isShowEdit == false">{{
            formatDate(data.endClassDate)
          }}</span>
          <el-date-picker
            v-model="data.endClassDate"
            class="select-width"
            type="datetime"
            placeholder="选择日期时间"
            clearable
            value-format="yyyy-MM-dd HH:mm:ss"
            v-else
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="cancel-width">
        <el-button v-show="isShowEdit" type="primary" @click="submitForm()"
          >保存</el-button
        >
        <el-button v-show="isShowEdit" @click="resetForms()">重置</el-button>
        <el-button type="primary" @click="back()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "./coursearrangemanageUrl";
import util from "@/util/util";
export default {
  data() {
    return {
      isShowEdit: false,
      data: {
        specialityId: "",
        specialityName: "",
        teacherId: "",
        teacherName: "",
        classId: "",
        className: "",
        courseId: "",
        courseName: "",
        classRoomId: "",
        classRoomName: "",
        areaName: "",
        grade: "",
        startClassDate: "",
        endClassDate: "",
        createDate: "",
        editDate: "",
        isDelete: "N",
      },
      params: {
        id: "",
        type: "",
      },
      rules: {
        name: [
          { required: true, message: "课程不能为空", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
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
    submitForm() {
      api.update(this.data).then((res) => {
        if (res.data.code == 10000 || res.data.code == null) {
          this.$message.success(res.data.msg);
          this.back();
        } else {
          this.$message.error(res.data.msg);
        }
      });
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