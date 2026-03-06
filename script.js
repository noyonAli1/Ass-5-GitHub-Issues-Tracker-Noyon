const loginbtn = document.getElementById('login-btn');
loginbtn.addEventListener('click',function (){
 //1-get a text....admin....
 const inputText = document.getElementById('input-Text');
 const contactNumber = inputText.value;
 
 
 
 //-2 - get  pin..admin123.//
 const inputpin = document.getElementById('input-pin');
 const pin = inputpin.value;

 
 //3--match text & pin ....
 if(contactNumber == "admin" && pin == "admin123"){
          //>> home page 
        //   alert("Login Success")
          //ture holo aber onno page noye jabe
          window.location.assign("./card.html");
 }else{
       //3-2 jodi folse hoy ...alert >> return
       alert("login Failed");
       return;
 }

    
});