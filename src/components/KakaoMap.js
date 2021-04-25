/* global kakao */

import React, { useEffect, useState, useRef, useContext } from "react";
import {APP_KEY} from '../config.js';
import { contextProp } from '../context/ContextProp';

import RestaurantIcon from '@material-ui/icons/Restaurant';
import MarkerPage from '../pages/MarkerPage';
import { GpsFixed } from "@material-ui/icons";

function KakaoMaps(props) {
  const {loading, error, getMarkers, userSelect, placeName, categorySelect, getUsers, zoomLevel, selectLat, selectLng} = useContext(contextProp);
  const [kakaoMap, setKakaoMap] = useState(null);
  const [userfilter, setUserfilter] = useState("");



  const [markers, setMarkers] = useState([]);
  const [overlays, setOverlays] = useState([]);



  const [placeName22, setPlaceName22] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [X, setX] = useState('');
  const [Y, setY] = useState('');
  const container = useRef();

  const [placeName33, setPlaceName33] = useState([]);
  

  //console.log(userSelect);

  
  useEffect(() => {
    const script = document.createElement("script");
    script.src =`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(selectLat, selectLng);
        const options = {center, level: zoomLevel};
        const map = new kakao.maps.Map(container.current, options);

        //setMapCenter(center);
        
        setKakaoMap(map);
      });
    };
  }, [container]);

  /*
  useEffect(() => {
      const center = new kakao.maps.LatLng(selectLat, selectLng);
      const options = {center, level: zoomLevel};
      const map = new kakao.maps.Map(container.current, options);
        
      setKakaoMap(map);
      
  },[selectLat,selectLng,zoomLevel]);*/


  useEffect(() => {
    if (kakaoMap === null){
      return;
    }
    // IF문 종료
    if(loading) {
      console.log("loading")
    } else if(error){
      console.log("error")
    } else {
              
              /*
              var imageSrc = positions.image; // 마커이미지의 주소입니다    
              var imageSize = new kakao.maps.Size(64, 69);// 마커이미지의 크기입니다
              var imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다
              */
              //var  = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      setMarkers(markers => {
          {markers && markers.forEach(marker => marker.setMap(null))}; // 기존 마커 제거

          if (userSelect.length > 0){
            var markers111 = getMarkers
            .filter(e => userSelect.includes(e.username))
            .filter(e => categorySelect.includes(e.category))
            .map((positions) => 
                new kakao.maps.Marker({
                map: kakaoMap, 
                position: new kakao.maps.LatLng(positions.lat, positions.lng),
                image: new kakao.maps.MarkerImage(positions.image, new kakao.maps.Size(50, 50), {offset: new kakao.maps.Point(27, 69)}),
                clickable: true
                })
            ); // 신규 마커 추가
            return markers111;
           } // 신규 마커 추가
          else {
            var markers111 = getMarkers.filter(e => categorySelect.includes(e.category)).map((position) => 
                new kakao.maps.Marker({
                map: kakaoMap, 
                position: new kakao.maps.LatLng(position.lat, position.lng),
                image: new kakao.maps.MarkerImage(position.image, new kakao.maps.Size(50, 50), {offset: new kakao.maps.Point(27, 69)}),
                clickable: true
              })
            );// 신규 마커 추가,
            return markers111;
          }

        });
        
      setOverlays(overlays => {
          {overlays && overlays.forEach(overlay => overlay.setMap(null))};

          if (userSelect.length > 0){
            var markers222 = getMarkers
            .filter(e => userSelect.includes(e.username))
            .filter(e => categorySelect.includes(e.category))
            .map((e) => new kakao.maps.CustomOverlay({
                map: kakaoMap,
                position: new kakao.maps.LatLng(e.lat, e.lng),
                content: '<div class="customoverlay">' +
                '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
                `    <span><span class="title">${e.body}</span>` +
                '  </a>' +
                '</div>',
                yAnchor: 1 
              }));
            return markers222;
        } else {
          var markers222 = getMarkers.filter(e => categorySelect.includes(e.category)).map((e) => new kakao.maps.CustomOverlay({
              map: kakaoMap,
              position: new kakao.maps.LatLng(e.lat, e.lng),
              content: '<div class="customoverlay">' +
              '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
              `    <span class="title">${e.body}</span>`+
              '  </a>' +
              '</div>',
              yAnchor: 1 
          }));
          return markers222; // 신규 마커 추가
          }
        } 
      )                   
    }
  },[getMarkers, userSelect, categorySelect, getUsers, kakaoMap])
        // 장소 검색 객체를 생성합니다

  useEffect(()=> {
    if (kakaoMap === null){
      return;
    }
    kakaoMap.setLevel(zoomLevel);
    kakaoMap.setCenter(new kakao.maps.LatLng(selectLat, selectLng));
  },[zoomLevel,selectLat,selectLng])

  useEffect(() => { 
    if(kakaoMap === null){
      return;
    }
    
    
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(placeName, placesSearchCB); 

    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            
            if(placeName22.length > 0) {
              placeName22.forEach(e => e.setMap(null));
              //alert("abcd");
            }

            setPlaceName22([]);

            console.log("ABCD");
            console.log(data);
          
            var bounds = new kakao.maps.LatLngBounds();
            for (var i=0; i<data.length; i++) {
              displayMarker(data[i]);
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            //kakaoMap.setBounds(bounds);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

          alert('검색 결과가 존재하지 않습니다.');
          return;
  
      } else if (status === kakao.maps.services.Status.ERROR) {
  
          alert('검색 결과 중 오류가 발생했습니다.');
          return;
  
      }
      }

      function displayMarker(place) {                   
          // 마커를 생성하고 지도에 표시합니다

          var marker2 = new kakao.maps.Marker({
              map: kakaoMap,
              position: new kakao.maps.LatLng(place.y, place.x) 
          });

          setPlaceName22(placeName22.concat(marker2));
          //console.log("placename");
          //console.log(placeName22);
          
          new kakao.maps.event.addListener(marker2, 'click', function() {
            console.log(place.y, place.x);
            console.log(place);
            setX(place.x);
            setY(place.y)
            setPlaceName33(place.place_name)
            setOpen(true);
          });
      }

      function getCurrentLocation(){
      if ('geolocation' in navigator) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합 
        니다
                message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
            // 마커와 인포윈도우를 표시합니다
            displayMarker2(locPosition);
            
          });
    
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
             message = 'geolocation을 사용할수 없어요..'
        displayMarker2(locPosition, message);
    }};

    function displayMarker2(locPosition, message) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({  
          map: kakaoMap, 
          position: locPosition
      }); 
      
      var iwContent = message, // 인포윈도우에 표시할 내용
          iwRemoveable = true;
  
      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
          content : iwContent,
          removable : iwRemoveable
      });
      
      // 인포윈도우를 마커위에 표시합니다 
      infowindow.open(kakaoMap, marker);
      
      // 지도 중심좌표를 접속위치로 변경합니다
      kakaoMap.setCenter(locPosition);      
  }    
    

      // IF문 종료
  }, [placeName])

  return (
    <>
    <div id="container" style={{borderRadius:"10px", marginTop:"5px", border:"1px solid #3f51b5",width:"100%", minHeight:"300px", height:"100%"}} ref={container} />
    <div style={{position:"absolute", zIndex:"500", top:"180px", left:"90px",}}><button>현재 위치 확인</button></div>
    <div style={{marginLeft:"80px"}}>
    </div>
    <MarkerPage open={open} setOpen={setOpen} X={X} Y={Y} placeName33={placeName33} ></MarkerPage>
    
    {/*<div><button onClick={() => console.log(categorySelect)}></button></div>*/}
    </>
  );
};
export default KakaoMaps;