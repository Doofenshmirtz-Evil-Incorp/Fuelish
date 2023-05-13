import {Closest} from './pos.js';
const container = document.querySelector('.container');
const priceBox = document.querySelector('.price-box');
const change = document.querySelector('.change');
const st = document.querySelector('.state-img iframe');
const getLoc = document.getElementById("getlocation");

var cords=[];
var rslt=[];//state data
var datac=[];//city data of select state
var slent;
var clent;

getLoc.addEventListener('click',  event => {
  document.getElementById("getlocation").className="fa-solid fa-spinner fa-spin-pulse";
  let gcity,gstate;
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition( pos => {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;
            console.log(latitude, longitude);
            fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+latitude+'&lon='+longitude)
            .then(response => response.json())
            .then(async data => {
                [gcity,gstate]=Closest(cords,[latitude,longitude],data["address"]["state"]);
                document.getElementById("state").value=gstate;
                console.log(document.getElementById("state").value);
                await func(1,gcity);
            });
        }, error => {
          document.getElementById("getlocation").className="fa-solid fa-location-dot";
            console.log("Geolocation request denied by user", error.code);
        });
    } else {
      document.getElementById("getlocation").className="fa-solid fa-location-dot";
        console.log("Geolocation is not supported.");
    }
});
window.onload=async ()=>{
  var status=0;
    while(status!=2){
     await fetch('https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/State.csv',{method:"GET",mode:"cors"})
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\r\n');
      const headers = rows[0].split(',');
      slent=rows.length;
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        if (row.length === headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = row[j];
          }
          document.getElementById("state").innerHTML+="<option value='"+obj["State"]+"'>"+obj["State"]+"</option>";
          rslt.push(obj);
        }
      }
      status=1;
    })
    .catch(error => {console.error(error);});
  await fetch('https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/src/Citycord.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\r\r\n');
    const headers = rows[0].split(',');
    corlent=rows.length;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(',');
      if (row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = row[j];
        }
        cords.push(obj);
      }
    }
    status=2;
    })
  .catch(error => {console.error(error);});
  console.log(status);
}
}
async function getcord(city)
{ var arr=[];
       arr=await fetch('https://nominatim.openstreetmap.org/search.php?q='+city.replace(/ /g, '+')+'&format=jsonv2')
       .then(response => response.json())
       .then(data => {
           return data[0]["boundingbox"];
       })
       .catch(error => {console.error(error);return [0,0,0,0]});
  return arr;
};
async function cfunc()
{
var found=0;
let i;
      for(i=0;i<clent;i++)
         {                 
            if(datac[i]["City"].toLowerCase()==(city.value).toLowerCase())
              {
                priceBox.style.display = '';
                change.style.display = '';
                priceBox.classList.add('fadeIn');
                change.classList.add('fadeIn');
                container.style.height = '590px';
                st.style.display='block';
                var [b0,b1,b2,b3]=await getcord(state.value.replace(/ /g, '+')+"+"+datac[i]["City"]);
                var newsrc="https://www.openstreetmap.org/export/embed.html?bbox="+b2+"%2C"+b0+"%2C"+b3+"%2C"+b1+"&amp;layer=mapnik";
                var iframe = document.getElementById('map');
                iframe.src=newsrc;
                iframe.style.display='block';
                const ele1=document.getElementById("pp");
                ele1.innerText=datac[i]["Price(P)"];
                const ele2=document.getElementById("dp");
                ele2.innerText=datac[i]["Price(D)"];
                const ele3=document.getElementById("cp");
                if((datac[i]["Change(P)"]).charAt(0)==="+")
                {
                  ele3.style.color='#EE3E3E';
                }
                else if((datac[i]["Change(P)"]).charAt(0)==="-")
                {
                  ele3.style.color='#72ff72';
                }
                else
                {
                  ele3.style.color='#72ff72';
                }
                ele3.innerText=datac[i]["Change(P)"];
                const ele4=document.getElementById("cd");
                if((datac[i]["Change(D)"]).charAt(0)==="+")
                {
                  ele4.style.color='#EE3E3E';
                }
                else if((datac[i]["Change(D)"]).charAt(0)==="-")
                {
                  ele4.style.color='#72ff72';
                }
                else
                {
                  ele4.style.color='#72ff72';
                }
                ele4.innerText=datac[i]["Change(D)"];
                found=1;
                document.getElementById("getlocation").className="fa-solid fa-location-dot";
                break;
              }
         }
}
async function func(mode=0,gcity)
{
  if(state.value=="")
    {return;}
    var found=0;
    let i;
      for(i=0;i<slent-2;i++)
         { 
            if(rslt[i]["State"].toLowerCase()==(state.value).toLowerCase())
              {
                var [b0,b1,b2,b3]=await getcord(state.value);
                var newsrc="https://www.openstreetmap.org/export/embed.html?bbox="+b2+"%2C"+b0+"%2C"+b3+"%2C"+b1+"&amp;layer=mapnik";
                var iframe = document.getElementById('map');
                iframe.src=newsrc;
                document.getElementById("city").disabled=false;
                document.getElementById("city").innerHTML="<option value='' selected disabled>Select a city</option>";
                fetch('https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/assets/'+rslt[i]["State"]+'.csv')
                .then(response => response.text())
                .then(data => {
                  datac=[];
                  const rows = data.split('\r\n');
                  const headers = rows[0].split(',');
                  clent=rows.length;
                  for (let i = 1; i < rows.length; i++) {
                    const row = rows[i].split(',');
                    if (row.length === headers.length) {
                      const obj = {};
                      for (let j = 0; j < headers.length; j++) {
                        obj[headers[j]] = row[j];
                      }
                      if(mode==1 && obj["City"]==gcity)
                      {
                        document.getElementById("city").innerHTML+="<option selected value='"+obj["City"]+"'>"+obj["City"]+"</option>";
                      }
                      else
                      {document.getElementById("city").innerHTML+="<option value='"+obj["City"]+"'>"+obj["City"]+"</option>";}
                      datac.push(obj);
                    }
                  }
                  if(mode==1)
                  {
                    cfunc();
                  }
                })
                found=1;
                break;
              }
         }
        }
document.getElementById('state').addEventListener('change',func);
document.getElementById('city').addEventListener('change', cfunc);
