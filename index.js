import {Closest} from './pos.js';
const container = document.querySelector('.container');
const priceBox = document.querySelector('.price-box');
const change = document.querySelector('.change');
const st = document.getElementById("map");
const getLoc = document.getElementById("getlocation");
const near = document.getElementById('nearby');
const modeToggle = document.getElementById("mode-toggle");
const pageContainer = document.getElementById("page-container");
const mapContainer = document.getElementById("map");
const shareIcon = document.getElementById('Whatsapp-link');

// Create variables to get the fuel prices and their changes 
let petrolPrice , dieselPrice , petrolChange , dieselChange;

// Create variable to get the selected State and City name
let selectedState , selectedCity;

var cords=[];
var rslt=[];//state data
var datac=[];//city data of select state
var slent;
var clent;
var corlent;
var b0,b1,b2,b3;
var markers=L.layerGroup();
const map = L.map('map').setView([25, 75], 3);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var darkModeTileLayer = new L.StamenTileLayer("terrain");

async function getcsv(url,splitter='\r\n')
{
  return await fetch(url)
  .then(response => response.text())
  .then( data => {
    var loc=[];
    const rows = data.split(splitter);
    const headers = rows[0].split(',');
    var len=rows.length;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(',');
      if (row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = row[j];
        }
        loc.push(obj);
      }
    }return [loc,len];
})
};

async function bharat()
{ map.removeLayer(markers);
  map.setView([20, 77], 3)
  container.style.height = '590px';
  container.style.marginTop = '1px';
  st.style.display='block';
  map.invalidateSize();
  markers=L.layerGroup();var mar;
  var order=Closest (cords,[8.058382,77.544730],"Tamil Nadu",markers);
  for(let i=0;i<707;i++)
  { map.invalidateSize();
    if(parseFloat(order[1][i]["circ"])<300)    
    {mar=L.circleMarker([order[1][i]["lat"],order[1][i]["long"]],{
        radius:7,
        color: '#2a176f',
        fillColor: '#2a176f'
        }).bindPopup("#2a176f").openPopup();
    markers.addLayer(mar);
    markers.addTo(map);}
    else if(parseFloat(order[1][i]["dist"])<1200)    
    {mar=L.circleMarker([order[1][i]["lat"],order[1][i]["long"]],{
        radius:7,
        color: '#138808',
        fillColor: '#138808'
        }).bindPopup("#138808").openPopup();
    markers.addLayer(mar);
    markers.addTo(map);}
    else if(parseFloat(order[1][i]["dist"])<2200)    
    {mar=L.circleMarker([order[1][i]["lat"],order[1][i]["long"]],{
        radius:7,
        color: '#ffffff',
        fillColor: '#ffffff'
        }).bindPopup("#ffffff").openPopup();
    markers.addLayer(mar);
    markers.addTo(map);}
    else    
    {mar=L.circleMarker([order[1][i]["lat"],order[1][i]["long"]],{
        radius:7,
        color: '#f0630e',
        fillColor: '#f0630e'
        }).bindPopup("#f0630e").openPopup();
    markers.addLayer(mar);
    markers.addTo(map);}
    await new Promise(r => setTimeout(r, 0.01));
    }
}

async function getdata(st,ct)
{let i;
  for(i=0;i<slent-2;i++)
  { 
    if(rslt[i]["State"].toLowerCase()==(st).toLowerCase())
      {var dat=[],clt;
        await getcsv('https://rapid-wave-c8e3.redfor14314.workers.dev/https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/assets/'+st+'.csv').then(data =>
        {
          dat=data[0];
          clt=data[1];
        })
        for(i=0;i<clt;i++)
          {            
              if(dat[i]["City"].toLowerCase()==(ct).toLowerCase())
                {return dat[i];break;}
          }
          break;
      }
  }
}

async function genmark(gs,gc,lat,lon,out)
{
  markers=L.layerGroup();var mar;
  mar=L.circleMarker([lat,lon],{
    radius:5,
    color: 'cyan',
    fillColor: 'cyan'
  }).bindPopup("Idhar hain aap").openPopup();
  markers.addLayer(mar);
  var pp,dp;
  getdata(gs,gc).then(data=>{
    pp=parseFloat(data["Price(P)"]).toFixed(2);
    dp=parseFloat(data["Price(D)"]).toFixed(2);
  });
  var pp1,dp1;
  for(let i=0;i<8;i++)
  {   await getdata(out[1][i]["State"],out[1][i]["City"]).then(data=>{
      pp1=parseFloat(data["Price(P)"]).toFixed(2);
      dp1=parseFloat(data["Price(D)"]).toFixed(2);
      if((pp1-pp)<=0 && (dp1-dp)<=0)
      {
        mar=L.circleMarker([out[1][i]["lat"],out[1][i]["long"]],{
        data:String(out[1][i]["State"]+'-'+out[1][i]["City"]),
        radius:7,
        color: '#72ff72',
        fillColor: '#72ff72'
        }).bindPopup(out[1][i]["State"]+'<p>'+out[1][i]["City"]+'</p>').openPopup().on('click',clicky);
      }
      else if((pp1-pp)>0 && (dp1-dp)>0)
      {
          mar=L.circleMarker([out[1][i]["lat"],out[1][i]["long"]],{
          data:String(out[1][i]["State"]+'-'+out[1][i]["City"]),
          radius:7,
          color: '#EE3E3E',
          fillColor: '#EE3E3E'
          }).bindPopup(out[1][i]["State"]+'<p>'+out[1][i]["City"]+'</p>').openPopup().on('click',clicky);
      }
      else
      {
          mar=L.circleMarker([out[1][i]["lat"],out[1][i]["long"]],{
          data:String(out[1][i]["State"]+'-'+out[1][i]["City"]),
          radius:7,
          color: 'orange',
          fillColor: 'orange'
          }).bindPopup(out[1][i]["State"]+'<p>'+out[1][i]["City"]+'</p>').openPopup().on('click',clicky);
      }
    markers.addLayer(mar);
    markers.addTo(map);
    })
  }
}

async function clicky(data)
{
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
    npr.innerHTML+="<p style='color: #72ff72'>"+"Diesel : "+data["Price(D)"]+"("+(dp1-dp).toFixed(2)+")"+"</p>";
  else
    npr.innerHTML+="<p style='color: #EE3E3E'>"+"Diesel : "+data["Price(D)"]+"("+(dp1-dp).toFixed(2)+")"+"</p>";
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
            fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+latitude+'&lon='+longitude)
            .then(response => response.json())
            .then(async data => {
                var out=Closest(cords,[latitude,longitude],data["address"]["state"],markers);
                [gcity,gstate]=out[0];
                document.getElementById("state").value=gstate;
                console.log(document.getElementById("state").value);
                await func(1,gcity);
                genmark(gstate,gcity,latitude,longitude,out);
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
     await getcsv('https://rapid-wave-c8e3.redfor14314.workers.dev/https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/State.csv')
     .then(data =>{
      rslt=data[0];
      slent=data[1];
      status=1;
      for(let x=0;x<slent-2;x++)
      {
        document.getElementById("state").innerHTML+="<option value='"+rslt[x]["State"]+"'>"+rslt[x]["State"]+"</option>";
      }
     });
  await getcsv('https://rapid-wave-c8e3.redfor14314.workers.dev/https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/src/Citycord.csv')
  .then(data =>{cords=data[0];corlent=data[1];status=2;});
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
  {  console.log("b",arr);
    await getcsv('https://raw.githubusercontent.com/Doofenshmirtz-Evil-Incorp/FuelishCLI/main/src/bound.csv','\n')
    .then(data =>{bound=data[0];})
    .then(data =>{
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
        );
  }
  return arr;
};

async function cfunc(mode=0)
{
  map.removeLayer(markers);
var found=0;
let i;near.classList.remove('fadeIn');

// Make the whatsapp icon visible when state and city get selected
document.getElementById('social-sharing-icon').classList.remove('hide-the-icon');

      for(i=0;i<clent;i++)
        {                 
            if(datac[i]["City"].toLowerCase()==(city.value).toLowerCase())
              {
                selectedCity = datac[i]["City"];
                priceBox.style.display = '';
                change.style.display = '';
                priceBox.classList.add('fadeIn');
                change.classList.add('fadeIn');
                container.style.height = '590px';
                container.style.marginTop = '1px';
                st.style.display='block';
                [b0,b1,b2,b3]=await getcord(state.value.replace(/ /g, '+')+"+"+datac[i]["City"]);
                map.fitBounds([
                  [b1, b2],
                  [b0, b3]
              ]);
                const ele1=document.getElementById("pp");
                ele1.innerText=datac[i]["Price(P)"];
                petrolPrice = ele1.innerText;
                const ele2=document.getElementById("dp");
                ele2.innerText=datac[i]["Price(D)"];
                dieselPrice = ele2.innerText;
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
                petrolChange = ele3.innerText;
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
                dieselChange = ele4.innerText;
                found=1;
                document.getElementById("getlocation").className="fa-solid fa-location-crosshairs";
                if(mode==0)
                {
                  for(let j=0;j<corlent;j++)
                  {
                    if(cords[j]["City"]==city.value)
                    {
                      var out=Closest(cords,[cords[j]["lat"],cords[j]["long"]],state.value,markers);
                      genmark(state.value,city.value,cords[j]["lat"],cords[j]["long"],out);
                      break;
                    }
                  }
                }
                break;
              }
        }
        map.invalidateSize();
}

// Add an EventListener on shareBtn element 
// It triggers when 'click' event occurs

shareIcon.addEventListener('click' , (e) => {

  let location = `Fuel price in ${selectedCity} city, ${selectedState}`;

  let fuelInfo = `Petrol price : ${petrolPrice}\nChange in petrol : ${petrolChange}\n\nDiesel price : ${dieselPrice}\nChange in diesel : ${dieselChange}`;

  let url = "Here is the website link -> https://fuelish.vercel.app/";
  
  let text = "Check out the latest fuel prices on Fuelish!";

  window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(`${text}\n${url}\n\n${location} :\n\n${fuelInfo}`), '_blank');

});

async function func(mode=0,gcity)
{
  if(state.value=="")
    {return;}
    let i;
      for(i=0;i<slent-2;i++)
        { 
            if(rslt[i]["State"].toLowerCase()==(state.value).toLowerCase())
              {
                [b0,b1,b2,b3]=await getcord(state.value);
                map.fitBounds([
                  [b1, b2],
                  [b0, b3]
              ]);
                selectedState = rslt[i]["State"];
                document.getElementById("city").disabled=false;
                document.getElementById("city").innerHTML="<option value='' selected disabled>Select a city</option>";
                getcsv('https://rapid-wave-c8e3.redfor14314.workers.dev/https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/assets/'+rslt[i]["State"]+'.csv')
                .then(data=>
                  {
                    datac=[];
                    clent=data[1];
                    datac=data[0];
                    for(let x=0;x<clent-2;x++)
                    if(mode==1 && datac[x]["City"]==gcity)
                    {
                      document.getElementById("city").innerHTML+="<option selected value='"+datac[x]["City"]+"'>"+datac[x]["City"]+"</option>";
                    }
                    else
                    {document.getElementById("city").innerHTML+="<option value='"+datac[x]["City"]+"'>"+datac[x]["City"]+"</option>";}
                    if(mode==1)
                    {
                      cfunc(1);
                    }
                  });
                break;
              }
        }
        map.invalidateSize();
        }
document.getElementById('state').addEventListener('change',func);
document.getElementById('city').addEventListener('change', function(){cfunc(0);});
document.getElementById('animation').addEventListener('click',bharat);
priceBox.addEventListener("animationend", function() {
  map.invalidateSize();
  map.fitBounds([
    [b1, b2],
    [b0, b3]
]);
});


modeToggle.addEventListener("change", () => {
  // if (modeToggle.checked) {
  //   //light mode
 
  //   map.removeLayer(tiles); 
  //   map.addLayer(darkModeTileLayer); 
  // } else {
  //   //dark mode
  //    pageContainer.classList.add("light-mode");
  //   document.body.classList.add("light-mode");
  //   document.querySelector(".mode-label").textContent = "Dark Mode";
  //   mapContainer.classList.add("light-mode");
  //   map.removeLayer(darkModeTileLayer); 
  //   map.addLayer(tiles); 
  // }

  if (modeToggle.checked) {
    document.body.classList.add("light-mode");
    pageContainer.classList.add("light-mode");
      document.body.classList.add("light-mode");
    const classtogglename=document.getElementById("toggle-icon");
    classtogglename.classList.remove('fa-moon-o');
    classtogglename.classList.add('fa-sun-o');
    classtogglename.style.color="black"
    mapContainer.classList.add("light-mode");
  } else {


    pageContainer.classList.remove("light-mode");
    document.body.classList.remove("light-mode");
    mapContainer.classList.remove("light-mode");
   document.body.classList.remove("light-mode");
   const classtogglename=document.getElementById("toggle-icon");
   classtogglename.classList.remove('fa-sun-o');
   classtogglename.classList.add('fa-moon-o');
   classtogglename.style.color="white"
  }
});


