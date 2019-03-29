(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,a){e.exports=a(53)},25:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){},28:function(e,t,a){},29:function(e,t,a){},30:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(14),i=a.n(s),r=(a(24),a(25),a(2)),c=a(3),u=a(5),l=a(4),p=a(6),d=(a(26),a(27),function(){return o.a.createElement("header",null,"React Navigation App")}),m=a(15),h=(a(28),a(29),o.a.createContext({mapLoaded:!1,updateLocation:function(){}})),g=(a(30),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).handlePlaceChanged=function(){var e=a.autocomplete.getPlace();a.context.updateLocation(a.props.inputId,e.geometry.location),a.setState({isDirty:!0})},a.resetField=function(){a.autocompleteInput.current.value="",a.context.updateLocation(a.props.inputId,""),a.setState({isDirty:!1})},a.autocompleteInput=o.a.createRef(),a.autocomplete=null,a.state={isDirty:!1},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(){this.context.mapLoaded&&(this.autocomplete=new window.google.maps.places.Autocomplete(this.autocompleteInput.current,{types:["geocode"]}),this.autocomplete.addListener("place_changed",this.handlePlaceChanged)),this.context.resetPending&&this.resetField()}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("input",{type:"text",ref:this.autocompleteInput,className:"form-control autocomplete-input",id:this.props.inputId,placeholder:"Enter a location"}),this.state.isDirty&&o.a.createElement("span",{className:"cross-icon",onClick:this.resetField},"X"))}}]),t}(n.Component));g.contextType=h;var f=g,b=function(e){return o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:e.inputId},e.label),o.a.createElement(f,{className:"form-control",inputId:e.inputId,mapLoaded:e.mapLoaded}))},y=(a(31),function(e){var t=e.message,a=e.messageType;return t?o.a.createElement("p",{className:"error"===a?"text-red":""},t):null}),v=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(){this.props.resetPending&&(this.myFormRef.reset(),this.props.resetDone())}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"col-xs-12 col-md-4 left-panel"},o.a.createElement("form",{onSubmit:this.props.handleSubmit,ref:function(t){return e.myFormRef=t}},o.a.createElement(b,{inputId:"start",label:"Starting location"}),o.a.createElement(b,{inputId:"drop",label:"Drop-off point"}),o.a.createElement(y,{message:this.props.message,messageType:this.props.messageType}),o.a.createElement("button",{type:"button",className:"btn btn-primary lp-btn",disabled:"Loading..."===this.props.submitBtnLabel,onClick:this.props.handleSubmit},this.props.submitBtnLabel),o.a.createElement("button",{type:"button",className:"btn btn-secondary lp-btn",onClick:this.props.handleReset},"Reset")))}}]),t}(n.Component),w=a(17),S=(a(32),function(e,t){return new window.google.maps.LatLng(e,t)}),O=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).showPosition=function(e){a.directionsService=new window.google.maps.DirectionsService,a.directionsDisplay=new window.google.maps.DirectionsRenderer,a.map=new window.google.maps.Map(document.getElementById("googleMap"),{center:{lat:e.coords.latitude,lng:e.coords.longitude},zoom:12,mapTypeId:"roadmap"}),a.directionsDisplay.setMap(a.map)},a.diaplayRoute=function(){var e=Object(w.a)(a.props.route),t=e.shift(),n=e.pop(),o=e.map(function(e){return{location:S(e[0],e[1]),stopover:!0}});a.directionsService.route({origin:S(t[0],t[1]),destination:S(n[0],n[1]),waypoints:o,optimizeWaypoints:!0,travelMode:"DRIVING"},function(e,t){"OK"===t&&a.directionsDisplay.setDirections(e)})},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.mapLoaded&&!e.mapLoaded&&navigator.geolocation.getCurrentPosition(this.showPosition),this.props.showRoute&&this.diaplayRoute()}},{key:"render",value:function(){return o.a.createElement("div",{className:"col-xs-12 col-md-8"},o.a.createElement("div",{id:"googleMap"}))}}]),t}(n.Component),E=a(16),k={submit:"route",getRoute:"route/{token}"},R=a.n(E).a.create({baseURL:"https://mock-api.dev.lalamove.com"}),j=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).handleChange=function(e,t){a.setState(Object(m.a)({},e,t))},a.getCords=function(e){return[e.lat,e.lng]},a.checkForUnsuccessfulMsg=function(e){switch(e.data.status){case"success":return"";case"failure":return e.data.error;default:return e.data.status}},a.setMessageInState=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";a.setState({message:e,messageType:t,submitBtnLabel:"Re-Submit"})},a.makeRequestForRoute=function(e){R.get(e).then(function(t){if("in progress"===t.data.status)return a.makeRequestForRoute(e);var n=a.checkForUnsuccessfulMsg(t);if(n)a.setMessageInState("Server responded with: "+n,"error");else{var o=t.data,s=o.total_distance,i=o.total_time;a.setMessageInState("total distance: "+s+" & total time: "+i),a.setState({submitBtnLabel:"Submit",showRoute:!0,route:t.data.path})}}).catch(function(e){a.setMessageInState("Something went wrong! Please try again in some time.","error")})},a.makeRequestForToken=function(e,t){R.post(k.submit,{origin:e,destination:t}).then(function(e){var t=e&&e.data&&e.data.token,n=k.getRoute.replace("{token}",t);a.makeRequestForRoute(n)}).catch(function(e){a.setMessageInState("Something went wrong! Please try again in some time.","error")})},a.handleSubmit=function(e){e.preventDefault(),a.setState({submitBtnLabel:"Loading...",message:"",messageType:""});var t=a.state,n=t.start,o=t.drop;if(n&&o){var s=a.getCords(JSON.parse(JSON.stringify(a.state.start))),i=a.getCords(JSON.parse(JSON.stringify(a.state.drop)));a.makeRequestForToken(s,i)}else a.setMessageInState("Both starting point and drop-off location are mandatory!","error")},a.resetDone=function(){a.setState({resetPending:!1})},a.handleReset=function(e){a.setState({start:"",drop:"",message:"",resetPending:!0,submitBtnLabel:"Submit"})},a.initMap=function(){a.setState({mapLoaded:!0})},a.state={start:"",drop:"",message:"",messageType:"",mapLoaded:!1,resetPending:!1,showRoute:!1,route:null,submitBtnLabel:"Submit"},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){window.initMap=this.initMap,window.loadJS("".concat("https://maps.googleapis.com/maps/api/js?key=AIzaSyD2D0r1DXCw-EMAB1xTlc4SFnsN5z7CGx4","&libraries=places&callback=initMap"))}},{key:"render",value:function(){return o.a.createElement("div",{className:"app-body-container"},o.a.createElement("div",{className:"row"},o.a.createElement(h.Provider,{value:{mapLoaded:this.state.mapLoaded,updateLocation:this.handleChange,resetPending:this.state.resetPending}},o.a.createElement(v,Object.assign({handleSubmit:this.handleSubmit,handleReset:this.handleReset,resetDone:this.resetDone},this.state))),o.a.createElement(O,{mapLoaded:this.state.mapLoaded,showRoute:this.state.showRoute,route:this.state.route})))}}]),t}(n.Component),L=(a(52),function(){return o.a.createElement("footer",null,"Designed and Coded by Vishal Gulati - \xa9 2019")}),D=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(d,null),o.a.createElement(j,null),o.a.createElement(L,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[18,1,2]]]);
//# sourceMappingURL=main.0fe29429.chunk.js.map