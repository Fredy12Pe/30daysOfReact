import { quotes } from './quotes';

export const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    return {
        text: quote.text,
        author: quote.author || 'Unknown'
    };
};