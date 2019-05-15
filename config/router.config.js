// import { STUDENT, ADMIN, TEACHER, GUEST } from '../src/configs/UserList';
// 为什么？？？在这里import就是报错的？？？
// 和commonjs有关
const STUDENT = 1;
const TEACHER = 2;
const ADMIN = 3;
const GUEST = 0;


// 总结，在父组件的权限可以因隐藏菜单
// 在页面组件的权限可以关闭隐藏页面

// todo
// 新建一个conf，在其中写上接口对应可调用的角色
// 把这层拦截加在request中
// 角色从getAuthority获取
// 如果无权限，不放松请求，提示“无权限操作”

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
        name: 'student', // 学生相关页面
        icon: 'highlight',
        component: '../layouts/StudentLayout',
        Routes: ['src/pages/Authorized'],
        path: '/student',
        // 在这里加了authority， 则两个菜单没了
        authority: [STUDENT, ADMIN, TEACHER],
        // 但是具体页面的的权限没有被限制，因此需要在每个页面加权限
        routes: [
          {
            path: '/student/problem/list',
            name: 'problemList',
            component: './Student/Problem/List',
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
        routes: [
          {
            name: 'manage',
            icon: 'highlight',
            path: '/admin/manage',
            authority: [ADMIN, TEACHER],
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
                authority: [ADMIN, TEACHER],
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
            routes: [
              {
                path: '/admin/class/list',
                name: 'list',
                component: './Class/List',
              },
              {
                path: '/admin/class/requestList',
                name: 'addRequest',
                component: './Class/RequestList',
              },
              {
                path: '/admin/class/detail/:id',
                name: 'detail',
                component: './Class/Edit',
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
  // 用户登录注册

];
