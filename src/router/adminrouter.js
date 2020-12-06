import defaultindex from '@/views/index/defaultindex'
import listadminmanage from '@/views/admin/adminmanage/listadminmanage'
import detailadminmanage from '@/views/admin/adminmanage/detailadminmanage'
import listschoolmanage from '@/views/admin/schoolmanage/listschoolmanage'
import detailschoolmanage from '@/views/admin/schoolmanage/detailschoolmanage'
import listcollegemanage from '@/views/admin/collegemanage/listcollegemanage'
import detailcollegemanage from '@/views/admin/collegemanage/detailcollegemanage'
import listspecialitymanage from '@/views/admin/specialitymanage/listspecialitymanage'
import detailspecialitymanage from '@/views/admin/specialitymanage/detailspecialitymanage'


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
  },
  {
    path: '/admin/collegemanage',
    name: 'collegemanage',
    component: listcollegemanage,
  },
  {
    path: '/admin/detailcollegemanage',
    name: 'detailcollegemanage',
    component: detailcollegemanage,
  },
  {
    path: '/admin/specialitymanage',
    name: 'specialitymanage',
    component: listspecialitymanage,
  },
  {
    path: '/admin/detailspecialitymanage',
    name: 'detailspecialitymanage',
    component: detailspecialitymanage,
  }
]
