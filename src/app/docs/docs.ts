import { SidebarNavItem } from './types/nav';

interface DocsConfig {
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: '코딩 컨벤션(개인 작업)',
      items: [
        {
          title: 'Javascript',
          href: '/docs/javascript',
          items: [],
        },
        {
          title: 'Typescript',
          href: '/docs/typescript',
          items: [],
        },
        {
          title: 'React',
          href: '/docs/react',
          items: [],
        },
        {
          title: 'Next',
          href: '/docs/next',
          items: [],
        },
        {
          title: 'Express',
          href: '/docs/express',
          items: [],
        },
        {
          title: 'Nest',
          href: '/docs/nest',
          items: [],
        },
        {
          title: 'Nest-test(mongoose)',
          href: '/docs/nest-test-mongoose',
          items: [],
        },
        {
          title: 'Nest-test(typeorm)',
          href: '/docs/nest-test-typeorm',
          items: [],
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          title: 'card',
          href: '/docs/components/card',
          items: [],
        },
      ],
    },
  ],
};
