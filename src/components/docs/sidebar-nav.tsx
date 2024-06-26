'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';
import { SidebarNavItem } from '@/types/nav';

export interface DocsSidebarNavProps {
  navItems: SidebarNavItem[];
}

export const DocsSidebarNav = ({ navItems }: DocsSidebarNavProps) => {
  const locale = useLocale();
  const pathname = usePathname();
  return navItems.length ? (
    <div className="w-full">
      {navItems.map((item, index) => {
        return (
          <div key={index} className={cn('pb-4')}>
            <h4 className="mb-1 rounded-md px-2 py-1 text-base font-semibold">
              {item.title}
            </h4>
            {item?.items?.length && (
              <DocsSidebarNavItems
                items={item.items}
                pathname={pathname}
                locale={locale}
              />
            )}
          </div>
        );
      })}
    </div>
  ) : null;
};

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string;
  locale: string;
}

export const DocsSidebarNavItems = ({
  items,
  pathname,
  locale,
}: DocsSidebarNavItemsProps) => {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max pl-2">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={`/${locale}${item.href}`}
            className={cn(
              'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
              item.disabled && 'cursor-not-allowed opacity-60',
              `/${locale}${item.href}` === pathname
                ? 'font-medium text-primary'
                : 'text-muted-foreground'
            )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              'flex w-full cursor-not-allowed items-center rounded-md px-2 py-1 text-muted-foreground hover:underline',
              item.disabled && 'cursor-not-allowed opacity-60'
            )}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        )
      )}
    </div>
  ) : null;
};
