function validation(values){
    
        let error={}
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   if(values.email ===""){
    error.email="Name should not be empty";

   }
   else if(!email_pattern.test(values.email)){
    error.email="Name didn't match";
   }
   else{
    error.email=" "
   }

   if(values.password ===""){
    error.passsword="Password should not be empty";

   }
   else if(!password_pattern.test(values.password)){
    error.password="Password didn't match";
   }
   else{
    error.password=" "
   }

   return error;

   
    }

    export default validation;
