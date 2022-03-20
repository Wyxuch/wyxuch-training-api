./buildBackend.sh
cd ./backend/build || exit
nodemon index.js
cd ../.. || exit