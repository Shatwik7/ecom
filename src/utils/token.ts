import {WordTokenizer} from "natural";

const tokenizer = new WordTokenizer();

const stopwords = ['the', 'is', 'a', 'to', 'with', 'for', 'on', 'and', 'in', 'of', 'at', 'my', 'i', 'it', 'need'];

export function extractKeywords(text: string): string[] {
  const tokens = tokenizer.tokenize(text.toLowerCase());
  return tokens.filter(word => !stopwords.includes(word));
}