const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  // configureWebpack:{
  // resolve:{
  //   alias:{
  //     '~': path.resolve(__dirnam,"./src/")
  //   }
  // }
  // }
}
)

// module.exports = {
//   configureWebpack:{
//     resolve:{
//       alias:{
//         "~": path.resolve(__dirname,"./src")
//       },
//       extensions:['.js','.vue','.json']
//     }
//   }
// }