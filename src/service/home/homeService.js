import angular from 'angular';
import axios from 'axios';

/**
 * Home Service
 */
class HomeService {
  getData() {
    return axios.post('mock/homeData');
  }
}

const app = angular.module('myApp');
app.service('homeService', HomeService);
