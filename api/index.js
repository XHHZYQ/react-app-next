import Axios from 'axios';

const baseUrl = 'http://service-tdog.sjhh-test.com';

export const getCourseWareList = (params) => Axios({
  url: `${baseUrl}/ai-class/teacher-teaching/list`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpc3MiOiJzZXJ2aWNlLnRjYW1wdXMuY24iLCJhdWQiOiJhaVRlYWNoZXJfNDhfNzlfMTIwLjQxLjIxMi4xMDIiLCJpYXQiOjE3MDcwMjU4NDEsIm5iZiI6MTcwNzAyNTg0MSwiZXhwIjoxNzA3ODg5ODQxfQ.wLoQcGQYEF3j-a-eGyU30LuQT3GeZISLNBaZU0x6H2g'
  },
  method: "POST",
  data: params,
});;