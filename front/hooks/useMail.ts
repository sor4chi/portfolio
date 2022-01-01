import { useState } from "react";
import { postContact } from "lib/api/contact";
import { Contact } from "types";

export const useMail = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  var data: Contact = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

  function isBlank() {
    if (
      data.name === "" ||
      data.email === "" ||
      data.subject === "" ||
      data.message === ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  const send = async () => {
    if (isBlank()) {
      alert("全て必須項目です");
    } else {
      const res = await postContact(data);
      if (res === "SUCCESS") {
        alert("送信しました");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        alert("送信に失敗しました。時間を空けて再度送信してください。");
      }
    }
  };

  return {
    setName,
    setEmail,
    setSubject,
    setMessage,
    send,
    isBlank,
  };
};
