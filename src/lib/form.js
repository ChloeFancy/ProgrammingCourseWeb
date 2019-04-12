import { Form } from 'antd';
import { type } from 'os';

export const formatObejctToFields = (obj) => {
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
            [key]: typeof value === 'object' ? value.value : value,
        }
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