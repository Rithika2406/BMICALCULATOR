function calculateBMI() {
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const height = document.getElementById('height').value;
  const heightUnit = document.getElementById('height-unit').value;
  const weight = document.getElementById('weight').value;
  const result = document.getElementById('result');

  if (age === '' || gender === '' || height === '' || weight === '') {
    result.innerHTML = "Please fill out all fields!";
    result.style.color = "red";
    return;
  }

  // Convert height to meters
  let heightInMeters = 0;
  if (heightUnit === "cm") {
    heightInMeters = height / 100; // Convert cm to meters
  } else if (heightUnit === "inches") {
    heightInMeters = (height * 0.0254); // Convert inches to meters
  }

  // BMI Calculation
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
  let category = '';
  let advice = '';

  // BMI Category
  if (bmi < 18.5) {
    category = "Underweight";
    result.style.color = "blue";
    advice = calculateWeightGain(heightInMeters, weight);
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal weight";
    result.style.color = "green";
    advice = "You are healthy! Keep maintaining it. 🌟";
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "Overweight";
    result.style.color = "orange";
    advice = calculateWeightLoss(heightInMeters, weight);
  } else {
    category = "Obese";
    result.style.color = "red";
    advice = calculateWeightLoss(heightInMeters, weight);
  }

  result.innerHTML = `Your BMI is <b>${bmi}</b> (${category})<br><br>${advice}`;
}

function calculateWeightLoss(heightInMeters, currentWeight) {
  const maxHealthyBMI = 24.9;
  const maxHealthyWeight = maxHealthyBMI * (heightInMeters * heightInMeters);
  const weightToLose = (currentWeight - maxHealthyWeight).toFixed(1);

  return `You need to lose approximately <b>${weightToLose} kg</b> to reach a healthy BMI. 🚀`;
}

function calculateWeightGain(heightInMeters, currentWeight) {
  const minHealthyBMI = 18.5;
  const minHealthyWeight = minHealthyBMI * (heightInMeters * heightInMeters);
  const weightToGain = (minHealthyWeight - currentWeight).toFixed(1);

  return `You need to gain approximately <b>${weightToGain} kg</b> to reach a healthy BMI. 🏋️‍♂️`;
}
