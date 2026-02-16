// Navigation
const links = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    pages.forEach(p=>p.classList.remove('active'));
    target.classList.add('active');
    links.forEach(l=>l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Dark Mode Toggle
const darkToggle = document.getElementById('darkToggle');
darkToggle.onclick = () => document.body.classList.toggle('dark');

// Prayer Times API
fetch('https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=1')
.then(res=>res.json())
.then(data=>{
  const timings = data.data.timings;
  const container = document.getElementById('prayerTimes');
  container.innerHTML = `
    <div class='prayer-card'>ফজর<br>${timings.Fajr}</div>
    <div class='prayer-card'>যোহর<br>${timings.Dhuhr}</div>
    <div class='prayer-card'>আসর<br>${timings.Asr}</div>
    <div class='prayer-card'>মাগরিব<br>${timings.Maghrib}</div>
    <div class='prayer-card'>এশা<br>${timings.Isha}</div>
  `;
});

// Qibla Direction
function getQibla(lat,lng){
  const kaabaLat = 21.4225*Math.PI/180;
  const kaabaLng = 39.8262*Math.PI/180;
  lat = lat*Math.PI/180;
  lng = lng*Math.PI/180;
  const qibla = Math.atan2(Math.sin(kaabaLng-lng), Math.cos(lat)*Math.tan(kaabaLat)-Math.sin(lat)*Math.cos(kaabaLng-lng));
  return (qibla*180/Math.PI + 360)%360;
}
navigator.geolocation.getCurrentPosition(pos=>{
  const deg = getQibla(pos.coords.latitude,pos.coords.longitude);
  document.getElementById('qiblaDegree').innerText = 'কিবলা দিক: '+deg.toFixed(2)+'°';
  document.getElementById('compass').style.transform = `rotate(${deg}deg)`;
});