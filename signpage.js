// sign in page
var button = document.getElementById("btn");
button.addEventListener("click", login);
function login(){
var usern=document.getElementById('username').value;
var userp=document.getElementById('userpass').value;

if((usern=='loyce' && userp=='123')||(usern=='agrey' && userp=='123')||(usern=='bahati' && userp=='123')||(usern=='isaac' && userp=='123')){
 window.open("lastpage.html");
}else if(!usern&&!userp){
document.getElementById("p").innerHTML = "You cant submit empty fields";
}else if(usern&&!userp){
    document.getElementById("p").innerHTML = "Please fill in your password";
    }else if(!usern&&userp){
    document.getElementById("p").innerHTML = "Please fill in the username";
    }else{
document.getElementById("p").innerHTML = "Wrong user name or password";
}


}

// signup page
var btn = document.getElementById("button");
btn.addEventListener("click", signup);
function signup(){
var username=document.getElementById('usern').value;
var userpass=document.getElementById('userp').value;
var email=document.getElementById('mail').value;
var pass=document.getElementById('usep').value;

if(!username&&!userpass&&!email){
document.getElementById("par").innerHTML = "Cant submit empty fields";
}else if(userpass!== pass){
    document.getElementById("par").innerHTML = "Your passwords dont match";
    }else if(username&&userpass&&email){
    document.getElementById("par").innerHTML = window.open("lastpage.html")
    }else if(username&&userpass&&!email){
        document.getElementById("par").innerHTML = "Please fill in your email ";
        }else if(username&&!userpass&&email){
            document.getElementById("par").innerHTML = "Set a password ";
            }else if(!username&&userpass&&email){
                document.getElementById("par").innerHTML = "User name required";
                }else{
document.getElementById("par").innerHTML = "Error, try signing up again";
}


}

//signup storage
btn.addEventListener("click", addBio);
var userSignUp =[];
function addBio(){
    userSignUp.push(document.getElementById("usern").value);
    userSignUp.push(document.getElementById("mail").value);
    userSignUp.push(document.getElementById("contact").value);
    userSignUp.push(document.getElementById("userp").value);
    userSignUp.push(document.getElementById("usep").value);
    console.log(userSignUp);  
}



//accessing data in an array
var baton = document.getElementById("btn");
baton.addEventListener("click", signup);
btn.addEventListener("click", userSignUp);
for(var x=0; x<userSignUp.length; x++){
    if(userSignUp[i].userSignUp===userSignUp[x].userSignUp_id){
        console.log(userSignUp[x]);
    }
}



// footer
document.getElementById("footerr").innerHTML= Date();