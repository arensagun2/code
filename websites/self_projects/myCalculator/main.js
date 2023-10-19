const max = 16;

// output
const output = document.getElementById("output");

// numbers
const num0 = document.getElementById("num-0");
const num1 = document.getElementById("num-1");
const num2 = document.getElementById("num-2");
const num3 = document.getElementById("num-3");
const num4 = document.getElementById("num-4");
const num5 = document.getElementById("num-5");
const num6 = document.getElementById("num-6");
const num7 = document.getElementById("num-7");
const num8 = document.getElementById("num-8");
const num9 = document.getElementById("num-9");
const dec = document.getElementById("dec");

// operators
const plus = document.getElementById("op-plus");
const minus = document.getElementById("op-minus");
const times = document.getElementById("op-times");
const divide = document.getElementById("op-divide");
const equal = document.getElementById("op-equal");
const clear = document.getElementById("op-clear");

// functions
var current = "0";
var next = false;
var operator = "";
var other = "0";

function addToCurrent(num) {
    if (current != "0" && parseFloat(current) > 0 && next == true && operator == "") {
        next = false;
    }

    if (!next) {
        if (current.length < max) {
            if (num == "." && current.includes(".")) {
                return 0;
            }
            if (current == "0") {
                if (num == ".") {
                    current = "0.";
                } else {
                    current = num;
                }
            } else {
                if (num == ".") {
                    current = "0.";
                } else {
                    current += num;
                }
            }
            output.textContent = current;
        }
    } else {
        if (other.length < max) {
            if (num == "." && other.includes(".")) {
                return 0;
            }
            if (other == "0") {
                if (num == ".") {
                    other = "0.";
                } else {
                    other = num;
                }
            } else {
                if (num == ".") {
                    other = "0.";
                } else {
                    other += num;
                }
            }
            output.textContent = other;
        }
    }
    console.log("Current: " + current);
    console.log("Operator: " + operator);
    console.log("Other: " + other);
    console.log("Next?: " + next);
}

num1.addEventListener("click", () => {addToCurrent("1")});
num2.addEventListener("click", () => {addToCurrent("2")});
num3.addEventListener("click", () => {addToCurrent("3")});
num4.addEventListener("click", () => {addToCurrent("4")});
num5.addEventListener("click", () => {addToCurrent("5")});
num6.addEventListener("click", () => {addToCurrent("6")});
num7.addEventListener("click", () => {addToCurrent("7")});
num8.addEventListener("click", () => {addToCurrent("8")});
num9.addEventListener("click", () => {addToCurrent("9")});
num0.addEventListener("click", () => {addToCurrent("0")});
dec.addEventListener("click", () => {addToCurrent(".")});

function addOperator(op, id) {
    plus.style.backgroundColor = "#fff";
    minus.style.backgroundColor = "#fff";
    times.style.backgroundColor = "#fff";
    divide.style.backgroundColor = "#fff";
    document.getElementById(id).style.backgroundColor = "rgb(150,150,150)";
    operator = op;
    next = true;
}

plus.addEventListener("click", () => {addOperator("+", "op-plus");});
minus.addEventListener("click", () => {addOperator("-", "op-minus");});
times.addEventListener("click", () => {addOperator("*", "op-times");});
divide.addEventListener("click", () => {addOperator("/", "op-divide");});

var funcOperators = {
    "+" : function (x, y) {return x + y},
    "-" : function (x, y) {return x - y},
    "*" : function (x, y) {return x * y},
    "/" : function (x, y) {return x / y}
}

equal.addEventListener("click", () => {
    const leftSide = parseFloat(current);
    const rightSide = parseFloat(other);
    var total = 0;

    plus.style.backgroundColor = "#fff";
    minus.style.backgroundColor = "#fff";
    times.style.backgroundColor = "#fff";
    divide.style.backgroundColor = "#fff";

    if (operator == "/" && rightSide == 0) {
        current = "";
        other = "";
        operator = "";
        output.textContent = "MATH ERROR";
        next = false;
    }
    if (leftSide && !rightSide) {
        current = leftSide;
        other = "";
        operator = "";
        next = false;
    } else if (leftSide && rightSide == "0") {
        other = "0";
        operator = "";
        output.textContent = current;
        next = false;
    } else {
        total = funcOperators[operator](leftSide, rightSide);
        current = total;
        other = "";
        operator = "";
        console.log("Total: " + total);
        output.textContent = total.toString();
    }
    
});

clear.addEventListener("click", () => {
    plus.style.backgroundColor = "#fff";
    minus.style.backgroundColor = "#fff";
    times.style.backgroundColor = "#fff";
    divide.style.backgroundColor = "#fff";

    current = "0";
    other = "0";
    operator = "";
    next = false;
    output.textContent = current;
})