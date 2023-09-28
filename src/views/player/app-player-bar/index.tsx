import {
  Box,
  Flex,
  Image,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import React, { memo, useEffect, useRef, useState } from 'react';
import { MdGraphicEq } from 'react-icons/md';
import { FC, ReactNode } from 'react';
import { useAppSelector } from '@/store';
import { shallowEqual } from 'react-redux';
import { getImageSize, timestampToTime } from '@/untils/format';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const AppPlayerBar: FC<IPorps> = (props) => {
  const { currentSong } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong
    }),
    shallowEqual
  );
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState('0:0');
  // 音乐播放（暂停和开始）
  useEffect(() => {
    if (start) {
      audioRef.current
        ?.play()
        .then((res) => {})
        .catch((err) => {
          setStart(false);
        });
    } else {
      audioRef.current?.pause();
      setStart(false);
    }
    setDuration(currentSong.dt);
  }, [start]);

  //暂停和开始的切换
  const startBtn = () => {
    setStart(!start);
  };

  //自动播放的进度条
  function handleUpdate() {
    //当前时间
    const currentTime = audioRef.current?.currentTime;
    //计算当前歌曲进度
    if (currentTime) {
      setProgress(Math.floor(currentTime));
      setCurrentTime(timestampToTime(Math.floor(currentTime * 1000)));
    }
  }

  //拖动进度条
  const changeSlider = (val: any) => {
    setProgress(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  return (
    <Box
      position="fixed"
      zIndex="99"
      left="0"
      right="0"
      bottom="0"
      height="52px"
      backgroundColor="rgb(0,0,0,.8)">
      <Flex
        h="52px"
        w="800px"
        color="white"
        justifyContent="space-between"
        m="0 auto"
        alignItems="center">
        <Box w="200px">
          <ChevronLeftIcon boxSize={8} marginRight="20px" />
          {start ? (
            <ViewIcon onClick={startBtn} boxSize={6} />
          ) : (
            <ViewOffIcon onClick={startBtn} boxSize={6} />
          )}
          <ChevronRightIcon marginLeft="20px" boxSize={8} />
        </Box>
        <Flex w="400px" justifyContent="space-between" alignItems="center">
          <Box>
            <Image src={getImageSize(currentSong?.al?.picUrl, 40)}></Image>
          </Box>
          <Box w="320px">
            <Text>{currentSong?.ar[0]?.name}</Text>
            <Flex alignItems="center">
              <Slider onChange={changeSlider} aria-label="slider-ex-4" value={progress}>
                <SliderTrack bg="red.100">
                  <SliderFilledTrack bg="tomato" />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                  <Box color="tomato" as={MdGraphicEq} />
                </SliderThumb>
              </Slider>
              <Text marginLeft="10px"> {currentTime}</Text>
              <Text opacity="0.6">&nbsp;/&nbsp;{timestampToTime(duration)}</Text>
            </Flex>
          </Box>
        </Flex>
        <Box>工具</Box>
      </Flex>
      <audio src={currentSong.url} ref={audioRef} onTimeUpdate={handleUpdate}></audio>
    </Box>
  );
};
export default memo(AppPlayerBar);
