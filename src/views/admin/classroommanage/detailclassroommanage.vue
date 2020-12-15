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
          <el-form-item label="位置">
            <el-input
              v-model="commData.areaName"
              placeholder="请输入位置名称"
              clearable
              @change="handleArea"
            ></el-input>
          </el-form-item>
        </div>
        <el-divider></el-divider>
        <div class="list_data" v-if="data">
          <div class="list_item" v-for="(item, index) in data" :key="index">
            <div>
              <el-form-item label="教室名称">
                <el-input
                  v-model="item.name"
                  placeholder="请输入教室名称"
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
    <div v-if="params.type == 'detail'">
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
        <el-form-item label="教室">
          <span v-if="isShowEdit == false">{{ data.name }}</span>
          <el-input
            v-else
            v-model="data.name"
            class="input-widths"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="校区">
          <span>{{ data.schoolName }}</span>
        </el-form-item>
        <el-form-item label="位置">
          <span v-if="isShowEdit == false">{{ data.areaName }}</span>
          <el-input
            v-else
            v-model="data.areaName"
            class="input-widths"
            clearable
          ></el-input>
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
import api from "./classroommanageUrl";
import util from "@/util/util";
export default {
  data() {
    return {
      isShowEdit: false,
      data: [
        {
          name: "",
          schoolId: "",
          schoolName: "",
          areaName: "",
          createDate: "",
          editDate: "",
          isDelete: "N",
        },
      ],
      commData: {
        schoolId: "",
        schoolName: "",
        areaName: "",
      },
      schooldata: [],
      params: {
        id: "",
        type: "",
      },
      rules: {
        name: [
          { required: true, message: "教室名称不能为空", trigger: "blur" },
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
          (it) => it.id === res
        ).schoolName;
      }
    },
    // 输入位置名称后
    handleArea(res) {
      if (res) {
        for (let i in this.commData) {
          this.data[0][i] = this.commData[i];
        }
      }
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
        name: "",
        schoolId: "",
        schoolName: "",
        areaName: "",
        createDate: "",
        editDate: "",
        isDelete: "N",
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