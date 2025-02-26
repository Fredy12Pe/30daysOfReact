import { useState, useEffect } from "react";
import { getRandomQuote } from "../quoteService";

function App() {
  const [quote, setQuote] = useState({
    text: "Loading...",
    author: "",
  });

  const getNewQuote = () => {
    const newQuote = getRandomQuote();
    setQuote(newQuote);
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quote.text}" - ${quote.author}`;
    window.open(twitterUrl, "_blank");
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
        <div className="mb-6">
          <p className="text-3xl font-serif text-gray-800 mb-4">
            "{quote.text}"
          </p>
          <p className="text-right text-gray-600 italic text-xl">
            - {quote.author}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={getNewQuote}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            New Quote
          </button>

          <button
            onClick={shareOnTwitter}
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Share on Twitter
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
