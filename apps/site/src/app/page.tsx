'use server';
import { Metadata } from 'next';
import { Home } from '@/views';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      'STRIKE | Empowering Actionable Links on ICP | Interact with Canisters Seamlessly',
    description:
      'Strike enables seamless interaction with canisters via actionable links on the Internet Computer Protocol (ICP). Share links that unfurl into interactive Strike Cards for effortless engagement with smart contracts.',
  };
}

export default async function HomePage() {
  return <Home />;
}
