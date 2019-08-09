<<<<<<< HEAD
<<<<<<< Updated upstream
import store, { types } from '../../store'
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', true, /\.svg$/)
requireAll(req)
=======
=======
>>>>>>> bf03f9217fe57dfc390a771fc16e791e541c6110
/**
 * 依赖svg-sprite-loader
 * 介绍：https: //segmentfault.com/a/1190000015367490#articleHeader3
 */
<<<<<<< HEAD
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
import store, { types } from '../../store';
>>>>>>> bf03f9217fe57dfc390a771fc16e791e541c6110

// 获取所有svg文件内容
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', true, /\.svg$/);
requireAll(req);

// 获取所有svg文件内容
const allSvgKeys = req.keys();
const svgs = [];
allSvgKeys.map(svg => {
  const svgNames = svg.split('/');
  const reg = /([\w1-9A-Za-z-_]+)\.svg/;

  const result = reg.exec(svgNames[svgNames.length - 1]);
  if (result) {
    const svgName = result[1];
    svgs.push(svgName);
  }
});
