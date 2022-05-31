




 		
  		function userClicked(){
console.log("signup userClicked")


          $.post("/signup",{username:$("#username").val(), password:$("#psw").val()},function(data)
{
  console.log("signup callback function")

  if (data.redirect != "/signup"){
    window.location = data.redirect;
  }
  else{

    $("#error").html("Invalid Signup");       
    $("#username").val('');
    $("#psw").val('');

  }
});
          
    			return false;
    		}




  		$(document).ready(function(){ 

        $("#username").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });
        
        $("#psw").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });

  		});  		
    

