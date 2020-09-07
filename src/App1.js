import React from "react";
import axios from "axios";

export default function App1() {
  const [sans, setSans] = React.useState([]);
  React.useEffect(() => {
    fetch("https://ssdaily.now.sh/api/all")
      .then((res) => res.json())
      .then((data) => setSans(data));

    axios
      .post("https://ssdaily.now.sh/api/all", { sans: "hey", eng: "hi" })
      .then((res) => console.log(res));
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
