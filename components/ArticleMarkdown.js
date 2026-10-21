import { AlertTriangle, ExternalLink } from 'lucide-react';

function getReferences(markdown) {
  return markdown.split('\n').reduce((references, line) => {
    const match = line.match(/^\[(\d+)\]:\s+(https?:\/\/\S+)\s+"(.+)"$/);

    if (match) {
      references[match[1]] = { url: match[2], title: match[3] };
    }

    return references;
  }, {});
}

function InlineText({ text, references }) {
  const tokens = text.split(/(\[\d+\]|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);

  return tokens.map((token, index) => {
    const citation = token.match(/^\[(\d+)\]$/);
    if (citation && references[citation[1]]) {
      return (
        <a
          key={`${token}-${index}`}
          href={references[citation[1]].url}
          target="_blank"
          rel="noreferrer"
          className="ml-0.5 inline-flex align-super text-xs font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-950"
          aria-label={`Source ${citation[1]}: ${references[citation[1]].title}`}
        >
          {token}
        </a>
      );
    }

    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={`${token}-${index}`}>{token.slice(2, -2)}</strong>;
    }

    if (token.startsWith('*') && token.endsWith('*')) {
      return <em key={`${token}-${index}`}>{token.slice(1, -1)}</em>;
    }

    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code key={`${token}-${index}`} className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">
          {token.slice(1, -1)}
        </code>
      );
    }

    return token;
  });
}

function Table({ lines, references }) {
  const rows = lines.map((line) => line.replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()));
  const hasDivider = rows[1]?.every((cell) => /^:?-{3,}:?$/.test(cell));
  const header = rows[0];
  const body = hasDivider ? rows.slice(2) : rows.slice(1);

  return (
    <div className="my-7 overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-900 text-white">
          <tr>
            {header.map((cell, index) => (
              <th key={`${cell}-${index}`} className="px-4 py-3 font-bold align-top">
                <InlineText text={cell} references={references} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {body.map((row, rowIndex) => (
            <tr key={`${rowIndex}-${row.join('-')}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cellIndex}-${cell}`} className="px-4 py-3 align-top leading-relaxed text-slate-700">
                  <InlineText text={cell} references={references} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReferenceList({ references }) {
  return (
    <ol className="mt-4 space-y-3 border-l-4 border-blue-100 pl-6 text-sm leading-relaxed text-slate-700">
      {Object.entries(references)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([number, reference]) => (
          <li key={number} id={`reference-${number}`}>
            <a
              href={reference.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-950"
            >
              [{number}] {reference.title}
              <ExternalLink className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </li>
        ))}
    </ol>
  );
}

export default function ArticleMarkdown({ markdown, skipFirstHeading = false }) {
  const references = getReferences(markdown);
  const lines = markdown
    .split('\n')
    .filter((line) => !/^\[\d+\]:\s+https?:\/\/\S+\s+".+"$/.test(line));
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith('# ')) {
      if (!skipFirstHeading) {
        blocks.push(
          <h1 key={`h1-${index}`} className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            <InlineText text={line.slice(2)} references={references} />
          </h1>
        );
      }
      index += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      const heading = line.slice(3);
      blocks.push(
        <h2 key={`h2-${index}`} className="mt-10 scroll-mt-8 text-2xl font-bold tracking-tight text-slate-950">
          <InlineText text={heading} references={references} />
        </h2>
      );
      if (heading.toLowerCase() === 'references') {
        blocks.push(<ReferenceList key={`references-${index}`} references={references} />);
      }
      index += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push(
        <h3 key={`h3-${index}`} className="mt-7 text-xl font-bold text-slate-900">
          <InlineText text={line.slice(4)} references={references} />
        </h3>
      );
      index += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      blocks.push(
        <aside key={`callout-${index}`} className="my-7 rounded-xl border-l-4 border-red-600 bg-red-50 p-5 text-red-950 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-700" aria-hidden="true" />
            <p className="leading-relaxed">
              <InlineText text={line.slice(2)} references={references} />
            </p>
          </div>
        </aside>
      );
      index += 1;
      continue;
    }

    if (line.startsWith('|')) {
      const tableLines = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      blocks.push(<Table key={`table-${index}`} lines={tableLines} references={references} />);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ''));
        index += 1;
      }
      blocks.push(
        <ul key={`unordered-${index}`} className="my-5 list-disc space-y-2 pl-6 leading-relaxed text-slate-700 marker:text-blue-600">
          {items.map((item, itemIndex) => (
            <li key={`${itemIndex}-${item}`}>
              <InlineText text={item} references={references} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ''));
        index += 1;
      }
      blocks.push(
        <ol key={`ordered-${index}`} className="my-5 list-decimal space-y-3 pl-6 leading-relaxed text-slate-700 marker:font-bold marker:text-blue-700">
          {items.map((item, itemIndex) => (
            <li key={`${itemIndex}-${item}`}>
              <InlineText text={item} references={references} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length) {
      const nextLine = lines[index].trim();
      if (
        !nextLine ||
        nextLine.startsWith('#') ||
        nextLine.startsWith('> ') ||
        nextLine.startsWith('|') ||
        /^[-*]\s+/.test(nextLine) ||
        /^\d+\.\s+/.test(nextLine)
      ) {
        break;
      }
      paragraph.push(nextLine);
      index += 1;
    }
    blocks.push(
      <p key={`paragraph-${index}`} className="mt-4 leading-8 text-slate-700">
        <InlineText text={paragraph.join(' ')} references={references} />
      </p>
    );
  }

  return <>{blocks}</>;
}
