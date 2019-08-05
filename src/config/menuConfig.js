export default [
  {
    name: 'dashboard',
    path: '/index',
    icon: 'dashboard'
  },
  {
    name: 'components',
    path: '/components',
    icon: 'component',
    children: [
      {
        name: 'countTo',
        path: '/components/countTo',
        icon: 'rise'
      },
      {
        name: 'treeTable',
        path: '/components/treeTable',
        icon: 'tree'
      },
      {
        name: 'dragList',
        path: '/components/dragList',
        icon: 'drag'
      },
      {
        name: 'markdown',
        path: '/components/markdown',
        icon: 'markdown'
      },
      {
        name: 'richText',
        path: '/components/richText',
        icon: 'rich-text'
      },
      {
        name: 'drawer',
        path: '/components/drawer',
        icon: 'drawer'
      }
    ]
  },
  {
    name: 'optimization',
    path: '/optimization',
    icon: 'optimization',
    children: [
      {
        name: 'imageCompression',
        path: '/optimization/imageCompression',
        icon: 'compression'
      },
      {
        name: 'sprites',
        path: '/optimization/sprites',
        icon: 'sprites'
      }
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    icon: 'language'
  }
];
