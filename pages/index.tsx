import { useState } from "react";
import Head from "next/head";
import { getOpenAIResponse } from "../utils/helpers";

export default function Home() {
  const [request, setRequest] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!request) return;

    try {
      const res = await getOpenAIResponse(request);
      setResponse(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <Head>
        <title>Task One Helper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Task One Helper
        </h1>
        <p className="text-gray-600 mb-8">
          Enter a request below and hit "Get Help" to generate a response
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="request" className="block text-gray-700 font-bold">
              Request
            </label>
            <input
              type="text"
              name="request"
              id="request"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your request"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Get Help
          </button>
        </form>

        {response && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Response:</h2>
            <ol
              className="list-decimal list-inside"
              dangerouslySetInnerHTML={{ __html: response }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
