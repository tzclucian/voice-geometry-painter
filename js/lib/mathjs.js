var pi = Math.PI,  ln = Math.log;
var logten = function (x) {
   return Math.log(x)/Math.log(10)
};
var arcsin = Math.asin,
   arccos = Math.acos,
   arctan = Math.atan;
var sec = function (x) {
   return 1 / Math.cos(x)
};
var csc = function (x) {
   return 1 / Math.sin(x)
};
var cot = function (x) {
   return 1 / Math.tan(x)
};
var xmin, xmax, ymin, ymax, xscl, yscl, xgrid, ygrid, xtick, ytick, initialized;
var isIE = document.createElementNS == null;
var picture, svgpicture, doc, width, height, a, b, c, d, i, n, p, t, x, y;
var arcsec = function (x) {
   return arccos(1 / x)
};
var arccsc = function (x) {
   return arcsin(1 / x)
};
var arccot = function (x) {
   return arctan(1 / x)
};
var acot = function (x) {
   return arctan(1 / x)
};
var sinh = function (x) {
   return (Math.exp(x) - Math.exp(-x)) / 2
};
var cosh = function (x) {
   return (Math.exp(x) + Math.exp(-x)) / 2
};
var tanh = function (x) {
   return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x))
};
var sech = function (x) {
   return 1 / cosh(x)
};
var csch = function (x) {
   return 1 / sinh(x)
};
var coth = function (x) {
   return 1 / tanh(x)
};
var arcsinh = function (x) {
   return ln(x + Math.sqrt(x * x + 1))
};
var arccosh = function (x) {
   return ln(x + Math.sqrt(x * x - 1))
};
var arctanh = function (x) {
   return ln((1 + x) / (1 - x)) / 2
};
var sech = function (x) {
   return 1 / cosh(x)
};
var csch = function (x) {
   return 1 / sinh(x)
};
var coth = function (x) {
   return 1 / tanh(x)
};
var arcsech = function (x) {
   return arccosh(1 / x)
};
var arccsch = function (x) {
   return arcsinh(1 / x)
};
var arccoth = function (x) {
   return arctanh(1 / x)
};
var sign = function (x) {
   return (x == 0 ? 0 : (x < 0 ? -1 : 1))
};
function factorial(x, n) {
   if (n == null) n = 1;
   for (var i = x - n; i > 0; i -= n) x *= i;
   return (x < 0 ? NaN : (x == 0 ? 1 : x))
}
function C(x, k) {
   var res = 1;
   for (var i = 0; i < k; i++) res *= (x - i) / (k - i);
   return res
}
function chop(x, n) {
   if (n == null) n = 0;
   return Math.floor(x * Math.pow(10, n)) / Math.pow(10, n)
}
function ran(a, b, n) {
   if (n == null) n = 0;
   return chop((b + Math.pow(10, -n) - a) * Math.random() + a, n)
}	
function mathjs(st) {
   st = st.replace(/\s/g, "");
	if (st.indexOf("log") != -1) {
		st = st.replace(/log/g, "logten");
	}	
   if (st.indexOf("^-1") != -1) {
      st = st.replace(/sin\^-1/g, "arcsin");
      st = st.replace(/cos\^-1/g, "arccos");
      st = st.replace(/tan\^-1/g, "arctan");
      st = st.replace(/sec\^-1/g, "arcsec");
      st = st.replace(/csc\^-1/g, "arccsc");
      st = st.replace(/cot\^-1/g, "arccot");
      st = st.replace(/sinh\^-1/g, "arcsinh");
      st = st.replace(/cosh\^-1/g, "arccosh");
      st = st.replace(/tanh\^-1/g, "arctanh");
      st = st.replace(/sech\^-1/g, "arcsech");
      st = st.replace(/csch\^-1/g, "arccsch");
      st = st.replace(/coth\^-1/g, "arccoth")
   }
   st = st.replace(/^e$/g, "(E)");
   st = st.replace(/^e([^a-zA-Z])/g, "(E)$1");
   st = st.replace(/([^a-zA-Z])e([^a-zA-Z])/g, "$1(E)$2");
   st = st.replace(/([0-9])([\(a-zA-Z])/g, "$1*$2");
   st = st.replace(/\)([\(0-9a-zA-Z])/g, "\)*$1");
   var i, j, k, ch, nested;	
   while ((i = st.indexOf("^")) != -1) {
      if (i == 0) return "Error: missing argument";
      j = i - 1;
      ch = st.charAt(j);
      if (ch >= "0" && ch <= "9") {
         j--;
         while (j >= 0 && (ch = st.charAt(j)) >= "0" && ch <= "9") j--;
         if (ch == ".") {
            j--;
            while (j >= 0 && (ch = st.charAt(j)) >= "0" && ch <= "9") j--
         }
      } else if (ch == ")") {
         nested = 1;
         j--;
         while (j >= 0 && nested > 0) {
            ch = st.charAt(j);
            if (ch == "(") nested--;
            else if (ch == ")") nested++;
            j--
         }
         while (j >= 0 && (ch = st.charAt(j)) >= "a" && ch <= "z" || ch >= "A" && ch <= "Z") j--
      } else if (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z") {
         j--;
         while (j >= 0 && (ch = st.charAt(j)) >= "a" && ch <= "z" || ch >= "A" && ch <= "Z") j--
      } else {
         return "Error: incorrect syntax in " + st + " at position " + j
      } if (i == st.length - 1) return "Error: missing argument";
      k = i + 1;
      ch = st.charAt(k);
      if (ch >= "0" && ch <= "9" || ch == "-") {
         k++;
         while (k < st.length && (ch = st.charAt(k)) >= "0" && ch <= "9") k++;
         if (ch == ".") {
            k++;
            while (k < st.length && (ch = st.charAt(k)) >= "0" && ch <= "9") k++
         }
      } else if (ch == "(") {
         nested = 1;
         k++;
         while (k < st.length && nested > 0) {
            ch = st.charAt(k);
            if (ch == "(") nested++;
            else if (ch == ")") nested--;
            k++
         }
      } else if (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z") {
         k++;
         while (k < st.length && (ch = st.charAt(k)) >= "a" && ch <= "z" || ch >= "A" && ch <= "Z") k++
      } else {
         return "Error: incorrect syntax in " + st + " at position " + k
      }
      st = st.slice(0, j + 1) + "pow(" + st.slice(j + 1, i) + "," + st.slice(i + 1, k) + ")" + st.slice(k)			
   }
   while ((i = st.indexOf("!")) != -1) {
      if (i == 0) return "Error: missing argument";
      j = i - 1;
      ch = st.charAt(j);
      if (ch >= "0" && ch <= "9") {
         j--;
         while (j >= 0 && (ch = st.charAt(j)) >= "0" && ch <= "9") j--;
         if (ch == ".") {
            j--;
            while (j >= 0 && (ch = st.charAt(j)) >= "0" && ch <= "9") j--
         }
      } else if (ch == ")") {
         nested = 1;
         j--;
         while (j >= 0 && nested > 0) {
            ch = st.charAt(j);
            if (ch == "(") nested--;
            else if (ch == ")") nested++;
            j--
         }
         while (j >= 0 && (ch = st.charAt(j)) >= "a" && ch <= "z" || ch >= "A" && ch <= "Z") j--
      } else if (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z") {
         j--;
         while (j >= 0 && (ch = st.charAt(j)) >= "a" && ch <= "z" || ch >= "A" && ch <= "Z") j--
      } else {
         return "Error: incorrect syntax in " + st + " at position " + j
      }
      st = st.slice(0, j + 1) + "factorial(" + st.slice(j + 1, i) + ")" + st.slice(i + 1)
   }	
   return st
}