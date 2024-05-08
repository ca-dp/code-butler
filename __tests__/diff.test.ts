import {
  removeTargetFileFromDiff,
  removeFilesWithExtensionsFromDiff
} from '../src/diff'

describe('removeTargetFileFromDiff', () => {
  const diff = `diff --git a/.github/linters/.eslintrc.yml b/.github/linters/.eslintrc.yml
index f452aba..a7220f3 100644
--- a/.github/linters/.eslintrc.yml
+++ b/.github/linters/.eslintrc.yml
@@ -63,12 +63,12 @@ rules:
     '@typescript-eslint/no-misused-new': 'error',
     '@typescript-eslint/no-namespace': 'error',
     '@typescript-eslint/no-non-null-assertion': 'warn',
-    '@typescript-eslint/no-require-imports': 'error',
+    '@typescript-eslint/no-require-imports': 'warn',
     '@typescript-eslint/no-unnecessary-qualifier': 'error',
     '@typescript-eslint/no-unnecessary-type-assertion': 'error',
     '@typescript-eslint/no-unused-vars': 'error',
     '@typescript-eslint/no-useless-constructor': 'error',
-    '@typescript-eslint/no-var-requires': 'error',
+    '@typescript-eslint/no-var-requires': 'warn',
     '@typescript-eslint/prefer-for-of': 'warn',
     '@typescript-eslint/prefer-function-type': 'warn',
     '@typescript-eslint/prefer-includes': 'error',
diff --git a/dist/index.js b/dist/index.js
index e588c53..88c9261 100644
--- a/dist/index.js
+++ b/dist/index.js
@@ -5015,6 +5015,164 @@ HttpsAgent.prototype[CREATE_HTTPS_CONNECTION] = OriginalHttpsAgent.prototype.cre
 module.exports = HttpsAgent;
 
 
+/***/ }),
+
+/***/ 6463:
+/***/ ((__unused_webpack_module, exports) => {
+
+"use strict";
+
+
+exports.byteLength = byteLength
+exports.toByteArray = toByteArray
+exports.fromByteArray = fromByteArray
+
+var lookup = []
+var revLookup = []
+var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
+
+var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
+for (var i = 0, len = code.length; i < len; ++i) {
+  lookup[i] = code[i]
+  revLookup[code.charCodeAt(i)] = i
+}
+
+// Support decoding URL-safe base64 strings, as Node.js does.
+// See: https://en.wikipedia.org/wiki/Base64#URL_applications
+revLookup['-'.charCodeAt(0)] = 62
+revLookup['_'.charCodeAt(0)] = 63
+
+function getLens (b64) {
+  var len = b64.length
+
+  if (len % 4 > 0) {
+    throw new Error('Invalid string. Length must be a multiple of 4')
+  }
+
+  // Trim off extra bytes after placeholder bytes are found
+  // See: https://github.com/beatgammit/base64-js/issues/42
+  var validLen = b64.indexOf('=')
+  if (validLen === -1) validLen = len
+
+  var placeHoldersLen = validLen === len
+    ? 0
+    : 4 - (validLen % 4)
+
+  return [validLen, placeHoldersLen]
+}
+
+// base64 is 4/3 + up to two characters of the original data
+function byteLength (b64) {
+  var lens = getLens(b64)
+  var validLen = lens[0]
+  var placeHoldersLen = lens[1]
+  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
+}
+
+function _byteLength (b64, validLen, placeHoldersLen) {
+  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
+}
+
+function toByteArray (b64) {
+  var tmp
+  var lens = getLens(b64)
+  var validLen = lens[0]
+  var placeHoldersLen = lens[1]
+
+  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))
+
+  var curByte = 0
+
+  // if there are placeholders, only get up to the last complete 4 chars
+  var len = placeHoldersLen > 0
+    ? validLen - 4
+    : validLen
+
+  var i
+  for (i = 0; i < len; i += 4) {
+    tmp =
+      (revLookup[b64.charCodeAt(i)] << 18) |
+      (revLookup[b64.charCodeAt(i + 1)] << 12) |
+      (revLookup[b64.charCodeAt(i + 2)] << 6) |
+      revLookup[b64.charCodeAt(i + 3)]
+    arr[curByte++] = (tmp >> 16) & 0xFF
+    arr[curByte++] = (tmp >> 8) & 0xFF
+    arr[curByte++] = tmp & 0xFF
+  }
+
+  if (placeHoldersLen === 2) {
+    tmp =
+      (revLookup[b64.charCodeAt(i)] << 2) |
+      (revLookup[b64.charCodeAt(i + 1)] >> 4)
+    arr[curByte++] = tmp & 0xFF
+  }
+
+  if (placeHoldersLen === 1) {
+    tmp =
+      (revLookup[b64.charCodeAt(i)] << 10) |
+      (revLookup[b64.charCodeAt(i + 1)] << 4) |
+      (revLookup[b64.charCodeAt(i + 2)] >> 2)
+    arr[curByte++] = (tmp >> 8) & 0xFF
+    arr[curByte++] = tmp & 0xFF
+  }
+
+  return arr
+}
+
+function tripletToBase64 (num) {
+  return lookup[num >> 18 & 0x3F] +
+    lookup[num >> 12 & 0x3F] +
+    lookup[num >> 6 & 0x3F] +
+    lookup[num & 0x3F]
+}
+
+function encodeChunk (uint8, start, end) {
+  var tmp
+  var output = []
+  for (var i = start; i < end; i += 3) {
+    tmp =
+      ((uint8[i] << 16) & 0xFF0000) +
+      ((uint8[i + 1] << 8) & 0xFF00) +
+      (uint8[i + 2] & 0xFF)
+    output.push(tripletToBase64(tmp))
+  }
+  return output.join('')
+}
+
+function fromByteArray (uint8) {
+  var tmp
+  var len = uint8.length
+  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
+  var parts = []
+  var maxChunkLength = 16383 // must be multiple of 3
+
+  // go through the array every three bytes, we'll deal with trailing stuff later
+  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
+    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
+  }
+
+  // pad the end with zeros, but make sure to not forget the extra bytes
+  if (extraBytes === 1) {
+    tmp = uint8[len - 1]
+    parts.push(
+      lookup[tmp >> 2] +
+      lookup[(tmp << 4) & 0x3F] +
+      '=='
+    )
+  } else if (extraBytes === 2) {
+    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
+    parts.push(
+      lookup[tmp >> 10] +
+      lookup[(tmp >> 4) & 0x3F] +
+      lookup[(tmp << 2) & 0x3F] +
+      '='
+    )
+  }
+
+  return parts.join('')
+}
+
+
 /***/ }),
 
 /***/ 3682:
@@ -11507,7 +11665,6 @@ exports.createGitHubComment = createGitHubComment;
 
 Object.defineProperty(exports, "__esModule", ({ value: true }));
 exports.groupFilesForReview = void 0;
-const tiktoken_1 = __nccwpck_require__(1579);
 async function groupFilesForReview(diff) {
     // Split the diff into files
     const files = diff.split('diff --git ');
@@ -11574,7 +11731,8 @@ function sumTokensInGroup(group) {
 }
 // Implement token counting function (countTokensInDiff) to count tokens in a file's diff
 function countTokensInDiff(diff) {
-    const enc = (0, tiktoken_1.encoding_for_model)('gpt-3.5-turbo');
+    const module = __nccwpck_require__(5990);
+    const enc = module.encodingForModel('gpt-3.5-turbo');
     const encoded = enc.encode(diff);
     const tokens = encoded.length;
     return tokens;
@@ -15404,488 +15562,270 @@ exports.VERSION = '4.10.0'; // x-release-please-version
 
 /***/ }),
 
-/***/ 1579:
+/***/ 5990:
 /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
 
-const wasm = __nccwpck_require__(8007);
-let imports = {};
-imports["./tiktoken_bg.js"] = wasm;
-const path = __nccwpck_require__(1017);
-const fs = __nccwpck_require__(7147);
-
-const candidates = __dirname
-  .split(path.sep)
-  .reduce((memo, _, index, array) => {
-    const prefix = array.slice(0, index + 1).join(path.sep) + path.sep;
-    if (!prefix.includes("node_modules" + path.sep)) {
-      memo.unshift(
-        path.join(
-          prefix,
-          "node_modules",
-          "tiktoken",
-          "",
-          "./tiktoken_bg.wasm"
-        )
-      );
-    }
-    return memo;
-  }, [])
-candidates.unshift(path.join(__dirname, "./tiktoken_bg.wasm"));
+"use strict";
 
-let bytes = null;
-for (const candidate of candidates) {
-  try {
-    bytes = fs.readFileSync(candidate);
-    break;
-  } catch {}
-}
 
-if (bytes == null) throw new Error("Missing tiktoken_bg.wasm");
-const wasmModule = new WebAssembly.Module(bytes);
-const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
-wasm.__wbg_set_wasm(wasmInstance.exports);
-exports.get_encoding = wasm["get_encoding"];
-exports.encoding_for_model = wasm["encoding_for_model"];
-exports.Tiktoken = wasm["Tiktoken"];
+var base64 = __nccwpck_require__(6463);
 
-/***/ }),
+function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }
 
-/***/ 8007:
-/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {
+var base64__default = /*#__PURE__*/_interopDefault(base64);
 
-/* module decorator */ module = __nccwpck_require__.nmd(module);
-let wasm;
-module.exports.__wbg_set_wasm = function(val) {
-    wasm = val;
+var __defProp = Object.defineProperty;
+var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
+var __publicField = (obj, key, value) => {
+  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
+  return value;
 };
-const heap = new Array(128).fill(undefined);
-
-heap.push(undefined, null, true, false);
-
-function getObject(idx) { return heap[idx]; }

diff --git a/dist/licenses.txt b/dist/licenses.txt
index 2e188b3..37b25a1 100644
--- a/dist/licenses.txt
+++ b/dist/licenses.txt
@@ -281,6 +281,31 @@ TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
 
+base64-js
+MIT
+The MIT License (MIT)
+
+Copyright (c) 2014 Jameson Little
+
+Permission is hereby granted, free of charge, to any person obtaining a copy
+of this software and associated documentation files (the "Software"), to deal
+in the Software without restriction, including without limitation the rights
+to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
+copies of the Software, and to permit persons to whom the Software is
+furnished to do so, subject to the following conditions:
+
+The above copyright notice and this permission notice shall be included in
+all copies or substantial portions of the Software.
+
+THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
+IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
+FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
+AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
+LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
+OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
+THE SOFTWARE.
+
+
 before-after-hook
 Apache-2.0
                                  Apache License
@@ -627,6 +652,9 @@ OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 
 
+js-tiktoken
+MIT
+
 ms
 MIT
 The MIT License (MIT)
@@ -927,9 +955,6 @@ Apache-2.0
    limitations under the License.
 
 
-tiktoken
-MIT
-
 tr46
 MIT
 
diff --git a/package-lock.json b/package-lock.json
index f4dd6f0..5a2b008 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -11,8 +11,8 @@
       "dependencies": {
         "@actions/core": "^1.10.1",
         "@actions/github": "^5.1.1",
-        "openai": "^4.10.0",
-        "tiktoken": "^1.0.10"
+        "js-tiktoken": "^1.0.7",
+        "openai": "^4.10.0"
       },
       "devDependencies": {
         "@types/jest": "^29.5.5",
@@ -2424,6 +2424,25 @@
       "resolved": "https://registry.npmjs.org/base-64/-/base-64-0.1.0.tgz",
       "integrity": "sha512-Y5gU45svrR5tI2Vt/X9GPd3L0HNIKzGu202EjxrXMpuc2V2CiKgemAbUUsqYmZJvPtCXoUKjNZwBJzsNScUbXA=="
     },
+    "node_modules/base64-js": {
+      "version": "1.5.1",
+      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
+      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
+      "funding": [
+        {
+          "type": "github",
+          "url": "https://github.com/sponsors/feross"
+        },
+        {
+          "type": "patreon",
+          "url": "https://www.patreon.com/feross"
+        },
+        {
+          "type": "consulting",
+          "url": "https://feross.org/support"
+        }
+      ]
+    },
     "node_modules/before-after-hook": {
       "version": "2.2.3",
       "resolved": "https://registry.npmjs.org/before-after-hook/-/before-after-hook-2.2.3.tgz",
@@ -5503,6 +5522,14 @@
         "url": "https://github.com/chalk/supports-color?sponsor=1"
       }
     },
+    "node_modules/js-tiktoken": {
+      "version": "1.0.7",
+      "resolved": "https://registry.npmjs.org/js-tiktoken/-/js-tiktoken-1.0.7.tgz",
+      "integrity": "sha512-biba8u/clw7iesNEWLOLwrNGoBP2lA+hTaBLs/D45pJdUPFXyxD6nhcDVtADChghv4GgyAiMKYMiRx7x6h7Biw==",
+      "dependencies": {
+        "base64-js": "^1.5.1"
+      }
+    },
     "node_modules/js-tokens": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
@@ -7288,11 +7315,6 @@
       "integrity": "sha512-N+8UisAXDGk8PFXP4HAzVR9nbfmVJ3zYLAWiTIoqC5v5isinhr+r5uaO8+7r3BMfuNIufIsA7RdpVgacC2cSpw==",
       "dev": true
     },
-    "node_modules/tiktoken": {
-      "version": "1.0.10",
-      "resolved": "https://registry.npmjs.org/tiktoken/-/tiktoken-1.0.10.tgz",
-      "integrity": "sha512-gF8ndTCNu7WcRFbl1UUWaFIB4CTXmHzS3tRYdyUYF7x3C6YR6Evoao4zhKDmWIwv2PzNbzoQMV8Pxt+17lEDbA=="
-    },
     "node_modules/titleize": {
       "version": "3.0.0",
       "resolved": "https://registry.npmjs.org/titleize/-/titleize-3.0.0.tgz",
diff --git a/package.json b/package.json
index 564fdb8..daa9900 100644
--- a/package.json
+++ b/package.json
@@ -67,8 +67,8 @@
   "dependencies": {
     "@actions/core": "^1.10.1",
     "@actions/github": "^5.1.1",
-    "openai": "^4.10.0",
-    "tiktoken": "^1.0.10"
+    "js-tiktoken": "^1.0.7",
+    "openai": "^4.10.0"
   },
   "devDependencies": {
     "@types/jest": "^29.5.5",
diff --git a/src/grouper.ts b/src/grouper.ts
index 338aded..a46a29f 100644
--- a/src/grouper.ts
+++ b/src/grouper.ts
@@ -1,5 +1,3 @@
-import { encoding_for_model } from 'tiktoken'
-
 export async function groupFilesForReview(diff: string): Promise<string[][]> {
   // Split the diff into files
   const files = diff.split('diff --git ')
@@ -72,7 +70,8 @@ function sumTokensInGroup(group: string[]): number {
 
 // Implement token counting function (countTokensInDiff) to count tokens in a file's diff
 function countTokensInDiff(diff: string): number {
-  const enc = encoding_for_model('gpt-3.5-turbo')
+  const module = require('js-tiktoken')
+  const enc = module.encodingForModel('gpt-3.5-turbo')
 `
  it('should remove the target file from the diff', () => {
    const targetFiles = ['github/linters/.eslintrc.yml', 'dist/index.js']
    const updatedDiff = removeTargetFileFromDiff(diff, targetFiles)

    for (const targetFile of targetFiles) {
      expect(updatedDiff).not.toContain(targetFile)
    }
  })

  it('should remove the files in the target directory from the diff', () => {
    const targetFiles = ['github/', 'dist/index.js']
    const updatedDiff = removeTargetFileFromDiff(diff, targetFiles)

    for (const targetFile of targetFiles) {
      expect(updatedDiff).not.toContain(targetFile)
    }
  })

  it('should remove all the target file from the diff', () => {
    const targetFiles = [
      'github/linters/.eslintrc.yml',
      'dist/',
      'package-lock.json',
      'package.json',
      'src/'
    ]
    const updatedDiff = removeTargetFileFromDiff(diff, targetFiles)

    for (const targetFile of targetFiles) {
      expect(updatedDiff).not.toContain(targetFile)
    }
  })

  it('should remove the files with the specified extensions from the diff', () => {
    const extensions = ['yml', 'json']
    const updatedDiff = removeFilesWithExtensionsFromDiff(diff, extensions)

    expect(updatedDiff).not.toContain('.yml')
    expect(updatedDiff).not.toContain('.json')
  })

  it('should remove the all files with the specified extensions from the diff', () => {
    const extensions = ['yml', 'json', 'js', 'ts', 'txt']
    const updatedDiff = removeFilesWithExtensionsFromDiff(diff, extensions)

    expect(updatedDiff).not.toContain('.yml')
    expect(updatedDiff).not.toContain('.json')
  })
})
