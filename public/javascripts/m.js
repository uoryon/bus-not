window.onload = function(){
  alert('now');
  window.map = new BMap.Map('lmap');
  alert('geo');
  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      alert('dingweichenggong');
      var mk = new BMap.Marker(r.point);
      map.addOverlay(mk);
      map.centerAndZoom(r.point, 18);
      window.nowPoint = r.point;
    }
    else {
      alert('failed'+this.getStatus());
    }        
  },{enableHighAccuracy: true})
  
  $('#ok').click(function(e){
    getBusLine($('#content').value());
  })
}

function getBusLine(key){
  var bl = new BMap.BusLineSearch(map, {
    renderOptions:{map:map},
    onGetBusListComplete:function(result){
      if(result === undefined){
        alert('沒有結果');
      }
      window.iNeed = result.Nm;
      var node = '<div id="kakunin"><p><label>请确认公交车</label>'
      node += '<select>'
      for(var i = 0; i < iNeed.length; i++){
        node+='<option value="'+i+'">' +iNeed[i].name+ '</option>';
      }
      node+='</select><input id="SecPart" type="button" value="确认"></p></div>';
      $('.input').after(node);
      $('#SecPart').click(function(e){
        var ma = result.getBusListItem($('#kakunin select').value());
        bl.getBusLine(ma);
      })
    },
    //onGetBusLineComplete:function(e){
    //  console.log(e.getNumBusStations());
    //  var target = map.getOverlays();
    //  for(var i = 0; i < target.length; i++){
    //    target[i].addEventListener('mouseover',function(e){
    //      alert(e);
    //    })
    //  },
    onMarkersSet:function(e){
      for(var i = 0; i < e.length; i++){
        e[i].addEventListener('click', function(e){
          if(confirm('你是想去'+e.currentTarget.or+'吗？')){
            var mo = setInterval(function(){
              var geo = new BMap.Geolocation();
              geo.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                  var dis = map.getDistance(e.point, r.point);
                  if(dis<500){
                    clearInterval(mo);
                    alert('还差500米了');
                    console.log('还差500米了');
                    if(window.navigator.vibrate) window.navigator.vibrate([2000, 1000, 2000, 1000, 2000, 1000, 2000]);
                  }
                }
              }, {enableHighAccuracy:true})
            }, 4000)
          }
        })
      }
    }
  });
  bl.getBusList(key);
}

function createMap(position){
    AfterWork();
}

function AfterWork(){
  nowMarker = new BMap.Marker(nowPoint, {title:'這是目前您的位置'});
  map.addOverlay(nowMarker);
}


function goError(Content){//只接受純文本
  if(Content.message) alert(Content);
  else if(Content) alert(Content);
  else alert('您沒有允許我獲取地理信息。')
}
