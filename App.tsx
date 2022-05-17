import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import InitApp from './src/InitApp';
import { Provider } from 'react-redux';
import generateStore from './src/redux/store';
import { Provider as PaperProvider } from 'react-native-paper';
import AnimatedLottieView from 'lottie-react-native';
import FlashMessage from 'react-native-flash-message';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  const store = generateStore();
  const [lottieLoad, setLottieLoad] = useState(false);
  const [fontsLoaded] = useFonts({
    Knewave: require('./assets/fonts/Knewave-Regular.ttf'),
    IrishGrover: require('./assets/fonts/IrishGrover-Regular.ttf')
    });
    
    useEffect(()=>{
      setTimeout(() => {
        setLottieLoad(true)
      }, 6000);
    },[])
    if(!fontsLoaded) return <Image style={{height:'100%', width:'100%'}} source={require('./assets/splash.png')} />;
    
    if (!lottieLoad) {
      return (
        <AnimatedLottieView duration={4000}
          autoPlay
          style={styles.splash}
          source={require('./assets/animation.json')}
        />)
    }

  return (
    <Provider store={store}>
      <PaperProvider>
        <FlashMessage position="top" />
        <InitApp />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17344f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splash: {    
    backgroundColor: '#17344f',
  },
});
