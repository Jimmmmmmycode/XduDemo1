// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
 
  const wxContext = cloud.getWXContext()
  var receiverid = wxContext.OPENID
  var orderid = event.orderid
  var receivernickname = event.receivernickname
  var receiveravatarurl = event.receiveravatarurl

 return await db.collection('help_info').doc(orderid).update({
   data:{
    receivestatus:true,
    receiverid : receiverid ,
    receivernickname :receivernickname,
    receiveravatarurl : receiveravatarurl
   },
   success:function(res){
     console.log(res.data)
   }
 })

}