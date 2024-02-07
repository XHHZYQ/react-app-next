import Axios from 'axios';

const baseUrl = 'http://service-tdog.sjhh-test.com';

export const TeachingList = (params) => Axios({
  url: `${baseUrl}/ai-class/teacher-teaching/list`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpc3MiOiJzZXJ2aWNlLnRjYW1wdXMuY24iLCJhdWQiOiJhaVRlYWNoZXJfNDhfNzlfMTIwLjQxLjIxMi4xMDIiLCJpYXQiOjE3MDcwMjU4NDEsIm5iZiI6MTcwNzAyNTg0MSwiZXhwIjoxNzA3ODg5ODQxfQ.wLoQcGQYEF3j-a-eGyU30LuQT3GeZISLNBaZU0x6H2g'
  },
  method: "POST",
  data: params,
});


export const courseWareList = (params) => Axios({
  url: 'http://service-tdog.sjhh-test.com/saas-admin/courseware/list',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'c3500fdedec0a3416be7f8fd2a397381'
  },
  method: "POST",
  data: params,
});