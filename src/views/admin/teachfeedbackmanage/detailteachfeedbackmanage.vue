<template>
  <div class="form-box">
    <div v-if="params.type == 'detail'">
      <div class="cancel-width">
        <el-button @click="cancelEdit()" icon="el-icon-edit">{{
          isShowEdit ? "取消编辑" : "编辑"
        }}</el-button>
      </div>
      <el-form
        :model="data"
        label-width="100px"
        :rules="rules"
        ref="checkFor"
        class="demo-ruleForm center"
        label-position="left"
      >
        <el-form-item label="学生">
          <span>{{ data.studentName }}</span>
        </el-form-item>
        <el-form-item label="班级">
          <span>{{ data.className }}</span>
        </el-form-item>
        <el-form-item label="标题">
          <span v-if="isShowEdit == false">{{ data.title }}</span>
          <el-input
            v-else
            v-model="data.title"
            class="input-widths"
            type="text"
            maxlength="15"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <span v-if="isShowEdit == false">{{ data.content }}</span>
          <el-input
            v-else
            v-model="data.content"
            class="input-widths"
            type="textarea"
            maxlength="255"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="cancel-width">
        <el-button v-show="isShowEdit" type="primary" @click="submitForm('checkFor')"
          >保存</el-button
        >
        <el-button v-show="isShowEdit" @click="resetForm('checkFor')"
          >重置</el-button
        >
        <el-button type="primary" @click="back()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "./teachfeedbackUrl";
import util from "@/util/util";
export default {
  data() {
    return {
      isShowEdit: false,
      data: {
        studentId: "",
        studentName: "",
        classId: "",
        className: "",
        grade: "",
        title: "",
        content: "",
        createDate: "",
        editDate: "",
        isDelete: "N",
      },
      params: {
        id: "",
        type: "",
      },
      rules: {
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        classId: [{ required: true, message: "请选择学校", trigger: "change" }],
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
    submitForm(formName) {
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
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
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