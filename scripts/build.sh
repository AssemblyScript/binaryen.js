set -e
cd binaryen/
bash build-js.sh
cp out/binaryen.js ../index.js
