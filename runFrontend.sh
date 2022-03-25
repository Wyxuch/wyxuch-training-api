cd frontend/ || exit
yarn run build && cp .env ./build && serve -s build
cd .. || exit