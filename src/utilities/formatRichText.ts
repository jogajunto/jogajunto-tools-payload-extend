type TextNode = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type LinkNode = {
  type: 'link';
  linkType: 'custom';
  url: string;
  newTab: true;
  children: TextNode[];
};

type ListItemNode = {
  type: 'li';
  children: TextNode[];
};

type ElementNode = {
  type?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'ul'
    | 'ol'
    | 'indent'
    | 'paragraph'
    | 'blockquote';
  children: (TextNode | LinkNode | ListItemNode)[];
};

export const convertMarkdownToPayloadContent = (md: string): ElementNode[] => {
  const lines = md.split('\n');
  const content: ElementNode[] = [];
  let buffer = '';

  for (const line of lines) {
    if (line.startsWith('# ')) {
      content.push({ type: 'h1', children: [{ text: line.slice(2) }] });
    } else if (line.startsWith('## ')) {
      content.push({ type: 'h2', children: [{ text: line.slice(3) }] });
    } else if (line.startsWith('### ')) {
      content.push({ type: 'h3', children: [{ text: line.slice(4) }] });
    } else if (line.startsWith('#### ')) {
      content.push({ type: 'h4', children: [{ text: line.slice(5) }] });
    } else if (line.startsWith('##### ')) {
      content.push({ type: 'h5', children: [{ text: line.slice(6) }] });
    } else if (line.startsWith('###### ')) {
      content.push({ type: 'h6', children: [{ text: line.slice(7) }] });
    } else if (line.startsWith('- ')) {
      content.push({
        type: 'ul',
        children: [
          {
            type: 'li',
            children: [{ text: line.slice(2) }],
          },
        ],
      });
    } else if (line.startsWith('1. ')) {
      content.push({
        type: 'ol',
        children: [
          {
            type: 'li',
            children: [{ text: line.slice(3) }],
          },
        ],
      });
    } else if (line.startsWith('> ')) {
      //   content.push({
      //     type: 'indent',
      //     children: [
      //       {
      //         text: line.slice(2),
      //       },
      //     ],
      //   });
      content.push({
        type: 'blockquote',
        children: [
          {
            text: line.slice(2),
          },
        ],
      });
    } else if (line.startsWith('**') && line.endsWith('**')) {
      content.push({
        type: 'paragraph',
        children: [
          {
            text: line.slice(2, -2),
            bold: true,
          },
        ],
      });
    } else if (line.startsWith('*') && line.endsWith('*')) {
      content.push({
        type: 'paragraph',
        children: [
          {
            text: line.slice(1, -1),
            italic: true,
          },
        ],
      });
    } else if (line.startsWith('_') && line.endsWith('_')) {
      content.push({
        type: 'paragraph',
        children: [
          {
            text: line.slice(1, -1),
            underline: true,
          },
        ],
      });
    } else if (line.startsWith('~~') && line.endsWith('~~')) {
      content.push({
        type: 'paragraph',
        children: [
          {
            text: line.slice(2, -2),
            strikethrough: true,
          },
        ],
      });
    } else if (line.startsWith('[')) {
      const linkText = line.slice(1, line.indexOf(']'));
      const url = line.slice(line.indexOf('(') + 1, line.indexOf(')'));
      content.push({
        type: 'paragraph',
        children: [
          { text: '' },
          {
            type: 'link',
            linkType: 'custom',
            url: url,
            newTab: true,
            children: [{ text: linkText }],
          },
          { text: '' },
        ],
      });
    } else if (line.startsWith('`') && line.endsWith('`')) {
      content.push({
        type: 'paragraph',
        children: [
          {
            text: line.slice(1, -1),
            code: true,
          },
        ],
      });
    } else {
      buffer += ' ' + line;
    }
  }

  if (buffer)
    content.push({ type: 'paragraph', children: [{ text: buffer.trim() }] });

  return content;
};
