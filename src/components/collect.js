import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { storage } from "../firebase"; // Import Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./collect.css";

const Collect = ({ userId }) => {
  // State for form inputs
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [chronicIllness, setChronicIllness] = useState("");

  // State for file upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [calories, setCalories] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Show a preview for images
      if (file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  // Save user data to Firestore
  async function saveUserData(data) {
    try {
      await setDoc(doc(db, "users", userId), data);
      console.log("User data saved successfully!");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  }

  // Upload file to Firebase Storage
  const uploadFile = async () => {
    if (!selectedFile) return null;

    const fileRef = ref(storage, `user_reports/${userId}/${selectedFile.name}`);
    await uploadBytes(fileRef, selectedFile);
    return await getDownloadURL(fileRef);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate BMR
    let BMR;
    if (gender === "male") {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      alert("Please select a valid gender");
      return;
    }

    // Calculate TDEE based on Activity Level
    let TDEE;
    switch (activityLevel) {
      case "low":
        TDEE = BMR * 1.2;
        break;
      case "very-low":
        TDEE = BMR * 1.1;
        break;
      case "mid":
        TDEE = BMR * 1.375;
        break;
      case "high":
        TDEE = BMR * 1.55;
        break;
      case "intense":
        TDEE = BMR * 1.725;
        break;
      default:
        TDEE = BMR;
        break;
    }

    // Adjust TDEE based on fitness goal
    if (fitnessGoal === "lose-weight") {
      TDEE -= 500;
    } else if (fitnessGoal === "gain-weight") {
      TDEE += 500;
    }

    setCalories(TDEE);

    // Upload the file and get the URL
    const fileURL = await uploadFile();

    // Prepare data to save
    const userData = {
      gender,
      age,
      weight,
      height,
      fitnessGoal,
      activityLevel,
      dietaryRestrictions,
      chronicIllness,
      dailyCaloricNeeds: TDEE,
      healthReport: fileURL || null, // Save file URL if uploaded
    };

    // Save data to Firestore
    saveUserData(userData);
  };

  return (
    <div className="collect-form-container">
      <h1>Enter Your Details</h1>
      <form onSubmit={handleSubmit}>
        {/* Gender */}
        <div className="input-box">
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Age */}
        <div className="input-box">
          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" />
        </div>

        {/* Weight */}
        <div className="input-box">
          <label>Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter your weight" />
        </div>

        {/* Height */}
        <div className="input-box">
          <label>Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Enter your height" />
        </div>

        {/* Fitness Goal */}
        <div className="input-box">
          <label>Fitness Goal</label>
          <select value={fitnessGoal} onChange={(e) => setFitnessGoal(e.target.value)}>
            <option value="">Select Fitness Goal</option>
            <option value="lose-weight">Lose Weight</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="maintain">Maintain Weight</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="input-box">
          <label>Upload Health Report (Image/PDF)</label>
          <input type="file" onChange={handleFileChange} accept="image/*,application/pdf" />
          {filePreview && <img src={filePreview} alt="Preview" className="file-preview" />}
        </div>

        <button type="submit">Submit</button>
      </form>

      {calories !== null && (
        <div className="result">
          <h2>Your Estimated Calorie Needs: {calories} kcal/day</h2>
        </div>
      )}
    </div>
  );
};

export default Collect;


