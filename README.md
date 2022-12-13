# react-tutorial-tic-tac-toe-game

Developed while following the official React tutorial - https://reactjs.org/tutorial/tutorial.html

Not using create-react-app. React build with manual configuration of webpack, transpiler, and loader.

## Steps to run
Execute
`npm run start`
or 
`npm run build` in the main project directory.
Then directly open the public/index.html in browser.

## Improvements suggested by official React tutorial are also implemented.
1. Display the location for each move in the format (col, row) in the move history list.
2. Bold the currently selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.
