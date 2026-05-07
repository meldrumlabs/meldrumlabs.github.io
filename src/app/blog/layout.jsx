'use client';

import {SectionProvider} from '@/components/SectionProvider';

export default function BlogLayout({children}) {
  return (
    <SectionProvider sections={[]}>
      {children}
    </SectionProvider>
  );
}
