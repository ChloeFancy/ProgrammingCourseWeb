// 用户角色
import { STUDENT, TEACHER, ADMIN, GUEST } from './role.config';

// 总结，在父组件的权限可以因隐藏菜单
// 在页面组件的权限可以关闭隐藏页面


export default [
  // 前台学生
  // hideInMenu: true,
  {
    name: 'menu', // 学生相关页面
    icon: 'highlight',
    path: '/',
    routes: [
      {
        path: '/',
        redirect: '/student/problem/list',
        authority: [STUDENT, ADMIN, TEACHER, GUEST],
      },
      {
        path: '/admin',
        redirect: '/admin/problem/list',
        authority: [ADMIN, TEACHER],
      },
      {
        name: 'student', // 学生相关页面
        icon: 'highlight',
        component: '../layouts/StudentLayout',
        Routes: ['src/pages/Authorized'],
        path: '/student',
        // 在这里加了authority， 则两个菜单没了
        // authority: [STUDENT, ADMIN, TEACHER],
        // 但是具体页面的的权限没有被限制，因此需要在每个页面加权限
        routes: [
          {
            path: '/student/problem/list',
            name: 'problemList',
            component: './Student/Problem/List',
          },
          {
            path: '/student/class/list',
            name: 'studentClassList',
            component: './Class/List',
          },
          {
            path: '/student/announce',
            name: 'studentAnnounce',
            component: './Student/Announce',
          },
          {
            path: '/student/problem/detail/:id',
            name: 'problemDetail',
            component: './Student/Problem/Detail',
            hideInMenu: true,
          },
          {
            path: '/student/rank',
            name: 'rank',
            component: './Student/Rank/index',
            // authority: [STUDENT, ADMIN],
            // 在这里加了auth，则菜单也没了，并且会跳转登陆
          },
          {
            path: '/student/statistics',
            name: 'statistics',
            component: './Student/Statistics',
            authority: [STUDENT],
            // 在这里加了auth，则菜单也没了，并且会跳转登陆
          },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          { path: '/user', redirect: '/user/login' },
          { path: '/user/login', name: 'login', component: './User/Login' },
          { path: '/user/register', name: 'register', component: './User/Register' },
          {
            path: '/user/personalCenter',
            name: 'personalCenter',
            component: './User/PersonalCenter',
            authority: [ADMIN, TEACHER, STUDENT],
          },
          {
            path: '/user/register-result',
            name: 'register.result',
            component: './User/RegisterResult',
          },
          {
            component: '404',
          },
        ],
      },
      // 后台管理manage
      {
        name: 'admin',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: [ADMIN, TEACHER],
        routes: [
          {
            name: 'manage',
            icon: 'highlight',
            path: '/admin/manage',
            authority: [ADMIN],
            routes: [
              {
                path: '/admin/manage/user',
                name: 'user',
                component: './manage/UserList',
              },
              {
                path: '/admin/manage/studentStatistics/:id',
                name: 'studentStatistics',
                component: './Student/Statistics',
                hideInMenu: true,
              },
              {
                path: '/admin/manage/user-add',
                name: 'user-add',
                component: './manage/UserAdd',
                hideInMenu: true,
              },
              {
                path: '/admin/manage/announce',
                name: 'announce',
                component: './manage/AnnounceList',
              },
              {
                path: '/admin/manage/tag',
                name: 'tag',
                component: './manage/TagList',
              },
            ],
          },
          {
            name: 'problem',
            icon: 'highlight',
            path: '/admin/problem',
            authority: [ADMIN, TEACHER],
            routes: [
              {
                path: '/admin/problem/list',
                name: 'list',
                component: './Problem/List',
              },
              {
                path: '/admin/problem/add',
                name: 'add',
                component: './Problem/Edit',
              },
              {
                path: '/admin/problem/edit/:id',
                hideInMenu: true,
                name: 'edit',
                component: './Problem/Edit',
              },
              {
                path: '/admin/problem/submit/:id',
                hideInMenu: true,
                name: 'edit',
                component: './Problem/SubmitRecords',
              },
            ],
          },
          {
            name: 'contest',
            icon: 'highlight',
            path: '/admin/contest',
            authority: [ADMIN, TEACHER],
            routes: [
              {
                path: '/admin/contest/list',
                name: 'list',
                component: './Contest/List',
              },
              {
                path: '/admin/contest/add',
                name: 'add',
                component: './Contest/Edit',
              },
              {
                path: '/admin/contest/edit/:id',
                hideInMenu: true,
                name: 'edit',
                component: './Contest/Edit',
              },
            ],
          },
          {
            name: 'class',
            icon: 'highlight',
            path: '/admin/class',
            authority: [ADMIN, TEACHER],
            routes: [
              {
                path: '/admin/class/list',
                name: 'list',
                component: './Class/List',
              },
              {
                path: '/admin/class/request/:id',
                name: 'addRequest',
                component: './Class/RequestList',
                hideInMenu: true,
              },
              {
                path: '/admin/class/member/:id',
                name: 'detail',
                component: './Class/MemberList',
                hideInMenu: true,
              },
            ],
          },
          {
            component: '404',
          },
        ],
      },
    ],
  },
];
