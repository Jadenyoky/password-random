"use client";
import _ from "lodash";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import store from "store2";
import "animate.css";
import moment from "moment";
import styles from "./page.module.css";

export default function PasswordSaving() {
  const [loading, setloading] = useState(false);
  // To switch between normal and fast mode
  const [mode, setmode] = useState(false);
  // Array in localstorage
  const inStore = store("saved");
  const [saved, setsaved] = useState(inStore ? inStore : []);

  const [res, setres] = useState(saved);
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

    const sound = new Audio();
    sound.src = "./sounds/copy.wav";

    sound.play();
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
        date: new Date(),
        word: password,
        save: true,
        edit: false,
        length: password.length,
      },
    ];
    setsaved(_.uniqBy(add, "word"));

    const sound = new Audio();
    sound.src = "./sounds/save.wav";

    sound.play();
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

    const sound = new Audio();
    sound.src = "./sounds/remove.wav";

    sound.play();
  }
  // Function to edit current password
  function edit(key) {
    if (input.current.value === key.word) {
      const elem = document.createElement("div");
      elem.textContent = "Same Word!";
      elem.classList.add("done");
      elem.classList.add("ani");
      setTimeout(() => {
        elem.classList.remove("ani");
      }, 1500);
      document.body.append(elem);

      const sound = new Audio();
      sound.src = "./sounds/cancel.wav";

      sound.play();
    } else if (input.current.value !== "" && input.current.value !== key.word) {
      _.set(key, "word", input.current.value);
      _.set(key, "length", input.current.value.length);
      _.set(key, "edit", false);
      _.assign(key, { last: new Date() });

      const sound = new Audio();
      sound.src = "./sounds/update.wav";

      sound.play();

      const elem = document.createElement("div");
      elem.textContent = "Word Updated!";
      elem.classList.add("done");
      elem.classList.add("ani");
      setTimeout(() => {
        elem.classList.remove("ani");
      }, 1500);
      document.body.append(elem);
    } else if (input.current.value === "") {
      const elem = document.createElement("div");
      elem.textContent = "Write Letters!";
      elem.classList.add("done");
      elem.classList.add("ani");
      setTimeout(() => {
        elem.classList.remove("ani");
      }, 1500);
      document.body.append(elem);

      const sound = new Audio();
      sound.src = "./sounds/cancel.wav";

      sound.play();
    }
  }
  // Function to change levels to current password
  function levelWord(word) {
    setupdating(!updating);

    const level = document.querySelector(".levelInput");
    const updateLevelP = document.querySelector(".updateLevel>p");
    if (word.length >= 18) {
      level.style.width = "100%";
      level.style.background = "#04A777";
      input.current.style.color = "#04A777";
      updateLevelP.style.backgroundColor = "#04A777";
      updateLevelP.textContent = "Very Strong";
    } else if (word.length >= 12) {
      level.style.width = "75%";
      level.style.background = "#FF9000";
      input.current.style.color = "#FF9000";
      updateLevelP.style.backgroundColor = "#FF9000";
      updateLevelP.textContent = "Strong";
    } else if (word.length >= 8) {
      level.style.width = "50%";
      level.style.background = "#33AAF3";
      input.current.style.color = "#33AAF3";
      updateLevelP.style.backgroundColor = "#33AAF3";
      updateLevelP.textContent = "Secure";
    } else if (word.length >= 4) {
      level.style.width = "25%";
      level.style.background = "red";
      input.current.style.color = "red";
      updateLevelP.style.backgroundColor = "red";
      updateLevelP.textContent = "Not Secure";
    } else if (word.length >= 1) {
      level.style.width = "10%";
      level.style.background = "gainsboro";
      input.current.style.color = "grey";
      updateLevelP.style.backgroundColor = "darkgray";
      updateLevelP.textContent = "Low";
    } else if (word.length === 0) {
      level.style.width = "0%";
      level.style.background = "gainsboro";
      updateLevelP.style.backgroundColor = "darkgray";
      updateLevelP.textContent = "Wait ...";
    }

    const sound = new Audio();
    sound.src = "./sounds/typing.wav";

    sound.play();
  }
  // Function to cancel updating current password
  function cancel(key) {
    _.set(key, "edit", false);
    const sound = new Audio();
    sound.src = "./sounds/cancel.wav";

    sound.play();

    const elem = document.createElement("div");
    elem.textContent = "Cancelled!";
    elem.classList.add("done");
    elem.classList.add("ani");
    setTimeout(() => {
      elem.classList.remove("ani");
    }, 1500);
    document.body.append(elem);
  }
  // Function to remove all arrays in localstroge and list
  function removeAll() {
    store.remove("saved");
    setres([]);
    setsaved([]);

    const elem = document.createElement("div");
    elem.textContent = "Remove All!";
    elem.classList.add("done");
    elem.classList.add("ani");
    setTimeout(() => {
      elem.classList.remove("ani");
    }, 1500);
    document.body.append(elem);

    const sound = new Audio();
    sound.src = "./sounds/remove-all.wav";

    sound.play();
  }
  // To control on input value and length
  const input = useRef();
  // To refresh useEffect after any updating
  const [updating, setupdating] = useState(false);
  // To create array of objects with previous saved
  useEffect(() => {
    store("saved", saved);
    // console.log(saved);
    setloading(true);
  }, [saved, updating]);
  // To reset all objects edit = false
  useEffect(() => {
    for (let i = 0; i < saved.length; i++) {
      const element = saved[i];
      _.set(element, "edit", false);
    }

    const sound = new Audio();
    sound.src = "./sounds/navigate.wav";

    sound.play();
  }, []);

  return (
    <>
      <title>List Passwords</title>

      <div className="content">
        <div className="navigate">
          <Link href={`/`}>Generate</Link>
          <Link className="linking" href={`/list`}>
            List
          </Link>
          {loading && res.length > 0 ? (
            <div
              onClick={() => {
                setmode(!mode);
                const sound = new Audio();
                sound.src = "./sounds/navigate.wav";

                sound.play();
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
                    <div className="password passwordList animate__animated animate__fadeIn">
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

                      <div className="passwordOptions">
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
                      </div>

                      <div className="length">{e.length}</div>
                      <div className="numList">{k + 1}</div>

                      <div className="date">{moment(e.date).fromNow()}</div>
                      {e.last ? (
                        <div className="dateLast">
                          <p>
                            Update - <span>{moment(e.last).fromNow()}</span>{" "}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
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
            <div className="noPassword animate__animated animate__fadeIn">
              NO PASSWORD SAVED YET ...
            </div>
          )}
        </div>
      ) : (
        <div className="list">
          {loading && saved.length > 0 ? (
            saved.map((e, k) => {
              return (
                <div key={k}>
                  <div className="content">
                    <div className="password passwordList animate__animated animate__fadeIn ">
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

                      <div className="passwordOptions">
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
                              e.save = false;
                              remove(e.word);
                            }}
                          >
                            <img width={`24px`} src="/pics/star-solid.png" />
                          </div>
                        ) : (
                          <div
                            className="saveIcon"
                            onClick={() => {
                              e.save = true;
                              save(e.word);
                            }}
                          >
                            <img width={`24px`} src="/pics/star-light.png" />
                          </div>
                        )}

                        <div
                          className="editIcon"
                          onClick={() => {
                            _.set(saved[k], "edit", true);

                            const sound = new Audio();
                            sound.src = "./sounds/cancel.wav";
                            sound.play();
                            setupdating(!updating);
                          }}
                        >
                          <i className="fi fi-rr-pen-field"></i>
                        </div>

                        {e.edit && (
                          <div className="update">
                            <div className="updateCont">
                              <div className="updateLevel">
                                <p
                                  style={{
                                    background:
                                      e.word.length >= 18
                                        ? "#04A777"
                                        : e.word.length >= 12
                                        ? "#FF9000"
                                        : e.word.length >= 8
                                        ? "#33AAF3"
                                        : e.word.length >= 4
                                        ? "red"
                                        : e.word.length >= 1
                                        ? "darkgray"
                                        : "darkgray",
                                  }}
                                >
                                  {e.word.length >= 18
                                    ? "Very Strong"
                                    : e.word.length >= 12
                                    ? "Strong"
                                    : e.word.length >= 8
                                    ? "Secure"
                                    : e.word.length >= 4
                                    ? "Not Secure"
                                    : e.word.length >= 1
                                    ? "Low"
                                    : "Wait"}
                                </p>
                                <span>
                                  {input.current
                                    ? input.current.value.length
                                    : e.word.length}
                                </span>
                              </div>
                              <div className="updateInput">
                                <input
                                  ref={input}
                                  type="text"
                                  defaultValue={e.word}
                                  onChange={(word) => {
                                    levelWord(word.target.value);
                                  }}
                                  style={{
                                    color:
                                      e.word.length >= 18
                                        ? "#04A777"
                                        : e.word.length >= 12
                                        ? "#FF9000"
                                        : e.word.length >= 8
                                        ? "#33AAF3"
                                        : e.word.length >= 4
                                        ? "red"
                                        : e.word.length >= 1
                                        ? "grey"
                                        : "grey",
                                  }}
                                />
                                <div
                                  className="levelInput"
                                  style={{
                                    background:
                                      e.word.length >= 18
                                        ? "#04A777"
                                        : e.word.length >= 12
                                        ? "#FF9000"
                                        : e.word.length >= 8
                                        ? "#33AAF3"
                                        : e.word.length >= 4
                                        ? "red"
                                        : e.word.length >= 1
                                        ? "gainsboro"
                                        : "gainsboro",
                                    width:
                                      e.word.length >= 18
                                        ? "100%"
                                        : e.word.length >= 12
                                        ? "75%"
                                        : e.word.length >= 8
                                        ? "50%"
                                        : e.word.length >= 4
                                        ? "25%"
                                        : e.word.length >= 1
                                        ? "10%"
                                        : "10%",
                                  }}
                                ></div>
                              </div>

                              <div className="updateOptions">
                                <button
                                  onClick={() => {
                                    cancel(saved[k]);
                                    setupdating(!updating);
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => {
                                    edit(saved[k]);
                                    setupdating(!updating);
                                  }}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="length">{e.length}</div>
                      <div className="numList">{k + 1}</div>

                      <div className="date">{moment(e.date).fromNow()}</div>

                      {e.last ? (
                        <div className="dateLast">
                          <p>
                            Update - <span>{moment(e.last).fromNow()}</span>{" "}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}

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
            <div className="noPassword animate__animated animate__fadeIn">
              NO PASSWORD SAVED YET ...
            </div>
          )}
        </div>
      )}

      {loading && saved.length > 2 ? (
        <div className="removeAll">
          <span
            className="animate__animated animate__fadeInDown"
            onClick={() => {
              removeAll();
            }}
          >
            Remove All
          </span>
        </div>
      ) : null}
    </>
  );
}
