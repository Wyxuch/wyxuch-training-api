cd backend/ || exit
rm -rf ./build
yarn install
yarn run build

cp .env ./build/.env

cd ..
