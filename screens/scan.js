import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, Dimensions, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';

const group = require('../assets/Group5.png')
const nuocepcam = require('../assets/Rectangle31.png')
const ScanScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(null);
    const [text, setText] = useState('Bạn chưa quét mã');

    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;
    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }
    useEffect(() => {
        askForCameraPermission();
    }, []);

    //Camera thuc hien quet cai gi
    const handleBarcodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data);
        console.log('Type: ' + type + '\nData: ' + data);
    }

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Đang yêu cầu cho phép sử dụng camera</Text>
            </View>
        )
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>Bạn chưa cho phép sử dụng camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.barcodeBox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
                    style={{ width: WIDTH, height: HEIGHT }}
                />
                <TouchableOpacity style={styles.buttonBack}>
                    <Ionicons size={25} name='chevron-back' color={'#5A6CF3'} />
                </TouchableOpacity>
                <Image source={group} style={styles.groupStyle}/>
                <View style={{position:'absolute',bottom:30,width:290,height:70,borderRadius:12,alignItems:'center',justifyContent:'space-around', flexDirection:'row',backgroundColor:'white'}}>
                    <Image source={nuocepcam}/>
                    <View>
                        <Text style={{color:'#BBBBBB',fontWeight:'300'}}>Lauren's</Text>
                        <Text>Orange Juice</Text>
                    </View>
                    <TouchableOpacity style={{width:45,height:45,backgroundColor:'#5A6CF3',borderRadius:6,alignItems:'center',justifyContent:'center'}}>
                        <Ionicons name='add' size={36} color={'white'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    barcodeBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonBack: {
        width: 45,
        height: 45,
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        top: 50,
        left: 20,
        borderRadius: 10,
    },
    groupStyle:{
        position:'absolute',
        top:150,
        height:450,
        resizeMode:'stretch'
    },
});

export default ScanScreen;