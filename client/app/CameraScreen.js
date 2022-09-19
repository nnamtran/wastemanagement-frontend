import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, SafeAreaView, TextInput, KeyboardAvoidingView, ScrollView, Keyboard, TouchableWithoutFeedback, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
const COLORS = {primary: '#FFE7C9' , white: '#FFF'};

const CameraScreen = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [barcode, setBarcode] = useState('');
    


    const navigator = useNavigation();
    const getResult = () => {
        if (barcode === '') {
            return null
        } else {
            navigator.navigate('Result', {
                barcode: barcode
            });
            setBarcode('')
        } 
    }


    // Scanning part
    const askForCameraPermission = () => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setBarcode(data)
        console.log('Type: ' + type + '\nData: ' + data)
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
        <View style={styles.container}>
            <Text>Requesting for camera permission</Text>
        </View>)
    }
    if (hasPermission === false) {
        return (
        <View style={styles.container}>
            <Text style={{ margin: 10 }}>No access to camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>)
    }


    //  049000067316

    // Return the View
    return (
        <SafeAreaView style={styles.container}>
            
            <KeyboardAvoidingView style={styles.inputContainer} behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                    <TextInput
                        placeholder="Enter barcode"
                        keyboardType="number"
                        style={styles.barcodeInput}
                        onChangeText={(newBarcode) => {
                            setBarcode(newBarcode);
                            console.log(barcode)}}/>
            </KeyboardAvoidingView>
            <View style={styles.camera}>
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: '100%', width: '100%' }} />
            </View>                    
            {/* {scanned && <Button style={{}} title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />} */}
            
            <View style={{height: 50, width: '80%'}}>          
                <TouchableOpacity
                    style={styles.btn}
                    onPress={getResult}
                >
                        <Image source={require('../images/button/button.png')} style={{height: 30, width: 30, resizeMode: 'contain', margin: 10}}/>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>RECYCLE NOW!</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddf0f6',
        height: '100%',
        alignItems: 'center'
    },
    camera: {
        marginBottom: "50%",
        alignItems: 'center',
        height: '50%',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: COLORS.primary
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        margin: '10%'
    },
    barcode: {
        fontSize: 32,
        fontFamily: 'Figtree',
        fontWeight: 'bold',
        color: '#654321',
        marginBottom: '3%'
    },
    barcodeInput: {
        backgroundColor: 'white',
        height: 30,
        width: 250,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#062639',
        textAlign: 'center'
    },
    maintext: {
        textAlign: 'center',
        showsVerticalScrollIndicator: true,
        fontSize: 24,
        margin: 10,
        width: 250,
        height: 30,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'white',
        borderRadius: '25%',
        border: '1px solid red'
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        borderRadius: 5,
        backgroundColor: '#2FF924',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFF',
        borderRadius: 100,
    }
    });

export default CameraScreen