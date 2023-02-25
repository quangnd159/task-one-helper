import { useState } from "react";
import Head from "next/head";
import { getOpenAIResponse } from "../utils/helpers";

export default function Home() {
  const [request, setRequest] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!request) return;

    setIsLoading(true);

    try {
      const res = await getOpenAIResponse(request);
      setResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequest(event.target.value);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && request) {
      setIsLoading(true);

      try {
        const res = await getOpenAIResponse(request);
        setResponse(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <Head>
        <title>Task One Helper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl font-bold mb-4">
          🎩 Task One Helper
        </h1>
        <p className="text-gray-500 mb-8">
          Let AI write some model sentences for you ✨
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="request"
              id="request"
              value={request}
              onChange={handleRequestChange}
              className="w-full px-3 py-2 border"
              placeholder="e.g. 97% households owned tv 1972"
            />
          </div>

          {isLoading ? (
            <div className="py-2 w-full text-center bg-gray-200 rounded-md animate-pulse">
              Processing
            </div>
          ) : (
            <button
              type="submit"
              className="px-5 h-9 uppercase font-semibold tracking-wider bg-amber-400 text-black"
            >
              Get Help
            </button>
          )}
        </form>

        {response && (
          <div className="mt-8">
            <ol
              className="list-decimal list-inside text-2xl font-serif leading-10 text-slate-600"
              dangerouslySetInnerHTML={{ __html: response }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
