
export function txMap() {
  return new Promise((resolve, reject) => {
    window.init = function() {
      resolve(qq)// 注意这里
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://map.qq.com/api/js?v=2.exp&callback=init&key=S3RBZ-LJ76D-AQ54R-H73AR-L6ZEF-CHFCI'
    script.onerror = reject
    document.head.appendChild(script)
  })
}
