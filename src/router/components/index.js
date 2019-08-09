import Layout from '@/components/common/Layout';
export default [
  {
    path: '/components',
    component: Layout,
    children: [
      {
        path: 'countTo',
        component: () => import('@/views/components/countTo'),
        meta: {
          name: 'countTo',
        }
      }
    ]
  }
];
