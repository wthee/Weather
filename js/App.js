import React, { Component } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, FlatList, ActivityIndicator, Text, View } from 'react-native';
import { Radio, Modal } from 'antd-mobile-rn';
import AsyncStorage from '@react-native-community/async-storage';
import allCity from './city';
import RainText from './RainText'

export default class FetchExample extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            city: "ip",
            type: '0',
            settingShow: false,
            nlShow: '0',
            defaultCity0: 'ip',
            defaultCity1: '北京',
            defaultCity2: '上海',
            addCityShow: false,
            whichDC: 0

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
                    ok_button = '返回'
                }
                Modal.alert(value + '', showResult[index], [
                    {
                        text: ok_button, onPress: () => {
                            this.changeCity(this.state.city)
                        }
                    },
                ])
                return
            }
        })
        if (city.length > 1) {
            allCity.forEach((value) => {
                if (city === value.cityZh) {
                    this.setState({ city: city }, () => {
                        this.getJson(url + 'city=' + city)
                    })
                }
            })
            if (city == 'ip') {
                this.getJson(url + city)
            }
        }
    }

    onItemPress(item) {
        // Modal.alert(item.date + ' ' + item.date_nl, item.win, [
        //     {
        //         text: '返回', onPress: () => {
        //         }
        //     },
        // ]);
    }

    addCity() {
        if (this.state.addCityShow) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        autoFocus = {true}
                        style={{ flexDirection: 'column', flex: 1 }}
                        placeholder='输入城市'
                        onChangeText={(text) => {
                            if (text.length > 1) {
                                switch (this.state.whichDC) {
                                    case 0:
                                        this.setState({ defaultCity0: text, addCityShow: false }, () => {
                                            AsyncStorage.setItem('defaultCity0', this.state.defaultCity0)
                                            AsyncStorage.setItem('location', this.state.defaultCity0)
                                            this.changeCity(this.state.defaultCity0)
                                        })
                                        break
                                    case 1:
                                        this.setState({ defaultCity1: text, addCityShow: false }, () => {
                                            AsyncStorage.setItem('defaultCity1', this.state.defaultCity1)
                                            AsyncStorage.setItem('location', this.state.defaultCity1)
                                            this.changeCity(this.state.defaultCity1)
                                        })
                                        break
                                    case 2:
                                        this.setState({ defaultCity2: text, addCityShow: false }, () => {
                                            AsyncStorage.setItem('defaultCity2', this.state.defaultCity2)
                                            AsyncStorage.setItem('location', this.state.defaultCity2)
                                            this.changeCity(this.state.defaultCity2)
                                        })
                                        break
                                }
                            }
                        }}
                    />
                </View>
            )

        }
        return null
    }

    settingView() {
        if (this.state.settingShow) {
            return (
                <View>
                    <View style={styles.line} />
                    <View style={{ marginStart: 24 }}>
                        <Text />
                        <View>
                            <Text style={styles.setting}>切换城市</Text>
                            <Text />
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onLongPress={() => {
                                        this.setState({
                                            addCityShow: !this.state.addCityShow,
                                            whichDC: 0
                                        })
                                    }}
                                    onPress={() => {
                                        AsyncStorage.setItem('location', this.state.defaultCity0)
                                        this.changeCity(this.state.defaultCity0)
                                    }}>
                                    <Text style={styles.changeCity}>{this.state.defaultCity0}</Text>
                                    <Text />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onLongPress={() => {
                                        this.setState({
                                            addCityShow: !this.state.addCityShow,
                                            whichDC: 1
                                        })
                                    }}
                                    onPress={() => {
                                        AsyncStorage.setItem('location', this.state.defaultCity1)
                                        this.changeCity(this.state.defaultCity1)
                                    }}>
                                    <Text style={styles.changeCity}>{this.state.defaultCity1}</Text>
                                    <Text />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onLongPress={() => {
                                        this.setState({
                                            addCityShow: !this.state.addCityShow,
                                            whichDC: 2
                                        })
                                    }}
                                    onPress={() => {
                                        AsyncStorage.setItem('location', this.state.defaultCity2)
                                        this.changeCity(this.state.defaultCity2)
                                    }}>
                                    <Text style={styles.changeCity}>{this.state.defaultCity2}</Text>
                                    <Text />
                                </TouchableOpacity>
                            </View>
                            {this.addCity()}
                        </View>
                        <View>
                            <Text style={styles.setting}>切换布局</Text>
                            <Text />
                            <View style={{ flexDirection: 'row' }}>
                                <Radio
                                    checked={this.state.type === '0'}
                                    onChange={event => {
                                        if (event.target.checked) {
                                            this.setState({ type: this.state.type = '0' }, () => {
                                                AsyncStorage.setItem('type', this.state.type)
                                            })
                                        }
                                    }}
                                    style={{ margin: 8 }}
                                >
                                    默认
                                </Radio>
                                <Radio
                                    checked={this.state.type === '1'}
                                    onChange={event => {
                                        if (event.target.checked) {
                                            this.setState({ type: this.state.type = '1' }, () => {
                                                AsyncStorage.setItem('type', this.state.type)
                                            })
                                        }
                                    }}
                                    style={{ margin: 8, marginLeft: 30 }}
                                >
                                    测试
                            </Radio>
                            </View>
                        </View>
                        <Text />
                        <View>
                            <Text style={styles.setting}>显示农历</Text>
                            <Text />
                            <View style={{ flexDirection: 'row' }}>
                                <Radio
                                    checked={this.state.nlShow === '0'}
                                    onChange={event => {
                                        if (event.target.checked) {
                                            this.setState({ nlShow: this.state.nlShow = '0' }, () => {
                                                AsyncStorage.setItem('nlShow', this.state.nlShow)
                                            })
                                        }
                                    }}
                                    style={{ margin: 8 }}
                                >
                                    隐藏
                                </Radio>
                                <Radio
                                    checked={this.state.nlShow === '1'}
                                    onChange={event => {
                                        if (event.target.checked) {
                                            this.setState({ nlShow: this.state.nlShow = '1' }, () => {
                                                AsyncStorage.setItem('nlShow', this.state.nlShow)
                                            })
                                        }
                                    }}
                                    style={{ margin: 8, marginLeft: 30 }}
                                >
                                    显示
                            </Radio>
                            </View>
                        </View>
                        <Text />
                        <View>
                            <Text style={styles.setting}>刷新天气</Text>
                            <TouchableOpacity onPress={() => this.changeCity(this.state.dataSource.city)}>
                                <Text style={{ margin: 8, marginLeft: 32 }}>刷新</Text>
                            </TouchableOpacity>
                        </View>
                        <Text />
                    </View>
                    <View style={styles.line} />
                </View>
            )
        }
        return null
    }

    componentDidMount() {
        AsyncStorage.getItem('type')
            .then((type) => {
                if (type != null)
                    this.setState({ type: type })
            })
        AsyncStorage.getItem('nlShow')
            .then((nlShow) => {
                if (nlShow != null)
                    this.setState({ nlShow: nlShow })
            })
        AsyncStorage.getItem('defaultCity0')
            .then((defaultCity) => {
                if (defaultCity != null)
                    this.setState({ defaultCity0: defaultCity }, () => {

                    })
            })
        AsyncStorage.getItem('defaultCity1')
            .then((defaultCity) => {
                if (defaultCity != null)
                    this.setState({ defaultCity1: defaultCity }, () => {

                    })
            })
        AsyncStorage.getItem('defaultCity2')
            .then((defaultCity) => {
                if (defaultCity != null)
                    this.setState({ defaultCity2: defaultCity }, () => {

                    })
            })
        AsyncStorage.getItem('location')
            .then((result) => {
                if (result != null) {
                    this.getJson(url + 'city=' + result)
                } else {
                    this.getJson(url + this.state.city)
                }
            });

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator
                        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} />
                </View>
            )
        }

        return (
            <View style={styles.body}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => this.setState({ settingShow: !this.state.settingShow })}>
                        <Text style={styles.title}> {this.state.dataSource.city}</Text>
                    </TouchableOpacity>
                    {this.settingView()}
                </View>

                <TextInput style={{ flexDirection: 'column', alignItems: 'flex-end' }}
                    placeholder={' 更新于 ' + this.state.dataSource.update_time}
                    onChangeText={(text) => this.changeCity(text)} />

                <FlatList style={{ marginBottom: 0, flex: 1 }}
                    data={this.state.dataSource.data}
                    renderItem={({ item, index }) => <RainText item = {item} type = {this.state.type} nlShow = {this.state.nlShow}></RainText>}
                    keyExtractor={(item, index) => item.date}
                />
                <Text selectable={true} style={styles.footer}>{myUser[0]}</Text>
            </View>
        )
    }

}

const
    styles = StyleSheet.create({
        body: {
            flex: 1,
            justifyContent: 'center'
        },
        title: {
            fontSize: 24,
            color: '#2296eb'
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
        changeCity: {
            marginLeft: 15,
            fontSize: 20
        },
        tipText: {
            fontSize: 16,
            textAlign: 'center',
            color: '#080c11'
        },
        footer: {
            textAlign: 'center',
            color: '#fafafa',
            fontSize: 16,
        }
    })
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