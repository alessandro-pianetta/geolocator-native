import axios from 'axios'
import { AsyncStorage } from 'react-native';
import * as types from './types'
import { API_KEY } from '../../consts/api'
import firebase from 'react-native-firebase';
// import { text } from 'react-native-communications';


export const getLocation = () => {
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      dispatch({ type: types.GET_LOCATION, payload: pos.coords })
    })
  }
}

export const formatAddress = (address) => {
  return (dispatch) => {
    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
      .then(response => {
        const loc = response.data.results[0].geometry.location
        dispatch({ type: types.FORMAT_ADDRESS, payload: loc })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const watchLocation = (destination, radius) => {
  return (dispatch) => {
    const success = (pos) => {
      const crd = pos.coords
      const distance = checkDistance(crd, destination)
      if (typeof (distance) === 'number' && distance <= radius / 1000) {
        getETA(crd, destination);
        navigator.geolocation.clearWatch(id);
        return
      }
      dispatch({ type: types.WATCH_LOCATION, payload: pos.coords })
    }

    const error = (err) => {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    const checkDistance = (current, destination) => {
      if (!destination) {
        console.log('No target')
        return undefined
      }

      var p = 0.017453292519943295;    // Math.PI / 180
      var c = Math.cos;
      var a = 0.5 - c((destination.latitude - current.latitude) * p) / 2 +
        c(current.latitude * p) * c(destination.latitude * p) *
        (1 - c((destination.longitude - current.longitude) * p)) / 2;

      return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }

    const id = navigator.geolocation.watchPosition(success, error);
  }
}

export const convertRadius = (radius, units) => {
  let meters;
  if (units) {
    meters = parseFloat(radius) * 1000;
  } else {
    meters = parseFloat(radius) * 1609.34;
  }
  return { type: types.CONVERT_RADIUS, payload: meters }
}

const getETA = (currentLoc, destination) => {
  console.log({ cLat: currentLoc.latitude, cLng: currentLoc.longitude, dLat: destination.latitude, dLng: destination.longitude })
  const DISTANCE_MATRIX_API_KEY = "AIzaSyA2DeZtGcwmhCkMqdfLY651fZo579BFtM4";
  axios.post(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${currentLoc.latitude},${currentLoc.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${DISTANCE_MATRIX_API_KEY}`)
    .then(response => {
      const eta = response.data.rows[0].elements[0].duration.text;
      const message = `Your ride will arrive at your location in ${eta}.`
      const phoneNum = '+16503845666'
      // text(phoneNum, message)
      alert(`You will arrive at your destination in ${eta}.`);
    })
    .catch(error => {
      console.log(error)
    })
}

export const addCallToHistory = (firstName, message, phoneNumber) => async () => {
  try {
    const userId = await AsyncStorage.getItem('uid');
    const date = `${Date.now()}`;
    const ref = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("history")
      .doc(date);
    await ref.set({
      createdAt: date,
      firstName: "Alex",
      message,
      phoneNumber,
    });
  } catch (error) {
    console.error(err);
  }
};

