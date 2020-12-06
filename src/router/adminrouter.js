import defaultindex from '@/views/index/defaultindex'
import listadminmanage from '@/views/admin/adminmanage/listadminmanage'
import detailadminmanage from '@/views/admin/adminmanage/detailadminmanage'
import listschoolmanage from '@/views/admin/schoolmanage/listschoolmanage'
import detailschoolmanage from '@/views/admin/schoolmanage/detailschoolmanage'

export default [{
    path: '/default/defaultindex',
    name: 'defaultindex',
    component: defaultindex
  },
  {
    path: '/admin/adminmanage',
    name: 'adminmanage',
    component: listadminmanage,
  },
  {
    path: '/admin/detailadminmanage',
    name: 'detailadminmanage',
    component: detailadminmanage,
  },
  {
    path: '/admin/schoolmanage',
    name: 'schoolmanage',
    component: listschoolmanage,
  },
  {
    path: '/admin/detailschoolmanage',
    name: 'detailschoolmanage',
    component: detailschoolmanage,
  }
]
