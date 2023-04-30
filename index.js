const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const priceBox = document.querySelector('.price-box');
const change = document.querySelector('.change');
const error404 = document.querySelector('.not-found');
const st = document.querySelector('.state-img img');
const stu = document.querySelector('.state-img');
function preloadImage(url,name)
{
    var img=new Image();
    img.src=url;
    img.id=name.toLowerCase();
    console.log(img);
    stu.appendChild(img);
}
window.onload=()=>{
  fetch('https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/Data.csv')
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\r\n');
      const headers = rows[0].split(',');
      const result = [];
      lent=rows.length;
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        if (row.length === headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = row[j];
          }
          preloadImage("images/states/"+obj["State"].toLowerCase()+".jpeg",obj["State"].toLowerCase());
          document.querySelector('.search-box datalist').innerHTML+="<option>"+obj["State"]+"</option>";
          result.push(obj);
        }
      }
      rslt=result;
})};

var func=function()
{
  {
    var city = document.querySelector('.search-box input').value;
    if (city == '')
       return;
    city=city.toLowerCase();
    var lent=0;
    var rslt;
    fetch('https://raw.githubusercontent.com/Fuelish/FuelishCLI/main/Data.csv')
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\r\n');
      const headers = rows[0].split(',');
      const result = [];
      lent=rows.length;
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        if (row.length === headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = row[j];
          }
          result.push(obj);
        }
      }
      rslt=result;
    console.log(rslt);
    var found=0;
      for(i=0;i<lent-2;i++)
         { 
            if(rslt[i]["State"].toLowerCase()==city)
              {
                error404.style.display='none';
                for(j=0;j<lent-2;j++)
                {
                  document.getElementById(rslt[j]["State"].toLowerCase()).style.display='none';
                  document.getElementById(rslt[j]["State"].toLowerCase()).classList.remove("fadeIn");
                }
                document.getElementById(city).style.display='block';
                document.getElementById(city).classList.add("fadeIn");
                console.log(document.getElementById("pp"));
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
                  ele3.style.color='#06283D';
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
                  ele4.style.color='#06283D';
                }
                ele4.innerText=rslt[i]["Change(D)"];
                found=1;
                break;
              }
         }
    if(found==0)
    {
      for(j=0;j<lent-2;j++)
      {
        document.getElementById(rslt[j]["State"].toLowerCase()).style.display='none';
        document.getElementById(rslt[j]["State"].toLowerCase()).classList.remove("fadeIn");
      }
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
         console.log(error404);
         container.style.height='400px'
         change.style.display='none';
         priceBox.style.display='none';
         error404.style.display='block';
         error404.classList.add('fadeIn');
         return;
    }
    })
    .catch(error => console.error(error));
           priceBox.style.display = '';
           change.style.display = '';
           priceBox.classList.add('fadeIn');
           change.classList.add('fadeIn');
           container.style.height = '590px';

       }
}
search.addEventListener('click', func,false );
document.querySelector('.search-box input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    func();
  }
});