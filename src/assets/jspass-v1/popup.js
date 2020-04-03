function createpassword(
  masterpassword,
  domainname,
  salt,
  passwordlength,
  iterations,
  usespecialchars,
  specialchars
) {
  passwordobj = CryptoJS.PBKDF2(masterpassword + domainname, salt, {
    keySize: passwordlength,
    iterations: iterations,
  });
  passwordwordsarray = passwordobj.words;

  chars1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  chars2 = "abcdefghijklmnopqrstuvwxyz";
  chars3 = "0123456789";
  chars4 = specialchars;
  chars = chars1 + chars2 + chars3;
  if (usespecialchars) {
    chars += chars4;
  }
  chars1count = 0;
  chars2count = 0;
  chars3count = 0;
  chars4count = 0;

  password = "";
  charscheckindex = Math.floor(passwordlength / 3);

  for (i = 0; i < passwordlength; i++) {
    charstemp = chars;
    if (i >= charscheckindex) {
      if (usespecialchars && chars4count <= 2) {
        charstemp = chars4;
      } else if (chars1count <= 1) {
        charstemp = chars1;
      } else if (chars2count <= 1) {
        charstemp = chars2;
      } else if (chars3count <= 1) {
        charstemp = chars3;
      }
    }
    do {
      charsindextemp = Math.abs(passwordwordsarray[i]) % charstemp.length;
      if (passwordwordsarray[i] < 0) {
        charsindextemp = charstemp.length - 1 - charsindextemp;
      }
      passwordwordsarray[i] += passwordwordsarray[i] + 1;
      passwordchar = charstemp[charsindextemp];
    } while (password.indexOf(passwordchar) > -1);

    if (chars1.indexOf(passwordchar) > -1) {
      chars1count++;
    } else if (chars2.indexOf(passwordchar) > -1) {
      chars2count++;
    } else if (chars3.indexOf(passwordchar) > -1) {
      chars3count++;
    } else if (usespecialchars && chars4.indexOf(passwordchar) > -1) {
      chars4count++;
    }

    password += passwordchar;
  }

  return password;
}
