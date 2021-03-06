/**
 * @author zhangyi
 * @date 2018/5/18
 */

import * as React from 'react'
import { Component } from 'react';
import {
    Alert,
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import QRScanner from './QRScanner'


type Props = {};

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
export default class App extends Component<Props> {
    data = '';

    state = {
        openLight: false
    };

    toggleLight = ()=>{
        this.setState((preState:any)=>{
            return {
                openLight: !preState.openLight
            }
        })
    };

    onBarCodeRead = (event:any) => {
        console.log('onBarCodeRead event:', event);

        if (!this.data) {
            this.data = event.data;
            Alert.alert('data', this.data, [
                {text: 'OK', onPress: () => this.data = ''},
            ],)
        }
    };

    getWidth = (width:number) => {
        if (typeof width === 'number') {
            const designWidth = 375;
            return Math.round(width * deviceWidth / designWidth)
        }
        return width;
    };

    getHeight = (height:number) => {
        if (typeof height === 'number') {
            const designHeight = 667;
            return Math.round(height * deviceHeight / designHeight)
        }
        return height;
    };

    render() {
        const height = this.getHeight(250);
        const width = this.getWidth(250);

        const { openLight } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>扫码组件</Text>
                </View>
                <QRScanner
                    height={height}
                    width={width}
                    openLight={openLight}
                    onBarCodeRead={this.onBarCodeRead}
                    renderBottomView={()=>{
                        let text = openLight ? '关闭闪光灯' : '打开闪光灯';
                        return (
                            <View style={styles.bottomWrap}>
                                <TouchableOpacity onPress={this.toggleLight}>
                                    <View style={styles.lightBtn}>
                                        <Text style={styles.btnText}>{text}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        height: (Platform.OS === 'ios') ? 70 : 50,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        color: '#333',
        fontSize: 18
    },

    bottomWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lightBtn: {
        width: 140,
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: '#fff',
        fontSize: 18
    }
});