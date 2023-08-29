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
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'ul' | 'ol' | 'indent' | 'paragraph' | 'blockquote';
    children: (TextNode | LinkNode | ListItemNode)[];
};
export declare const convertMarkdownToPayloadContent: (md: string) => ElementNode[];
export {};
