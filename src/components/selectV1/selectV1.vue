<template>
  <div></div>
</template>
<script>
import api from "./selectV1Url";
export default {
  name: "selectV1",
  data() {
    return {
      schooldata: [],
      collegedata: [],
      specialitydata: [],
      commData: {
        schoolId: "",
        schoolName: "",
        collegeId: "",
        collegeName: "",
        specialityId: "",
        specialityName: "",
        grade: "",
      },
    };
  },
  created() {
    this.getSchoolList();
  },
  methods: {
    // 获取school list
    getSchoolList() {
      api.getSchoolList().then((res) => {
        this.schooldata = res.data.data;
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
    },
    // 选择年级后
    handleGrade() {
      for (let i in this.commData) {
        if (this.commData[i] === "") {
          this.$message.error("请从校区开始选择！");
          return;
        }
        item[i] = this.commData[i];
      }
      this.$emit("callBack", this.commData);
    },
  },
};
</script>
<style lang="sass" scoped>
</style>