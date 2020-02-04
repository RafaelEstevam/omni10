import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Slider } from 'react-native';

import api from '../services/api';

function CardModal(props){

  const [distanceValue, setDistanceValue] = useState(50);

  function setDistance(){
    props.loadDevs(distanceValue.toFixed(2))
  }

  return (
    <>
      {props.show && 
        <View style={styles.footerCard}>
          <View style={styles.searchConfigs}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.labelForm}>Busca avançada</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: '#fff'}}>Distância máxima</Text>
            </View>
            <View>
              <Slider
                value={distanceValue}
                minimumValue={1}
                maximumTrackTintColor="#fff"
                minimumTrackTintColor="#000"
                thumbTintColor="#fff"
                maximumValue={100}
                onValueChange={setDistanceValue}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: '#fff'}}>{distanceValue.toFixed(2)} (Km/h)</Text>
            </View>
            <TouchableOpacity style={styles.btnForm} onPress={setDistance}>
              <Text style={styles.btnFormLabel}>Buscar</Text>
            </TouchableOpacity>
          </View>
        </View> 
      }
    </>
  )
}

export default CardModal;

const styles = StyleSheet.create({
  footerCard: {
    backgroundColor: '#8E4Dff',
    position: 'absolute',
    zIndex: 1000,
    bottom:0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  searchConfigs: {
    flex: 1,
    height: 300,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 20,
  },
  labelForm: {
    color: '#fff', fontSize: 30, fontWeight: 'bold'
  },
  btnForm: {
    backgroundColor: '#000',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 1000,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnFormLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
})