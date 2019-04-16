import { Form } from 'antd';
import BraftEditor from '../components/common/BraftEditor';

export const formatObjectToFields = (obj) => {
    return Object.entries(obj).reduce((prev, [key, value]) => {
        return {
            ...prev,
            [key]: {
                value,
            },
        };
    }, {});
};

export const formatRequestFromFields = (obj) => {
    return Object.entries(obj).reduce((prev, [key, value]) => {
        return {
            ...prev,
            [key]: value && typeof value.value !== 'undefined' ? value.value : value,
        };
    }, {});
};

export const mapPropsToFields = (object) => {
    const fields = Object.entries(object).reduce((prev, [key, { value }]) => {
        return {
            ...prev,
            [key]: Form.createFormField({
                value,
            }),
        };
    }, {});
    return fields;
};

export const formatBraftEditorField = (info, dataIndexArray) => {
    return dataIndexArray.reduce((prev, dataIndex) => {
        return {
            ...prev,
            [dataIndex]: BraftEditor.createEditorState(info[dataIndex]),
        };
    }, {});
};
