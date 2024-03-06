/* eslint-disable no-useless-escape */
import { listOfMatches } from "./matches";

export const parseConcepts = (htmlString: string, elementId: string) => {
  const element = document.getElementById(elementId);
  let newText = htmlString;
  listOfMatches.forEach((item) => {
    if (newText?.indexOf(item.keyword as string) !== -1) {
      const reStatement = new RegExp(`\\b${item.keyword}\\b`, 'gi')
      newText = newText?.replace(reStatement, `<font color="${item.color}">${item.keyword}</font>`) as string;
    }
  })

  const doubleQuotes = newText?.match(/["'][a-zA-Z0-9\\\n-\s\/!_\:\,\{\}\%!"!?]*["?'?]/g)
  doubleQuotes?.forEach((stringVal) => {
    const regexp = new RegExp(stringVal, "gi");
    newText = newText?.replace(regexp, `<font color="#E42217">${stringVal}</font>`)
  })

  const comments = newText?.match(/(\/\/[a-zA-Z0-9\s]+\n)|(\#[a-zA-Z0-9\s]+\n)|(\"\"\"[a-zA-Z0-9\n\s]+\"\"\")|(\%[a-zA-Z0-9\s]+\n)/g);
  comments?.forEach((stringVal) => {
    const regexp = new RegExp(stringVal, "g");
    newText = newText?.replace(regexp, `<font color="#22AA22">${stringVal}</font>`);
    // console.log(newText);
  })
  
  const cplusImports = newText?.match(/\<[a-zA-Z0-9\s\.\+]+\>/g);
  cplusImports?.forEach((stringVal) => {
    const regexp = new RegExp(stringVal, "g");
    newText = newText?.replace(regexp, `&#60;<font color="#22AA22">${stringVal.replace(">", "").replace("<", "")}</font>&#62;`);
    // console.log(newText);
  })

  newText = newText?.replace(/\$/g, `<font color="#00BFFF">$</font>`) as string;
  newText = newText?.replace(/\<bits\/stdc\+\+\.h\>/g, `&#60;<font color="#22AA22">${`bits/stdc++.h`}</font>&#62;`) as string;
  newText = newText?.replace(/\#include/g, `<font color="#00BFFF">${'#include'}</font>`) as string;
  newText = newText?.replace(/Integer/g, `<font color="#00BFFF">${`Integer`}</font>`) as string;
  newText = newText?.replace(/Intl/g, `<font color="#00BFFF">Intl</font>`) as string;
  newText = newText?.replace(/Int\s/g, `<font color="#00BFFF">${`Int `}</font>`) as string;
  newText = newText?.replace(/println!/g, `<font color="#00BFFF">${`println!`}</font>`) as string;
  newText = newText?.replace(/\/\*\nmulti \nline \ncomment\n\*\//g, `<font color="#22AA22">${`\/\*\nmulti \nline \ncomment\n\*\/`}</font>`) as string;
  newText = newText?.replace(/\"\"\"\nmulti \nline \ncomment\n\"\"\"/g, `<font color="#22AA22">${`\"\"\"\nmulti \nline \ncomment\n\"\"\"`}</font>`) as string;
  newText = newText?.replace(/\=begin\nmulti \nline \ncomment\n\=end/g, `<font color="#22AA22">${`\=begin\nmulti \nline \ncomment\n\=end`}</font>`) as string;
  newText = newText?.replace(/\%\{\nmulti \nline \ncomment\n\%\}/g, `<font color="#22AA22">${`\%\{\nmulti \nline \ncomment\n\%\}`}</font>`) as string;
  // comment matching
  

  // newText = newText?.replace(/\/\/ indent to indicate block of code/g, `<font color="#11BB22">// indent to indicate block of code</font>`) as string;
  // newText = newText?.replace(/\/\/ command line/g, `<font color="#11BB22">// command line</font>`) as string;
  newText = newText?.replace(/\(/g, `<font color="#A52A2A">(</font>`) as string;
  newText = newText?.replace(/\)/g, `<font color="#A52A2A">)</font>`) as string;
  newText = newText?.replace(/\[/g, `<font color="#D4A017">[</font>`) as string;
  newText = newText?.replace(/\]/g, `<font color="#D4A017">]</font>`) as string;  

  if (element) element.innerHTML = newText as string;
};