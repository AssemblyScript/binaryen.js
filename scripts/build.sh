set -e
cd binaryen/
mkdir build
cd build/
emconfigure cmake .. -DCMAKE_BUILD_TYPE=Release
emmake make -j2 binaryen_js
cp bin/binaryen_js.js ../../index.js
