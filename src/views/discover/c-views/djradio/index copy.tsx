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
  const chunks = 100; // 切成100份
  const chunkSize = 5 * 1024 * 1024; // 切片大小（默认大小5M）
  let checkCurrentChunk = 0; // 检查，当前切片
  const [checkPercent, setCheckPercent] = useState(0);
  const [uploadPercent, setUploadPercent] = useState(0);
  const toast = useToast();
  let uploadCurrentChunk = 0; // 上传，当前切片
  //文件切片

  const md5File = (file: any) => {
    return new Promise((resolve, reject) => {
      let blobSlice = File.prototype.slice, // || File.prototype.mozSlice || File.prototype.webkitSlice, // 将文件的大小分成一百份
        chunkSize = Math.ceil(file?.size / 100),
        //文件的加密处理
        spark = new SparkMD5.ArrayBuffer(),
        fileReader: FileReader = new FileReader();
      //调取成功时的状态
      fileReader.onload = function (e: any) {
        // console.log('read chunk nr', checkCurrentChunk + 1, 'of', chunks);
        spark.append(e.target && e.target?.result);
        checkCurrentChunk += 1;
        if (checkCurrentChunk < chunks) {
          loadNext();
        } else {
          //结束循环
          let result = spark.end();
          resolve(result);
        }
      };

      fileReader.onerror = function (e) {
        console.log('出错了！');
      };

      const loadNext = () => {
        //从哪里开始切
        const start = checkCurrentChunk * chunkSize;
        let end = start + chunkSize >= file.size ? file.size : start + chunkSize; //切到哪里结束
        // 文件切片(将文件读取为ArrayBuffer)
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        // // 检查进度条
        setCheckPercent((pre) => pre + 1);
      };
      loadNext();
    });
  };

  //启动事件
  const fileBtn = () => {
    fileRef.current?.click();
  };

  // 上传chunk
  const upload = ({ i, file, fileMd5Value, chunks }: any) => {
    uploadCurrentChunk = 0;
    //构造一个表单，FormData是HTML5新增的
    let end = (i + 1) * chunkSize >= file.size ? file.size : (i + 1) * chunkSize;
    let form = new FormData();
    form.append('data', file.slice(i * chunkSize, end)); //file对象的slice方法用于切出文件的一部分
    form.append('total', chunks); //总片数
    form.append('index', i); //当前是第几片
    form.append('fileMd5Value', fileMd5Value);
    return axios({
      method: 'post',
      url: BaseUrl + '/upload',
      data: form
    }).then(({ data }) => {
      if (data.stat) {
        uploadCurrentChunk = uploadCurrentChunk + 1;
        const uploadPercent = Math.ceil((uploadCurrentChunk / chunks) * 100);
        setUploadPercent(uploadPercent);
      }
    });
  };

  const checkAndUploadChunk = async (file: File, fileMd5Value: FileReader, chunkList: any) => {
    let chunks = Math.ceil(file.size / chunkSize);
    const requestList = [];
    for (let i = 0; i < chunks; i++) {
      let exit = chunkList.indexOf(i + '') > -1;
      // 如果不存在，则上传
      if (!exit) {
        requestList.push(upload({ i, file, fileMd5Value, chunks }));
      }
    }

    // 并发上传
    if (requestList?.length) {
      // 全部成功才会成功！
      await Promise.all(requestList);
    }
  };

  const responseChange = async (file: File | null) => {
    const fileMd5Value: any = await md5File(fileRef.current?.files && fileRef.current?.files[0]);
    const { data } = await checkFileMD5(file && file.name, fileMd5Value);
    // 如果文件已存在, 就秒传
    if (data?.file) {
      toast({
        title: `文件已存在！`,
        status: 'success',
        position: 'top',
        isClosable: true
      });
      return;
    }

    // 3：检查并上传切片
    if (file) {
      await checkAndUploadChunk(file, fileMd5Value, data.chunkList);
    }
  };

  //触发检测
  const imgChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    responseChange(e.target.files && e.target.files[0]);
  };

  //检查文件
  const checkFileMD5 = (fileName: any, fileMd5Value: any) => {
    let url = BaseUrl + '/check/file?fileName=' + fileName + '&fileMd5Value=' + fileMd5Value;
    return axios.get(url);
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
