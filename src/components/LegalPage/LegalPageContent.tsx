import ReactMarkdown from "react-markdown";
import { markdownComponents } from "./LegalMarkdownComponents";

interface LegalPageContentProps {
    content: string;
}

export function LegalPageContent({ content }: LegalPageContentProps) {
    return (
        <div className="lg:flex-1">
            <div className="bg-white dark:bg-neutral-900/75 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-900 overflow-hidden">
                <div className="px-8 py-8 md:px-12 md:py-12">
                    <ReactMarkdown components={markdownComponents as never}>
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}