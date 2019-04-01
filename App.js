import React, {Component} from 'react';
import {TouchableOpacity, TextInput, StyleSheet, FlatList, ActivityIndicator, Text, View} from 'react-native';
import {List, Radio, Model, Card, Modal} from 'antd-mobile-rn';
import AsyncStorage from '@react-native-community/async-storage';

var url = 'https://www.tianqiapi.com/api/?version=v2&appid=1001&appsecret=1002&'
var myUser = [
    '隐约雷鸣 阴霾天空 但盼风雨来 能留你在此',
    'WLQ',
    'wthee',
    '随便取个昵称',
    '木木木汐',
    '荻花題葉',
    '桃花太红李太白']
var showResult = [
    '隐约雷鸣 阴霾天空 即使天无雨 我亦留此地',
    '没有你的天气',
    '你好！我是这款app的作者wthee',
    '缘起，在人群中，我看见你！\n缘灭，我看见你，在人群中！\n',
    '没有你的街道，尽是寂寥；\n没有你的时光，近似毒药。\n',
    '我所知道关于你的，只有天气了\n',
    '没有你的酷安，都是基佬']

export default class FetchExample extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            city: "ip",
            type: '0',
            isShowSet: false,
            defaultCity: 'ip'
        }
    }

    getJson(url) {
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, () => {
                    AsyncStorage.setItem('location', responseJson.city)
                })
            })
    }

    changeCity(city) {
        var ok_button = ''
        myUser.forEach((value, index) => {
            if (city === value) {
                if (value === 'wthee') {
                    ok_button = '🤪'
                } else if (value === 'WLQ') {
                    ok_button = '💔'
                } else {
                    ok_button = '✔'
                }
                Modal.alert(value + '', showResult[index], [
                    {
                        text: ok_button, onPress: () => {
                            this.changeCity(this.state.defaultCity)
                        }
                    },
                ])
                return
            }
        })
        if (city.length > 1) {
            if (city == 'ip') {
                this.getJson(url + city)
            } else {
                this.getJson(url + 'city=' + city)
            }
        }
    }

    _OnPress(cityid) {
        // fetch('https://www.tianqiapi.com/api/?version=v6&cityid=' + cityid)
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.setState({
        //             isLoading: false,
        //             info: responseJson,
        //         }, () => {
        //             // Modal.alert('', {}, [
        //             //     //{ text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
        //             //     { text: 'OK', onPress: () => console.log('ok') },
        //             // ]);
        //         })
        //     })
    }

    rainText(item, type) {
        var text = item.date + ' ' + item.week + "\n" + item.tem2 + "-" + item.tem1 + "℃ " + ' ' + item.wea
        var date = item.date.split('-')
        var y = date[0]
        var m = date[1]
        var d = date[2]
        if (text.includes("雨")) {
            var t;
            switch (item.wea.length) {
                case 1:
                    t = '下雨天，记得带伞'
                    break
                case 2:
                    switch (item.wea) {
                        case '小雨':
                            t = "雨虽小，注意保暖别感冒"
                            break
                        case '中雨':
                            t = "记得随身携带雨伞"
                            break
                        case '大雨':
                            t = "出门最好穿雨衣，勿挡视线"
                            break
                        case '阵雨':
                            t = '阵雨来袭，出门记得带伞'
                            break
                        case '暴雨':
                            t = "尽量避免户外活动"
                            break
                    }
                    break
                case 3:
                    if (text.includes('转'))
                        t = "天气多变，照顾好自己"
                    switch (this.props.type) {
                        case '雷阵雨':
                            t = "尽量减少户外活动"
                            break
                        case '大暴雨':
                            t = "尽量避免户外活动"
                            break
                        case '雨夹雪':
                            t = '道路湿滑，步行开车要谨慎'
                            break
                    }
                    break
                default:
                    t = "天气多变，照顾好自己"
            }
            if (type === '0') {
                return (
                    <TouchableOpacity onPress={() => this._OnPress(item.cityid)}>
                        <Text style={styles.mainText}>{text}</Text>
                        <Text style={styles.tipText}>{t + '\n'}</Text>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <View>
                        <View style={{flexDirection: 'row', backgroundColor: '#f0f0f0'}}>
                            <View style={{padding: 5, justifyContent: 'center', alignItems: 'center', height: 100}}>
                                <Text style={{fontSize: 30, color: '#66c6f0'}}>{d}</Text>
                                <Text style={{fontSize: 18}}>    {m}</Text>
                            </View>
                            <View style={{padding: 2, justifyContent: 'center', alignItems: 'center', height: 100}}>
                                <Text style={{fontSize: 13, color: '#66c6f0'}}>{item.week}</Text>
                            </View>
                            <View style={{
                                margin: 3,
                                padding: 10,
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                flex: 1,
                                backgroundColor: '#fafafa'
                            }}>
                                <Text style={{
                                    textAlign: 'right',
                                    fontSize: 18
                                }}> ·{item.tem2 + "-" + item.tem1 + "℃ "}</Text>
                                <Text style={{textAlign: 'right', fontSize: 18}}> ·{item.wea}</Text>
                                <Text style={{textAlign: 'right', fontSize: 18}}> ·{t}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        }
        return null
    }

    settingView(type, defaultCity) {
        if (this.state.isShowSet) {
            return (
                <View>
                    <View style={styles.line}/>
                    <View style={{marginStart: 24}}>
                        <Text/>
                        <View>
                            <Text style={styles.setting}>默认城市</Text>
                            <View>
                                <TextInput style={{flexDirection: 'column', alignItems: 'flex-start'}}
                                           placeholder={defaultCity}
                                           onChangeText={(text) => this.setState({defaultCity: text}, () => {
                                               AsyncStorage.setItem('defaultCity', this.state.defaultCity)
                                           })}/>
                                <TouchableOpacity
                                    onPress={() => this.setState({defaultCity: defaultCity}, () => {
                                        this.changeCity(this.state.defaultCity)
                                    })}>
                                    <Text style={{margin: 5}}>回到默认城市</Text>
                                    <Text/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.setting}>切换布局</Text>
                            <Text/>
                            <Radio
                                checked={type === '0'}
                                onChange={event => {
                                    if (event.target.checked) {
                                        this.setState({type: this.state.type = '0'}, () => {
                                            AsyncStorage.setItem('type', this.state.type)
                                        })
                                    }
                                }}
                                style={{margin: 8}}
                            >
                                默认
                            </Radio>
                            <Radio
                                checked={type === '1'}
                                onChange={event => {
                                    if (event.target.checked) {
                                        this.setState({type: this.state.type = '1'}, () => {
                                            AsyncStorage.setItem('type', this.state.type)
                                        })
                                    }
                                }}
                                style={{margin: 8}}
                            >
                                测试
                            </Radio>
                        </View>
                        <Text/>
                        <View>
                            <Text style={styles.setting}>刷新天气</Text>
                            <TouchableOpacity onPress={() => this.changeCity(this.state.dataSource.city)}>
                                <Text style={{margin: 8}}>刷新</Text>
                            </TouchableOpacity>
                        </View>
                        <Text/>
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        return null
    }

    componentDidMount() {
        AsyncStorage.getItem('type')
            .then((type) => {
                if (type != null)
                    this.setState({type: type})
            })
        AsyncStorage.getItem('defaultCity')
            .then((defaultCity) => {
                if (defaultCity != null)
                    this.setState({defaultCity: defaultCity})
            })
        return AsyncStorage.getItem('location')
            .then((result) => {
                if (result != null) {
                    return this.getJson(url + 'city=' + result)
                }
                return this.getJson(url + this.state.city)
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1}}>
                    <ActivityIndicator
                        style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}/>
                </View>
            )
        }

        return (
            <View style={styles.body}>
                <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                    <TouchableOpacity
                        onPress={() => this.setState({isShowSet: !this.state.isShowSet})}>
                        <Text style={styles.sTitle}> {this.state.dataSource.city}</Text>
                    </TouchableOpacity>
                    {this.settingView(this.state.type, this.state.defaultCity)}
                </View>

                <TextInput style={{flexDirection: 'column', alignItems: 'flex-end'}}
                           placeholder={' 更新于 ' + this.state.dataSource.update_time}
                           onChangeText={(text) => this.setState({city: text}, () => {
                               this.changeCity(this.state.city)
                           })}/>

                <FlatList style={{marginBottom: 0, flex: 1}}
                          data={this.state.dataSource.data}
                          renderItem={({item, index}) => this.rainText(item, this.state.type)}
                          keyExtractor={(item, index) => item.date}
                />

                <Text selectable={true} style={styles.footer}>{myUser[0]}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center'
    },
    sTitle: {
        fontSize: 24,
        color: '#66c6f0'
    },
    setting: {
        fontSize: 18,
        color: '#0d131c'
    },
    line: {
        height: 3,
        backgroundColor: '#f0f0f0'
    },
    mainText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#0d131c'
    },
    tipText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#080c11'
    },
    footer: {
        textAlign: 'center',
        color: '#fafafa',
        fontSize: 20,
    }
})
