import request from '@/utils/request'

// 获取首页的区域树
export function loadAreaTree4Index (params) {
  return request({
    url: '/area/tree/index',
    method: 'get',
    params: params
  })
}
// put 更新设备
export function updateArea (data) {
  return request({
    url: '/area/bind/' + data.id + '/' + data.modelId,
    method: 'PUT'
  })
}
// 获取区域树
export function loadAreaTree (params) {
  return request({
    url: '/area/tree',
    method: 'get',
    params: params
  })
}
// 获取区域树
export function loadDeviceTreeByAreaId (areaId) {
  return request({
    url: '/device/loadDeviceTree/'+areaId,
    method: 'get'
  })
}

// 获取区域树
export function loadTreeArea (params) {
  return request({
    url: '/area/treeArea?pid=' + params,
    method: 'put',
  })
}

// 加载用户信息
export function loadUserOption () {
  return request({
    url: '/user/all',
    method: 'GET'
  })
}

// 加载设备详情
export function loadDeviceInfo (deviceId) {
  return request({
    url: '/device/detail',
    method: 'GET',
    params: { id: deviceId }
  })
}

// 获取rtsp
export function getRtspAddress (ip) {
  return request({
    url: '/device/rtsp',
    method: 'GET',
    params: { ip: ip }
  })
}

/**
 * 获取视频播放请求地址RTMP
 * @param rtsp
 */
export function getRtmpAddress(rtsp) {
  console.log(" this.rtspUrl  ",escape(rtsp).toLowerCase() );
  let rtmpUrl = '';
  $.ajax({
      async:false,
      url: "http://127.0.0.1:7779/app/plugin/rtsp2rtmp?rtspUrl="+escape(rtsp).toLowerCase(),
      type: 'get',
      // data: {rtspUrl: rtsp},
      dataType: 'JSON',
      success: function (res) {
          console.log("rtmp获取成功：===================================>>>>>>>>>>>>>>>>>")
          rtmpUrl = "rtmp://127.0.0.1"+res.result;
      },
      error: function(err){
          console.log(err);
      }
  });
  return rtmpUrl;
}