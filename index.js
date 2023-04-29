const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const priceBox = document.querySelector('.price-box');
const change = document.querySelector('.change');
const error404 = document.querySelector('.not-found');
const st = document.querySelector('.state-img img');
function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}
window.onload=()=>{
  fetch('https://raw.githubusercontent.com/Fuelish/FuelishWeb/main/Data.csv')
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
          preloadImage("images/"+obj["State"]+".jpeg");
          document.querySelector('.search-box datalist').innerHTML+="<option>"+obj["State"]+"</option>";
          result.push(obj);
        }
      }
      rslt=result;
    console.log(rslt);
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
    fetch('https://raw.githubusercontent.com/Fuelish/FuelishWeb/main/Data.csv')
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
                console.log(rslt[i]);
                st.src="images/"+city+".jpeg";
                st.style.display='block';
                st.classList.add("fadeIn");
                console.log(document.getElementById("pp"));
                const ele1=document.getElementById("pp");
                ele1.innerText=rslt[i]["Price(P)"];
                const ele2=document.getElementById("dp");
                ele2.innerText=rslt[i]["Price(D)"];
                const ele3=document.getElementById("cp");
                ele3.innerText=rslt[i]["Change(P)"];
                const ele4=document.getElementById("cd");
                ele4.innerText=rslt[i]["Change(D)"];
                found=1;
                break;
              }
         }
    if(found==0)
    {
        st.style.display='none';
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