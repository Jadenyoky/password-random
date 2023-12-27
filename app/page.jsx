"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import _ from "lodash";
import Link from "next/link";
import store from "store2";
("store2");
import "animate.css";
import PasswordSaving from "./password/page";

export default function Password() {
  const [loading, setloading] = useState(false);
  // Array in localstorage
  const inStore = store("saved");
  const [saved, setsaved] = useState(inStore ? inStore : []);
  // The password array
  const [res, setres] = useState([]);
  // To switch save and remove icon
  const [keep, setkeep] = useState(false);
  // To control in range and number letters in password
  const num = useRef();
  const range = useRef();
  const password = useRef();
  // To switch number letters or zero letters
  const [numUpper, setnumUpper] = useState(false);
  const [numLower, setnumLower] = useState(false);
  const [numNumbers, setnumNumbers] = useState(false);
  const [numSymbols, setnumSymbols] = useState(false);
  // Array all string and numbers available
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
  // Function to generate password with limit number of letters
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
  // Function to copy current password
  function copy() {
    navigator.clipboard.writeText(password.current.textContent);
    const elem = document.createElement("div");
    elem.textContent = "Copied!";
    elem.classList.add("done");
    elem.classList.add("ani");
    setTimeout(() => {
      elem.classList.remove("ani");
    }, 1500);
    document.body.append(elem);
  }
  // Function to save current password
  function save() {
    const elem = document.createElement("div");
    elem.textContent = "Saved!";
    elem.classList.add("done");
    elem.classList.add("ani");
    setTimeout(() => {
      elem.classList.remove("ani");
    }, 1500);
    document.body.append(elem);

    const add = [
      ...saved,
      {
        id: Date.now(),
        date: new Date().toString(),
        word: password.current.textContent,
        save: true,
        edit: false,
        length: password.current.textContent.length,
      },
    ];
    setsaved(_.uniqBy(add, "word"));
    setkeep(true);
  }
  // Function to remove current password
  function remove() {
    const elem = document.createElement("div");
    elem.textContent = "Removed!";
    elem.classList.add("done");
    elem.classList.add("ani");
    setTimeout(() => {
      elem.classList.remove("ani");
    }, 1500);
    document.body.append(elem);

    setsaved(
      saved.filter((item) => item.word !== password.current.textContent)
    );

    setkeep(false);
  }
  // Active each time change any state of that
  useEffect(() => {
    random();
  }, [numUpper, numLower, numNumbers, numSymbols]);
  // Active each time change saved state
  useEffect(() => {
    store("saved", saved);
  }, [saved]);

  return (
    <>
      <div className="content">
        <div className="navigate">
          <Link className="linking" href={`/`}>
            Generate
          </Link>
          <Link href={`/password`}>List</Link>
        </div>
      </div>
      <div className="content">
        <div className="password animate__animated animate__fadeIn">
          <p ref={password} onClick={copy}>
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

          <div className="copyIcon" onClick={copy}>
            <i className="fi fi-rr-copy-alt"></i>
          </div>

          {keep ? (
            <div className="saveIcon active" onClick={remove}>
              <img width={`24px`} src="/pics/star-solid.png" />
            </div>
          ) : (
            <div className="saveIcon" onClick={save}>
              <img width={`24px`} src="/pics/star-light.png" />
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
        <div className="ranging animate__animated animate__zoomIn">
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

          <button
            onClick={() => {
              random();
            }}
            className="btn"
          >
            Generate
          </button>
        </div>
      </div>
      {/* <div className="content">
        <div className="gen">
          <Link href={"/password"} className="draftIcon">
            <i className="fi fi-rr-memo-circle-check"></i>
          </Link>
        </div>
      </div> */}
    </>
  );
}
