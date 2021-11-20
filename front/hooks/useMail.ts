import { useState } from "react";

export const useMail = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  type formValue = {
    name: string;
    email: string;
    subject: string;
    content: string;
  };

  var data: formValue = {
    name: name,
    email: email,
    subject: subject,
    content: content,
  };

  // return what data is blank in form
  const isBlank = (data: formValue) => {
    if (
      data.name === "" ||
      data.email === "" ||
      data.subject === "" ||
      data.content === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  var data_json = JSON.stringify(data);

  const send = async () => {
    if (isBlank(data)) {
      alert("全て必須項目です");
    }

    // await fetch("/api/mail", {
    //   method: "POST",
    //   body: data_json,
    // });
  };

  return {
    setName,
    setEmail,
    setSubject,
    setContent,
    send,
  };
};
