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
    }]
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
    children: [
      {
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
    name: 'classroommanage',
    label: '教室管理',
    path: '/admin/classroommanage'
  }
]

export default menuData
