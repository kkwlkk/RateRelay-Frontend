import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

interface MarkdownFrontmatter {
  title?: string;
  version?: string;
  created?: string;
  updated?: string;
  type?: string;
  versionHistory?: Array<{
    version: string;
    date: string;
    changes: string[];
  }>;
}

interface ParsedMarkdown {
  content: string;
  frontmatter: MarkdownFrontmatter;
}

export function parseMarkdownWithFrontmatter(markdownText: string): ParsedMarkdown {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdownText.match(frontmatterRegex);

  if (!match) {
    return {
      content: markdownText,
      frontmatter: {}
    };
  }

  const frontmatterText = match[1];
  const content = match[2];

  let frontmatter: MarkdownFrontmatter = {};
  
  try {
    frontmatter = yaml.parse(frontmatterText) || {};
  } catch (error) {
    console.error('Error parsing YAML frontmatter:', error);
    frontmatter = {};
  }

  return {
    content: content.trim(),
    frontmatter
  };
}

export async function getMarkdownFile(filePath: string): Promise<ParsedMarkdown> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const markdownText = fs.readFileSync(fullPath, 'utf8');
    return parseMarkdownWithFrontmatter(markdownText);
  } catch (error) {
    console.error('Error loading markdown file:', error);
    return {
      content: 'Wystąpił błąd podczas ładowania dokumentu. Proszę spróbować ponownie później.',
      frontmatter: {}
    };
  }
}

export function createVersionInfo(frontmatter: MarkdownFrontmatter) {
  return {
    version: frontmatter.version || '1.0.0',
    createdDate: frontmatter.created || new Date().toISOString().split('T')[0],
    lastUpdated: frontmatter.updated || new Date().toISOString().split('T')[0]
  };
}

export function createVersionHistory(frontmatter: MarkdownFrontmatter) {
  return frontmatter.versionHistory?.map(entry => ({
    version: entry.version,
    createdDate: frontmatter.created || new Date().toISOString().split('T')[0],
    lastUpdated: entry.date,
    changes: entry.changes
  })) || [];
}

export function extractHeadings(content: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^a-z0-9ąćęłńóśźż\s]/gi, '').replace(/\s+/g, '-');
    headings.push({ level, text, id });
  }

  return headings;
}