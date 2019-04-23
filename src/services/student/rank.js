import request from '../../lib/request';

export const fetchRankList = (data) => {
    return request({
        url: '/rank',
        reqProto: 'RankListReq',
        resProto: 'RankListResp',
        data,
    });
}