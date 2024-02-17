import Axios from 'axios';

const baseUrl = 'http://service-tdog.sjhh-test.com';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpc3MiOiJzZXJ2aWNlLnRjYW1wdXMuY24iLCJhdWQiOiJhaVRlYWNoZXJfNDhfNzlfMTIwLjQxLjIxMi4xMDIiLCJpYXQiOjE3MDcwMjU4NDEsIm5iZiI6MTcwNzAyNTg0MSwiZXhwIjoxNzA3ODg5ODQxfQ.wLoQcGQYEF3j-a-eGyU30LuQT3GeZISLNBaZU0x6H2g'
};

const AdminBaseUrl = 'http://service-tdog.sjhh-test.com/saas-admin';
const AdminHeaders = {
  'Content-Type': 'application/json',
  'Authorization': 'c3500fdedec0a3416be7f8fd2a397381'
};

export const matchList = (params) => Axios({
  url: `${AdminBaseUrl}/match-index/list`,
  headers: AdminHeaders,
  method: "POST",
  data: params,
});


export const matchAdd = (params) => Axios({
  url: AdminBaseUrl + '/match-index/create',
  headers: AdminHeaders,
  method: "POST",
  data: params,
});

export const matchDetail = (params) => Axios({
  url: AdminBaseUrl + '/match-index/detail',
  headers: AdminHeaders,
  method: "POST",
  data: params,
});

export const matchEdit = (params) => Axios({
  url: AdminBaseUrl + '/match-index/edit',
  headers: AdminHeaders,
  method: "POST",
  data: params,
});