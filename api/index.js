import { $post } from '../utils/request';

const AdminBaseUrl = 'http://service-tdog.sjhh-test.com/saas-admin';
const AdminHeaders = {
  'Content-Type': 'application/json',
  Authorization: 'c3500fdedec0a3416be7f8fd2a397381'
};

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
