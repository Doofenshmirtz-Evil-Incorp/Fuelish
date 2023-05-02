const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const priceBox = document.querySelector('.price-box');
const change = document.querySelector('.change');
const error404 = document.querySelector('.not-found');
const st = document.querySelector('.state-img iframe');
const stu = document.querySelector('.state-img');
const getLoc = document.getElementById("getlocation");
const stdrop = document.querySelector('.search-box select')
var cords=[];
var rslt=[];//state data
var datac=[];//city data of select state
var slent;
var clent;
var corlent;
getLoc.addEventListener('click', event => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(pos => {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;
            console.log(latitude, longitude);
        }, error => {
            console.log("Geolocation request denied by user", error.code);
        });
    } else {
        console.log("Geolocation is not supported.");
    }
});
window.onload=()=>{
  fetch('https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/State.csv')
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
          // preloadImage("images/states/"+obj["City"].toLowerCase()+".jpeg",obj["City"].toLowerCase());
          // document.querySelector('.search-box datalist').innerHTML+="<option>"+obj["City"]+"</option>";
          document.getElementById("state").innerHTML+="<option value='"+obj["State"]+"'>"+obj["State"]+"</option>";
          rslt.push(obj);
        }
      }
      console.log(rslt);
    })
    .catch(error => console.error(error));
  fetch('https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/src/Citycord.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\r\n');
    const headers = rows[0].split(',');
    const result = [];
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
    })
  .catch(error => console.error(error));
}
function getcord(city)
{
  for(j=0;j<corlent-2;j++)
  { 
     if(cords[j]["City"].toLowerCase()==city.toLowerCase())
       {return [cords[j]["lat"],cords[j]["long"]];}
  }
}
function cfunc()
{
var found=0;
      for(i=0;i<clent;i++)
         {                 
            if(datac[i]["City"].toLowerCase()==(city.value).toLowerCase())
              {
                error404.style.display='none';
                priceBox.style.display = '';
                change.style.display = '';
                priceBox.classList.add('fadeIn');
                change.classList.add('fadeIn');
                container.style.height = '590px';
                st.style.display='block';
                var [lat,long]=getcord(datac[i]["City"]);
                var newsrc="https://www.openstreetmap.org/export/embed.html?bbox="+(parseFloat(long)-0.05).toString()+"%2C"+(parseFloat(lat)-0.05).toString()+"%2C"+(parseFloat(long)+0.05).toString()+"%2C"+(parseFloat(lat)+0.05).toString()+"&amp;layer=mapnik";
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
                  ele3.style.color='crimson';
                }
                else if((datac[i]["Change(P)"]).charAt(0)==="-")
                {
                  ele3.style.color='green';
                }
                else
                {
                  ele3.style.color='green';
                }
                ele3.innerText=datac[i]["Change(P)"];
                const ele4=document.getElementById("cd");
                if((datac[i]["Change(D)"]).charAt(0)==="+")
                {
                  ele4.style.color='crimson';
                }
                else if((datac[i]["Change(D)"]).charAt(0)==="-")
                {
                  ele4.style.color='green';
                }
                else
                {
                  ele4.style.color='green';
                }
                ele4.innerText=datac[i]["Change(D)"];
                found=1;
                break;
              }
         }
    if(found==0)
    {
      st.style.display='none';
      switch(city)
        {case "asvin":
          {
            window.open('https://github.com/Asvin1', '_blank');
            break;
          }
          case "aryaman":
          {
            window.open('https://github.com/actuallyaryaman', '_blank');
            break;
          }
          case "adit":
          {
            window.open('https://www.99acres.com/', '_blank');
            break;
          }
          case "manul":
          {
            window.open('https://i.ibb.co/xLyHwcX/Whats-App-Image-2023-04-30-at-1-18-21-PM.jpg', '_blank');
            break;
          }
        }
        //  console.log(error404);
        //  container.style.height='400px'
        //  change.style.display='none';
        //  priceBox.style.display='none';
        //  error404.style.display='block';
        //  error404.classList.add('fadeIn');
         return;
    }
}
function func()
{
  if(state.value=="")
    {return;}
  console.log(state.value);
    var found=0;
      for(i=0;i<slent-2;i++)
         { 
            if(rslt[i]["State"].toLowerCase()==(state.value).toLowerCase())
              {console.log('https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/assets/'+rslt[i]["State"]+'.csv');
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
                      document.getElementById("city").innerHTML+="<option value='"+obj["City"]+"'>"+obj["City"]+"</option>";
                      datac.push(obj);
                    }
                  }
                })
                const ele1=document.getElementById("pp");
                ele1.innerText=rslt[i]["Price(P)"];
                const ele2=document.getElementById("dp");
                ele2.innerText=rslt[i]["Price(D)"];
                const ele3=document.getElementById("cp");
                if((rslt[i]["Change(P)"]).charAt(0)==="+")
                {
                  ele3.style.color='crimson';
                }
                else if((rslt[i]["Change(P)"]).charAt(0)==="-")
                {
                  ele3.style.color='green';
                }
                else
                {
                  ele3.style.color='green';
                }
                ele3.innerText=rslt[i]["Change(P)"];
                const ele4=document.getElementById("cd");
                if((rslt[i]["Change(D)"]).charAt(0)==="+")
                {
                  ele4.style.color='crimson';
                }
                else if((rslt[i]["Change(D)"]).charAt(0)==="-")
                {
                  ele4.style.color='green';
                }
                else
                {
                  ele4.style.color='green';
                }
                ele4.innerText=rslt[i]["Change(D)"];
                found=1;
                break;
              }
         }
    if(found==0)
    {
      st.style.display='none';
      switch(city)
        {case "asvin":
          {
            window.open('https://github.com/Asvin1', '_blank');
            break;
          }
          case "aryaman":
          {
            window.open('https://github.com/actuallyaryaman', '_blank');
            break;
          }
          case "adit":
          {
            window.open('https://www.99acres.com/', '_blank');
            break;
          }
          case "manul":
          {
            window.open('https://i.ibb.co/xLyHwcX/Whats-App-Image-2023-04-30-at-1-18-21-PM.jpg', '_blank');
            break;
          }
        }
        //  console.log(error404);
        //  container.style.height='400px'
        //  change.style.display='none';
        //  priceBox.style.display='none';
        //  error404.style.display='block';
        //  error404.classList.add('fadeIn');
         return;
    }
    
}
document.getElementById('state').addEventListener('change',func);
document.getElementById('city').addEventListener('change', cfunc);
// document.getElementById('sbut').addEventListener('click', func(rslt),false);
// document.getElementById('state').addEventListener('click', func(rslt),false);
// search.addEventListener('click', func(rslt),false );
// document.querySelector('.search-box input').addEventListener('keypress', function (e) {
//   if (e.key === 'Enter') {
//     func();
//   }
// });
