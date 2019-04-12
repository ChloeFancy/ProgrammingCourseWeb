import { Form } from 'antd';

export const formatObejctToFields = (obj) => {
    return Object.entries(obj).reduce((prev, [key, value]) => {
        return {
            ...prev,
            [key]: {
                value,
            },
        };
    }, {});
}

export const mapPropsToFields = (props) => {
    const fields = Object.entries(props.info).reduce((prev, [key, { value }]) => {
        return {
            ...prev,
            [key]: Form.createFormField({
                value,
            }),
        };
    }, {});
    return fields;
};