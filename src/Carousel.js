
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, FlatList, View, Text } from 'react-native';

const data = [
  {backgroundColor: 'red'},
  {backgroundColor: 'green'},
  {backgroundColor: 'blue'},
  {backgroundColor: 'cyan'},
  {backgroundColor: 'yellow'},
  {backgroundColor: 'purple'},
  {backgroundColor: 'orange'},
];

const itemHeight = 98;

const Carousel = (props) => {

  const ticker = useRef();
  const [delay, setDelay] = useState(32);
  // const [focusIndex, setFocusIndex] = useState(0);
  // const [currentPosition, setCurrentPosition] = useState(0); 

  const [state, setState] = useState({
    currentPosition: 0,
    // scrolling: false,
    // momentumScrolling: false,
  });

  useInterval(() => {
    scrolling();
  }, delay);

  const scrolling = () => {
    const {currentPosition} = state;

    // Increment position with each new interval
    const position = currentPosition + 20.5;
    ticker.current.scrollToOffset({ offset: position, animated: false });
    const maxOffset = data.length * itemHeight;
    // Set animation to repeat at end of scroll
    if (currentPosition > maxOffset) {
      const offset = 0;
      ticker.current.scrollToOffset({ offset, animated: false });
      setState(prevState => { return { ...prevState, currentPosition: offset }; });
    }
    else {
      setState(prevState => { return { ...prevState, currentPosition: position }; });
    }
  };

  const getWrappedData = () => {
    const overlappingNo = getOverlappingNo();
    return {
      data: [...data, ...data.slice(0, overlappingNo)],
    };
  };

  const getOverlappingNo = () => {
    const {length} = data;
    let overlappingNo = 5;
    if (length < 5) {
      overlappingNo = length;
    }
    return overlappingNo;
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{ flex: 1, height: itemHeight, justifyContent: 'center', backgroundColor: item.backgroundColor }}>
        <Text>Carousel</Text>
      </View>
    );
  };

  const wrappedData = getWrappedData();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList 
          ref={ticker}
          data={wrappedData.data}
          renderItem={renderItem}
          getItemLayout={(item, index) => ({
            length: itemHeight, offset: itemHeight * index, index
          })}
          showsVerticalScrollIndicator={false}
          pagingEnabled={true}
          keyExtractor={(item, index) => item.backgroundColor + index}
        />
        {/* <ScrollView 
          style={{  }} 
          contentContainerStyle={{ height: `${100 * items.length}%` }} 
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={200}
          // pagingEnabled
          decelerationRate="fast"
        >
          {items.map(renderItem)}
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContainer: {
    height: 100,
    borderWidth: 1
  },
});

export default Carousel;
