import { Card, Image, CardBody, Text, Flex } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { formatCount, getImageSize } from '@/untils/format';

interface IPorps {
  children?: ReactNode;
  itemData: {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    canDislike: boolean;
    trackNumberUpdateTime: number;
    playCount: number;
    trackCount: number;
    highQuality: boolean;
    alg: string;
  };
}

//泛型约束
const SongMenuItem: FC<IPorps> = (props) => {
  return (
    <>
      <Card w="180px" marginTop="10px">
        <CardBody>
          <Image
            src={getImageSize(props.itemData.picUrl, 140)}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            boxSize="140px"
          />
          <Flex marginTop="-26px" marginLeft="10px" color="white">
            <ViewIcon color="white" marginRight="6px" />
            <Text lineHeight="16px">{formatCount(props.itemData.playCount)}</Text>
          </Flex>
          <Text marginTop="24px">{props.itemData.name}</Text>
        </CardBody>
      </Card>
    </>
  );
};
export default memo(SongMenuItem);
