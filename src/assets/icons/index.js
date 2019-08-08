/**
 * 依赖svg-sprite-loader
 * 介绍：https: //segmentfault.com/a/1190000015367490#articleHeader3
 */
import store, { types } from '../../store';

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
