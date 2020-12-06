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
        <el-form-item label="专业名称" prop="name">
          <el-input
            v-model="data.name"
            class="input-width"
            placeholder="请输入专业名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="请选择二级学院" prop="collegeId">
          <el-select
            class="select-width"
            v-model="data.collegeId"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in collegedata"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
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
        <el-form-item label="专业名称">
          <span v-if="isShowEdit == false">{{ data.name }}</span>
          <el-input
            v-else
            v-model="data.name"
            class="input-width"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="二级学院名称">
          <span v-if="isShowEdit == false">{{ data.collegeName }}</span>
          <el-select
            class="select-width"
            v-model="data.collegeId"
            clearable
            v-else
            placeholder="请选择"
          >
            <el-option
              v-for="item in collegedata"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <span v-if="isShowEdit == false">{{
            formatDate(data.createDate)
          }}</span>
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
import api from "./specialitymanageUrl";
import util from "@/util/util";
export default {
  data() {
    return {
      isShowEdit: false,
      data: {
        name: "",
        collegeId: "",
        collegeName: "",
        createDate: "",
        editDate: "",
        isDelete: "N",
      },
      collegedata: [],
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
        collegeId: [
          { required: true, message: "请选择二级学院", trigger: "change" },
        ],
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
    this.getCollegeList();
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
    getCollegeList() {
      api.getCollegeList().then((res) => {
        this.collegedata = res.data.data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.data.collegeName = (this.collegedata.find(it => it.id == this.data.collegeId)).name;
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