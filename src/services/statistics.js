import request from '../lib/request';

export const getAnalysisByDifficulty = async (data) => {
    return request({
        url: '/difficultyAnalysis',
        data,
        reqProto: 'AnalysisByDifficultyReq',
        resProto: 'AnalysisByDifficultyResp',
    });
};

export const getAnalysisByTags = async (data) => {
    return request({
        url: '/tagsAnalysis',
        data,
        reqProto: 'AnalysisByTagsReq',
        resProto: 'AnalysisByTagsResp',
    });
};
