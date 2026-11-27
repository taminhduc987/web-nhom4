const Calculator = require("./calculator.js");

function run(start, keys) {
  const calc = new Calculator();
  calc.tokens = start;
  for (const k of keys.split(" ")) {
    if (k === ".") calc.inputDot();
    else if (k === "(-)") calc.inputNegative();
    else if (k === "(" || k === ")") calc.inputParen(k);
    else if (calc.isOperator(k)) calc.inputOperator(k);
    else calc.inputDigit(k);
  }
  return calc.tokens;
}

const tests = [
  [[], "1 2 3", ["123"]],
  [[], "0 0 7", ["7"]],
  [[], ". 5", ["0.5"]],
  [[], "1 . . 5", ["1.5"]],
  [[], "0 . 0 5", ["0.05"]],
  [["12", "+"], "3", ["12", "+", "3"]],
  [["12", "*"], ". 5", ["12", "*", "0.5"]],
  [["("], "7", ["(", "7"]],
  [["(", "2", "+", "3", ")"], "4", ["(", "2", "+", "3", ")", "*", "4"]],
  [["(", "2", ")"], ".", ["(", "2", ")", "*", "0."]],
  [[], "1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7", ["123456789123456"]],
  [[], "1 2 + 3", ["12", "+", "3"]],
  [[], "2 + 3 * 4", ["2", "+", "3", "*", "4"]],
  [[], "5 + *", ["5", "*"]],
  [[], "5 + * - /", ["5", "/"]],
  [[], "+ 3", ["0", "+", "3"]],
  [[], "- 5", ["0", "-", "5"]],
  [["("], "+", ["("]],
  [["(", "2", ")"], "*", ["(", "2", ")", "*"]],
  [[], "1 2 . +", ["12", "+"]],
  [[], "1 . 5 +", ["1.5", "+"]],
  [[], "( 2 + 3 ) * 4", ["(", "2", "+", "3", ")", "*", "4"]],
  [[], "2 ( 3 )", ["2", "*", "(", "3", ")"]],
  [[], "( 2 ) ( 3 )", ["(", "2", ")", "*", "(", "3", ")"]],
  [[], ")", []],
  [[], "( )", ["("]],
  [[], "( 2 + )", ["(", "2", "+"]],
  [[], "( 2 ) )", ["(", "2", ")"]],
  [[], "( ( 2 ) )", ["(", "(", "2", ")", ")"]],
  [[], "1 2 . (", ["12", "*", "("]],
  [[], "( 1 . )", ["(", "1", ")"]],
  [[], "(-) 5", ["neg", "5"]],
  [[], "2 * (-) 5", ["2", "*", "neg", "5"]],
  [[], "(-) (-) 5", ["neg", "neg", "5"]],
  [[], "(-) ( 2 + 3 )", ["neg", "(", "2", "+", "3", ")"]],
  [[], "2 (-) 5", ["2", "*", "neg", "5"]],
  [[], "(-) +", ["neg"]],
  [[], "(-) )", ["neg"]],
  [[], "( (-) 5 )", ["(", "neg", "5", ")"]],
  [[], "(-) . 5", ["neg", "0.5"]],
];

let pass = 0;
for (const [start, keys, expected] of tests) {
  const before = JSON.stringify(start);
  const got = JSON.stringify(run(start, keys));
  const ok = got === JSON.stringify(expected);
  if (ok) pass++;
  console.log(`${ok ? "✅" : "❌"} ${before.padEnd(28)} bấm ${keys.padEnd(16)} → ${got}`);
}
console.log(`\n${pass}/${tests.length} test đạt`);

console.log("\n--- Ghép hai lớp ---");
const demos = [
  "( 2 + 3 ) * 4",
  "2 ( 3 + 4 )",
  "2 * (-) 5",
  "(-) ( 2 + 3 ) * 4",
  "5 - (-) 3",
  "(-) (-) 7",
  "(-) 2 + 3",
  "1 0 / ( (-) 5 + 5 )",
];
for (const keys of demos) {
  const tokens = run([], keys);
  const value = new Calculator().evaluate(tokens);
  console.log(keys.padEnd(22), "→", value);
}

// ===== Bấm phím đầy đủ, kể cả "=" và "DEL" =====
function press(keys) {
  const calc = new Calculator();
  for (const k of keys.split(" ")) {
    if (k === "") continue;                       // chuỗi rỗng = không bấm gì
    if (k === "=") calc.calculate();
    else if (k === "DEL") calc.deleteLast();
    else if (k === ".") calc.inputDot();
    else if (k === "(-)") calc.inputNegative();
    else if (k === "(" || k === ")") calc.inputParen(k);
    else if (calc.isOperator(k)) calc.inputOperator(k);
    else calc.inputDigit(k);
  }
  return calc;
}

// Chạy một nhóm test: mỗi dòng là [phím, giá trị mong đợi 1, giá trị mong đợi 2]
// read(calc) trả về [giá trị thật 1, giá trị thật 2] để so sánh.
function runGroup(title, cases, read) {
  console.log(`\n--- ${title} ---`);
  let ok = 0;
  for (const [keys, ...expected] of cases) {
    const got = read(press(keys));
    const same = JSON.stringify(got) === JSON.stringify(expected);
    if (same) ok++;
    const shown = got.map(v => JSON.stringify(v)).join(", ");
    console.log(`${same ? "✅" : "❌"} bấm ${JSON.stringify(keys).padEnd(26)} → ${shown}` +
      (same ? "" : `   (mong đợi ${expected.map(v => JSON.stringify(v)).join(", ")})`));
  }
  console.log(`${ok}/${cases.length} test đạt`);
  return { ok, total: cases.length };
}

const readState = calc => [calc.tokens, calc.result];
const readDisplay = calc => [calc.getExpression(), calc.getResult()];

const step8 = runGroup("Bước 8: calculate (=)", [
  ["2 + 3 * 4 =",          ["2", "+", "3", "*", "4"],      "14"],
  ["( 2 + 3 =",            ["(", "2", "+", "3", ")"],      "5"],
  ["1 2 + =",              ["12"],                         "12"],
  ["( ( 2 + 3 * =",        ["(", "(", "2", "+", "3", ")", ")"], "5"],
  ["2 * ( =",              ["2"],                          "2"],
  ["2 * (-) =",            ["2"],                          "2"],
  ["9 / 0 =",              ["9", "/", "0"],                "Lỗi"],
  [". 1 + . 2 =",          ["0.1", "+", "0.2"],            "0.3"],
  ["1 2 . =",              ["12"],                         "12"],
  ["1 0 / 3 =",            ["10", "/", "3"],               "3.33333333333"],
  ["=",                    [],                             null],
  ["2 + 3 = =",            ["2", "+", "3"],                "5"],
  ["2 + 3 = 7",            ["7"],                          null],
  ["2 + 3 = * 2",          ["5", "*", "2"],                null],
  ["2 + 3 = * 2 =",        ["5", "*", "2"],                "10"],
  ["2 - 7 = * 3 =",        ["-5", "*", "3"],               "-15"],
  ["9 / 0 = +",            ["0", "+"],                     null],
  ["9 / 0 = 5",            ["5"],                          null],
  ["2 + 3 = ( 1 )",        ["(", "1", ")"],                null],
  ["2 + 3 = (-) 1",        ["neg", "1"],                   null],
], readState);

const del = runGroup("deleteLast (⌫)", [
  ["1 2 3 DEL",            ["12"],                         null],
  ["5 DEL",                [],                             null],
  ["2 + DEL",              ["2"],                          null],
  ["2 * ( DEL",            ["2", "*"],                     null],
  ["( 2 ) 3 DEL",          ["(", "2", ")", "*"],           null],
  ["(-) 5 DEL DEL",        [],                             null],
  ["DEL",                  [],                             null],
  ["2 + 3 = DEL",          ["2", "+", "3"],                null],
  ["9 / 0 = DEL 3 =",      ["9", "/", "3"],                "3"],
], readState);

const display = runGroup("Hiển thị: getExpression, getResult", [
  ["",                     "0",                 ""],
  ["2 + 3 * 4",            "2 + 3 × 4",         ""],
  ["2 + 3 * 4 =",          "2 + 3 × 4 =",       "14"],
  ["( 2 + 3 ) / 4 =",      "(2 + 3) ÷ 4 =",     "1.25"],
  ["2 * (-) 5 =",          "2 × −5 =",          "−10"],
  ["(-) ( 2 - 3 )",        "−(2 − 3)",          ""],
  ["9 / 0 =",              "9 ÷ 0 =",           "Lỗi"],
  ["1 2 .",                "12.",               ""],
  ["2 - 7 = * 3",          "−5 × 3",            ""],
], readDisplay);

// ===== Tổng kết =====
const totalOk = pass + step8.ok + del.ok + display.ok;
const totalAll = tests.length + step8.total + del.total + display.total;
console.log(`\n===== TỔNG: ${totalOk}/${totalAll} test đạt =====`);
