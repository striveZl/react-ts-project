import { createSlice } from '@reduxjs/toolkit';

interface IPlayerState {
  currentSong: any;
}

const initialState: IPlayerState = {
  currentSong: {
    url: 'http://m801.music.126.net/20230927172049/b6033508ac58079df42f40f2ad040fa8/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/28481690714/49eb/b4ba/3b65/b588b4cc1278a95fb455bea58cc9ae91.mp3',
    name: '\u753B',
    id: 202369,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 6731,
        name: '\u8D75\u96F7',
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: '600902000007908521',
    fee: 8,
    v: 50,
    crbt: null,
    cf: '',
    al: {
      id: 20339,
      name: '\u8D75\u5C0F\u96F7',
      picUrl: 'https://p2.music.126.net/wldFtES1Cjnbqr5bjlqQbg==/18876415625841069.jpg',
      tns: [],
      pic_str: '18876415625841069',
      pic: 18876415625841068
    },
    dt: 228133,
    h: {
      br: 320000,
      fid: 0,
      size: 9128272,
      vd: -50392,
      sr: 44100
    },
    m: {
      br: 192002,
      fid: 0,
      size: 5476981,
      vd: -47796,
      sr: 44100
    },
    l: {
      br: 128002,
      fid: 0,
      size: 3651335,
      vd: -46049,
      sr: 44100
    },
    sq: {
      br: 847077,
      fid: 0,
      size: 24155825,
      vd: -50481,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: '1',
    no: 3,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 2,
    s_id: 0,
    mark: 8192,
    originCoverType: 1,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 50,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    rtype: 0,
    rurl: null,
    mst: 9,
    cp: 1400821,
    mv: 0,
    publishTime: 1312646400007
  }
};
//202369
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {}
});

export default playerSlice.reducer;
