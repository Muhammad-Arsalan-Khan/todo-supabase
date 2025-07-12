const ProjectURL = "https://adwarbyyrcpdpsglvflv.supabase.co";
const API_Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkd2FyYnl5cmNwZHBzZ2x2Zmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxODM2MTIsImV4cCI6MjA1Mjc1OTYxMn0._v_WkHXsxUDSlTWN7kgBlMr9as20RYWtiYJYf5cr_Q0";

const supaAuth = supabase.createClient(ProjectURL, API_Key);

let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirm-password");


function authCheck() {
  const userUid = localStorage.getItem("uid")
  if(userUid){
    window.location.replace("./index.html");
  }
}

async function SignIn() {
  try {
    if (
      !firstName.value ||
      !lastName.value ||
      !email.value ||
      !password.value
    ) {
      alert("fill the field");
      return;
    }
    if (password.value !== confirmPassword.value) {
      alert("enter the correct password");
      return;
    }
    console.log(email.value, password.value)
    const { data, error } = await supaAuth.auth.signUp({
      email: email.value,
      password: password.value,
    });

    console.log(data, "data");
    console.log(error, "error");
    let uid = data.user.id

    addUser(uid);

    firstName.value = "";
    lastName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";

    window.location = "./index.html"

  } catch (error) {
    console.log(error);
  }
}

async function addUser(uid) {
  try {
    console.log("uder add", uid)
    var todoObj = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      uid: uid,
      password: password.value,
    };
    const { data, error } = await supaAuth
      .from("userInfo")
      .insert(todoObj)
      .select();

    console.log("data", data);
    console.log("error", error);
  } catch (error) {
    console.log(error);
  }
}
