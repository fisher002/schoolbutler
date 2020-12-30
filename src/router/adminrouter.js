import defaultindex from '@/views/index/defaultindex'
import listadminmanage from '@/views/admin/adminmanage/listadminmanage'
import detailadminmanage from '@/views/admin/adminmanage/detailadminmanage'
import listschoolmanage from '@/views/admin/schoolmanage/listschoolmanage'
import detailschoolmanage from '@/views/admin/schoolmanage/detailschoolmanage'
import listcollegemanage from '@/views/admin/collegemanage/listcollegemanage'
import detailcollegemanage from '@/views/admin/collegemanage/detailcollegemanage'
import listspecialitymanage from '@/views/admin/specialitymanage/listspecialitymanage'
import detailspecialitymanage from '@/views/admin/specialitymanage/detailspecialitymanage'
import liststudentclassmanage from '@/views/admin/studentclassmanage/liststudentclassmanage'
import detailstudentclassmanage from '@/views/admin/studentclassmanage/detailstudentclassmanage'
import liststudentmanage from '@/views/admin/studentmanage/liststudentmanage'
import detailstudentmanage from '@/views/admin/studentmanage/detailstudentmanage'
import listteachermanage from '@/views/admin/teachermanage/listteachermanage'
import detailteachermanage from '@/views/admin/teachermanage/detailteachermanage'
import listsubjectmanage from '@/views/admin/subjectmanage/listsubjectmanage'
import detailsubjectmanage from '@/views/admin/subjectmanage/detailsubjectmanage'
import listcoursemanage from '@/views/admin/coursemanage/listcoursemanage'
import detailcoursemanage from '@/views/admin/coursemanage/detailcoursemanage'
import listclassroommanage from '@/views/admin/classroommanage/listclassroommanage'
import detailclassroommanage from '@/views/admin/classroommanage/detailclassroommanage'
import listcoursearrangemanage from '@/views/admin/coursearrangemanage/listcoursearrangemanage'
import detailcoursearrangemanage from '@/views/admin/coursearrangemanage/detailcoursearrangemanage'
import listareamanage from '@/views/admin/areamanage/listareamanage'
import detailareamanage from '@/views/admin/areamanage/detailareamanage'
import listteachfeedbackmanage from '@/views/admin/teachfeedbackmanage/listteachfeedbackmanage'
import detailteachfeedbackmanage from '@/views/admin/teachfeedbackmanage/detailteachfeedbackmanage'
import listhealthclockmanage from '@/views/admin/healthclockmanage/listhealthclockmanage'
import liststudentleavemanage from '@/views/admin/studentleavemanage/liststudentleavemanage'
import liststudenterrormanage from '@/views/admin/studenterrormanage/liststudenterrormanage'
import detailstudenterrormanage from '@/views/admin/studenterrormanage/detailstudenterrormanage'
import listrepairinfomanage from '@/views/admin/repairinfomanage/listrepairinfomanage'


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
  },
  {
    path: '/admin/studentclassmanage',
    name: 'studentclassmanage',
    component: liststudentclassmanage,
  },
  {
    path: '/admin/detailstudentclassmanage',
    name: 'detailstudentclassmanage',
    component: detailstudentclassmanage,
  },
  {
    path: '/admin/studentmanage',
    name: 'studentmanage',
    component: liststudentmanage,
  },
  {
    path: '/admin/detailstudentmanage',
    name: 'detailstudentmanage',
    component: detailstudentmanage,
  },
  {
    path: '/admin/teachermanage',
    name: 'teachermanage',
    component: listteachermanage,
  },
  {
    path: '/admin/detailteachermanage',
    name: 'detailteachermanage',
    component: detailteachermanage,
  },
  {
    path: '/admin/subjectmanage',
    name: 'subjectmanage',
    component: listsubjectmanage,
  },
  {
    path: '/admin/detailsubjectmanage',
    name: 'detailsubjectmanage',
    component: detailsubjectmanage,
  },
  {
    path: '/admin/coursemanage',
    name: 'coursemanage',
    component: listcoursemanage,
  },
  {
    path: '/admin/detailcoursemanage',
    name: 'detailcoursemanage',
    component: detailcoursemanage,
  },
  {
    path: '/admin/classroommanage',
    name: 'classroommanage',
    component: listclassroommanage,
  },
  {
    path: '/admin/detailclassroommanage',
    name: 'detailclassroommanage',
    component: detailclassroommanage,
  },
  {
    path: '/admin/coursearrangemanage',
    name: 'coursearrangemanage',
    component: listcoursearrangemanage,
  },
  {
    path: '/admin/detailcoursearrangemanage',
    name: 'detailcoursearrangemanage',
    component: detailcoursearrangemanage,
  },
  {
    path: '/admin/areamanage',
    name: 'areamanage',
    component: listareamanage,
  },
  {
    path: '/admin/detailareamanage',
    name: 'detailareamanage',
    component: detailareamanage,
  },
  {
    path: '/admin/teachfeedbackmanage',
    name: 'teachfeedbackmanage',
    component: listteachfeedbackmanage,
  },
  {
    path: '/admin/detailteachfeedbackmanage',
    name: 'detailteachfeedbackmanage',
    component: detailteachfeedbackmanage,
  },
  {
    path: '/admin/healthclockmanage',
    name: 'healthclockmanage',
    component: listhealthclockmanage,
  },
  {
    path: '/admin/studentleavemanage',
    name: 'studentleavemanage',
    component: liststudentleavemanage,
  },
  {
    path: '/admin/studenterrormanage',
    name: 'studenterrormanage',
    component: liststudenterrormanage,
  },
  {
    path: '/admin/detailstudenterrormanage',
    name: 'detailstudenterrormanage',
    component: detailstudenterrormanage,
  },
  {
    path: '/admin/repairinfomanage',
    name: 'repairinfomanage',
    component: listrepairinfomanage,
  },
]
