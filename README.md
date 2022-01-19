# Cypher

This is an app build with Vue 3 + TypeScript. The aim of the app is to allow encryption or decryption of messages using the Vigenere cypher.

[Live Site](https://vigenere-cypher.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/7ed30825-e5f7-4413-9b47-d7ce414b1355/deploy-status)](https://app.netlify.com/sites/vigenere-cypher/deploys)

## Using the site

1. Enter the message you want to encrypt into the input section.
2. Enter your cypher key into the key input.
3. Your encrypted message will be shown in the output section.

### Encrypt / Decrypt
You can also decrypt secret messages that someone else has sent to you, provided you have the encryption key. Simply select 'Decrypt' in the settings, enter the cypher text into the input, set the cypher key and you will be shown the original message in the output.

### Flip text on mode change?
If this toggle is selected, then when Encrypt / Decrypt is changed, the input text will be replaced by the output text. This allows a quick way for you to toggle between encrypt and decrpyt and make sure that your message will be decrpyted properly.

### Other notes
The alphabet used in this cypher is as follows: (including the space at the end)
```
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?!'_-&@#$%*() 
```
Any other characters will be unchanged in the cypher text. Line breaks are also carried over, so paragraph structure is generally maintained too.

## Project Setup for Local Development

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur).
