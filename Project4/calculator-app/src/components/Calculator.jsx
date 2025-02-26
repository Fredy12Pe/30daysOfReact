import { useState } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "×":
        return firstOperand * secondOperand;
      case "÷":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    if (!operator || firstOperand === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const handlePercent = () => {
    const currentValue = parseFloat(display);
    setDisplay(String(currentValue / 100));
  };

  return (
    <div className="min-h-screen w-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[320px]">
        {/* Display */}
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <div className="text-right text-white text-3xl overflow-hidden">
            {display}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={clearDisplay}
            className="bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-500"
          >
            AC
          </button>
          <button
            onClick={toggleSign}
            className="bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-500"
          >
            +/-
          </button>
          <button
            onClick={handlePercent}
            className="bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-500"
          >
            %
          </button>
          <button
            onClick={() => handleOperator("÷")}
            className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-400"
          >
            ÷
          </button>

          <button
            onClick={() => inputDigit(7)}
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-400"
          >
            7
          </button>
          <button
            onClick={() => inputDigit(8)}
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-400"
          >
            8
          </button>
          <button
            onClick={() => inputDigit(9)}
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-400"
          >
            9
          </button>
          <button
            onClick={() => handleOperator("×")}
            className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-400"
          >
            ×
          </button>

          <button
            onClick={() => inputDigit(4)}
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-400"
          >
            4
          </button>
          <button
            onClick={() => inputDigit(5)}
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-400"
          >
            5
          </button>
          <button
            onClick={() => inputDigit(6)}
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-400"
          >
            6
          </button>
          <button
            onClick={() => handleOperator("-")}
            className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-400"
          >
            -
          </button>

          <button
            onClick={() => inputDigit(1)}
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-400"
          >
            1
          </button>
          <button
            onClick={() => inputDigit(2)}
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-400"
          >
            2
          </button>
          <button
            onClick={() => inputDigit(3)}
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-400"
          >
            3
          </button>
          <button
            onClick={() => handleOperator("+")}
            className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-400"
          >
            +
          </button>

          <button
            onClick={() => inputDigit(0)}
            className="col-span-2 bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-400"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-400"
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-400"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
