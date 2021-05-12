export const validate=(first_name:string,age:number,address:string,phoneno:string,distt:string,state:string,coronapositive:string,coronanegative:string,gender:string)=>{
  let isValid = true;

  if (!first_name) {
    isValid = false;
    }
 
if (!gender) {
  isValid = false;
  console.log("name");
  } 

if (!age) {
  isValid = false;
 }
else if(age<18){
   isValid=false;
 }  

if(!coronanegative){
isValid=false;
}
else{
var ny=[31,28,31,30,31,30,31,31,30,31,30,31];
var ly=[31,29,31,30,31,30,31,31,30,31,30,31];
var mn=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

var n=coronanegative.length;
var a=coronanegative.indexOf('/');
var b=coronanegative.indexOf('/',a+1);
var dd=parseInt(coronanegative.substring(0,a));
var mm=parseInt(coronanegative.substring(a+1,b));
var yy=parseInt(coronanegative.substring(b+1,n));
var md=0;

if(mm>=1 && mm<=12)
{
if(yy%4==0)
{
  md=ly[mm-1];
}
else
{
  md=ny[mm-1];
}
}

if(dd<=0||dd>md||mm<=0||mm>12||yy<1900||yy>2030||coronanegative.substring(0,a).length<2||coronanegative.substring(a+1,b).length<2)
{
console.log("invalid date");
isValid=false;
}
else
{
console.log("valid")
console.log(mn[mm-1] + " " + dd + ", " + yy)
}
}

if(!coronapositive){
isValid=false;
}
else{
var ny=[31,28,31,30,31,30,31,31,30,31,30,31];
var ly=[31,29,31,30,31,30,31,31,30,31,30,31];
var mn=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

var n=coronapositive.length;
var a=coronapositive.indexOf('/');
var b=coronapositive.indexOf('/',a+1);
var dd=parseInt(coronapositive.substring(0,a));
var mm=parseInt(coronapositive.substring(a+1,b));
var yy=parseInt(coronapositive.substring(b+1,n));
var md=0;

if(mm>=1 && mm<=12)
{
if(yy%4==0)
{
  md=ly[mm-1];
}
else
{
  md=ny[mm-1];
}
}

if(dd<=0||dd>md||mm<=0||mm>12||yy<1900||yy>2030||coronapositive.substring(0,a).length<2||coronapositive.substring(a+1,b).length<2)
{
console.log("invalid date");
isValid=false;
}
else
{
console.log("valid")
console.log(mn[mm-1] + " " + dd + ", " + yy)
}
}




if (phoneno !== "undefined") {
  var pattern = new RegExp(/^[0-9\b]+$/);
  if (!pattern.test(phoneno)) {
      isValid = false;
      }else if(phoneno.length !== 10){
      isValid = false;
      }
      }
      if(!state){
        isValid=false;
        
      }
      if(!distt){
        isValid=false;
        
      }

  return isValid;
  }
  
  