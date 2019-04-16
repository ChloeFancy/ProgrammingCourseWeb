export const classConfig = {
    name: { dataIndex: 'name', text: '名称' },
    createTime: { dataIndex: 'createTime', text: '创建时间' },
    id: { dataIndex: 'id', text: 'ID' },
    isCheck: { dataIndex: 'isCheck', text: '设置' },
    introduction: { dataIndex: 'introduction', text: '描述' },
};

export const classMemberConfig = {
    userId: { dataIndex: 'userId', text: '用户ID' },
    name: { dataIndex: 'name', text: '姓名' },
    isAdministrator: { dataIndex: 'isAdministrator', text: '是否管理员' },
    
    // int64 user_id = 1;
    // string name = 2;
    // bool is_administrator = 3;
    // bool is_checked = 4;
};
