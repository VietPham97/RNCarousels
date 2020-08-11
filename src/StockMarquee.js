
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import MarqueeItem from './MarqueeItem';

const NO_PER_SCREEN = 5;
const itemWidth = Dimensions.get('window').width / NO_PER_SCREEN;

function useInterval(callback, delay) {
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

const StockMarquee = (props) => {

  const {data} = props;
  const ticker = useRef();
  const [delay, setDelay] = useState(32);

  const [state, setState] = useState({
    currentPosition: 0,
    // scrolling: false,
    // momentumScrolling: false,
  });

  useInterval(() => {
    // console.log('delay call')
    scrolling();
  }, delay);

  const scrolling = () => {
    // Start scrolling if there's more than one stock to display
    const {data} = props;
    const {currentPosition} = state;

    if (data.length > NO_PER_SCREEN) {
      // Increment position with each new interval
      const position = currentPosition + 1.5;
      ticker.current.scrollToOffset({ offset: position, animated: false });
      const maxOffset = data.length * itemWidth;
      // Set animation to repeat at end of scroll
      if (currentPosition > maxOffset) {
        const offset = 0;
        ticker.current.scrollToOffset({ offset, animated: false });
        setState(prevState => { return { ...prevState, currentPosition: offset }; });
      }
      else {
        setState(prevState => { return { ...prevState, currentPosition: position }; });
      }
    }
  };

  const getWrappedData = () => {
    const {data} = props;
    const overlappingNo = getOverlappingNo();
    return {
      data: [...data, ...data.slice(0, overlappingNo)],
    };
  };
  
  const getOverlappingNo = () => {
    const {data} = props;
    const {length} = data;
    let overlappingNo = 10;
    if (length < 10) {
      overlappingNo = length;
    }
    return overlappingNo;
  };

  const wrappedData = getWrappedData();

  const getItemLayout = (_, index) => ({
    length: wrappedData.data.length,
    offset: itemWidth * index,
    index,
  });

  const renderItem = ({item, index}) => {
    return (
      <MarqueeItem
        title={item.title}
        price={item.price}
        change={item.change}
        isGain={item.isGain}
        itemWidth={itemWidth}
        style={{
          marginStart: index === 0 ? 16 : 0,
        }} 
      />
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <FlatList 
        ref={ticker}
        data={wrappedData.data}
        initialNumToRender={4}
        horizontal
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        style={styles.wrapper}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.title + index}
      />
    </SafeAreaView>
  );
};

StockMarquee.propTypes = {
  stockData: PropTypes.array,
};

StockMarquee.defaultProps = {
  stockData: [],
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#4F5E69', 
  },
  wrapper: {
    width: '100%',
    height: 40,
    flexGrow: 0,
  },
});

export default StockMarquee;
