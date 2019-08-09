<<<<<<< Updated upstream
import store, { types } from '../../store'
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', true, /\.svg$/)
requireAll(req)
=======
/**
 * 依赖svg-sprite-loader
 * 介绍：https: //segmentfault.com/a/1190000015367490#articleHeader3
 */
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

const allSvgKeys = req.keys()
console.log(store)
const svgs = []
allSvgKeys.map(svg => {
  const svgNames = svg.split('/')
  const reg = /([\w1-9A-Za-z-_]+)\.svg/

  const result = reg.exec(svgNames[svgNames.length - 1])
  if (result) {
    const svgName = result[1]
    svgs.push(svgName)
  }
  store.dispatch(types.SVG_ICON_NAME, svgs)
})
