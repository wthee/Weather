import React, {Component} from 'react';
import {TouchableOpacity, TextInput, StyleSheet, FlatList, ActivityIndicator, Text, View} from 'react-native';
import { Model,Card, Modal} from 'antd-mobile-rn';
import AsyncStorage from '@react-native-community/async-storage';
var s = "隐约雷鸣 阴霾天空 但盼风雨来 能留你在此"
var url = 'https://www.tianqiapi.com/api/?version=v2&appid=1001&appsecret=1002&'
var myUser = ['隐约雷鸣 阴霾天空 但盼风雨来 能留你在此','WLQ','wthee','随便取个昵称','木木木汐','荻花題葉']
var showResult = ['隐约雷鸣 阴霾天空 即使天无雨 我亦留此地','没有你的天气','你好！我是这款app的作者wthee','缘起，在人群中，我看见你！\n缘灭，我看见你，在人群中！\n','没有你的街道，尽是寂寥；\n没有你的时光，近似毒药。\n','我所知道关于你的，只有天气了\n']
export default class FetchExample extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            city: "ip",
            type: '0'
        }
    }

    getJson(url){
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                },()=>{
                    AsyncStorage.setItem('location',responseJson.city)
                })
            })
    }
    changeCity(){
        var ok_button=''
        myUser.forEach((value,index)=>{
            if(this.state.city===value){
                if(value==='wthee'){
                    ok_button = '🤪'
                }else if(value==='WLQ'){
                    ok_button = '💔'
                }else {
                    ok_button = '✔'
                }
                Modal.alert(value+'', showResult[index], [
                    { text: ok_button, onPress: () => console.log('ok') },
                ]);
                return
            }
        })
        if(this.state.city.length>1){
            if(this.state.city=='ip'){
                this.getJson(url+this.state.city)
            }else{
                this.getJson(url+'city='+this.state.city)
            }
        }
    }
    _OnPress(cityid){
        fetch('https://www.tianqiapi.com/api/?version=v6&cityid='+cityid)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    info: responseJson,
                },()=>{
                    // Modal.alert('', {}, [
                    //     //{ text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
                    //     { text: 'OK', onPress: () => console.log('ok') },
                    // ]);
                })
            })
    }
    rainText(item,type){
        var text = item.date +' '+ item.week + "\n" +item.tem2 + "-"+ item.tem1 + "℃ "  + ' ' + item.wea
        if (text.includes("雨")) {
            var t;
            switch (item.wea.length) {
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
            if(type==='0') {
                return (
                    <TouchableOpacity onPress={() => this._OnPress(item.cityid)} >
                        <Text style={styles.mainText}>{text}</Text>
                        <Text style={styles.tipText}>{t+'\n'}</Text>
                    </TouchableOpacity>
                )
            }else {
                return (
                    <View>
                        <Card full={true} style={{marginBottom: 5}}>
                            <Card.Header
                                title={item.date}
                                extra={item.week}
                            />
                            <Card.Body>
                                <Text style={styles.mainText}>{item.wea}</Text>
                            </Card.Body>
                            <Card.Footer
                                content={t}
                                extra={item.tem2 + "-"+ item.tem1 + "℃ "}
                            />
                        </Card>
                    </View>
                )
            }
        }
        return null
    }

    componentDidMount() {
        AsyncStorage.getItem('type')
            .then((type)=>{
                this.setState({
                    type: type
                },()=>{
                    return AsyncStorage.getItem('location')
                        .then((result)=> {
                            if(result!=null){
                                return this.getJson(url+'city='+result)
                            }
                            return this.getJson(url+this.state.city)
                        });
                })
            })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1}}>
                    <ActivityIndicator style={{flex:1 ,flexDirection: 'column',justifyContent: 'center' ,alignItems: 'center'}}/>
                </View>
            )
        }

        return (
            <View style={styles.body}>
                <View style={{flexDirection: 'row',alignItems: 'flex-end'}}>
                    <TouchableOpacity onPress={() =>this.setState({type: this.state.type==='0'?'1':'0'},()=>{
                        AsyncStorage.setItem('type',this.state.type)
                    })}>
                        <Text style={styles.sTitle}> {this.state.dataSource.city}</Text>
                    </TouchableOpacity>
                </View>
                <TextInput style={{flexDirection: 'column',alignItems: 'flex-end'}}
                           placeholder={' 更新于 '+this.state.dataSource.update_time}
                           onChangeText={(text) => this.setState({city: text},()=>{
                               this.changeCity()
                           })}/>

                <FlatList style={{marginBottom: 0 ,flex: 1}}
                          data={this.state.dataSource.data}
                          renderItem={({item,index}) => this.rainText(item,this.state.type)}
                          keyExtractor={(item, index) => item.date}/>

                <Text selectable={true} style={styles.footer}>{s}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        color: '#00a7ee'
    },
    sTitle: {
        fontSize: 22,
        color: '#00a7ee'
    },
    mainText:{
        fontSize: 16,
        textAlign: 'center',
        color: '#0d131c'
    },
    tipText:{
        fontSize: 16,
        textAlign: 'center',
        color: '#080c11'
    },
    footer:{
        textAlign: 'center',
        color: '#fafafa',
        fontSize: 20,
    }
})
