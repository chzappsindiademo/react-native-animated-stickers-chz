import React, { Component, useEffect, useState } from 'react'
import PropTypes from "prop-types";
import AnimatedLottieView from 'lottie-react-native';
import info from '../Data/info';
import extras from '../Data/extras';


const __Local_Patient_View = (props) => {

    const [data, setData] = useState()
    const files = require('../Data/demo.json').concat(extras.emoji)

    useEffect(() => {
        check()
    }, [props])

    const check = async () => {
        try {
            const m = await props.types.source.replace(info.format, '')
            const f = await m.replace(info.item_end, '')
            const demo = require('../Data/demo.json').concat(extras.emoji)
            const data = await demo.some(item => {
                if (item.name === f) {
                    getSticker(item.name)
                }
            })
            data
        } catch (error) {

        }
    }

    const getSticker = (name) => {
        const find = files.filter(item => {
            if (item.name === name) {
                return item
            } else {
                return undefined;
            }
        })
        try {
            if (find) {
                var datas = JSON.stringify(find);
                var datas2 = datas.replace('[', '')
                var data3 = datas2.replace(']', '')
                var data4 = JSON.parse(data3)
                setSticker(data4.url)
            }
        } catch (error) {
            console.warn('React native sticker says : It\'s not a valid sticker type!!!')
        }
    }

    const setSticker = (data) => {
        fetch(data, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseData) => {
                setData(responseData)
            })
            .catch((error) => {
                console.warn(error + 'React Native animated sticker');
            })
    }

    return (
        data ? <AnimatedLottieView
            source={data}
            loop={props.types.loop}
            autoPlay={props.types.autoPlay}
            style={{
                height: props.types.stickerHeight,
                width: props.types.stickerWidth
            }}
        /> : null
    )
}

export default __Local_Patient_View;

__Local_Patient_View.defaultProps = {
    height: 30,
    width: 30,
    autoPlay: true,
    source: '@chzapps/sticker/@render/_emoji_kiss.sticker.no.start.apps/auto/false/size=userPref,{render=true}/@data/ims'
}



/**
 * Animated View
 * @augments {Component<Props, State>}
 */
