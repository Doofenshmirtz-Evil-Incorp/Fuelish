import {Closest} from './pos.js';
const container = document.querySelector('.container');
const priceBox = document.querySelector('.price-box');
const change = document.querySelector('.change');
const st = document.getElementById("map");
const getLoc = document.getElementById("getlocation");
const near = document.getElementById('nearby');

var cords=[];
var rslt=[];//state data
var datac=[];//city data of select state
var slent;
var clent;
var corlent;
var b0,b1,b2,b3;
var markers;
const map = L.map('map').setView([25, 75], 3);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getdata(st,ct)
{let i;
  for(i=0;i<slent-2;i++)
        { 
            if(rslt[i]["State"].toLowerCase()==(st).toLowerCase())
              {
                return fetch('https://rapid-wave-c8e3.redfor14314.workers.dev/https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/assets/'+st+'.csv')
                .then(response => response.text())
                .then( data => {
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
                      datac.push(obj);
                    }
                  }
                  for(i=0;i<clent;i++)
                  {                 
                      if(datac[i]["City"].toLowerCase()==(ct).toLowerCase())
                        {return datac[i];break;}
                  }
                })
                  break;
              }
    }
}

async function clicky(data)
{
  near.classList.remove('fadeOut');
  near.classList.add('fadeIn');
  let txt=data.target.options.data;
const ar=txt.split("-");
const npr = document.getElementById('npr');
getdata(ar[0],ar[1]).then(data=>{
  npr.innerHTML="";
  npr.innerText=data["City"];
  var pp=parseFloat(document.getElementById("pp").innerText).toFixed(2);
  var dp=parseFloat(document.getElementById("dp").innerText).toFixed(2);
  var pp1=parseFloat(data["Price(P)"]).toFixed(2);
  var dp1=parseFloat(data["Price(D)"]).toFixed(2);
  if((pp-pp1)>=0)
    npr.innerHTML+="<p style='color: #72ff72'>"+"Petrol : "+data["Price(P)"]+"("+(pp1-pp).toFixed(2)+")"+"</p>";
  else
    npr.innerHTML+="<p style='color: #EE3E3E'>"+"Petrol : "+data["Price(P)"]+"("+(pp1-pp).toFixed(2)+")"+"</p>";
  if((dp-dp1)>=0)
    npr.innerHTML+="<p style='color: #72ff72'>"+"Deisel : "+data["Price(D)"]+"("+(dp1-dp).toFixed(2)+")"+"</p>";
  else
    npr.innerHTML+="<p style='color: #EE3E3E'>"+"Deisel : "+data["Price(D)"]+"("+(dp1-dp).toFixed(2)+")"+"</p>";
  });
}

getLoc.addEventListener('click',  event => {
  document.getElementById("getlocation").className="fa-solid fa-spinner fa-spin-pulse";
  let gcity,gstate;
    if ('geolocation' in navigator) {
      near.classList.remove('fadeIn');
        navigator.geolocation.getCurrentPosition( pos => {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;
            console.log(latitude, longitude);
            markers=L.layerGroup();var mar;
            mar=L.circleMarker([latitude,longitude],{
              radius:5,
              color: 'red',
              fillColor: 'red'
            }).bindPopup("Idhar hain aap").openPopup();
            markers.addLayer(mar);
            fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+latitude+'&lon='+longitude)
            .then(response => response.json())
            .then(async data => {
                var out=Closest(cords,[latitude,longitude],data["address"]["state"]);
                [gcity,gstate]=out[0];
                document.getElementById("state").value=gstate;
                console.log(document.getElementById("state").value);
                await func(1,gcity);
                for(let i=0;i<5;i++)
                {
                  mar=L.circleMarker([out[1][i]["lat"],out[1][i]["long"]],{
                    data:String(out[1][i]["State"]+'-'+out[1][i]["City"]),
                    radius:7,
                    color: 'blue',
                    fillColor: 'blue'
                  }).bindPopup(out[1][i]["State"]+'-'+out[1][i]["City"]).openPopup().on('click',clicky);
                  markers.addLayer(mar);
                }
                markers.addTo(map);
            });
        }, error => {
          document.getElementById("getlocation").className="fa-solid fa-location-crosshairs";
            console.log("Geolocation request denied by user", error.code);
        });
    } else {
      document.getElementById("getlocation").className="fa-solid fa-location-crosshairs";
        console.log("Geolocation is not supported.");
    }
});
window.onload=async ()=>{
  var status=0;
    while(status!=2){
     await fetch('https://rapid-wave-c8e3.redfor14314.workers.dev/https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/State.csv',{method:"GET",mode:"cors"})
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
  await fetch('https://rapid-wave-c8e3.redfor14314.workers.dev/https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/src/Citycord.csv')
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
{ var arr=[];var i,bl,bound=[];
      arr=await fetch('https://nominatim.openstreetmap.org/search.php?q='+city.replace(/ /g, '+')+'&format=jsonv2')
      .then(response => response.json())
      .then(data => {
          return data[0]["boundingbox"];
      })
      .catch(error => {return [0,0,0,0]});
  if(arr[0]==0)
  {
    await fetch('https://raw.githubusercontent.com/Doofenshmirtz-Evil-Incorp/FuelishCLI/main/src/bound.csv')
        .then(response => response.text())
        .then( data => {
          const rows = data.split('\n');
          const headers = rows[0].split(',');
          for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(',');
            if (row.length === headers.length) {
              const obj = {};
              for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = row[j];
              }
              bound.push(obj);
            }
          }
          bl=bound.length;
          for(i=0;i<bl-1;i++)
          {
            if(bound[i]["City"].toLowerCase()==(city.split('+')).slice(-1)[0].toLowerCase())
            {
              arr=[bound[i]["s"],bound[i]["n"],bound[i]["w"],bound[i]["e"]];
              break;
            }
          }
        }
        )
  }
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
                [b0,b1,b2,b3]=await getcord(state.value.replace(/ /g, '+')+"+"+datac[i]["City"]);
                map.fitBounds([
                  [b1, b2],
                  [b0, b3]
              ]);
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
                document.getElementById("getlocation").className="fa-solid fa-location-crosshairs";
                break;
              }
        }
        map.invalidateSize();
}

async function func(mode=0,gcity)
{
  if(state.value=="")
    {return;}
    let i;markers.remove();
      for(i=0;i<slent-2;i++)
        { 
            if(rslt[i]["State"].toLowerCase()==(state.value).toLowerCase())
              {
                [b0,b1,b2,b3]=await getcord(state.value);
                map.fitBounds([
                  [b1, b2],
                  [b0, b3]
              ]);
                document.getElementById("city").disabled=false;
                document.getElementById("city").innerHTML="<option value='' selected disabled>Select a city</option>";
                fetch('https://rapid-wave-c8e3.redfor14314.workers.dev/https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/assets/'+rslt[i]["State"]+'.csv')
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
                break;
              }
        }
        map.invalidateSize();
        }
document.getElementById('state').addEventListener('change',func);
document.getElementById('city').addEventListener('change', cfunc);
container.addEventListener("animationend", function() {
  map.invalidateSize();
  map.fitBounds([
    [b1, b2],
    [b0, b3]
]);
});
