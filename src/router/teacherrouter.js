import liststudentclassmanage from '@/views/teacher/studentclassmanage/liststudentclassmanage'
import detailstudentclassmanage from '@/views/teacher/studentclassmanage/detailstudentclassmanage'
import liststudentmanage from '@/views/teacher/studentmanage/liststudentmanage'
import detailstudentmanage from '@/views/teacher/studentmanage/detailstudentmanage'
import listcoursearrangemanage from '@/views/teacher/coursearrangemanage/listcoursearrangemanage'
import detailcoursearrangemanage from '@/views/teacher/coursearrangemanage/detailcoursearrangemanage'
import liststudentclockmanage from '@/views/teacher/studentclockmanage/liststudentclockmanage'
import detailstudentclockmanage from '@/views/teacher/studentclockmanage/detailstudentclockmanage'
import listteachfeedbackmanage from '@/views/teacher/teachfeedbackmanage/listteachfeedbackmanage'
import detailteachfeedbackmanage from '@/views/teacher/teachfeedbackmanage/detailteachfeedbackmanage'
import listhealthclockmanage from '@/views/teacher/healthclockmanage/listhealthclockmanage'
import liststudentleavemanage from '@/views/teacher/studentleavemanage/liststudentleavemanage'
import liststudenterrormanage from '@/views/teacher/studenterrormanage/liststudenterrormanage'

export default [
    {
        path: '/teacher/studentclassmanage',
        name: 'studentclassmanaget',
        component: liststudentclassmanage,
      },
      {
        path: '/teacher/detailstudentclassmanage',
        name: 'detailstudentclassmanaget',
        component: detailstudentclassmanage,
      },
      {
        path: '/teacher/studentmanage',
        name: 'studentmanaget',
        component: liststudentmanage,
      },
      {
        path: '/teacher/detailstudentmanage',
        name: 'detailstudentmanaget',
        component: detailstudentmanage,
      },
      {
        path: '/teacher/coursearrangemanage',
        name: 'coursearrangemanaget',
        component: listcoursearrangemanage,
      },
      {
        path: '/teacher/detailcoursearrangemanage',
        name: 'detailcoursearrangemanaget',
        component: detailcoursearrangemanage,
      },
      {
        path: '/teacher/studentclockmanage',
        name: 'studentclockmanaget',
        component: liststudentclockmanage,
      },
      {
        path: '/teacher/detailstudentclockmanage',
        name: 'detailstudentclockmanaget',
        component: detailstudentclockmanage,
      },
      {
        path: '/teacher/teachfeedbackmanage',
        name: 'teachfeedbackmanaget',
        component: listteachfeedbackmanage,
      },
      {
        path: '/teacher/detailteachfeedbackmanage',
        name: 'detailteachfeedbackmanaget',
        component: detailteachfeedbackmanage,
      },
      {
        path: '/teacher/healthclockmanage',
        name: 'healthclockmanaget',
        component: listhealthclockmanage,
      },
      {
        path: '/teacher/studentleavemanage',
        name: 'studentleavemanaget',
        component: liststudentleavemanage,
      },
      {
        path: '/teacher/studenterrormanage',
        name: 'studenterrormanaget',
        component: liststudenterrormanage,
      },
]