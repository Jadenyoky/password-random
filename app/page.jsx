"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import _ from "lodash";

export default function Home() {
  const [loading, setloading] = useState(false);
  const [res, setres] = useState("");

  const num = useRef();
  const range = useRef();

  const all = {
    letters: {
      uppercase: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      lowercase: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
    },
    symbols: [
      "@",
      "#",
      "$",
      "%",
      "&",
      "*",
      "-",
      "_",
      "+",
      "=",
      "<",
      ">",
      "?",
      "!",
      "(",
      ")",
      "{",
      "}",
      "[",
      "]",
    ],
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  };

  const random = () => {
    const capital = _.sampleSize(all.letters.uppercase, num.current.value);
    const small = _.sampleSize(all.letters.lowercase, num.current.value);
    const number = _.sampleSize(all.numbers, num.current.value);
    const symbol = _.sampleSize(all.symbols, num.current.value);
    const arr = _.flatMap([capital, small, number, symbol]);
    setres(_.sampleSize(arr, num.current.value));
  };

  useEffect(() => {
    random();
  }, []);

  return (
    <>
      <div className="content">
        <div className="password">
          <p>{res}</p>
          <div
            className="line"
            style={{
              width: num.current
                ? num.current.value > 10
                  ? "100%"
                  : "30%"
                : "30%",
              background: num.current
                ? num.current.value > 10
                  ? "green"
                  : "red"
                : "gainsboro",
            }}
          >
            <p
              style={{
                backgroundColor: num.current
                  ? num.current.value > 10
                    ? "green"
                    : "red"
                  : "grey",
                color: num.current
                  ? num.current.value > 10
                    ? "white"
                    : "white"
                  : "gainsboro",
              }}
            >
              {num.current
                ? num.current.value > 10
                  ? "Very Strong"
                  : "Not Save"
                : "Not"}
            </p>
          </div>
        </div>
      </div>

      <div className="ranging">
        <input
          type="range"
          min={6}
          max={24}
          defaultValue={6}
          ref={range}
          onChange={() => {
            random();
            num.current.value = range.current.value;
            console.log(num.current.value, range.current.value);
          }}
        />
        <input
          type="number"
          min={6}
          max={24}
          defaultValue={6}
          ref={num}
          onChange={() => {
            random();
            range.current.value = num.current.value;
            console.log(num.current.value, range.current.value);
          }}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => {
            random();
          }}
          className="btn"
        >
          Random
        </button>
      </div>
    </>
  );
}
