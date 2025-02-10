import { HydrateClient, trpc } from '@/app/trpc/server'
import { DEFAULT_LIMIT } from '@/constants';
import { StudioView } from '@/modules/studio/views/studio-view';
import React from 'react'

const Page = async () => {
  void trpc.studio.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT  
  });
  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  )
}

export default Page