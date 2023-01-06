import { Form, Modal, Input, InputNumber, Upload, Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const PostModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const getFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <Modal
            open={open}
            title="Create a new Post"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields().then((values) => {
                    console.log(values)
                    form.resetFields();
                    onCreate(values);
                }).catch((e) => { window.alert('Please enter all required field!') })
            }}
        >
            <Form form={form} layout='vertical' name="from_in_modal">
                <Form.Item name="title" label="Title"
                    rules={[{ required: true, message: 'Error: Please enter the Title!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="body" label="Body"
                    rules={[{ required: true, message: 'Error: Please enter the Body!' }]}>
                    <TextArea rows={10} />
                </Form.Item>

                <Form.Item name="score" label="Rating (1 to 10)"
                    rules={[{ required: true, message: 'Error: Please enter the Score!' }]}>
                    <InputNumber min={1} max={10} />
                </Form.Item>

                <Form.Item name="img" label="Image"
                    rules={[{ required: true, message: 'Error: Please upload the image!' }]}>
                    <Upload
                        beforeUpload={(file) => {
                            // console.log(file);
                            return false;
                        }}
                        multiple={false}
                        listType='picture'
                        getValueFromEvent={getFile}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

            </Form>
        </Modal>

    );
};

export default PostModal

