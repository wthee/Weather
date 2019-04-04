import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default class RainText extends Component{

    constructor(props){
        super(props)
        this.state=({
            test: "66666"
        })
    }

    nlDate(item, style) {
        if (this.props.nlShow === '1')
            return <Text style={style}> {item.date_nl}</Text>
        return null
    }

    render(){
        var item = this.props.item
        var type = this.props.type
        var date = item.date.split('-')
        var y = date[0]
        var m = date[1]
        var d = date[2]
        if (item.wea.includes("雨")) {
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
                    if (item.wea.includes('转'))
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
                    <TouchableOpacity onPress={() => {}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.mainText}>{item.date}</Text>
                            {this.nlDate(item, styles.mainText)}
                            <Text style={styles.mainText}> {item.week}</Text>
                        </View>
                        <Text style={styles.mainText}>{item.tem2 + "-" + item.tem1 + "℃ "} {item.wea}</Text>
                        <Text style={styles.tipText}>{t + '\n'}</Text>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#f0f0f0' }}>
                            <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center', height: 100 }}>
                                <Text style={{ fontSize: 30, color: '#2296eb' }}>{d}</Text>
                                <Text style={{ fontSize: 18 }}>    {m}</Text>
                            </View>
                            <View style={{
                                textAlign: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 100
                            }}>
                                {this.nlDate(item, { fontSize: 12, color: '#2296eb' })}
                                <Text style={{ fontSize: 12, color: '#2296eb' }}>{item.week}</Text>
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
                                <Text style={{ textAlign: 'right', fontSize: 18 }}> ·{item.wea}</Text>
                                <Text style={{ textAlign: 'right', fontSize: 18 }}> ·{t}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        }
        return null
    }

}

const
    styles = StyleSheet.create({
        mainText: {
            fontSize: 16,
            textAlign: 'center',
            color: '#0d131c'
        },
        tipText: {
            fontSize: 16,
            textAlign: 'center',
            color: '#080c11'
        }
    })
