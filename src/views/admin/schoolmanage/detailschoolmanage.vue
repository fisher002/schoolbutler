<template>
  <div>
    <div class="form-box" v-if="params.type == 'add'">
      <el-form
        :model="data"
        :rules="rules"
        ref="checkFor"
        label-width="100px"
        class="demo-ruleForm center"
        label-position="left"
      >
        <el-form-item label="学校名称" prop="schoolName">
          <el-input v-model="data.schoolName" class="input-width" clearable></el-input>
        </el-form-item>
        <el-form-item style="float:left">
          <el-button type="primary" @click="submitForm('checkFor')">立即添加</el-button>
          <el-button @click="resetForm('checkFor')">重置</el-button>
          <el-button type="primary" @click="back()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-box" v-if="params.type == 'detail'">
      <div class="cancel-width">
        <el-button @click="cancelEdit()" icon="el-icon-edit">{{isShowEdit ? '取消编辑' : '编辑'}}</el-button>
      </div>
      <el-form
        :model="data"
        :rules="rules"
        ref="checkFor"
        label-width="100px"
        class="demo-ruleForm center"
        label-position="left"
      >
        <el-form-item label="学校名称">
          <span v-if="isShowEdit == false">{{data.schoolName}}</span>
          <el-input v-else v-model="data.schoolName" class="input-width" clearable></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <span v-if="isShowEdit == false">{{formatDate(data.createDate)}}</span>
          <el-col :span="11" v-else>
            <el-form-item prop="registerTime">
              <el-date-picker
                class="input-width"
                type="date"
                placeholder="选择日期"
                clearable
                v-model="data.createDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item style="float:left">
          <el-button v-show="isShowEdit" type="primary" @click="submitForm('checkFor')">保存</el-button>
          <el-button v-show="isShowEdit" @click="resetForms()">重置</el-button>
          <el-button type="primary" @click="back()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from "./schoolmanageUrl";
import util from '@/util/util'
export default {
  data() {
    return {
      isShowEdit: false,
      data: {
        schoolName: "",
        createDate: "",
        editDate: "",
        isDelete: "N"
      },
      params: {
        id: "",
        type: ""
      },
      rules: {
        schoolName: [
          { required: true, message: "管理员名不能为空", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        createDate: [{ required: false, message: "", trigger: "blur" }],
        editDate: [{ required: false, message: "", trigger: "blur" }]
      }
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
    // 通过id获取school
    getDetail() {
      if (this.params.id && this.params.id != null) {
        api.getDetail(this.params.id).then(
          res => {
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
      this.$refs[formName].validate(valid => {
        if (valid && this.params.type === 'add') {
          // 校验通过 新增
          api.updateSchool(this.data).then(
            res => {
              if (res.data.code == 10000) {
                this.$message.success(res.data.msg);
                this.back();
              } else {
                this.$message.error(res.data.msg);
              }
            },
            res => {
              this.$message.error("error");
            }
          );
        }
        if(valid && this.params.type === 'detail') {
          // 保存修改
        }
      });
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
    }
  }
};
</script>
<style lang="scss" scoped>
.form-box {
  padding: 20px 20px;
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
</style>