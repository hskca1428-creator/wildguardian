import fs from 'fs';
import path from 'path';

const GUIDES_DIRECTORY = path.join(process.cwd(), 'content', 'guides');

const GUIDE_ORDER = [
  'how-to-identify-eastern-brown-snake-vs-common-tree-snake',
  'snake-bite-first-aid-pressure-immobilisation-technique',
  'when-is-snake-season-in-australia-state-by-state-calendar',
  'snake-in-the-backyard-what-to-do-and-not-to-do',
  'are-pet-snakes-dangerous-australian-vets-explain',
  'snake-identification-app-vs-field-guide-which-is-faster',
  'what-to-pack-in-a-snake-bite-first-aid-kit-australian-bush',
  'tiger-snake-vs-eastern-brown-how-to-tell-them-apart',
];

function removeWrappingQuotes(value) {
  return value.replace(/^['"]|['"]$/g, '');
}

export function parseGuideFrontMatter(source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!match) {
    throw new Error('Guide content is missing YAML front matter.');
  }

  const frontMatter = match[1].split('\n').reduce((data, line) => {
    const separatorIndex = line.indexOf(':');

    if (separatorIndex === -1) {
      return data;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    data[key] = removeWrappingQuotes(rawValue);
    return data;
  }, {});

  return { frontMatter, content: match[2].trim() };
}

function getReadingTime(content) {
  const words = content
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/\[[0-9]+\]:\s+https?:\/\/\S+.*$/gm, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(4, Math.ceil(words / 220));
}

function getGuideFilePath(slug) {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error('Invalid guide slug.');
  }

  return path.join(GUIDES_DIRECTORY, `${slug}.md`);
}

export function getGuideSlugs() {
  return fs
    .readdirSync(GUIDES_DIRECTORY)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export function getGuideBySlug(slug) {
  const source = fs.readFileSync(getGuideFilePath(slug), 'utf8');
  const { frontMatter, content } = parseGuideFrontMatter(source);

  return {
    ...frontMatter,
    slug,
    content,
    readingTime: getReadingTime(content),
  };
}

export function getAllGuideSummaries() {
  return getGuideSlugs()
    .map((slug) => {
      const guide = getGuideBySlug(slug);
      return {
        title: guide.title,
        slug: guide.slug,
        metaDescription: guide.metaDescription,
        excerpt: guide.excerpt,
        dateReviewed: guide.dateReviewed,
        readingTime: guide.readingTime,
      };
    })
    .sort((a, b) => {
      const aIndex = GUIDE_ORDER.indexOf(a.slug);
      const bIndex = GUIDE_ORDER.indexOf(b.slug);
      return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
    });
}
