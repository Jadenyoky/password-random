"use client";

import { useEffect, useState } from "react";

export default function sadasd() {
  const store = JSON.parse(localStorage.getItem("saved"));
  const [ss, setss] = useState(store ? store : []);
  console.log(store);

  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(ss));
    console.log("effect", ss);
  }, [ss]);
  return (
    <div>
      {ss.map((e, k) => {
        return (
          <ul key={k}>
            <li>
              {k + 1} - {e.word}
            </li>
            <button
              onClick={() => {
                setss(ss.filter((item) => item.id !== e.id));
              }}
            >
              Remove
            </button>
          </ul>
        );
      })}
    </div>
  );
}
