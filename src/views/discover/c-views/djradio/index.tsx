import { Box, Button, CircularProgress, CircularProgressLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { ChangeEventHandler, memo, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';
import SparkMD5 from 'spark-md5';
interface IPorps {
  children?: ReactNode;
}
const BaseUrl = 'http://localhost:1111';
//泛型约束
const Djradio: FC<IPorps> = (props) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [checkPercent, setCheckPercent] = useState(0);
  const [uploadPercent, setUploadPercent] = useState(0);
  const CHUNK_SIZE = 1024 * 1024; //分片大小1M
  const [fileHash, setFileHash] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  //启动事件
  const fileBtn = () => {
    fileRef.current?.click();
  };

  //文件分片(将文件分成若干个blob对象)
  const createChunks = (file: File) => {
    let cur = 0; //确定文件分到了哪里
    let chunk = [];
    while (cur < file.size) {
      const blob = file.slice(cur, cur + CHUNK_SIZE);
      chunk.push(blob);
      cur += CHUNK_SIZE;
    }
    return chunk;
  };

  //hash计算（根据文件内容生产一个唯一的hash值）
  const calculateHash = (chunks: Blob[]) => {
    return new Promise((resolve) => {
      //（优化hash计算，不会将所有的Blob字节全部计算）
      //1.第一个和最后一个切片全部参与计算
      //2.中间的切片只计算前面两个字节，中间两字节，最后两字节

      const targets: Blob[] = []; //存储所有参加计算的切片
      const spark = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader(); //new一个fileReader的对象

      chunks.forEach((chunk, index) => {
        if (index === 0 || index === chunks.length - 1) {
          //第一个和最后一个切片全部参与计算
          targets.push(chunk);
        } else {
          //中间的切片只计算前面两个字节，中间两字节，最后两字节
          targets.push(chunk.slice(0, 2)); //前面两个字节
          targets.push(chunk.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2)); // 中间的两个字节
          targets.push(chunk.slice(CHUNK_SIZE - 2, CHUNK_SIZE)); //最后两个字节
        }
      });
      fileReader.readAsArrayBuffer(new Blob(targets));
      fileReader.onload = (e: any) => {
        spark.append(e.target.result);
        //onLoad是异步的(因为是异步的，所以new一个promise，最后返回出去)
        resolve(spark.end());
      };

      fileReader.onerror = (e) => {
        console.log('出错了！');
      };
    });
  };

  //上传分片
  const uploadChunks = async (chunks: Blob[]) => {
    //限制并发请求数
    const data = chunks.map((chunk, index) => {
      return {
        fileHash,
        chunkHash: fileHash + '-' + index,
        chunk
      };
    });

    //转化为formdata对象
    const formDatas = data.map((item) => {
      const formData = new FormData();
      formData.append('fileHash', item.fileHash);
      formData.append('chunkHash', item.chunkHash);
      formData.append('chunk', item.chunk);
      return formData;
    });

    console.log(formDatas); //假设100个form对象

    const max = 6; //最大并发请求数
    let index = 0;
    const taskPool: any = []; //请求池

    while (index < formDatas.length) {
      const task = fetch('/upload', {
        method: 'POST',
        body: formDatas[index]
      });

      taskPool.slice(taskPool.findIndex((item: any) => item === task));
      taskPool.push(task);
      console.log(taskPool.length);
      if (taskPool.length === max) {
        //大于第六个的时候只要有一个完成了，那么才会继续执行循环
        await Promise.race(taskPool); //有一个完成，那么promise的状态就已完成
      }
      index++;
    }
    await Promise.all(taskPool);
  };
  //Blob 对象含有两个属性：size 和 type。
  //其中 size 属性用于表示数据的大小（以字节为单位），
  //type 是 MIME 类型的字符串。
  //Blob 表示的不一定是 JavaScript 原生格式的数据。
  //比如 File 接口基于 Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件

  //触发检测
  const imgChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files; //伪数组
    if (!files) return;

    setFileName(files[0].name);
    //文件分片
    const chunks = createChunks(files[0]);

    //hash值的计算
    const hash = await calculateHash(chunks);

    setFileHash(hash as string);
    //上传分片
    uploadChunks(chunks);
  };

  return (
    <>
      <h2>
        大文件分片
        <Box>
          大文件的上传
          <br />
          <input onChange={imgChange} style={{ display: 'none' }} ref={fileRef} type="file" />
          <Button onClick={fileBtn}>点击上传</Button>
          <h2>校验分片的进度</h2>
          <CircularProgress value={checkPercent} color="green.400">
            <CircularProgressLabel>{checkPercent}%</CircularProgressLabel>
          </CircularProgress>
          <h2>文件上传的进度</h2>
          <CircularProgress value={uploadPercent} color="green.400">
            <CircularProgressLabel>{uploadPercent}%</CircularProgressLabel>
          </CircularProgress>
        </Box>
      </h2>
    </>
  );
};
export default memo(Djradio);
