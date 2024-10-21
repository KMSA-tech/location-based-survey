// 지정된 장소의 위도와 경도 (새 좌표 37.511805, 127.034702)
const targetLatitude = 37.511805;
const targetLongitude = 127.034702;

// 허용 반경 (미터 단위)
const allowedRadius = 20; // 20미터

const checkLocationButton = document.getElementById('checkLocation');
const message = document.getElementById('message');

checkLocationButton.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
    message.textContent = "위치 정보를 확인하는 중입니다...";
  } else {
    message.textContent = "이 브라우저에서는 위치 정보 기능을 지원하지 않습니다.";
  }
});

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const distance = getDistanceFromLatLonInMeters(latitude, longitude, targetLatitude, targetLongitude);

  if (distance <= allowedRadius) {
    message.textContent = "위치 확인 완료. 설문조사 페이지로 이동합니다.";
    // 설문조사 페이지로 리다이렉트
    window.location.href = "https://forms.gle/PmxqjNMQapr4rotTA"; // 구글 폼 링크로 이동
  } else {
    message.textContent = "지정된 위치 내에서만 설문조사에 참여할 수 있습니다.";
  }
}

function error() {
  message.textContent = "위치 정보를 가져올 수 없습니다. 브라우저 설정을 확인하세요.";
}

// 두 좌표 사이의 거리를 계산하는 함수
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const R = 6371000; // 지구 반지름 (미터 단위)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}
