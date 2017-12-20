import axios from 'axios';
import store from 'store';

let instance;
let profile;

export function setToken(token) {
  store.set('jwt', token);
  instance = axios.create({
    baseURL: 'http://localhost:3001/v1/',
    headers: {
      'X-AUTH-TOKEN': token
    }
  });
}

export function setProfile(data) {
  profile = data;
}

export function getProfile() {
  return profile;
}

export function init() {
  return new Promise((resolve, reject) => {
    let token = store.get('jwt');
    instance = axios.create({
      baseURL: 'http://localhost:3001/v1/consumer/',
      headers: {
        'X-AUTH-TOKEN': token
      }
    });

    if(token === undefined)
      return resolve();

    instance.get('me/profile').then(res => {
      const { data } = res;

      console.log(data);

      if(!data.error)
        setProfile(data);

      resolve();
    }).catch(err => resolve());
  });
}

export default function getAxios() {
  return instance;
}
