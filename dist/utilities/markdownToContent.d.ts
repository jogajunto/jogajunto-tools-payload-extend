type TextChild = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
};
type LinkChild = {
    type: 'link';
    linkType: 'custom';
    url: string;
    newTab: boolean;
    children: TextChild[];
};
type ListItem = {
    type: 'li';
    children: TextChild[];
};
type Block = {
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote' | 'indent';
    children: TextChild[];
} | {
    type: 'ul' | 'ol';
    children: ListItem[];
} | {
    type: 'upload';
    value: {
        id: string;
    };
    children: [];
} | {
    children: (TextChild | LinkChild)[];
};
export declare const markdownToContent: (markdown: string) => Block[];
export {};
