import "bootstrap/dist/css/bootstrap.css";
import * as tf from "@tensorflow/tfjs";
const correctAnswerReadout = document.getElementById("correctAnswer");
const output = document.getElementById("output");

// Define a machine learning model for linear regression
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

// Specify loss and optimizer for model
model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

let userInput;
let inputs = [];
let outputs = [];

for (let i = 0; i <= 8; i++) {
  inputs.push(i);
  outputs.push(2 * i - 1);
}

// Prep training data
const xs = tf.tensor2d(inputs, [inputs.length, 1]);
const ys = tf.tensor2d(outputs, [outputs.length, 1]);

document.getElementById("submit-button").addEventListener("click", () => {
  output.classList.remove("red");
  output.classList.remove("green");
  let xValue = parseInt(document.getElementById("x-input").value);
  const correctAnswer = 2 * xValue - 1;
  correctAnswerReadout.innerHTML = `2 * ${xValue} - 1 = ${correctAnswer}`;
  output.innerHTML = "Thinking...";

  // Train the model, choo choo
  model.fit(xs, ys, { epochs: 500 }).then(() => {
    // Use model to predict values
    let prediction = model.predict(tf.tensor2d([xValue], [1, 1]));
    prediction = Math.round(Number(prediction.toString().slice(14, 23)));
    output.innerHTML = `TensorFlow's Guess: ${prediction}`;
    if (correctAnswer == prediction) {
      output.classList.add("green");
    } else if (prediction.toString() == "NaN") {
      output.innerHTML = "I thought too hard and now I'm dead.";
    } else {
      output.classList.add("red");
    }
  });
});
