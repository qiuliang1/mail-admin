const {createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function(app) {
    const { REACT_PROXY, REACT_GLOB_API_URL } = process.env
    console.log('[ REACT_PROXY, REACT_GLOB_API_URL ] >', REACT_PROXY, REACT_GLOB_API_URL)
 app.use(createProxyMiddleware('/yc', { 
     target: REACT_PROXY + REACT_GLOB_API_URL,
     pathRewrite: {
       '^/yc': '',
     },
     changeOrigin: true,
     secure: false
   }));
//    https://springboot-0vty-31870-7-1305745455.sh.run.tcloudbase.com
app.use(createProxyMiddleware('/fx', { 
    target: "https://springboot-0vty-31870-7-1305745455.sh.run.tcloudbase.com/yc",
    pathRewrite: {
      '^/fx': '',
    },
    changeOrigin: true,
    secure: false
  }));
}