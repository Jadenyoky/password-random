"use client";

import { useEffect, useState } from "react";
import store from "store2";

export default function sadasd() {
  const [loading, setloading] = useState(false);
  // const store = JSON.parse(localStorage.getItem("saved"));
  const sr = store("ssd");
  const [ss, setss] = useState(sr ? sr : []);
  // const [ss, setss] = useState(store ? store : []);

  useEffect(() => {
    // localStorage.setItem("saved", JSON.stringify(ss));

    store("ssd", ss);
    console.log("effect", ss);
    setloading(true);
  }, [ss]);
  return (
    <div>
      {loading
        ? ss.map((e, k) => {
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
          })
        : null}
    </div>
  );
}
