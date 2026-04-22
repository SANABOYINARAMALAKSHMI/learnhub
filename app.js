function signup(){
  let u = document.getElementById("user").value.trim();
  let p = document.getElementById("pass").value.trim();
  if (u === "" || p === "") {
    alert("Please fill all fields");
    return;
  }
  localStorage.setItem("user", u);
  localStorage.setItem("pass", p);
  alert("Signup successful!");
}
function login(){
  let u=document.getElementById("user").value.trim();
  let p=document.getElementById("pass").value.trim();
  if(u==="admin" && p==="admin123"){
    window.location="file:///F:/learnhub/admin.html";
    return;
  }
  if(u===localStorage.getItem("user") && p===localStorage.getItem("pass")){
    localStorage.setItem("loggedInUser", u);
    window.location="file:///F:/learnhub/dashboard.html";
  }
  else{
   alert("Invalid login");
  }
}
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location = "file:///F:/learnhub/login.html";
}
function checkLogin(){
  let user=localStorage.getItem("loggedInUser");
  if(!user){
    window.location="file:///F:/learnhub/login.html";
  }else{
    let el=document.getElementById("usernameDisplay");
    if(el) el.textContent="Welcome, "+user;
  }
}
function addCourse(){
  let c=document.getElementById("course").value.trim();
  if (c === "") {
    alert("Enter course name");
    return;
  }
  let data=JSON.parse(localStorage.getItem("courses")||"[]");
  data.push(c);
  localStorage.setItem("courses",JSON.stringify(data));
  alert("Course added!");
  loadCourses();
}
function loadCourses(){
  let list=document.getElementById("list");
  if(!list) return;
  let data=JSON.parse(localStorage.getItem("courses")||"[]");
  list.innerHTML="";
  data.forEach((c, i) => {
     let li = document.createElement("li");
     li.textContent = c;
     let btn = document.createElement("button");
     btn.textContent = "Delete";
     btn.style.marginLeft = "10px";
     btn.onclick = () ==>{
       data.splice(i,1);
       localStorage.setItem("courses",JSON.stringify(data));
       loadCourses();
     };
    li.appendChild(btn);
    list.appendChild(li);
  });
}
window.onload=()=>{
  loadCourses();
  checkLogin();
}