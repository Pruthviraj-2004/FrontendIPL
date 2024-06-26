import axios from "axios";

export const signup = async ({ username, name, email, password1, password2 }) => {
  try {
    const response = await axios.post(
      "https://practicehost1.pythonanywhere.com/ipl2/register_user/",
      // "http://localhost:8000/ipl2/register_user1/",
      // "http://localhost:8000/ipl2/register_user/",

      { 
        username: username,
        name: name,
        email: email,
        password1: password1,
        password2: password2
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else if (error.message) {
     
      throw new Error(error.message);
    } else {
    
      throw new Error("An error occurred while signing in.");
    }
  }
};

export const signin = async ({ username, password1 }) => {
  try {
    const response = await axios.post(
      "https://practicehost1.pythonanywhere.com/ipl2/login_user/",
      // "http://localhost:8000/ipl2/login_user/",
      { username, password1 }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.error) {
    
      throw new Error(error.response.data.error);
    } else if (error.message) {
  
      throw new Error(error.message);
    } else {
   
      throw new Error("An error occurred while signing in.");
    }
  }
};

export const signout = async ({ username, password1 }) => {
  try {
    const response = await axios.post(
      "https://practicehost1.pythonanywhere.com/ipl2/logout_user/"
      // "http://localhost:8000/ipl2/logout_user/",
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.error) {
      // If the server returns an error message, throw an Error with that message
      throw new Error(error.response.data.error);
    } else if (error.message) {
      // If there's an error but no specific error message from the server, throw the error message
      throw new Error(error.message);
    } else {
      // If there's no error message at all, throw a generic error
      throw new Error("An error occurred while signing in.");
    }
  }
};

