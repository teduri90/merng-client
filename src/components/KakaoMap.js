/* global kakao */

import React, { useEffect, useState, useRef, useContext } from "react";
import {APP_KEY} from '../config.js';
import { contextProp } from '../context/ContextProp';

import RestaurantIcon from '@material-ui/icons/Restaurant';
import MarkerPage from '../pages/MarkerPage';

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
  

  console.log(userSelect);

  
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
          
            var bounds = new kakao.maps.LatLngBounds();
            for (var i=0; i<data.length; i++) {
              displayMarker(data[i]);
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            //kakaoMap.setBounds(bounds);
        } 
      }

      function displayMarker(place) {                   
          // 마커를 생성하고 지도에 표시합니다

          var marker2 = new kakao.maps.Marker({
              map: kakaoMap,
              position: new kakao.maps.LatLng(place.y, place.x) 
          });

          setPlaceName22(placeName22.concat(marker2));
          console.log("placename");
          console.log(placeName22);
          
          new kakao.maps.event.addListener(marker2, 'click', function() {
            console.log(place.y, place.x);
            console.log(place);
            setX(place.x);
            setY(place.y)
            setPlaceName33(place.place_name)
            setOpen(true);
          });
      }

      // IF문 종료
  }, [placeName])

  return (
    <>
    <div id="container" style={{width:"100%", minHeight:"300px", height:"100%"}} ref={container} />
    <div style={{marginLeft:"80px"}}>
    </div>
    <MarkerPage open={open} setOpen={setOpen} X={X} Y={Y} placeName33={placeName33} ></MarkerPage>
    
    {/*<div><button onClick={() => console.log(categorySelect)}></button></div>*/}
    </>
  );
};
export default KakaoMaps;