export default [
  // user
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
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        name: 'manage',
        icon: 'highlight',
        path: '/manage',
        routes: [
          {
            path: '/manage/user',
            name: 'user',
            component: './manage/UserList',
          },
          {
            path: '/manage/user-add',
            name: 'user-add',
            component: './manage/UserAdd',
          },
          {
            path: '/manage/announce',
            name: 'announce',
            component: './manage/AnnounceList',
          },
        ],
      },
      {
        name: 'problem',
        icon: 'highlight',
        path: '/problem',
        routes: [
          {
            path: '/problem/list',
            name: 'list',
            component: './Problem/List',
          },
          {
            path: '/problem/edit',
            name: 'edit',
            component: './Problem/Edit',
          },
        ],
      },
      {
        name: 'contest',
        icon: 'highlight',
        path: '/contest',
        routes: [
          {
            path: '/contest/list',
            name: 'list',
            component: './Contest/List',
          },
          {
            path: '/contest/edit',
            name: 'edit',
            component: './Contest/Edit',
          },
        ],
      },
      {
        name: 'class',
        icon: 'highlight',
        path: '/class',
        routes: [
          {
            path: '/class/list',
            name: 'list',
            component: './Class/List',
          },
          {
            path: '/class/edit',
            name: 'edit',
            component: './Class/Edit',
          },
        ],
      },
      // hideInMenu: true,
      {
        name: 'student', // 学生相关页面
        icon: 'highlight',
        path: '/student',
        routes: [
          {
            path: '/student/problem/detail',
            name: 'problem-detail',
            component: './Student/Problem/Detail',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
