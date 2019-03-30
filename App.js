import React, {Component} from 'react';
import {TextInput, StyleSheet, FlatList, ActivityIndicator, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class RainText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false}

        setInterval(() => {
            this.setState({isShow: this.props.text.includes("雨")});
        }, 300)

    }

    render() {
        if (!this.state.isShow) {
            return null
        }

        return (
            <Text style={styles.mainText}>{this.props.text}</Text>
        )
    }
}


var s = "隐约雷鸣 阴霾天空 但盼风雨来 能留你在此"
var url = 'https://www.tianqiapi.com/api/?version=v2&appid=1001&appsecret=1002&'

export default class FetchExample extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            city: "ip",
            allHide: true
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
        if(this.state.city===s){
            alert("隐约雷鸣 阴霾天空 即使天无雨 我亦留此地")
        }else if(this.state.city.length>1){
            if(this.state.city=='ip'){
                this.getJson(url+this.state.city)
            }else{
                this.getJson(url+'city='+this.state.city)
            }
        }
    }

    componentDidMount() {
         return AsyncStorage.getItem('location')
            .then((result)=> {
                if(result!=null){
                    return this.getJson(url+'city='+result)
                }
                return this.getJson(url+this.state.city)
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }


        return (
            <View style={styles.body}>
                <View style={{flexDirection: 'row',alignItems: 'flex-end'}}>
                    <Text style={styles.sTitle} onPress={this.onPress}> {this.state.dataSource.city}</Text>
                </View>

                <TextInput
                    placeholder={' 更新于 '+this.state.dataSource.update_time}
                    onChangeText={(text) => this.setState({city: text},()=>{
                        this.changeCity()
                    })}/>

                <FlatList style={{marginBottom: 40 ,flex: 1}}
                          data={this.state.dataSource.data}
                          renderItem={({item}) => <RainText text={item.date + "\n"
                          +item.tem2 + "-"+ item.tem1 + "℃ " + item.week + "\n"
                          + item.wea + "\n"}></RainText>}
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
    footer:{
        textAlign: 'center',
        color: '#fafafa',
        fontSize: 20,
    }
})
