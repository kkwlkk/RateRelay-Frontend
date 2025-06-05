import ReactMarkdown from "react-markdown";
import { Header } from "../landing/Header";
import { Clock, FileText, History, Calendar, Tag, ChevronDown } from "lucide-react";
import { Footer } from "../landing/Footer";

interface VersionInfo {
  version: string;
  createdDate: string;
  lastUpdated: string;
}

interface VersionHistoryEntry {
  version: string;
  createdDate: string;
  lastUpdated: string;
  changes?: string[];
}

interface Heading {
  level: number;
  text: string;
  id: string;
}

export interface LegalPageProps {
  content: string;
  title: string;
  documentType: string;
  versionInfo: VersionInfo;
  versionHistory: VersionHistoryEntry[];
  headings: Heading[];
}

export default function LegalPage({
  content,
  title,
  documentType,
  versionInfo,
  versionHistory,
  headings
}: LegalPageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Header />
      <div className="bg-white dark:bg-zinc-950 pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-neutral-900/75 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-900 p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-sm shadow-sm">
                  {documentType}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                {title}
              </h1>
              <div className="flex items-start gap-4 text-sm text-zinc-600 dark:text-zinc-400 flex-col sm:flex-row sm:items-center">
                <div className="flex items-center gap-1.5">
                  <Tag className="h-4 w-4 text-zinc-500" />
                  <span className="font-medium">Wersja {versionInfo.version}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-zinc-500" />
                  <span>Utworzono: {formatDate(versionInfo.createdDate)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-zinc-500" />
                  <span>Ostatnia aktualizacja: {formatDate(versionInfo.lastUpdated)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6 pb-12">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            <div className="lg:flex-1">
              <div className="bg-white dark:bg-neutral-900/75 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-900 overflow-hidden">
                <div className="px-8 py-8 md:px-12 md:py-12">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => {
                        const id = children?.toString().toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
                        return (
                          <div className="my-8 scroll-mt-48" id={id}>
                            <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 leading-tight">
                              {children}
                            </h1>
                            <div className="w-12 h-px bg-zinc-200 dark:bg-zinc-800"></div>
                          </div>
                        );
                      },
                      h2: ({ children }) => {
                        const id = children?.toString().toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
                        return (
                          <h2
                            id={id}
                            className="text-xl md:text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-6 mt-16 pb-3 border-b border-zinc-100 dark:border-zinc-900 scroll-mt-32"
                          >
                            {children}
                          </h2>
                        );
                      },
                      h3: ({ children }) => {
                        const id = children?.toString().toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
                        return (
                          <h3
                            id={id}
                            className="text-lg md:text-xl font-medium text-zinc-800 dark:text-zinc-200 mb-4 mt-12 scroll-mt-32"
                          >
                            {children}
                          </h3>
                        );
                      },
                      h4: ({ children }) => {
                        const id = children?.toString().toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
                        return (
                          <h4
                            id={id}
                            className="text-base md:text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-3 mt-10 scroll-mt-32"
                          >
                            {children}
                          </h4>
                        );
                      },
                      h5: ({ children }) => {
                        const id = children?.toString().toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
                        return (
                          <h5
                            id={id}
                            className="text-sm md:text-base font-medium text-zinc-800 dark:text-zinc-200 mb-3 mt-8 scroll-mt-32"
                          >
                            {children}
                          </h5>
                        );
                      },
                      h6: ({ children }) => {
                        const id = children?.toString().toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
                        return (
                          <h6
                            id={id}
                            className="text-xs md:text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-3 mt-6 scroll-mt-32"
                          >
                            {children}
                          </h6>
                        );
                      },
                      p: ({ children }) => (
                        <p className="mb-5 mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300 text-base">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-6 mt-4 space-y-2 ml-4">
                          {children}
                        </ul>
                      ),
                      li: ({ children }) => (
                        <li className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300 text-base">
                          <div className="w-1 h-1 bg-zinc-400 dark:bg-zinc-600 rounded-full mt-2.5 flex-shrink-0"></div>
                          <span className="leading-relaxed">{children}</span>
                        </li>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-6 mt-4 space-y-2 text-zinc-700 dark:text-zinc-300 text-base ml-4">
                          {children}
                        </ol>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-6 py-4 mb-8 mt-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-r-lg">
                          <div className="text-zinc-600 dark:text-zinc-400 italic leading-relaxed">
                            {children}
                          </div>
                        </blockquote>
                      ),
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 underline decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-500 dark:hover:decoration-zinc-500 transition-colors duration-200 underline-offset-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic text-zinc-500 dark:text-zinc-500">
                          {children}
                        </em>
                      ),
                      code: ({ children }) => (
                        <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded text-sm font-mono border border-zinc-200 dark:border-zinc-700">
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-6 rounded-xl overflow-x-auto mb-8 mt-6 border border-zinc-700">
                          {children}
                        </pre>
                      ),
                      hr: () => (
                        <hr className="border-0 h-px bg-zinc-200 dark:bg-zinc-700 my-12" />
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto mb-8 mt-6">
                          <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-700 rounded-lg">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-zinc-50 dark:bg-zinc-800">
                          {children}
                        </thead>
                      ),
                      th: ({ children }) => (
                        <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-medium text-zinc-900 dark:text-zinc-100">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-zinc-700 dark:text-zinc-300">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            {(headings.length > 0 || versionHistory.length > 0) && (
              <div className="lg:w-80 order-first lg:order-last lg:sticky lg:top-28 lg:self-start">
                <div className="space-y-6">
                  {headings.length > 0 && (
                    <div className="bg-white dark:bg-neutral-900/75 rounded-lg shadow-sm border border-zinc-100 dark:border-zinc-900">
                      <details open className="group">
                        <summary className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                            <span>Spis treści</span>
                          </div>
                          <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="px-3 pt-2 pb-3 max-h-[40vh] overflow-y-auto">
                          <nav className="space-y-1">
                            {headings.map((heading, index) => (
                              <a
                                key={index}
                                href={`#${heading.id}`}
                                className={`block px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-md transition-colors duration-150 ${heading.level === 1 ? 'font-semibold' :
                                  heading.level === 2 ? 'ml-3' : 'ml-6'
                                  }`}
                              >
                                {heading.text}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </details>
                    </div>
                  )}

                  {versionHistory.length > 0 && (
                    <div className="bg-white dark:bg-neutral-900/75 rounded-lg shadow-sm border border-zinc-100 dark:border-zinc-900">
                      <details open className="group">
                        <summary className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <History className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                            <span>Historia wersji</span>
                          </div>
                          <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="pt-2 pb-3 max-h-[40vh] overflow-y-auto">
                          <div className="px-8 mt-1">
                            <div className="relative">
                              <div className="absolute left-2 top-3 bottom-3 w-px bg-zinc-300 dark:bg-zinc-600"></div>
                              <div className="space-y-6">
                                {versionHistory.map((version, index) => (
                                  <div key={index} className="relative flex gap-4">
                                    <div className={version.version === versionInfo.version
                                      ? "flex-shrink-0 w-4 h-4 bg-zinc-600 dark:bg-zinc-400 border-2 border-zinc-600 dark:border-zinc-400 rounded-full mt-1 relative z-10"
                                      : "flex-shrink-0 w-4 h-4 bg-white dark:bg-neutral-900/75 border-2 border-zinc-400 dark:border-zinc-500 rounded-full mt-1 relative z-10"
                                    }></div>
                                    <div className="flex-1 pb-2">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                                          Wersja {version.version}
                                        </span>
                                        <span className="text-xs text-zinc-600 dark:text-zinc-400">
                                          {formatDate(version.lastUpdated)}
                                        </span>
                                      </div>
                                      {version.changes && version.changes.length > 0 && (
                                        <ul className="space-y-1 mt-2">
                                          {version.changes.map((change, changeIndex) => (
                                            <li
                                              key={changeIndex}
                                              className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2"
                                            >
                                              <div className="w-1 h-1 bg-zinc-500 dark:bg-zinc-500 rounded-full mt-2 flex-shrink-0"></div>
                                              {change}
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-100 dark:border-zinc-900">
        <Footer />
      </div>
    </>
  );
}