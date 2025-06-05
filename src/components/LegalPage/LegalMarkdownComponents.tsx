export const markdownComponents = {
    h1: ({ children }: { children: React.ReactNode }) => {
        const id = children?.toString().toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
        return (
            <div className="mb-8 first:mt-0 mt-8">
                <div className="relative -top-30" id={id}></div>
                <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 leading-tight">
                    {children}
                </h1>
                <div className="w-12 h-px bg-zinc-200 dark:bg-zinc-800"></div>
            </div>
        );
    },
    h2: ({ children }: { children: React.ReactNode }) => {
        const id = children?.toString().toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
        return (
            <>
                <div className="relative -top-20" id={id}></div>
                <h2 className="text-xl md:text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-6 first:mt-0 mt-16 pb-3 border-b border-zinc-100 dark:border-zinc-900">
                    {children}
                </h2>
            </>
        );
    },
    h3: ({ children }: { children: React.ReactNode }) => {
        const id = children?.toString().toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
        return (
            <>
                <div className="relative -top-20" id={id}></div>
                <h3 className="text-lg md:text-xl font-medium text-zinc-800 dark:text-zinc-200 mb-4 first:mt-0 mt-12">
                    {children}
                </h3>
            </>
        );
    },
    h4: ({ children }: { children: React.ReactNode }) => {
        const id = children?.toString().toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
        return (
            <>
                <div className="relative -top-20" id={id}></div>
                <h4 className="text-base md:text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-3 first:mt-0 mt-10">
                    {children}
                </h4>
            </>
        );
    },
    h5: ({ children }: { children: React.ReactNode }) => {
        const id = children?.toString().toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
        return (
            <>
                <div className="relative -top-20" id={id}></div>
                <h5 className="text-sm md:text-base font-medium text-zinc-800 dark:text-zinc-200 mb-3 first:mt-0 mt-8">
                    {children}
                </h5>
            </>
        );
    },
    h6: ({ children }: { children: React.ReactNode }) => {
        const id = children?.toString().toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
        return (
            <>
                <div className="relative -top-20" id={id}></div>
                <h6 className="text-xs md:text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-3 first:mt-0 mt-6">
                    {children}
                </h6>
            </>
        );
    },
    p: ({ children }: { children: React.ReactNode }) => (
        <p className="mb-5 first:mt-0 mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300 text-base">
            {children}
        </p>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="mb-6 first:mt-0 mt-4 space-y-2 ml-4">
            {children}
        </ul>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
        <li className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300 text-base">
            <div className="w-1 h-1 bg-zinc-400 dark:bg-zinc-600 rounded-full mt-2.5 flex-shrink-0"></div>
            <span className="leading-relaxed">{children}</span>
        </li>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
        <ol className="list-decimal list-inside mb-6 first:mt-0 mt-4 space-y-2 text-zinc-700 dark:text-zinc-300 text-base ml-4">
            {children}
        </ol>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-6 py-4 mb-8 first:mt-0 mt-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-r-lg">
            <div className="text-zinc-600 dark:text-zinc-400 italic leading-relaxed">
                {children}
            </div>
        </blockquote>
    ),
    a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
        <a
            href={href}
            className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 underline decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-500 dark:hover:decoration-zinc-500 transition-colors duration-200 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
            {children}
        </strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
        <em className="italic text-zinc-500 dark:text-zinc-500">
            {children}
        </em>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
        <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded text-sm font-mono border border-zinc-200 dark:border-zinc-700">
            {children}
        </code>
    ),
    pre: ({ children }: { children: React.ReactNode }) => (
        <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-6 rounded-xl overflow-x-auto mb-8 first:mt-0 mt-6 border border-zinc-700">
            {children}
        </pre>
    ),
    hr: () => (
        <hr className="border-0 h-px bg-zinc-200 dark:bg-zinc-700 first:my-0 my-12" />
    ),
    table: ({ children }: { children: React.ReactNode }) => (
        <div className="overflow-x-auto mb-8 first:mt-0 mt-6">
            <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-700 rounded-lg">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }: { children: React.ReactNode }) => (
        <thead className="bg-zinc-50 dark:bg-zinc-800">
            {children}
        </thead>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
        <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-medium text-zinc-900 dark:text-zinc-100">
            {children}
        </th>
    ),
    td: ({ children }: { children: React.ReactNode }) => (
        <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-zinc-700 dark:text-zinc-300">
            {children}
        </td>
    ),
};