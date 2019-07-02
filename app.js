
const database = firebase.database();
const  ParkingInfoRef = database.ref("ParkingInfo");

new Vue({

el:"#update",
data:{

name:'',
lat:'',
lng:'',
hr:'',
nHr:'',
nSlot:'',

editName : null,
editLat : null,
editLng : null,
editHr : null,
editNhr : null,
editNslot : null,
info:[]

},

methods:{

  saveData:function(){


    if(confirm('ยืนยันการบันทึกข้อมูล')){




        ParkingInfoRef.push({name:this.name,lat:this.lat,lng : this.lng,hr:parseInt(this.hr),nHr:parseInt(this.nHr),nSlot:parseInt(this.nSlot)})
        this.name=''
        this.lat=''
        this.lng=''
        this.hr=''
        this.nHr=''
        this.nSlot=''

           return true;
          }else{
            return false;
                  }

  },

  deleteInfo:function(inform){




    if(confirm(' ต้องการลบลานจอดรถนี้')){

           ParkingInfoRef.child(inform.id).remove();
           return true;
          }else{
            return false;
            }

},

editInfo:function(inform){

this.editName = inform
this.editLat = inform
this.editLng = inform
this.editHr = inform
this.editNhr = inform
this.editNslot = inform



this.name = inform.name
this.lat = inform.lat
this.lng = inform.lng
this.hr = inform.hr
this.nHr = inform.nHr
this.nSlot = inform.nSlot
},

cancleEdit:function(){
  this.editName = null
  this.editLat = null
  this.editLng = null
  this.editHr = null
  this.editNhr = null
  this.editNslot = null
  this.name=''
  this.lat=''
  this.lng=''
  this.hr=''
  this.nHr=''
  this.nSlot=''

},
saveEdit:function(){
  ParkingInfoRef.child(this.editName.id).
  update({name:this.name,lat:this.lat,lng:this.lng,hr:parseInt(this.hr),nHr:parseInt(this.nHr),nSlot:parseInt(this.nSlot)});
  this.name=''
  this.lat=''
  this.lng=''
  this.hr=''
  this.nHr=''
  this.nSlot=''
  this.cancleEdit();



},
signOut :function(){

   firebase.auth().signOut();
   window.location.href = "LogIn.html";

},
initApp :function(){


      firebase.auth().onAuthStateChanged(function(user) {

        if (user) {

          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;





        } else {

        }

      });



},
showKey : function(inform){

alert(inform.id);


}






},

created(){

ParkingInfoRef.on('child_added',snapshot=>{this.info.push({...snapshot.val(),id:snapshot.key})})
ParkingInfoRef.on('child_removed',snapshot=>{
  const deleteinfo = this.info.find(inform=>inform.id == snapshot.key)
  const index=this.info.indexOf(deleteinfo)
  this.info.splice(index,1)
})
ParkingInfoRef.on('child_changed',snapshot=>{
const saveinfo = this.info.find(inform=>inform.id == snapshot.key)
saveinfo.name=snapshot.val().name
saveinfo.lat=snapshot.val().lat
saveinfo.lng=snapshot.val().lng
saveinfo.hr=snapshot.val().hr
saveinfo.nHr=snapshot.val().nHr
saveinfo.nSlot=snapshot.val().nSlot
})




}



})
