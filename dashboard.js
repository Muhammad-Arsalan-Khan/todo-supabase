function authCheck() {
  let userUid = localStorage.getItem("uid");
  if (!userUid) {
    window.location.replace("./index.html");
  }
}

const ProjectURL = "https://adwarbyyrcpdpsglvflv.supabase.co";
const API_Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkd2FyYnl5cmNwZHBzZ2x2Zmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxODM2MTIsImV4cCI6MjA1Mjc1OTYxMn0._v_WkHXsxUDSlTWN7kgBlMr9as20RYWtiYJYf5cr_Q0";

const supaClient = supabase.createClient(ProjectURL, API_Key);

let input = document.querySelector("#input");
let taskContainer = document.querySelector("#task-container")

async function add() {
  try {
    if(!input.value){
      alert("enter a task")
      return
    }
    var todoObj = {
      todo: input.value,
    };
    const { data, error } = await supaClient
      .from("todo")
      .insert(todoObj)
      .select();

    console.log("data", data);
    console.log("error", error);
    input.value = '';
    getAll()
  } catch (error) {
    console.log(error);
  }
}
//add()

async function getAll() {
  try {
    const { data, error } = await supaClient.from("todo").select("*");
    taskContainer.innerHTML = "";
    for(let userdata of data){
      let ui =  `<ul><li><p>${userdata.todo}</p> <span id=${
        userdata.id
      } class="edit" onclick="editFnx(this)">📝</span><span id=${
        userdata.id
      } class="delete" onclick="deleteFnx(this)">🗑️</span></li></ul>`;
      taskContainer.innerHTML += ui
    }
    console.log("data", data);
    console.log("error", error);
  } catch (error) {
    console.log(error);
  }
}


async function editFnx(e) {
  try {
    var oldValue = e.previousElementSibling.innerHTML
    var editValue = prompt("edit a task", oldValue.trim())
    if(!editValue){
      alert("enter the task")
      return
    }
    const updateObj = {
      todo: editValue,
    };
    const { data, error } = await supaClient
      .from("todo")
      .update(updateObj)
      .eq("id", e.id);

    console.log("data", data);
    console.log("error", error);
    getAll()
  } catch (error) {
    console.log(error);
  }
}

async function deleteFnx(e) {
  try {
    const response = await supaClient
    .from("todo")
    .delete()
    .eq("id", e.id)
    console.log("response", response);
    getAll()

  } catch (error) {
    console.log(error);
  }
}

