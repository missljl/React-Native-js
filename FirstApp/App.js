/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  SectionList,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
  Dimensions,
  View
} from 'react-native';
//广告轮播第三方控件无法添加点击事件
import Swiper from 'react-native-swiper';


var ljlmanager = require('NativeModules').LjlCaleManager;
const kbljlmanager = new NativeEventEmitter(ljlmanager); 
var imageswidth = Dimensions.get('window').width;//获取屏幕宽度

//给ios传值
var NativeTest =  require('react-native').NativeModules.FirstViewController;

// //轮播图片
var images = [
  {uri:('http://ac-c6scxa78.clouddn.com/f6b64dc4bf7bee56.jpg')},
  {uri:('http://ac-c6scxa78.clouddn.com/91ead58b0bb213b6.jpg')},
  {uri:('http://ac-c6scxa78.clouddn.com/d67316858f6c71f3.jpg')},
  {uri:('http://ac-c6scxa78.clouddn.com/c81c5b7be1838a1e.jpg')},
  
];


type Props = {};
export default class App extends Component<Props> {

//构造器
constructor(props) {
  super(props);
//当前页
  this.page=1

  this.state = {
    dataArray: [],
    load: false,
    //下啦刷新
    isRefresh:false,
    //加载更多
    isLoadMore:false,
  
  };
  // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
  // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
 this.fetchData = this.fetchData.bind(this);
 
 
}
  //分割线
  _separator = () => {
    return <View style={{height:2,backgroundColor:'blue'}}/>
   };

   _onButton(){

   alert("dddddd");    
   }

//网络加载
fetchData() {
  fetch("http://mobile.ximalaya.com/mobile/v1/album/track/ts-1499312754612?albumId=260769&device=iPhone&isAsc=true&pageId=" + this.page + "&pageSize=20&")
    .then((response) => response.json())

    .then((responseData) => {
      if(this.page === 1){
        console.log("重新加载")
       //console.log(responseData.data.list);
      // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
      this.setState({
        load: true,        
        dataArray: responseData.data.list,
      });

      }else{
        console.log("加载更多")

        this.setState({
            // 加载更多 这个变量不刷新
            isLoadMore : false,
            // 数据源刷新 add
            dataArray: this.state.dataArray.concat(responseData.data.list),
        });
      }
    }); 
};
//上啦刷新
_onRefresh=()=>{
  if(!this.state.isRefresh){
    this.state = {
      dataArray: []};
    this.page = 1
    this.fetchData()
    console.log("刷新" + this.page)
  }
};
//加载更多
_onLoadMore=()=>{
  // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
  if (!this.state.isLoadMore && this.state.dataArray.length > 0){
      this.page = this.page + 1
      this.fetchData()
      console.log("加载更多" + this.page)
  }
};



  render() {
    if (!this.state.load) {
      return <Text>加载中...</Text>
  }
//渲染fliatlsit
  return (this.renderView(this.state.dataArray));
}

componentWillMount(){
  // 监听原生 发送的通知
  this.listener = kbljlmanager.addListener(
      'EventEmitterManagerEvent',
      (data) => Alert.alert('来了 来了 ->'+ data)
  );
} 

//耗时加载
componentDidMount() {
  this.fetchData();


//ljlmanager.postNotificationEvent('张杨事件传递');
}
componentWillUnmount(){
  this.listener.remove();
}
//分组list
    //  <View style={styles.container}>
    //  <SectionList sections={[{title: 'd',data:['devin']},{title:'j',data:['jackson','james','jillian','jimmy','joel','julie']},]}
    //  renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
    //  renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
    //  ItemSeparatorComponent={this._separator}
    //  />
    // </View>
    //  <View style={styles.container}>
    
    // <Button style={styles.item}
    // onPress={this.fetchData}
    //   title='按钮'/>
    
    // </View>

   //flatlist+fetch加载网络数据 
    renderView() {
      return (   
        <FlatList
        style={styles.flatlistlayout}
        data={this.state.dataArray}
        //es6写法,es5写法:this.renderRow
        renderItem={this.renderRow.bind(this)}
        //头部试图
      ListHeaderComponent={this.listHeaderComponet}
      //分割线
      ItemSeparatorComponent={this._separator}
      //下拉刷新
      onRefresh={()=>this._onRefresh()}
      refreshing={this.state.isRefresh}
      //加载更多
      onEndReached={() => this._onLoadMore()}
      onEndReachedThreshold={0.1}

       keyExtractor={this.keyExtractor}
      />
      );

  }


  keyExtractor(item: Object, index: number) {
    return item.title
   }

 //item布局
  renderRow({item,index}) {
    return (
      <TouchableOpacity onPress={this.cellAction.bind(this,item,index)}>
     
      <View style={styles.container}>
      <Image
        source={{uri: item.coverLarge}}
        style={styles.thumbnail}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.year}>{item.nickname}</Text>
      </View>
    </View>
    </TouchableOpacity>
        
    )
}
//item点击事件
cellAction =(item,index)=>{
  
  // //给原生传值,并且原生返回值给rn端
  NativeTest.doSomething(item.title,(error,events)=>{
    if(error) {
      console.error(error);
    }else{
     this._onButton();
     
    }
  });


}

//头部试图
listHeaderComponet() {
return(
//   //第一个参数:布局,第二个:自动轮播,第三个:停留时间
  <Swiper style={styles.sectionHeader} autoplay={true} autoplayTimeout={3.0}
  //默认小圆点
  dot={<View style={{backgroundColor:'rgba(0,0,0,.5)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
  //设置当前小圆点
  activeDot={<View style={{backgroundColor: 'yellow', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
  //设置小圆点位置
  paginationStyle={{
    bottom: 10, left: null, right: 10
}}
>        
            <View style={styles.slide1}>    
            <Image style={styles.text}
                 source={{uri: 'http://ac-c6scxa78.clouddn.com/f6b64dc4bf7bee56.jpg'}}
                />                   
            </View>
            <View style={styles.slide1}>
            <Image style={styles.text}
                 source={{uri: 'http://ac-c6scxa78.clouddn.com/91ead58b0bb213b6.jpg'}}
                />
            </View>
            <View style={styles.slide1}>
            <Image style={styles.text}
                 source={{uri: 'http://ac-c6scxa78.clouddn.com/d67316858f6c71f3.jpg'}}
                />    
            </View> 
        </Swiper>
)}
     




  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
   
    //距离上下左右多少像素,top,bottom,left,right
    //witdh/height:宽高
    //paddingTop/Right/left/bottom:子元素到顶部内边距 padding//上下左右
    //margin:和padding都是跳转到边框的距离的
   // alignItems: 'center',
   //paddingTop: 22,
   
  },
  flatlistlayout: {
     
    flex: 1,
    top: 64,
    marginBottom: 64,
    
  },
  sectionHeader: {
  
  //  paddingTop: 2,
  //  paddingLeft: 10,
  //  paddingRight: 10,
  //  paddingBottom: 2,
   height:300,
   
   
   backgroundColor: 'yellow',

  },
  itemb: {
  padding: 10,
  fontSize:18,
  height:44,
  //color:'blue',
 // backgroundColor: 'red',
  },
  //falitlistText控件
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    
  },
  //falitlist中的image控件
  thumbnail: {
    
    width: 120,
    height: 120,
    //
    borderRadius: 10,
    marginTop: 5,
    marginLeft:5,
    marginBottom:5,
    marginRight:5,
  },
  year: {
    textAlign: 'center',
  },
  rightContainer: {
    flex: 1,
  },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },

  slide1: {
    flex: 1,
   // justifyContent: 'center',
   // alignItems: 'center',
    backgroundColor: '#9DD6EB'
},

text: {
  width:imageswidth,
  height:300,
    //color: '#fff',
   // fontSize: 30,
    //fontWeight: 'bold'
},

page: {  
  // width: imageswidth,//设备宽(只是一种实现，此处多余)  
  flex: 1,  
  height: 130,  
 
  //resizeMode: 'stretch'  
}
});
