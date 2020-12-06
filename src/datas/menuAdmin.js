const menuData = [{
    name: 'basedata',
    label: '基础数据',
    children: [{
      name: 'adminmanage',
      label: '管理员管理',
      path: '/admin/adminmanage'
    }, {
      name: 'schoolmanage',
      label: '学校管理',
      path: '/admin/schoolmanage'
    }, {
      name: 'collegemanage',
      label: '二级学院管理',
      path: '/admin/collegemanage'
    }, {
      name: 'specialitymanage',
      label: '专业管理',
      path: '/admin/specialitymanage'
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
    name: 'basetest1',
    label: '测试菜单1',
    path: '/admin/testmanage1',
  }
]

export default menuData
