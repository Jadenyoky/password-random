"use client";
import _ from "lodash";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import store from "store2";
import "animate.css";
import moment from "moment";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";

export default function PasswordSaving() {
  const path = usePathname();
  console.log(path);

  const [loading, setloading] = useState(false);
  const [mode, setmode] = useState(false);
  // Array in localstorage
  const inStore = store("saved");
  const [saved, setsaved] = useState(inStore ? inStore : []);

  const [res, setres] = useState(saved);
  // To control in range and number letters in password

  // To switch save and remove icon
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

  const input = useRef();
  const [updating, setupdating] = useState(false);
  useEffect(() => {
    store("saved", saved);
    console.log(saved);
    setloading(true);
  }, [saved, updating]);

  useEffect(() => {
    for (let i = 0; i < saved.length; i++) {
      const element = saved[i];
      _.set(element, "edit", false);
      console.log(element);
    }

    const sound = new Audio();
    sound.src = "./sounds/navigate.wav";

    sound.play();
  }, []);

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
                            <div>
                              <input
                                ref={input}
                                type="text"
                                defaultValue={e.word}
                                onChange={(e) => {
                                  const sound = new Audio();
                                  sound.src = "./sounds/typing.wav";

                                  sound.play();
                                  console.log(
                                    e.target.value,
                                    input.current.value,
                                    input.current.value.length
                                  );
                                }}
                              />
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
              store.remove("saved");
              setres([]);
              setsaved([]);
            }}
          >
            Remove All
          </span>
        </div>
      ) : null}
    </>
  );
}
