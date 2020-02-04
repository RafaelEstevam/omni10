import React, {useState, useEffect} from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import CardModal from '../components/CardModal.js'

import api from '../services/api';
import {connect, disconnect, subscribeToNewDevs} from '../services/socket';

function Main({ navigation }) {

    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [technologies, setTechnologies] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() =>{
        async function getCurrentLocation(){
            const { granted } = await requestPermissionsAsync(); // se o usuário deu permissão 
            if(granted){
                const location = await getCurrentPositionAsync({
                    enableHighAccuracy: true, //precisão do GPS
                });
                const {latitude, longitude} = location.coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,// zoom do mapa
                    longitudeDelta: 0.04,// zoom do mapa
                });
            }
        }

        getCurrentLocation();

    }, []);

    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs])//dispara função quando variavel mudar de valor

    function setupWebsocket(){
        disconnect();
        const {latitude, longitude} = currentRegion;
        connect(
            latitude,
            longitude,
            technologies
        );
    }

    async function loadDevs(distance) {//carrega usuários de acordo com a busca
        const {latitude, longitude} = currentRegion;
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                technologies,
                distance
            }
        });
        setDevs(response.data.devs);
        setupWebsocket();
    }

    function showCardModal(){
        setShowModal(showModal == true ? false : true);
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }

    if(!currentRegion){
        return null;
    }

    return(
        <>
            <MapView 
                style={styles.map}
                initialRegion={currentRegion} //passar posição atual do GPS
                onRegionChangeComplete={handleRegionChanged}
            >
                {devs.map(dev => (
                    <Marker 
                        key={dev._id}
                        coordinate={{latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0]}}>
                        <Image style={styles.avatar} source={{uri: dev.avatar_url}} />
                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: dev.github_user})
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name || dev.github_user}</Text>
                                <Text style={styles.devUsername}>{dev.github_user}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.technologies.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar devs nome do Github"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={technologies} //valor no estado
                    onChangeText={setTechnologies} //setando valor no estado
                />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="search" size={20} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={showCardModal} style={styles.moreConfig}>
                    {showModal && <MaterialIcons name="clear" size={20} color="#FFF" />}
                    {!showModal && <MaterialIcons name="more-vert" size={20} color="#FFF" />}
                </TouchableOpacity>
            </View>
            <CardModal show={showModal} loadDevs={loadDevs} />
        </>
    )
}

const styles = StyleSheet.create({
    searchForm: {
        position: "absolute",
        top: 80,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: "#8E4Dff",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15 
    },
    moreConfig: {
        width: 50,
        height: 50,
        backgroundColor: "#000",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15 
    },
    map:{
        flex: 1
    },
    avatar: {
        width: 51,
        height: 54,
        borderRadius: 5,
        borderWidth: 5,
        borderColor: '#FFF'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devUsername: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#aaa',
        marginBottom: 5
    },
    devBio: {
        color: '#666'
    },
    devTechs: {
        marginTop: 5,
    },
})

export default Main;