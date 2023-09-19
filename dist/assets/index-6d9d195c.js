class h{constructor(){this.resolve=void 0,this.reject=void 0,this.promise=new Promise((e,a)=>{this.resolve=e,this.reject=a})}async value(){return await this.promise}}function I(r,e,a){const s=new XMLHttpRequest;s.open("GET",r,!0),s.responseType="arraybuffer",s.onload=()=>{s.status==200||s.status==0&&s.response?e(s.response):a()},s.onerror=a,s.send(null)}function _(r,e,a){I(r,s=>{e(new Uint8Array(s))},()=>{if(a)a();else throw new Error(`Loading data file ${r} failed.`)})}async function T(r){const e=r.map(a=>new Promise((s,c)=>{_(a.serverFilename,i=>{s({filename:a.virtualFilename,data:i})},()=>{console.error(`Error fetching file: ${a.serverFilename}`)})}));return await Promise.all(e)}async function R(r){return await new Promise((e,a)=>{_(r+"webchuck.wasm",e,a)})}const d=()=>new h;var t;(function(r){r.LOAD_FILE="loadFile",r.RUN_CODE="runChuckCode",r.RUN_CODE_WITH_REPLACEMENT_DAC="runChuckCodeWithReplacementDac",r.REPLACE_CODE="replaceChuckCode",r.REPLACE_CODE_WITH_REPLACEMENT_DAC="replaceChuckCodeWithReplacementDac",r.REMOVE_LAST_CODE="removeLastCode",r.RUN_FILE="runChuckFile",r.RUN_FILE_WITH_REPLACEMENT_DAC="runChuckFileWithReplacementDac",r.RUN_FILE_WITH_ARGS="runChuckFileWithArgs",r.REPLACE_FILE="replaceChuckFile",r.REPLACE_FILE_WITH_REPLACEMENT_DAC="replaceChuckFileWithReplacementDac",r.REPLACE_FILE_WITH_ARGS="replaceChuckFileWithArgs",r.REMOVE_SHRED="removeShred",r.IS_SHRED_ACTIVE="isShredActive",r.SIGNAL_EVENT="signalChuckEvent",r.BROADCAST_EVENT="broadcastChuckEvent",r.LISTEN_FOR_EVENT_ONCE="listenForChuckEventOnce",r.START_LISTENING_FOR_EVENT="startListeningForChuckEvent",r.STOP_LISTENING_FOR_EVENT="stopListeningForChuckEvent",r.SET_INT="setChuckInt",r.GET_INT="getChuckInt",r.SET_FLOAT="setChuckFloat",r.GET_FLOAT="getChuckFloat",r.SET_STRING="setChuckString",r.GET_STRING="getChuckString",r.SET_INT_ARRAY="setGlobalIntArray",r.GET_INT_ARRAY="getGlobalIntArray",r.SET_INT_ARRAY_VALUE="setGlobalIntArrayValue",r.GET_INT_ARRAY_VALUE="getGlobalIntArrayValue",r.SET_ASSOCIATIVE_INT_ARRAY_VALUE="setGlobalAssociativeIntArrayValue",r.GET_ASSOCIATIVE_INT_ARRAY_VALUE="getGlobalAssociativeIntArrayValue",r.SET_FLOAT_ARRAY="setGlobalFloatArray",r.GET_FLOAT_ARRAY="getGlobalFloatArray",r.SET_FLOAT_ARRAY_VALUE="setGlobalFloatArrayValue",r.GET_FLOAT_ARRAY_VALUE="getGlobalFloatArrayValue",r.SET_ASSOCIATIVE_FLOAT_ARRAY_VALUE="setGlobalAssociativeFloatArrayValue",r.GET_ASSOCIATIVE_FLOAT_ARRAY_VALUE="getGlobalAssociativeFloatArrayValue",r.SET_PARAM_INT="setParamInt",r.GET_PARAM_INT="getParamInt",r.SET_PARAM_FLOAT="setParamFloat",r.GET_PARAM_FLOAT="getParamFloat",r.SET_PARAM_STRING="setParamString",r.GET_PARAM_STRING="getParamString",r.GET_CHUCK_NOW="getChuckNow",r.CLEAR_INSTANCE="clearChuckInstance",r.CLEAR_GLOBALS="clearGlobals"})(t||(t={}));var l;(function(r){r.INIT_DONE="initCallback",r.PRINT="console print",r.EVENT="eventCallback",r.INT="intCallback",r.FLOAT="floatCallback",r.STRING="stringCallback",r.INT_ARRAY="intArrayCallback",r.FLOAT_ARRAY="floatArrayCallback",r.NEW_SHRED="newShredCallback",r.REPLACED_SHRED="replacedShredCallback",r.REMOVED_SHRED="removedShredCallback"})(l||(l={}));class n extends window.AudioWorkletNode{constructor(e,a,s,c=2){super(a,"chuck-node",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[c],processorOptions:{chuckID:n.chuckID,srate:a.sampleRate,preloadedFiles:e,wasm:s}}),this.deferredPromises={},this.deferredPromiseCounter=0,this.eventCallbacks={},this.eventCallbackCounter=0,this.isReady=d(),this.port.onmessage=this.receiveMessage.bind(this),this.onprocessorerror=i=>console.error(i),n.chuckID++}static async init(e,a,s=2,c="https://chuck.stanford.edu/webchuck/src/"){const i=await R(c);let A=!1;a===void 0&&(a=new AudioContext,A=!0),a.state==="suspended"&&await a.resume(),await a.audioWorklet.addModule(c+"webchuck.js");const E=await T(e),o=new n(E,a,i,s);return A&&o.connect(a.destination),await o.isReady.promise,o}nextDeferID(){const e=this.deferredPromiseCounter++;return this.deferredPromises[e]=d(),e}createFile(e,a,s){this.sendMessage(t.LOAD_FILE,{directory:e,filename:a,data:s})}async loadFile(e){const a=e.split("/").pop();return fetch(e).then(s=>s.arrayBuffer()).then(s=>{this.createFile("",a,new Uint8Array(s))}).catch(s=>{throw new Error(s)})}runCode(e){const a=this.nextDeferID();return this.sendMessage(t.RUN_CODE,{callback:a,code:e}),this.deferredPromises[a].value()}runCodeWithReplacementDac(e,a){const s=this.nextDeferID();return this.sendMessage(t.RUN_CODE_WITH_REPLACEMENT_DAC,{callback:s,code:e,dac_name:a}),this.deferredPromises[s].value()}replaceCode(e){const a=this.nextDeferID();return this.sendMessage(t.REPLACE_CODE,{callback:a,code:e}),this.deferredPromises[a].value()}replaceCodeWithReplacementDac(e,a){const s=this.nextDeferID();return this.sendMessage(t.REPLACE_CODE_WITH_REPLACEMENT_DAC,{callback:s,code:e,dac_name:a}),this.deferredPromises[s].value()}removeLastCode(){const e=this.nextDeferID();return this.sendMessage(t.REMOVE_LAST_CODE,{callback:e}),this.deferredPromises[e].value()}runFile(e){const a=this.nextDeferID();return this.sendMessage(t.RUN_FILE,{callback:a,filename:e}),this.deferredPromises[a].value()}runFileWithReplacementDac(e,a){const s=this.nextDeferID();return this.sendMessage(t.RUN_FILE_WITH_REPLACEMENT_DAC,{callback:s,dac_name:a,filename:e}),this.deferredPromises[s].value()}runFileWithArgs(e,a){const s=this.nextDeferID();return this.sendMessage(t.RUN_FILE_WITH_ARGS,{callback:s,colon_separated_args:a,filename:e}),this.deferredPromises[s].value()}runFileWithArgsWithReplacementDac(e,a,s){const c=this.nextDeferID();return this.sendMessage(t.RUN_FILE_WITH_ARGS,{callback:c,colon_separated_args:a,dac_name:s,filename:e}),this.deferredPromises[c].value()}replaceFile(e){const a=this.nextDeferID();return this.sendMessage(t.REPLACE_FILE,{callback:a,filename:e}),this.deferredPromises[a].value()}replaceFileWithReplacementDac(e,a){const s=this.nextDeferID();return this.sendMessage(t.REPLACE_FILE_WITH_REPLACEMENT_DAC,{callback:s,dac_name:a,filename:e}),this.deferredPromises[s].value()}replaceFileWithArgs(e,a){const s=this.nextDeferID();return this.sendMessage(t.REPLACE_FILE_WITH_ARGS,{callback:s,colon_separated_args:a,filename:e}),this.deferredPromises[s].value()}replaceFileWithArgsWithReplacementDac(e,a,s){const c=this.nextDeferID();return this.sendMessage(t.REPLACE_FILE_WITH_ARGS,{callback:c,colon_separated_args:a,dac_name:s,filename:e}),this.deferredPromises[c].value()}removeShred(e){const a=this.nextDeferID();return this.sendMessage(t.REMOVE_SHRED,{shred:e,callback:a}),this.deferredPromises[a].value()}isShredActive(e){const a=this.nextDeferID();return this.sendMessage(t.IS_SHRED_ACTIVE,{shred:e,callback:a}),this.deferredPromises[a].value()}signalEvent(e){this.sendMessage(t.SIGNAL_EVENT,{variable:e})}broadcastEvent(e){this.sendMessage(t.BROADCAST_EVENT,{variable:e})}listenForEventOnce(e,a){const s=this.eventCallbackCounter++;this.eventCallbacks[s]=a,this.sendMessage(t.LISTEN_FOR_EVENT_ONCE,{variable:e,callback:s})}startListeningForEvent(e,a){const s=this.eventCallbackCounter++;return this.eventCallbacks[s]=a,this.sendMessage(t.START_LISTENING_FOR_EVENT,{variable:e,callback:s}),s}stopListeningForEvent(e,a){this.sendMessage(t.STOP_LISTENING_FOR_EVENT,{variable:e,callback:a})}setInt(e,a){this.sendMessage(t.SET_INT,{variable:e,value:a})}getInt(e){const a=this.nextDeferID();return this.sendMessage(t.GET_INT,{variable:e,callback:a}),this.deferredPromises[a].value()}setFloat(e,a){this.sendMessage(t.SET_FLOAT,{variable:e,value:a})}getFloat(e){const a=this.nextDeferID();return this.sendMessage(t.GET_FLOAT,{variable:e,callback:a}),this.deferredPromises[a].value()}setString(e,a){this.sendMessage(t.SET_STRING,{variable:e,value:a})}getString(e){const a=this.nextDeferID();return this.sendMessage(t.GET_STRING,{variable:e,callback:a}),this.deferredPromises[a].value()}setIntArray(e,a){this.sendMessage(t.SET_INT_ARRAY,{variable:e,values:a})}getIntArray(e){const a=this.nextDeferID();return this.sendMessage(t.GET_INT_ARRAY,{variable:e,callback:a}),this.deferredPromises[a].value()}setIntArrayValue(e,a,s){this.sendMessage(t.SET_INT_ARRAY_VALUE,{variable:e,index:a,value:s})}getIntArrayValue(e,a){const s=this.nextDeferID();return this.sendMessage(t.GET_INT_ARRAY_VALUE,{variable:e,index:a,callback:s}),this.deferredPromises[s].value()}setAssociativeIntArrayValue(e,a,s){this.sendMessage(t.SET_ASSOCIATIVE_INT_ARRAY_VALUE,{variable:e,key:a,value:s})}getAssociativeIntArrayValue(e,a){const s=this.nextDeferID();return this.sendMessage(t.GET_ASSOCIATIVE_INT_ARRAY_VALUE,{variable:e,key:a,callback:s}),this.deferredPromises[s].value()}setFloatArray(e,a){this.sendMessage(t.SET_FLOAT_ARRAY,{variable:e,values:a})}getFloatArray(e){const a=this.nextDeferID();return this.sendMessage(t.GET_FLOAT_ARRAY,{variable:e,callback:a}),this.deferredPromises[a].value()}setFloatArrayValue(e,a,s){this.sendMessage(t.SET_FLOAT_ARRAY_VALUE,{variable:e,index:a,value:s})}getFloatArrayValue(e,a){const s=this.nextDeferID();return this.sendMessage(t.GET_FLOAT_ARRAY_VALUE,{variable:e,index:a,callback:s}),this.deferredPromises[s].value()}setAssociativeFloatArrayValue(e,a,s){this.sendMessage(t.SET_ASSOCIATIVE_FLOAT_ARRAY_VALUE,{variable:e,key:a,value:s})}getAssociativeFloatArrayValue(e,a){const s=this.nextDeferID();return this.sendMessage(t.GET_ASSOCIATIVE_FLOAT_ARRAY_VALUE,{variable:e,key:a,callback:s}),this.deferredPromises[s].value()}setParamInt(e,a){this.sendMessage(t.SET_PARAM_INT,{name:e,value:a})}getParamInt(e){const a=this.nextDeferID();return this.sendMessage(t.GET_PARAM_INT,{name:e,callback:a}),this.deferredPromises[a].value()}setParamFloat(e,a){this.sendMessage(t.SET_PARAM_FLOAT,{name:e,value:a})}getParamFloat(e){const a=this.nextDeferID();return this.sendMessage(t.GET_PARAM_FLOAT,{name:e,callback:a}),this.deferredPromises[a].value()}setParamString(e,a){this.sendMessage(t.SET_PARAM_STRING,{name:e,value:a})}getParamString(e){const a=this.nextDeferID();return this.sendMessage(t.GET_PARAM_STRING,{name:e,callback:a}),this.deferredPromises[a].value()}now(){const e=this.nextDeferID();return this.sendMessage(t.GET_CHUCK_NOW,{callback:e}),this.deferredPromises[e].value()}clearChuckInstance(){this.sendMessage(t.CLEAR_INSTANCE)}clearGlobals(){this.sendMessage(t.CLEAR_GLOBALS)}chuckPrint(e){console.log(e)}sendMessage(e,a){const s=a?{type:e,...a}:{type:e};this.port.postMessage(s)}receiveMessage(e){switch(e.data.type){case l.INIT_DONE:this.isReady&&this.isReady.resolve&&this.isReady.resolve();break;case l.PRINT:this.chuckPrint(e.data.message);break;case l.EVENT:if(e.data.callback in this.eventCallbacks){const s=this.eventCallbacks[e.data.callback];s()}break;case l.INT:case l.FLOAT:case l.STRING:case l.INT_ARRAY:case l.FLOAT_ARRAY:if(e.data.callback in this.deferredPromises){const s=this.deferredPromises[e.data.callback];s.resolve&&s.resolve(e.data.result),delete this.deferredPromises[e.data.callback]}break;case l.NEW_SHRED:if(e.data.callback in this.deferredPromises){const s=this.deferredPromises[e.data.callback];e.data.shred>0?s.resolve&&s.resolve(e.data.shred):s.reject&&s.reject("Running code failed")}break;case l.REPLACED_SHRED:if(e.data.callback in this.deferredPromises){const s=this.deferredPromises[e.data.callback];e.data.newShred>0?s.resolve&&s.resolve({newShred:e.data.newShred,oldShred:e.data.oldShred}):s.reject&&s.reject("Replacing code failed")}break;case l.REMOVED_SHRED:if(e.data.callback in this.deferredPromises){const s=this.deferredPromises[e.data.callback];e.data.shred>0?s.resolve&&s.resolve(e.data.shred):s.reject&&s.reject("Removing code failed")}break}}}n.chuckID=1;export{n as Chuck,h as DeferredPromise};
