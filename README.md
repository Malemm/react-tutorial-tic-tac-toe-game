# react-tutorial-tic-tac-toe-game

Developed while following the official React tutorial - https://reactjs.org/tutorial/tutorial.html

Not using create-react-app. React build with manual configuration of webpack, transpiler, and loader.
Uses Express server.

## Steps to run
Run `npm install` to install dependencies.

Execute `npm run build`. Then directly open the public/index.html in browser.

Or to access via Express server execute `npm run build` `npm run start` and access localhost/3000 in browser.

## Improvements suggested by official React tutorial are also implemented.
1. Display the location for each move in the format (col, row) in the move history list.
2. Bold the currently selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.
