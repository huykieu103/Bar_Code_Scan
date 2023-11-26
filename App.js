import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image,Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const group = require('./assets/anh4.png')
const nuocepcam = require('./assets/anh1.png')

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function Thongbao() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search Screen</Text>
    </View>
  );
}

function Scan() {
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
    
}
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

function LichSu() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function GioHang() {
  return (
    <View >
        <View style={{marginTop: 150, marginLeft: 20}}>
               <Text  style={{fontSize: 20, fontWeight:'bold'}}> Your Cart <Icon name='thumbs-up' color={'#e6cdae'} size={20}/></Text>
        </View>
        <View>
          <View style={{ margin: 30, width:'85%', height: 80, borderRadius: 20,backgroundColor:'#e0e0e0'}}>
            <View style={{ flexDirection: 'row'}}>
              <Image source={require('./assets/anh1.png')} style={{margin: 10}}/>
                <View  style={{margin: 10, marginLeft: 30}}>
                    <Text style={{color: 'gray', fontSize:12}}>Lauren's</Text>
                    <Text style={{marginVertical:4}}>Orange Juice </Text>
                    <Text style={{color: 'orange'}}><Icon name='dollar'/> 149                                    <Icon name='minus' style={{marginLeft: 100}}/><Text style={{color:'black'}}>  2  </Text><Icon name='plus'/></Text>
                </View>
              </View>
            </View>
        </View>

        <View>
          <View style={{ marginHorizontal: 30,marginBottom: 30, width:'85%', height: 80, borderRadius: 20,backgroundColor:'#e0e0e0'}}>
            <View style={{ flexDirection: 'row'}}>
              <Image source={require('./assets/anh2.png')} style={{margin: 10}}/>
                <View  style={{margin: 10, marginLeft: 30}}>
                    <Text style={{color: 'gray', fontSize:12}}>Baskin's</Text>
                    <Text style={{marginVertical:4}}>Skimmed Milk </Text>
                    <Text style={{color: 'orange'}}><Icon name='dollar'/> 129                                    <Icon name='minus' style={{marginLeft: 100}}/><Text style={{color:'black'}}>  2  </Text><Icon name='plus'/></Text>
                </View>
              </View>
            </View>
        </View>

        <View>
          <View style={{ marginHorizontal: 30, width:'85%', height: 80, borderRadius: 20,backgroundColor:'#e0e0e0'}}>
            <View style={{ flexDirection: 'row'}}>
              <Image source={require('./assets/anh3.png')} style={{margin: 10}}/>
                <View  style={{margin: 10, marginLeft: 30}}>
                    <Text style={{color: 'gray', fontSize:12}}>Marley's</Text>
                    <Text style={{marginVertical:4}}>Aloe Vera Lotion</Text>
                    <Text style={{color: 'orange'}}><Icon name='dollar'/> 1249                                    <Icon name='minus' style={{marginLeft: 100}}/><Text style={{color:'black'}}>  2  </Text><Icon name='plus'/></Text>
                </View>
              </View>
            </View>
        </View>
        <View>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize: 20, fontWeight:'bold', margin: 20}}>Total</Text>
              <Text style={{marginLeft: 220,marginTop: 20, fontSize: 20, fontWeight: 'bold', color:'orange'}}><Icon name='dollar'size={20}/>1,527</Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: 50, width:'85%', height: 80, borderRadius: 20,backgroundColor:'#FF7043'}}>
                <Text style={{color:'white',fontSize:18, fontWeight:'bold', alignSelf:'center', paddingTop: 25 }}> Procced to checkout</Text>
            </View>
        </View>
    </View>
    
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
    
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Thongbao') {
            iconName = 'bell';
          }
          else if (route.name === 'Scan') {
            iconName = 'qrcode';
          }
          else if (route.name === 'LichSu') {
            iconName = 'history';
          }
          else if (route.name === 'GioHang') {
            iconName = 'cart-plus';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      >
        <Tab.Screen name="Home" component={HomeScreen} 
              options=
              {{
                  headerShown:false, 
                  title:"",
                  
              }} />
        <Tab.Screen name="Thongbao" component={Thongbao}  options={{headerShown:false, title:""}}/>
        <Tab.Screen name="Scan" component={Scan}  options={{headerShown:false, title:""}}/>
        <Tab.Screen name="LichSu" component={LichSu}  options={{headerShown:false, title:""}}/>
        <Tab.Screen name="GioHang" component={GioHang}  options={{headerShown:false, title:""}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;