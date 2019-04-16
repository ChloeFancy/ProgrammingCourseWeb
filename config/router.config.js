export default [
  // 前台学生
  // hideInMenu: true,
  {
    name: 'menu', // 学生相关页面
    icon: 'highlight',
    // component: '../layouts/StudentLayout',
    path: '/',
    routes: [
      {
        path: '/',
        redirect: '/student/problem/list',
      },
      {
        name: 'student', // 学生相关页面
        icon: 'highlight',
        component: '../layouts/StudentLayout',
        path: '/student',
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
            routes: [
              {
                path: '/admin/manage/user',
                name: 'user',
                component: './manage/UserList',
              },
              {
                path: '/admin/manage/user-add',
                name: 'user-add',
                component: './manage/UserAdd',
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
                path: '/admin/class/addRequest',
                name: 'addRequest',
                component: './Class/Edit',
                // todo 加入班級請求也
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
