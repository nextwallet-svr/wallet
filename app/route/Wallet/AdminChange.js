import React from 'react';
import { connect } from 'react-redux'
import {Dimensions,DeviceEventEmitter,InteractionManager,ListView,StyleSheet,View,RefreshControl,Text,ScrollView,Image,Platform,Clipboard,TextInput,KeyboardAvoidingView,TouchableOpacity,TouchableHighlight} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import UColor from '../../utils/Colors'
import Button from  '../../components/Button'
import Item from '../../components/Item'
import Icon from 'react-native-vector-icons/Ionicons'
import UImage from '../../utils/Img'

import { EasyToast } from '../../components/Toast';
import BaseComponent from "../../components/BaseComponent";
var dismissKeyboard = require('dismissKeyboard');
@connect(({login}) => ({...login}))
class AdminChange extends BaseComponent {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: params.account_name,
            headerStyle: {
            paddingTop:Platform.OS == 'ios' ? 30 : 20,
            backgroundColor: UColor.mainColor,
            borderBottomWidth:0,
        },
        headerRight: (<Button  onPress={navigation.state.params.onPress}>  
            <Text style={{color: UColor.arrow, fontSize: 18,justifyContent: 'flex-end',paddingRight:15}}>提交</Text>
        </Button>),    
        };
    }

    submission = () =>{  
        // const { navigate } = this.props.navigation;
        // navigate('MortgageRecord', {account_name: this.props.navigation.state.params.account_name});
        EasyToast.show("submission")
    }  

  constructor(props) {
    super(props);
    this.props.navigation.setParams({ onPress: this.submission});
    this.state = {
        ownerPk: '',
        activePk: '',
        accountName:'',
        threshold:'1',//权阀值
      }
  }
    //组件加载完成
    componentDidMount() {
        this.setState({
            ownerPk: this.props.navigation.state.params.ownerPublicKey,
            activePk: this.props.navigation.state.params.activePublicKey,
            accountName:this.props.navigation.state.params.account_name,
        })
    }
  
  componentWillUnmount(){
    //结束页面前，资源释放操作
    super.componentWillUnmount();
  }
 
  transferByOwner() {
    // Clipboard.setString(this.state.ownerPk);
    EasyToast.show("这个是跳转到过户")
  }

  manageByActive() {
    // Clipboard.setString(this.state.activePk);
    EasyToast.show("这个跳转到管理")
  }

  dismissKeyboardClick() {
    dismissKeyboard();
  }

  render() {
    return <View style={styles.container}>
        

      <ScrollView keyboardShouldPersistTaps="always">
        {/* <View style={styles.header}> */}
            {/* <View style={styles.inptoutbg}> */}

                {this.state.activePk != '' && 
                <View style={styles.inptoutgo} >
                    <View style={{flexDirection:'row',flex:1}}>
                            <Text style={styles.inptitle}>Active关联公钥（管理者）</Text>
                            <View style={styles.buttonView}>
                                <Text style={styles.weightText}>权阀总值  </Text>
                                <Text style={styles.buttonText}>{this.state.threshold}</Text>
                            </View>
                    </View>
                    <View style={{flexDirection:'row',flex:1}}>
                        <Text style={styles.pktext}>{this.state.activePk}</Text>
                    </View>
                </View>
                }


                {this.state.activePk != '' && <View style={styles.inptoutgo} >
                    <View style={{flexDirection:'row',flex:1}}>
                            <Text style={styles.inptitle}>Active关联公钥（管理者）</Text>

                            <View style={styles.buttonView}>
                                <Text style={styles.weightText}>权阀总值  </Text>
                                <Text style={styles.buttonText}>{this.state.weightValue}</Text>
                            </View>

                    </View>
                    <View style={{flexDirection:'row',flex:1}}>
                        <Text style={styles.pktext}>{this.state.activePk}</Text>
                    </View>
                </View>
                }


              
            {/* </View>
        </View> */}
      </ScrollView>
    </View>
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: UColor.secdColor,
    },
    scrollView: {

    },
    header: {
        marginTop: 50,
        backgroundColor: UColor.secdColor,
    },
    inptoutbg: {
        backgroundColor: UColor.mainColor,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,


    },
    inptoutgo: {
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 20,
        backgroundColor: UColor.mainColor,
        marginLeft:10,
        marginRight:10,
        
    },
    inptitle: {
        // flex: 1,
        fontSize: 15,
        lineHeight: 30,
        color: UColor.fontColor,
    },
     // 按钮  
    buttonView: {
        flex: 1,
        flexDirection: "row",
        // paddingHorizontal: 5,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    buttonText: {
        fontSize: 12,
        lineHeight: 30,
        color:  UColor.tintColor,
    },

    inptgo: {
        flex: 1,
        height: 60,
        paddingHorizontal: 10,
        backgroundColor: UColor.secdColor,
    },
    inptext: {
        fontSize: 14,
        lineHeight: 25,
        color: UColor.arrow,
    },
    textout: {
            paddingHorizontal: 16,
            paddingVertical: 10,
    },
    titletext: {
        fontSize: 15,
        color: UColor.fontColor,
        paddingVertical: 8,
    },
    explaintext: {
        fontSize: 13,
        color: UColor.fontColor,
        paddingLeft: 20,
        paddingVertical: 5,
        marginBottom: 10,
        lineHeight: 25,
    },
    imgBtn: {
        width: 20,
        height: 20,
        lineHeight:30,
        marginBottom: 5,
        marginHorizontal:5,
      },

    pktext: {
        fontSize: 14,
        lineHeight: 25,
        color: UColor.arrow,
    },
    weightText: {
        fontSize: 12,
        lineHeight: 30,
        color:  UColor.arrow,
    },

});

export default AdminChange;
