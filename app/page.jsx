"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import _ from "lodash";
import Link from "next/link";
import store from "store2";
("store2");

export default function Home() {
  const inStore = store("saved");
  const [saved, setsaved] = useState(inStore ? inStore : []);

  const [loading, setloading] = useState(false);
  const [res, setres] = useState("");
  const [keep, setkeep] = useState(false);

  const num = useRef();
  const range = useRef();
  const password = useRef();

  const [numUpper, setnumUpper] = useState(false);
  const [numLower, setnumLower] = useState(false);
  const [numNumbers, setnumNumbers] = useState(false);
  const [numSymbols, setnumSymbols] = useState(false);

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
    setkeep(false);
    const capital = _.sampleSize(
      all.letters.uppercase,
      numUpper ? 0 : all.letters.uppercase.length
    );
    const small = _.sampleSize(
      all.letters.lowercase,
      numLower ? 0 : all.letters.lowercase.length
    );
    const number = _.sampleSize(
      all.numbers,
      numNumbers ? 0 : all.numbers.length
    );
    const symbol = _.sampleSize(
      all.symbols,
      numSymbols ? 0 : all.symbols.length
    );
    const arr = _.flatMap([
      number,
      capital,
      number,
      small,
      number,
      symbol,
      capital,
      small,
      number,
      symbol,
      number,
      symbol,
      number,
      number,
      capital,
      small,
    ]);
    setres(_.sampleSize(arr, num.current.value));
  };

  useEffect(() => {
    random();
  }, [numUpper, numLower, numNumbers, numSymbols]);

  useEffect(() => {
    store("saved", saved);
    console.log("effect", saved);
  }, [saved]);

  return (
    <>
      <div className="content">
        <div className="password">
          <p
            ref={password}
            onClick={(e) => {
              navigator.clipboard.writeText(password.current.textContent);
              const elem = document.createElement("div");
              elem.textContent = "Copied!";
              elem.classList.add("done");
              elem.classList.add("ani");
              setTimeout(() => {
                elem.classList.remove("ani");
              }, 1500);
              document.body.append(elem);
            }}
          >
            {res.length > 0 &&
              res.map((e, k) => (
                <span
                  key={k}
                  style={{
                    color:
                      e == all.letters.lowercase.filter((letter) => letter == e)
                        ? "#087E8B"
                        : e ==
                          all.letters.uppercase.filter((letter) => letter == e)
                        ? "#04A777"
                        : e == all.numbers.filter((letter) => letter == e)
                        ? "#FF9000"
                        : "#777",
                  }}
                >
                  {e}
                </span>
              ))}
          </p>

          <div
            className="copyIcon"
            onClick={() => {
              navigator.clipboard.writeText(password.current.textContent);
              const elem = document.createElement("div");
              elem.textContent = "Copied!";
              elem.classList.add("done");
              elem.classList.add("ani");
              setTimeout(() => {
                elem.classList.remove("ani");
              }, 1500);
              document.body.append(elem);
            }}
          >
            <i className="fi fi-rr-copy-alt"></i>
          </div>

          {keep ? (
            <div
              className="saveIcon active"
              onClick={() => {
                const elem = document.createElement("div");
                elem.textContent = "Removed!";
                elem.classList.add("done");
                elem.classList.add("ani");
                setTimeout(() => {
                  elem.classList.remove("ani");
                }, 1500);
                document.body.append(elem);

                setsaved(
                  saved.filter(
                    (item) => item.word !== password.current.textContent
                  )
                );

                setkeep(false);
              }}
            >
              <i className="fi fi-sr-star"></i>
            </div>
          ) : (
            <div
              className="saveIcon"
              onClick={() => {
                const elem = document.createElement("div");
                elem.textContent = "Saved!";
                elem.classList.add("done");
                elem.classList.add("ani");
                setTimeout(() => {
                  elem.classList.remove("ani");
                }, 1500);
                document.body.append(elem);

                // tip.current.textContent = "Saved!";
                // tip.current.classList.add("ani");
                // setTimeout(() => {
                //   tip.current.classList.remove("ani");
                // }, 1500);
                const add = [
                  ...saved,
                  {
                    id: Date.now(),
                    date: new Date().toString(),
                    word: password.current.textContent,
                  },
                ];
                setsaved(_.uniqBy(add, "word"));
                setkeep(true);
                console.log("false keep");
              }}
            >
              <i className="fi fi-rr-star"></i>
            </div>
          )}

          <div
            className="line"
            style={{
              width: num.current
                ? num.current.value >= 18
                  ? "100%"
                  : num.current.value >= 12
                  ? "80%"
                  : num.current.value >= 8
                  ? "50%"
                  : num.current.value >= 4
                  ? "30%"
                  : num.current.value >= 1
                  ? "10%"
                  : "10%"
                : "10%",
              background: num.current
                ? num.current.value >= 18
                  ? "#04A777"
                  : num.current.value >= 12
                  ? "#FF9000"
                  : num.current.value >= 8
                  ? "#33AAF3"
                  : num.current.value >= 4
                  ? "red"
                  : num.current.value >= 1
                  ? "gainsboro"
                  : "gainsboro"
                : "gainsboro",
            }}
          >
            <p
              style={{
                background: num.current
                  ? num.current.value >= 18
                    ? "#04A777"
                    : num.current.value >= 12
                    ? "#FF9000"
                    : num.current.value >= 8
                    ? "#33AAF3"
                    : num.current.value >= 4
                    ? "red"
                    : num.current.value >= 1
                    ? "gainsboro"
                    : "gainsboro"
                  : "gainsboro",
                color: num.current
                  ? num.current.value <= 3
                    ? "grey"
                    : "white"
                  : "grey",
                width: num.current
                  ? num.current.value >= 18
                    ? "100%"
                    : num.current.value >= 12
                    ? "100%"
                    : num.current.value >= 8
                    ? "100%"
                    : num.current.value >= 4
                    ? "200px"
                    : num.current.value >= 1
                    ? "200px"
                    : "200px"
                  : "200px",
              }}
            >
              {num.current
                ? num.current.value >= 18
                  ? "Very Strong"
                  : num.current.value >= 12
                  ? "Strong"
                  : num.current.value >= 8
                  ? "Secure"
                  : num.current.value >= 4
                  ? "Not Secure"
                  : num.current.value >= 1
                  ? "Low"
                  : "Wait"
                : "Wait"}
            </p>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="ranging">
          <div className="range">
            <input
              type="range"
              min={1}
              max={50}
              defaultValue={8}
              ref={range}
              onChange={() => {
                num.current.value = range.current.value;
                random();
                console.log(num.current.value, range.current.value);
              }}
            />
            <input
              type="number"
              min={1}
              max={50}
              defaultValue={8}
              ref={num}
              onChange={() => {
                range.current.value = num.current.value;
                random();
                console.log(num.current.value, range.current.value);
              }}
            />
          </div>
          <div className="choose">
            <button
              onClick={(e) => {
                if (
                  // numUpper === true &&
                  numLower === true &&
                  numNumbers === true &&
                  numSymbols === true
                ) {
                  setnumUpper(false);
                } else {
                  e.target.classList.toggle("cancel");
                  setnumUpper(!numUpper);
                }
              }}
            >
              UpperCase
            </button>

            <button
              onClick={(e) => {
                if (
                  numUpper === true &&
                  // numLower === true &&
                  numNumbers === true &&
                  numSymbols === true
                ) {
                  setnumLower(false);
                } else {
                  e.target.classList.toggle("cancel");
                  setnumLower(!numLower);
                }
              }}
            >
              LowerCase
            </button>

            <button
              onClick={(e) => {
                if (
                  numUpper === true &&
                  numLower === true &&
                  // numNumbers === true &&
                  numSymbols === true
                ) {
                  setnumNumbers(false);
                } else {
                  e.target.classList.toggle("cancel");
                  setnumNumbers(!numNumbers);
                }
              }}
            >
              Numbers
            </button>

            <button
              onClick={(e) => {
                if (
                  numUpper === true &&
                  numLower === true &&
                  numNumbers === true
                  // numSymbols === true
                ) {
                  setnumSymbols(false);
                } else {
                  e.target.classList.toggle("cancel");
                  setnumSymbols(!numSymbols);
                }
              }}
            >
              Symbols
            </button>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="gen">
          <button
            onClick={() => {
              random();
            }}
            className="btn"
          >
            Generate
          </button>
          <Link href={"/test"} className="draftIcon">
            <i className="fi fi-rr-memo-circle-check"></i>
          </Link>
        </div>
      </div>
    </>
  );
}
