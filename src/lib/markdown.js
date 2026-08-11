import { marked } from 'marked';

/**
 * Markdown文字列をHTMLに変換
 * @param {string} markdown - Markdown文字列
 * @returns {string} - HTML文字列
 */
export function markdownToHtml(markdown) {
    if (!markdown) return '';
    return marked.parse(markdown);
}
