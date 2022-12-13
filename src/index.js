import React from "react";
import ReactDOM from "react-dom";

import Game from "./Game"

// ReactDOM.render(
//     <Game />,
//     document.querySelector("#root")
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);