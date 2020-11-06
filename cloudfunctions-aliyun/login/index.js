'use strict'
exports.main = async (event, context) => {
  // event为客户端上传的参数
  const db = uniCloud.database()
  const collection = await db
    .collection('user')
    .where(event)
    .get()
  // console.log('event : ' + event)
  // console.log('collection : ' + JSON.stringify(collection))
  // 返回数据给客户端
  if (collection.data.length > 0) {
    return '登陆成功'
  } else {
    return '登陆失败'
  }
}
