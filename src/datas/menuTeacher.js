const menuData = [{
    name: 'basedata',
    label: '班级管理',
    children: [
    {
      name: 'studentclassmanage',
      label: '我的班级',
      path: '/teacher/studentclassmanage'
    }]
  },
  {
    name: 'coursemanage',
    label: '课程管理',
    children: [
      {
        name: 'coursearrangemanage',
        label: '我的课程',
        path: '/teacher/coursearrangemanage'
      }
    ]
  },
  {
    name: 'teachfeedbackmanage',
    label: '教学反馈',
    path: '/teacher/teachfeedbackmanage'
  },
  {
    name: 'healthclockmanage',
    label: '健康打卡',
    path: '/teacher/healthclockmanage'
  },
  {
    name: 'studentleavemanage',
    label: '请假申请',
    path: '/teacher/studentleavemanage'
  },
  {
    name: 'studenterrormanage',
    label: '学生违纪',
    path: '/teacher/studenterrormanage'
  }
]

export default menuData
