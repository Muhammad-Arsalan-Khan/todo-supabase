const ProjectURL = "https://adwarbyyrcpdpsglvflv.supabase.co";
const API_Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkd2FyYnl5cmNwZHBzZ2x2Zmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxODM2MTIsImV4cCI6MjA1Mjc1OTYxMn0._v_WkHXsxUDSlTWN7kgBlMr9as20RYWtiYJYf5cr_Q0";

const supaAuth = supabase.createClient(ProjectURL, API_Key);

let email = document.querySelector("#email");
let password = document.querySelector("#password");

function authCheck() {
  let userUid = localStorage.getItem("uid")
  //console.log("userUid", userUid)
  if (userUid) {
     window.location.replace("./dashboard.html")
  }
}

async function login() {
  try {
    console.log(email.value, password.value)
    if(!email.value || !password.value){
      alert("fill the field")
      return
    }
    const { data, error } = await supaAuth.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    console.log(data, "data");
    console.log(error, "error");
    let uid = data.user.id
    localStorage.setItem("uid", uid)

    email.value='';
    password.value = '';

    window.location = "./dashboard.html"

  } catch (error) {
    console.log(error);
    
  }
}

