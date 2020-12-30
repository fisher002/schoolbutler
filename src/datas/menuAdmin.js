const menuData = [{
    name: 'basedata',
    label: '基础数据',
    children: [{
        name: 'schoolmanage',
        label: '校区管理',
        path: '/admin/schoolmanage'
      }, {
        name: 'collegemanage',
        label: '二级学院管理',
        path: '/admin/collegemanage'
      }, {
        name: 'specialitymanage',
        label: '专业管理',
        path: '/admin/specialitymanage'
      },
      {
        name: 'subjectmanage',
        label: '学科管理',
        path: '/admin/subjectmanage'
      },
      {
        name: 'studentclassmanage',
        label: '班级管理',
        path: '/admin/studentclassmanage'
      },
      {
        name: 'studentmanage',
        label: '学生管理',
        path: '/admin/studentmanage'
      }
    ]
  }, {
    name: 'teacherdata',
    label: '教师数据',
    children: [{
      name: 'teachermanage',
      label: '教师管理',
      path: '/admin/teachermanage'
    }]
  },
  {
    name: 'coursemanage',
    label: '课程管理',
    children: [{
        name: 'coursemanage',
        label: '基础课程',
        path: '/admin/coursemanage'
      },
      {
        name: 'coursearrangemanage',
        label: '课程安排',
        path: '/admin/coursearrangemanage'
      }
    ]
  },
  {
    name: 'areamanage',
    label: '基础场地',
    children: [{
        name: 'areamanage',
        label: '场地管理',
        path: '/admin/areamanage'
      },
      {
        name: 'classroommanage',
        label: '教室管理',
        path: '/admin/classroommanage'
      }
    ]
  },
  {
    name: 'studentmanage',
    label: '学生事务管理',
    children: [{
        name: 'teachfeedbackmanage',
        label: '教学反馈管理',
        path: '/admin/teachfeedbackmanage'
      },
      {
        name: 'healthclockmanage',
        label: '学生健康打卡',
        path: '/admin/healthclockmanage'
      },
      {
        name: 'studentleavemanage',
        label: '请假申请',
        path: '/admin/studentleavemanage'
      },
      {
        name: 'studenterrormanage',
        label: '学生违纪',
        path: '/admin/studenterrormanage'
      }
    ]
  },
  {
    name: 'repairinfomanage',
    label: '报修管理',
    path: '/admin/repairinfomanage'
  }
]

export default menuData
