(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,a){e.exports=a(54)},26:function(e,t,a){},27:function(e,t,a){},28:function(e,t,a){},29:function(e,t,a){},30:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},53:function(e,t,a){},54:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(16),i=a.n(s),r=(a(25),a(26),a(27),a(28),function(){return o.a.createElement("header",null,"React Navigation App")}),c=a(9),u=a(7),l=a(2),p=a(3),d=a(5),m=a(4),h=a(6),f=(a(29),a(30),o.a.createContext({mapLoaded:!1,updateLocation:function(){}})),g=(a(31),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).handlePlaceChanged=function(){var e=a.autocomplete.getPlace();e&&e.geometry&&(a.context.updateLocation(a.props.inputId,e.geometry.location),a.setState({isDirty:!0}))},a.resetField=function(){a.autocompleteInput.current.value="",a.context.updateLocation(a.props.inputId,""),a.setState({isDirty:!1})},a.autocompleteInput=o.a.createRef(),a.autocomplete=null,a.state={isDirty:!1},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidUpdate",value:function(){this.context.mapLoaded&&!this.autocomplete&&(this.autocomplete=new window.google.maps.places.Autocomplete(this.autocompleteInput.current,{types:["geocode"]}),this.autocomplete.addListener("place_changed",this.handlePlaceChanged)),this.context.resetPending&&this.resetField()}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("input",{type:"text",ref:this.autocompleteInput,className:"form-control autocomplete-input",id:this.props.inputId,placeholder:"Enter a location"}),this.state.isDirty&&o.a.createElement("span",{className:"cross-icon",onClick:this.resetField},"X"))}}]),t}(n.Component));g.contextType=f;var b=g,v=function(e){return o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:e.inputId},e.label),o.a.createElement(b,{className:"form-control",inputId:e.inputId,mapLoaded:e.mapLoaded}))},y=(a(32),function(e){var t=e.message,a=e.messageType;return t?o.a.createElement("p",{className:"message-container "+("error"===a?"text-red":"")},t):null}),w=function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidUpdate",value:function(){this.props.resetPending&&(this.myFormRef.reset(),this.props.resetDone())}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"col-xs-12 col-md-4 left-panel"},o.a.createElement("form",{onSubmit:this.props.handleSubmit,ref:function(t){return e.myFormRef=t}},o.a.createElement(v,{inputId:"start",label:"Starting location"}),o.a.createElement(v,{inputId:"drop",label:"Drop-off point"}),o.a.createElement(y,{message:this.props.message,messageType:this.props.messageType}),o.a.createElement("button",{type:"button",className:"btn btn-primary lp-btn",disabled:"Loading..."===this.props.submitBtnLabel,onClick:this.props.handleSubmit},this.props.submitBtnLabel),o.a.createElement("button",{type:"button",className:"btn btn-secondary lp-btn",onClick:this.props.handleReset},"Reset")))}}]),t}(n.Component),E=a(18),R=(a(33),function(e,t){return new window.google.maps.LatLng(e,t)}),S=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).showDefaultPosition=function(){a.directionsService=new window.google.maps.DirectionsService,a.directionsDisplay=new window.google.maps.DirectionsRenderer,a.map=new window.google.maps.Map(a.mapWrapper,{center:{lat:51.509865,lng:-.118092},zoom:12,mapTypeId:"roadmap"})},a.diaplayRoute=function(){a.directionsDisplay.setMap(a.map);var e=Object(E.a)(a.props.route),t=e.shift(),n=e.pop(),o=e.map(function(e){return{location:R(e[0],e[1]),stopover:!0}});a.directionsService.route({origin:R(t[0],t[1]),destination:R(n[0],n[1]),waypoints:o,optimizeWaypoints:!0,travelMode:"DRIVING"},function(e,t){"OK"===t&&a.directionsDisplay.setDirections(e)})},a.resetMap=function(){a.directionsDisplay.setMap(null)},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.mapLoaded&&!e.mapLoaded&&this.showDefaultPosition(),this.props.showRoute?this.diaplayRoute():this.resetMap()}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"col-xs-12 col-md-8"},o.a.createElement("div",{id:"googleMap",ref:function(t){return e.mapWrapper=t}}))}}]),t}(n.Component),k={start:"",drop:"",message:"",messageType:"",mapLoaded:!1,resetPending:!1,showRoute:!1,route:null,submitBtnLabel:"Submit"},O={serviceError:"Something went wrong! Please try again in some time.",uiValidationError:"Both starting location and drop-off point are mandatory!"},L="in progress",D=a(17),j={submit:"route",getRoute:"route/{token}"},I=a.n(D).a.create({baseURL:"https://mock-api.dev.lalamove.com"}),M={getReq:function(e){return I.get(e)},postReq:function(e,t){return I.post(e,t)}},N=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e,t){a.setState(Object(u.a)({},e,t))},a.getCords=function(e){return[e.lat,e.lng]},a.checkForUnsuccessfulMsg=function(e){switch(e.data.status){case"success":return"";case"failure":return e.data.error;default:return e.data.status}},a.setMessageInState=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";a.setState({message:e,messageType:t,submitBtnLabel:"Re-Submit"})},a.makeRequestForRoute=function(e){M.getReq(e).then(function(t){if(t.data.status===L)return a.makeRequestForRoute(e);var n=a.checkForUnsuccessfulMsg(t);if(n)a.setMessageInState(n,"error");else{var o=t.data,s=o.total_distance,i=o.total_time;a.setMessageInState("total distance: "+s+" \ntotal time: "+i),a.setState({submitBtnLabel:"Re-Submit",showRoute:!0,route:t.data.path})}}).catch(function(e){a.setMessageInState(O.serviceError,"error")})},a.makeRequestForToken=function(e,t){M.postReq(j.submit,{origin:e,destination:t}).then(function(e){var t=e&&e.data&&e.data.token,n=j.getRoute.replace("{token}",t);a.makeRequestForRoute(n)}).catch(function(e){a.setMessageInState(O.serviceError,"error")})},a.handleSubmit=function(e){e.preventDefault(),a.setState({submitBtnLabel:"Loading...",message:"",messageType:"",showRoute:!1,route:null});var t=a.state,n=t.start,o=t.drop;if(n&&o){var s=a.getCords(JSON.parse(JSON.stringify(n))),i=a.getCords(JSON.parse(JSON.stringify(o)));a.makeRequestForToken(s,i)}else a.setMessageInState(O.uiValidationError,"error")},a.resetDone=function(){a.setState({resetPending:!1})},a.handleReset=function(e){a.setState(Object(c.a)({},k,{resetPending:!0,mapLoaded:!0}))},a.initMap=function(){a.setState({mapLoaded:!0})},a.state=Object(c.a)({},k),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){window.initMap=this.initMap,window.loadJS("".concat("https://maps.googleapis.com/maps/api/js?key=AIzaSyD2D0r1DXCw-EMAB1xTlc4SFnsN5z7CGx4","&libraries=places&callback=initMap"))}},{key:"render",value:function(){return o.a.createElement("div",{className:"app-body-container"},o.a.createElement("div",{className:"row"},o.a.createElement(f.Provider,{value:{mapLoaded:this.state.mapLoaded,updateLocation:this.handleChange,resetPending:this.state.resetPending}},o.a.createElement(w,Object.assign({handleSubmit:this.handleSubmit,handleReset:this.handleReset,resetDone:this.resetDone},this.state))),o.a.createElement(S,{mapLoaded:this.state.mapLoaded,showRoute:this.state.showRoute,resetPending:this.state.resetPending,route:this.state.route})))}}]),t}(n.Component),C=(a(53),function(){return o.a.createElement("footer",null,"Designed and Coded by Vishal Gulati - \xa9 2019")}),P=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(r,null),o.a.createElement(N,null),o.a.createElement(C,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[19,1,2]]]);
//# sourceMappingURL=main.7e2d4e4c.chunk.js.map