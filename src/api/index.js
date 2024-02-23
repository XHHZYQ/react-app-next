import { $post } from '../utils/request';

/**
 * @description 赛事列表-下拉选项
 */
export const matchOptions = (params) => $post({
  url: '/match-index/options',
  params
});

export const matchList = (params) =>
  $post({
    url: `/match-index/list`,
    params
  });

export const matchAdd = (params) =>
  $post({
    url: '/match-index/create',
    params
  });

export const matchDetail = (params) =>
  $post({
    url: '/match-index/detail',
    params
  });

export const matchEdit = (params) =>
  $post({
    url: '/match-index/edit',
    params
  });

/**
 * @description 赛事-发布
 */
export const matchPublish = (params) =>
  $post({
    url: '/match-index/publish',
    params
  });
/**
 *
 * @description 赛事-停止发布
 */
export const matchStop = (params) =>
  $post({
    url: '/match-index/stop',
    params
  });

/** @description 赛事修改显示控制状态 */
export const matchDisplayCtrl = (params) =>
  $post({
    url: '/match-index/update-display-ctrl',
    params
  });

/** @description 赛事修改显示控制状态 */
export const getUserMenu = (params) =>
  $post({
    url: '/auth/get-user-menu',
    params
  });
