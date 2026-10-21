import fs from 'fs';
import path from 'path';
import { parseGuideFrontMatter } from './guides';

const SPECIES_DIRECTORY = path.join(process.cwd(), 'content', 'species');

function getReadingTime(content) {
  const words = content
    .replace(/^\[\d+\]:\s+https?:\/\/\S+.*$/gm, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(4, Math.ceil(words / 220));
}

function getSpeciesFilePath(slug) {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error('Invalid species slug.');
  }

  return path.join(SPECIES_DIRECTORY, `${slug}.md`);
}

export function getSpeciesPageSlugs() {
  return fs
    .readdirSync(SPECIES_DIRECTORY)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export function getSpeciesPageBySlug(slug) {
  const source = fs.readFileSync(getSpeciesFilePath(slug), 'utf8');
  const { frontMatter, content } = parseGuideFrontMatter(source);

  return {
    ...frontMatter,
    slug,
    content,
    readingTime: getReadingTime(content),
  };
}
