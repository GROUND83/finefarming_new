export default function temp_pw_issuance() {
  let ranValue1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let ranValue2 = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let ranValue3 = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let ranValue4 = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

  var temp_pw = "";

  for (let i = 0; i < 2; i++) {
    let ranPick1 = Math.floor(Math.random() * ranValue1.length);
    let ranPick2 = Math.floor(Math.random() * ranValue2.length);
    let ranPick3 = Math.floor(Math.random() * ranValue3.length);
    let ranPick4 = Math.floor(Math.random() * ranValue4.length);
    temp_pw =
      temp_pw +
      ranValue1[ranPick1] +
      ranValue2[ranPick2] +
      ranValue3[ranPick3] +
      ranValue4[ranPick4];
  }

  return temp_pw;
}
