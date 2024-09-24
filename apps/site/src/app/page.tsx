'use server';

import { Home } from '@/views';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const actionUrl = searchParams['url'];
  return <Home />;
}
