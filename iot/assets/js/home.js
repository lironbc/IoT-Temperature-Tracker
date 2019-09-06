

 document.getElementById('stats-generator').click();
 
 function submit(setDefault = false, useDefault=false, turnOff=false){
     if(setDefault){
         document.getElementById('set-as-default').checked = true;
     }
     
     if(useDefault){
         document.getElementById('change-to-default').checked = true;  
     }
     if(turnOff){
        document.getElementById('turn-off').checked = true;
     }
     document.getElementById('color-form').submit();
 }
 
