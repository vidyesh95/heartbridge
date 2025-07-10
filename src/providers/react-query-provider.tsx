'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useState } from 'react';

export default function ReactQueryProvider({ children }: PropsWithChildren) {
    // Create the client **once** per browser tab
    const [client] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={client}>
            {children}
            {/* -- devtools are optional -- */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}