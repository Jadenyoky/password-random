"use client";
import _ from "lodash";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import store from "store2";
import "animate.css";

export default function PasswordSaving() {
  const [loading, setloading] = useState(false);
  const [mode, setmode] = useState(true);
  // Array in localstorage
  const inStore = store("saved");
  const [saved, setsaved] = useState(inStore ? inStore : []);

  const [res, setres] = useState(saved);
  // To control in range and number letters in password

  // To switch save and remove icon
  const [keep, setkeep] = useState(true);
  // Function to copy current password
  function copy(password) {
    navigator.clipboard.writeText(password);
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
  function save(password) {
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
        word: password,
        save: true,
      },
    ];
    setsaved(_.uniqBy(add, "word"));
    setkeep(true);
  }
  // Function to remove current password
  function remove(password) {
    const elem = document.createElement("div");
    elem.textContent = "Removed!";
    elem.classList.add("done");
    elem.classList.add("ani");
    setTimeout(() => {
      elem.classList.remove("ani");
    }, 1500);
    document.body.append(elem);

    setsaved(saved.filter((item) => item.word !== password));

    setkeep(false);
  }

  useEffect(() => {
    store("saved", saved);
    setloading(true);
  }, [saved]);

  return (
    <>
      <div className="content">
        <div className="navigate">
          <Link href={`/`}>Generate</Link>
          <Link className="linking" href={`/password`}>
            List
          </Link>
          {loading && res.length > 0 ? (
            <div
              onClick={() => {
                setmode(!mode);
              }}
              className="mode animate__animated animate__fadeInUp"
            >
              {mode ? (
                <p
                  className="animate__animated animate__flipInX"
                  style={{ color: "red" }}
                >
                  Fast
                </p>
              ) : (
                <p
                  className="animate__animated animate__flipInY"
                  style={{ color: "green" }}
                >
                  Normal
                </p>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {mode ? (
        <div className="list">
          {loading && res.length > 0 ? (
            res.map((e, k) => {
              return (
                <div key={k}>
                  <div className="content">
                    <div className="password animate__animated animate__bounceInUp">
                      <p
                        onClick={() => {
                          copy(e.word);
                        }}
                        style={{
                          color:
                            e.word.length > 0
                              ? e.word.length >= 18
                                ? "#04A777"
                                : e.word.length >= 12
                                ? "#FF9000"
                                : e.word.length >= 8
                                ? "#33AAF3"
                                : e.word.length >= 4
                                ? "red"
                                : e.word.length >= 1
                                ? "grey"
                                : "grey"
                              : "grey",
                        }}
                      >
                        {e.word}
                      </p>

                      <div
                        className="copyIcon"
                        onClick={() => {
                          copy(e.word);
                        }}
                      >
                        <i className="fi fi-rr-copy-alt"></i>
                      </div>

                      {e.save ? (
                        <div
                          className="saveIcon active"
                          onClick={() => {
                            remove(e.word);
                            e.save = false;
                          }}
                        >
                          <img width={`24px`} src="/pics/star-solid.png" />
                        </div>
                      ) : (
                        <div
                          className="saveIcon"
                          onClick={() => {
                            save(e.word);
                            e.save = true;
                          }}
                        >
                          <img width={`24px`} src="/pics/star-light.png" />
                        </div>
                      )}

                      <div className="length">{e.word.length}</div>
                      <div className="numList">{k + 1}</div>

                      <div
                        className="line"
                        style={{
                          width: e.word
                            ? e.word.length >= 18
                              ? "100%"
                              : e.word.length >= 12
                              ? "80%"
                              : e.word.length >= 8
                              ? "50%"
                              : e.word.length >= 4
                              ? "30%"
                              : e.word.length >= 1
                              ? "10%"
                              : "10%"
                            : "10%",
                          background:
                            e.word.length > 0
                              ? e.word.length >= 18
                                ? "#04A777"
                                : e.word.length >= 12
                                ? "#FF9000"
                                : e.word.length >= 8
                                ? "#33AAF3"
                                : e.word.length >= 4
                                ? "red"
                                : e.word.length >= 1
                                ? "gainsboro"
                                : "gainsboro"
                              : "gainsboro",
                        }}
                      >
                        <p
                          style={{
                            background:
                              e.word.length > 0
                                ? e.word.length >= 18
                                  ? "#04A777"
                                  : e.word.length >= 12
                                  ? "#FF9000"
                                  : e.word.length >= 8
                                  ? "#33AAF3"
                                  : e.word.length >= 4
                                  ? "red"
                                  : e.word.length >= 1
                                  ? "gainsboro"
                                  : "gainsboro"
                                : "gainsboro",
                            color:
                              e.word.length > 0
                                ? e.word.length <= 3
                                  ? "grey"
                                  : "white"
                                : "grey",
                            width:
                              e.word.length > 0
                                ? e.word.length >= 18
                                  ? "100%"
                                  : e.word.length >= 12
                                  ? "100%"
                                  : e.word.length >= 8
                                  ? "100%"
                                  : e.word.length >= 4
                                  ? "200px"
                                  : e.word.length >= 1
                                  ? "200px"
                                  : "200px"
                                : "200px",
                          }}
                        >
                          {e.word.length > 0
                            ? e.word.length >= 18
                              ? "Very Strong"
                              : e.word.length >= 12
                              ? "Strong"
                              : e.word.length >= 8
                              ? "Secure"
                              : e.word.length >= 4
                              ? "Not Secure"
                              : e.word.length >= 1
                              ? "Low"
                              : "Wait"
                            : "Wait"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="noPassword">NO PASSWORD SAVED YET ...</div>
          )}
        </div>
      ) : (
        <div className="list">
          {loading && saved.length > 0 ? (
            saved.map((e, k) => {
              return (
                <div key={k}>
                  <div className="content">
                    <div className="password animate__animated animate__fadeIn ">
                      <p
                        onClick={() => {
                          copy(e.word);
                        }}
                        style={{
                          color:
                            e.word.length > 0
                              ? e.word.length >= 18
                                ? "#04A777"
                                : e.word.length >= 12
                                ? "#FF9000"
                                : e.word.length >= 8
                                ? "#33AAF3"
                                : e.word.length >= 4
                                ? "red"
                                : e.word.length >= 1
                                ? "grey"
                                : "grey"
                              : "grey",
                        }}
                      >
                        {e.word}
                      </p>

                      <div
                        className="copyIcon"
                        onClick={() => {
                          copy(e.word);
                        }}
                      >
                        <i className="fi fi-rr-copy-alt"></i>
                      </div>

                      {e.save ? (
                        <div
                          className="saveIcon active"
                          onClick={() => {
                            remove(e.word);
                            e.save = false;
                          }}
                        >
                          <img width={`24px`} src="/pics/star-solid.png" />
                        </div>
                      ) : (
                        <div
                          className="saveIcon"
                          onClick={() => {
                            save(e.word);
                            e.save = true;
                          }}
                        >
                          <img width={`24px`} src="/pics/star-light.png" />
                        </div>
                      )}
                      <div className="length">{e.word.length}</div>
                      <div className="numList">{k + 1}</div>
                      <div
                        className="line"
                        style={{
                          width: e.word
                            ? e.word.length >= 18
                              ? "100%"
                              : e.word.length >= 12
                              ? "80%"
                              : e.word.length >= 8
                              ? "50%"
                              : e.word.length >= 4
                              ? "30%"
                              : e.word.length >= 1
                              ? "10%"
                              : "10%"
                            : "10%",
                          background:
                            e.word.length > 0
                              ? e.word.length >= 18
                                ? "#04A777"
                                : e.word.length >= 12
                                ? "#FF9000"
                                : e.word.length >= 8
                                ? "#33AAF3"
                                : e.word.length >= 4
                                ? "red"
                                : e.word.length >= 1
                                ? "gainsboro"
                                : "gainsboro"
                              : "gainsboro",
                        }}
                      >
                        <p
                          style={{
                            background:
                              e.word.length > 0
                                ? e.word.length >= 18
                                  ? "#04A777"
                                  : e.word.length >= 12
                                  ? "#FF9000"
                                  : e.word.length >= 8
                                  ? "#33AAF3"
                                  : e.word.length >= 4
                                  ? "red"
                                  : e.word.length >= 1
                                  ? "gainsboro"
                                  : "gainsboro"
                                : "gainsboro",
                            color:
                              e.word.length > 0
                                ? e.word.length <= 3
                                  ? "grey"
                                  : "white"
                                : "grey",
                            width:
                              e.word.length > 0
                                ? e.word.length >= 18
                                  ? "100%"
                                  : e.word.length >= 12
                                  ? "100%"
                                  : e.word.length >= 8
                                  ? "100%"
                                  : e.word.length >= 4
                                  ? "200px"
                                  : e.word.length >= 1
                                  ? "200px"
                                  : "200px"
                                : "200px",
                          }}
                        >
                          {e.word.length > 0
                            ? e.word.length >= 18
                              ? "Very Strong"
                              : e.word.length >= 12
                              ? "Strong"
                              : e.word.length >= 8
                              ? "Secure"
                              : e.word.length >= 4
                              ? "Not Secure"
                              : e.word.length >= 1
                              ? "Low"
                              : "Wait"
                            : "Wait"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="noPassword">NO PASSWORD SAVED YET ...</div>
          )}
        </div>
      )}
    </>
  );
}
