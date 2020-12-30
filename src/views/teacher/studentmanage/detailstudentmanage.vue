<template>
  <div class="form-box">
    <div>
      <el-form
        label-width="100px"
        class="demo-ruleForm center"
        label-position="left"
      >
        <el-form-item label="姓名">
          <span>{{ data.name }}</span>
        </el-form-item>
        <el-form-item label="性别">
          <span>{{ formatSex(data.sex) }}</span>
        </el-form-item>
        <el-form-item label="学号">
          <span>{{ data.studentId }}</span>
        </el-form-item>
        <el-form-item label="校区" prop="schoolId">
          <span>{{ data.schoolName }}</span>
        </el-form-item>
        <el-form-item label="二级学院">
          <span>{{ data.collegeName }}</span>
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
        <el-form-item label="生日">
          <span>{{ data.birth }}</span>
        </el-form-item>
        <el-form-item label="邮箱">
          <span>{{ data.email }}</span>
        </el-form-item>
        <el-form-item label="手机号码">
          <span>{{ data.phone }}</span>
        </el-form-item>
      </el-form>
      <div class="cancel-width">
        <el-button type="primary" @click="back()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "./studentmanageUrl";
import util from "@/util/util";
export default {
  data() {
    return {
      isShowEdit: false,
      data: [
        {
          openId: "",
          name: "",
          sex: "",
          studentId: "",
          avatar: "",
          schoolId: "",
          schoolName: "",
          collegeId: "",
          collegeName: "",
          specialityId: "",
          specialityName: "",
          classId: "",
          className: "",
          grade: "",
          birth: "",
          email: "",
          phone: "",
          createDate: "",
          editDate: "",
          isDelete: "N",
        },
      ],
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
    this.getDetail();
  },
  methods: {
    // 通过id获取student
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