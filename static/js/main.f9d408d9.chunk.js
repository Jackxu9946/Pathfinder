(this.webpackJsonpPathfinder=this.webpackJsonpPathfinder||[]).push([[0],{24:function(t,e,i){t.exports=i(38)},29:function(t,e,i){},30:function(t,e,i){},31:function(t,e,i){},32:function(t,e,i){},38:function(t,e,i){"use strict";i.r(e);var a=i(0),s=i.n(a),n=i(18),o=i.n(n),r=(i(29),i(30),i(19)),l=i(6),c=i(7),d=i(10),u=i(8),h=i(4),v=i(9),m=(i(31),function(t){function e(t){var i;return Object(l.a)(this,e),(i=Object(d.a)(this,Object(u.a)(e).call(this,t))).state={},i}return Object(v.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this.props,e=t.isFinish,i=t.isStart,a=t.isAnimated,n=t.row,o=t.col,r=t.isWall,l=t.onMouseDown,c=t.onMouseEnter,d=t.onMouseUp,u=t.isShortestPathNode,h=t.instantAnimation,v=t.onMouseOver,m=t.nodeWeight,f=e?"node-finish":i?"node-start":u?"node-shortest-path":a?"node-visited":r?"node-wall":1!==m?"node-weight":"";return!h||i||e||"node-shortest-path"!==f&&"node-visited"!==f||(f+="-instant-animation"),s.a.createElement("div",{id:"node-".concat(n,"-").concat(o),className:"node ".concat(f),onMouseDown:function(){return l(n,o)},onMouseEnter:function(){return c(n,o)},onMouseOver:function(){return v(n,o)},onMouseUp:function(){return d(n,o)}})}}]),e}(a.Component));i(32);function f(t,e,i){e.row,e.col;var a=i.row,s=i.col,n=[],o=[];for(null!=t&&null!=e&&n.push(e);n.length>0;){var r=n.shift(),l=r.row,c=r.col;if(o.push(r),r.isVisited=!0,l===a&&c===s)return o;if(!1===r.isTop){var d=t[l-1][c];!1!==d.isVisited||d.isWall||(n.push(d),d.isVisited=!0)}if(!1===r.isBottom){var u=t[l+1][c];!1!==u.isVisited||u.isWall||(n.push(u),u.isVisited=!0)}if(!1===r.isLeft){var h=t[l][c-1];!1!==h.isVisited||h.isWall||(n.push(h),h.isVisited=!0)}if(!1===r.isRight){var v=t[l][c+1];!1!==v.isVisited||v.isWall||(n.push(v),v.isVisited=!0)}}return o}function g(t,e,i){e.row,e.col;var a=i.row,s=i.col,n=[],o=[];for(null!=t&&null!=e&&n.push(e),console.log(n);n.length>0;){var r=n.pop();if(o.push(r),!1===r.isVisited){r.isVisited=!0;var l=r.row,c=r.col;if(l===a&&c===s)return o;if(!1===r.isTop){var d=t[l-1][c];!1!==d.isVisited||d.isWall||n.push(d)}if(!1===r.isBottom){var u=t[l+1][c];!1!==u.isVisited||u.isWall||n.push(u)}if(!1===r.isLeft){var h=t[l][c-1];!1!==h.isVisited||h.isWall||n.push(h)}if(!1===r.isRight){var v=t[l][c+1];!1!==v.isVisited||v.isWall||n.push(v)}}}return o}function S(t,e,i){e.row,e.col,i.row,i.col;var a=t.length*t[0].length,s=[];for(null!=t&&null!=e&&[].push(e);a>0;){var n=p(t);if(n.length>0){var o=t[n[0]][n[1]],r=o.distance,l=n[0],c=n[1];if(!o.isWall){if(!o.isTop){var d=t[l-1][c];if(!d.isWall){var u=d.distance,h=r+d.nodeWeight;h<u&&(d.distance=h,d.previous=[l,c])}}if(!o.isBottom){var v=t[l+1][c];if(!v.isWall){var m=v.distance,f=r+v.nodeWeight;f<m&&(v.distance=f,v.previous=[l,c])}}if(!o.isLeft){var g=t[l][c-1];if(!g.isWall){var S=g.distance,N=r+g.nodeWeight;N<S&&(g.distance=N,g.previous=[l,c])}}if(!o.isRight){var W=t[l][c+1];if(!W.isWall){var E=W.distance,w=r+W.nodeWeight;w<E&&(W.distance=w,W.previous=[l,c])}}s.push(o),o.isVisited=!0}}a-=1}return console.log("finished the loop"),console.log(t),s}function p(t){for(var e=99999999999,i=[],a=0;a<t.length;a++)for(var s=t[a],n=0;n<s.length;n++){var o=s[n];if(!o.isVisited&&!o.isWall){var r=o.distance;r<e&&(e=r,i=[o.row,o.col])}}return console.log("current smallest distance in grid is "+e),console.log("The coordinate is "+i),i}function N(t,e,i){var a=e.row,s=e.col,n=i,o=[],r=i.row,l=i.col;if(!i.isTop){var c=t[r-1][l],d=c.distance+1;d<i.distance&&(i.distance=d,i.previous=[c.row,c.col])}if(!i.isBottom){var u=t[r+1][l],h=u.distance+1;h<i.distance&&(i.distance=h,i.previous=[u.row,u.col])}if(!i.isLeft){var v=t[r][l-1],m=v.distance+1;m<i.distance&&(i.distance=m,i.previous=[v.row,v.col])}if(!i.isRight){var f=t[r][l+1],g=f.distance+1;g<i.distance&&(i.distance=g,i.previous=[f.row,f.col])}for(;null!=n;){if(99999999===n.distance)return"No path exist";var S=n.row,p=n.col;if(S===a&&p===s)return o;var N=n.previous;n=t[N[0]][N[1]],o.push(n)}return o}function W(t,e,i){e.row,e.col,i.row,i.col;var a=t.length*t[0].length,s=[];for(null!=t&&null!=e&&[].push(e);a>0;){var n=E(t);if(n.length>0){var o=t[n[0]][n[1]],r=o.distance,l=n[0],c=n[1];if(!o.isWall){if(!o.isTop){var d=t[l-1][c];if(!d.isWall){var u=d.distance,h=r+d.nodeWeight;h<u&&(d.distance=h,d.previous=[l,c]);var v=w(d,i);v<d.distanceSum&&(d.distanceSum=v)}}if(!o.isBottom){var m=t[l+1][c];if(!m.isWall){var f=m.distance,g=r+m.nodeWeight;g<f&&(m.distance=g,m.previous=[l,c]);var S=w(m,i);S<m.distanceSum&&(m.distanceSum=S)}}if(!o.isLeft){var p=t[l][c-1];if(!p.isWall){var N=p.distance,W=r+p.nodeWeight;W<N&&(p.distance=W,p.previous=[l,c])}var b=w(p,i);b<p.distanceSum&&(p.distanceSum=b)}if(!o.isRight){var A=t[l][c+1];if(!A.isWall){var y=A.distance,k=r+A.nodeWeight;k<y&&(A.distance=k,A.previous=[l,c])}var O=w(A,i);O<A.distanceSum&&(A.distanceSum=O)}s.push(o),o.isVisited=!0}}a-=1}return console.log("finished the loop"),console.log(t),s}function E(t){for(var e=99999999999,i=[],a=0;a<t.length;a++)for(var s=t[a],n=0;n<s.length;n++){var o=s[n];if(!o.isVisited&&!o.isWall){var r=o.distanceSum;r<e&&(e=r,i=[o.row,o.col])}}return i}function w(t,e){return Math.abs(t.row-e.row)+Math.abs(t.col-e.col)}i(16);var b=i(40);function A(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function y(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?A(i,!0).forEach((function(e){Object(r.a)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):A(i).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var k=0,O=0,V=3,j=0,F=25,P=function(t){function e(t){var i;return Object(l.a)(this,e),(i=Object(d.a)(this,Object(u.a)(e).call(this,t))).state={nodes:[],mousePressed:!1,algorithm:"BFS",movingStartNode:!1,previousStartNode:[k,O],movingEndNode:!1,previousEndNode:[V,j],currentStartNode:[k,O],currentEndNode:[V,j],alreadyVisualized:!1,inAnimation:!1,addingWeight:!1},i.selectAlgorithm=i.selectAlgorithm.bind(Object(h.a)(i)),i.visualizeDFS=i.visualizeDFS.bind(Object(h.a)(i)),i.visualizeBFS=i.visualizeBFS.bind(Object(h.a)(i)),i.setAddingWeight=i.setAddingWeight.bind(Object(h.a)(i)),i.instantNonAnimation=i.instantNonAnimation.bind(Object(h.a)(i)),i}return Object(v.a)(e,t),Object(c.a)(e,[{key:"setAddingWeight",value:function(){this.setState({addingWeight:!this.state.addingWeight})}},{key:"componentDidMount",value:function(){for(var t=this.state,e=t.currentStartNode,i=t.currentEndNode,a=[],s=0;s<10;s++){for(var n=[],o=0;o<10;o++){var r={row:s,col:o,isStart:s===e[0]&&o===e[1],isFinish:s===i[0]&&o===i[1],isTop:0===s,isBottom:9===s,isLeft:0===o,isRight:9===o,isVisited:!1,isAnimated:!1,isWall:!1,distance:s===e[0]&&o===e[1]?0:99999999,previous:[null,null],isShortestPathNode:!1,instantAnimation:!1,nodeWeight:1,distanceSum:s===e[0]&&o===e[1]?0:99999999};n.push(r)}a.push(n)}this.setState({nodes:a})}},{key:"handleMouseDown",value:function(t,e){var i=this.state.mousePressed;this.state.nodes[t][e].isStart?this.setState({movingStartNode:!0,previousStartNode:[t,e]}):this.state.nodes[t][e].isFinish?this.setState({movingEndNode:!0,previousEndNode:[t,e]}):this.setState({mousePressed:!i})}},{key:"handleMouseUp",value:function(t,e){var i=this.state;i.previousStartNode,i.previousEndNode;this.setState({mousePressed:!1,movingStartNode:!1,movingEndNode:!1})}},{key:"handleMouseOver",value:function(t,e){var i=this,a=this.state,s=a.previousStartNode,n=a.previousEndNode;if(this.state.movingStartNode){var o=this.state.nodes.slice(),r=y({},this.state.nodes[t][e],{isStart:!0,distance:0}),l=y({},this.state.nodes[s[0]][s[1]],{isStart:!1,distance:99999999});o[t][e]=r,o[s[0]][s[1]]=l,this.setState({nodes:o,currentStartNode:[r.row,r.col],previousStartNode:[r.row,r.col]}),this.clearBoard(),"Djikstra"!==this.state.algorithm&&"AStar"!==this.state.algorithm||!this.state.alreadyVisualized?"DFS"!==this.state.algorithm&&"BFS"!==this.state.algorithm||!this.state.alreadyVisualized||this.instantNonAnimation():setTimeout((function(){i.instantAnimationWithShortestPath()}),0)}else if(this.state.movingEndNode){var c=this.state.nodes.slice(),d=y({},this.state.nodes[t][e],{isFinish:!0}),u=y({},this.state.nodes[n[0]][n[1]],{isFinish:!1});c[t][e]=d,c[n[0]][n[1]]=u,this.setState({nodes:c,currentEndNode:[d.row,d.col],previousEndNode:[d.row,d.col]}),this.clearBoard(),"Djikstra"!==this.state.algorithm&&"AStar"!==this.state.algorithm||!this.state.alreadyVisualized?"DFS"!==this.state.algorithm&&"BFS"!==this.state.algorithm||!this.state.alreadyVisualized||this.instantNonAnimation():setTimeout((function(){i.instantAnimationWithShortestPath()}),0)}}},{key:"handleMouseEnter",value:function(t,e){if(this.state.mousePressed)if(this.state.addingWeight){if("Djikstra"===this.state.algorithm){var i=this.makeNewGridWithWeight(t,e);this.setState({nodes:i})}}else{var a=this.makeNewGridWithWall(t,e);this.setState({nodes:a})}}},{key:"makeNewGridWithWeight",value:function(t,e){var i=this.state.nodes.slice(),a=this.state.nodes[t][e];if(!a.isWall){var s=y({},a,{nodeWeight:1===a.nodeWeight?10:1});i[t][e]=s}return i}},{key:"makeNewGridWithWall",value:function(t,e){var i=this.state.nodes.slice(),a=this.state.nodes[t][e],s=y({},a,{isWall:!a.isWall});return i[t][e]=s,i}},{key:"visualizeBFS",value:function(){var t=this,e=this.state,i=e.nodes,a=e.currentStartNode,s=e.currentEndNode,n=f(i,i[a[0]][a[1]],i[s[0]][s[1]]);this.animate(n),setTimeout((function(){t.setState({alreadyVisualized:!0})}),F*(n.length+10))}},{key:"visualizeDFS",value:function(){var t=this,e=this.state,i=e.nodes,a=e.currentStartNode,s=e.currentEndNode,n=g(i,i[a[0]][a[1]],i[s[0]][s[1]]);this.animate(n),setTimeout((function(){t.setState({alreadyVisualized:!0})}),F*(n.length+10))}},{key:"visualizeDjikstra",value:function(){var t=this,e=this.state,i=e.nodes,a=(e.initialAnimationFinished,e.currentStartNode),s=e.currentEndNode,n=i[a[0]][a[1]],o=i[s[0]][s[1]],r=S(i,n,o),l=this.animate(r)+35;this.setState({inAnimation:!0});var c=N(i,n,o);if("No path exist"!==c){c=c.reverse(),console.log(i),this.animateShortestPath(c,l,!0);var d=c.length+l;setTimeout((function(){t.setState({alreadyVisualized:!0,inAnimation:!1})}),F*(d+10))}else console.log("No path exist")}},{key:"visualizeAStar",value:function(){var t=this,e=this.state,i=e.nodes,a=(e.initialAnimationFinished,e.currentStartNode),s=e.currentEndNode,n=i[a[0]][a[1]],o=i[s[0]][s[1]],r=W(i,n,o),l=this.animate(r)+35;this.setState({inAnimation:!0});var c=N(i,n,o);if("No path exist"!==c){c=c.reverse(),console.log(i),this.animateShortestPath(c,l,!0);var d=c.length+l;setTimeout((function(){t.setState({alreadyVisualized:!0,inAnimation:!1})}),F*(d+10))}else console.log("No path exist")}},{key:"animateShortestPath",value:function(t,e,i){var a=this,s=this.state.nodes.slice();if(i)for(var n=function(i){var n=t[i],o=y({},n,{isShortestPathNode:!0});setTimeout((function(){s[n.row][n.col]=o,a.setState({nodes:s})}),F*(i+e))},o=0;o<t.length;o++)n(o)}},{key:"instantNonAnimation",value:function(){var t,e=this.state,i=e.nodes,a=e.currentStartNode,s=e.currentEndNode,n=i[a[0]][a[1]],o=i[s[0]][s[1]];"BFS"===this.state.algorithm?t=f(i,n,o):"DFS"===this.state.algorithm&&(t=g(i,n,o));for(var r=this.state.nodes.slice(),l=0;l<t.length;l++){var c=t[l];this.state.currentEndNode;if(1===c.nodeWeight){var d=y({},c,{isAnimated:!0});r[c.row][c.col]=d}}this.setState({nodes:r})}},{key:"animate",value:function(t){var e=this;this.setState({inAnimation:!0});for(var i=function(i){var a=t[i],s=e.state.currentEndNode;if(a.row===s[0]&&a.col===s[1])return setTimeout((function(){e.setState({inAnimation:!1})}),(i+20)*F),{v:i};1===a.nodeWeight&&setTimeout((function(){var t=e.state.nodes.slice(),i=y({},a,{isAnimated:!0});t[a.row][a.col]=i,e.setState({nodes:t})}),F*i)},a=0;a<t.length;a++){var s=i(a);if("object"===typeof s)return s.v}}},{key:"instantAnimationWithShortestPath",value:function(){var t,e=this.state,i=e.nodes,a=(e.initialAnimationFinished,e.currentStartNode),s=e.currentEndNode,n=e.algorithm,o=i[a[0]][a[1]],r=i[s[0]][s[1]];"Djikstra"===n?t=S(i,o,r):"AStar"===n&&(t=W(i,o,r));for(var l=this.state.nodes.slice(),c=0;c<t.length;c++){var d=t[c],u=this.state.currentEndNode;if(d.row===u[0]&&d.col===u[1])break;var h=y({},d,{isAnimated:!0});l[d.row][d.col]=h}var v=N(i,o,r);if("No path exist"!==v){v=v.reverse();for(var m=0;m<v.length;m++){var f=y({},v[m],{isShortestPathNode:!0});l[f.row][f.col]=f}this.setState({nodes:l})}else console.log("No path exist")}},{key:"clearBoard",value:function(t){var e=this.state,i=e.nodes,a=(e.currentStartNode,e.currentEndNode,e.inAnimation),s=this.state.nodes.slice();if(!a){for(var n=0;n<i.length;n++)for(var o=i[n],r=0;r<o.length;r++){var l=o[r];l.isStart?(l.isAnimated=!1,l.isVisited=!1,l.isShortestPathNode=!1,l.distance=0,l.distanceSum=0,s[n][r]=l):(l.isAnimated=!1,l.isVisited=!1,l.isShortestPathNode=!1,l.distance=99999999,l.distanceSum=99999999,s[n][r]=l)}console.log("After clearing board"),this.setState({nodes:s}),t&&this.setState({alreadyVisualized:!1})}}},{key:"clearWall",value:function(){var t=this.state,e=t.nodes;if(!t.inAnimation){for(var i=this.state.nodes.slice(),a=0;a<e.length;a++)for(var s=e[a],n=0;n<s.length;n++){var o=s[n];o.isWall=!1,o.nodeWeight=1}this.setState({nodes:i})}}},{key:"visualizeAlgorithm",value:function(){var t=this.state.algorithm;this.clearBoard(),this.setState({alreadyVisualized:!1}),"BFS"===t?this.visualizeBFS():"DFS"===t?this.visualizeDFS():"Djikstra"===t?this.visualizeDjikstra():"AStar"===t&&this.visualizeAStar()}},{key:"selectSpeed",value:function(t){"Fast"===t.target.value?F=20:"Average"===t.target.value?F=50:"Slow"===t.target.value&&(F=100)}},{key:"selectAlgorithm",value:function(t){this.setState({algorithm:t.target.value}),this.clearBoard()}},{key:"render",value:function(){var t=this,e=this.state,i=e.nodes,a=e.mousePressed,n=e.algorithm,o=e.alreadyVisualized,r="Add weight";return e.addingWeight&&(r="Stop adding weight"),s.a.createElement("div",{className:"outerContainer"},s.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light centerNavbar"},s.a.createElement(b.a,{className:"btn button",onClick:function(){return t.visualizeAlgorithm()}},"Visualize ",n),s.a.createElement(b.a,{className:"btn button",onClick:function(){return t.clearBoard(!0)}},"Clear Board"),s.a.createElement(b.a,{className:"btn button",onClick:function(){return t.clearWall()}},"Clear Wall"),s.a.createElement(b.a,{className:"btn button",onClick:function(){return t.setAddingWeight()}},r),s.a.createElement(b.a,null,s.a.createElement("div",{className:"dropdown"},s.a.createElement("select",{className:"AlgorithmSelect",onChange:this.selectAlgorithm},s.a.createElement("option",{value:"BFS"}," BFS"),s.a.createElement("option",{value:"DFS"}," DFS"),s.a.createElement("option",{value:"Djikstra"}," Djikstra "),s.a.createElement("option",{value:"AStar"}," A* ")))),s.a.createElement(b.a,null,s.a.createElement("div",{className:"dropdown"},"Speed:",s.a.createElement("select",{className:"AlgorithmSelect",onChange:this.selectSpeed},s.a.createElement("option",{value:"Fast"}," Fast "),s.a.createElement("option",{value:"Slow"}," Slow "),s.a.createElement("option",{value:"Average"}," Average "))))),s.a.createElement("div",{className:"iconListDiv"},s.a.createElement("ul",{className:"iconList"},s.a.createElement("li",{className:"iconList"},s.a.createElement("div",{className:"box startNode"}),"Start Node"),s.a.createElement("li",{className:"iconList"},s.a.createElement("div",{className:"box endNode"}),"End Node"),s.a.createElement("li",{className:"iconList"},s.a.createElement("div",{className:"box"}),"Unvisited Node"),s.a.createElement("li",{className:"iconList"},s.a.createElement("div",{className:"box visitedNode"}),"Visited Node"),s.a.createElement("li",{className:"iconList"},s.a.createElement("div",{className:"box Wall"}),"Wall"))),s.a.createElement("div",{className:"grid"},i.map((function(e,i){return s.a.createElement("div",{key:i,className:"row-".concat(i)},e.map((function(e,i){var n=e.isStart,r=e.isFinish,l=e.isAnimated,c=e.row,d=e.col,u=e.isWall,h=e.isShortestPathNode,v=e.nodeWeight;return s.a.createElement(m,{key:i,isStart:n,isFinish:r,isAnimated:l,isWall:u,isShortestPathNode:h,onMouseDown:function(e,i){return t.handleMouseDown(e,i)},onMouseEnter:function(e,i){return t.handleMouseEnter(e,i)},mousePressed:a,onMouseUp:function(){return t.handleMouseUp(c,d)},onMouseOver:function(){return t.handleMouseOver(c,d)},row:c,col:d,instantAnimation:o,nodeWeight:v})})))}))))}}]),e}(a.Component);var D=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(P,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var z=i(23);o.a.render(s.a.createElement(z.a,{basename:"/Pathfinder"},s.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[24,1,2]]]);
//# sourceMappingURL=main.f9d408d9.chunk.js.map