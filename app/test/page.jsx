"use client";
import { useEffect, useState } from "react";
import store from "store2";

export default function sadasd() {
  const [loading, setloading] = useState(false);

  const inStore = store("saved");
  const [saved, setsaved] = useState(inStore ? inStore : []);

  useEffect(() => {
    store("saved", saved);
    console.log("effect", saved);

    setloading(true);
  }, [saved]);
  return (
    <div>
      {loading
        ? saved.map((e, k) => {
            return (
              <ul key={k}>
                <li>
                  {k + 1} - {e.word}
                </li>
                <button
                  onClick={() => {
                    setsaved(saved.filter((item) => item.id !== e.id));
                  }}
                >
                  Remove
                </button>
              </ul>
            );
          })
        : null}
    </div>
  );
}
