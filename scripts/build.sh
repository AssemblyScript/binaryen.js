set -e
cd emscripten/
bash build-js.sh
cp out/binaryen.js ../index.js
