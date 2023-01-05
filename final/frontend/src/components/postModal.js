import axios from 'axios'
import { Form, Modal, Input, InputNumber, Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { UploadProps } from 'antd'
import { useState } from 'react'
import { letterSpacing } from '@mui/system'
const { TextArea } = Input

const PostModal = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  const [imageUrl, setimageUrl] = useState('')

  const getFile = (e) => {
    console.log('Upload event:', e)

    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const props = {
    name: 'file',
    action: 'http://localhost:5000',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const onFinish = (values) => {
    console.log(values)
  }

  let URL

  const formData = new FormData()

  return (
    <Modal
      open={open}
      title='Create a new Post'
      okText='Create'
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            values.img = imageUrl
            console.log(imageUrl)
            console.log(formData)
            console.log(values)
            form.resetFields()
            onCreate(values)
          })
          .catch((e) => {
            window.alert('Please enter all required field!')
          })
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='from_in_modal'
        onFinish={() => onFinish()}
      >
        <Form.Item
          name='title'
          label='Title'
          rules={[
            { required: true, message: 'Error: Please enter the Title!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='body'
          label='Body'
          rules={[{ required: true, message: 'Error: Please enter the Body!' }]}
        >
          <TextArea rows={10} />
        </Form.Item>

        <Form.Item
          name='score'
          label='Rating (0 to 10)'
          rules={[
            { required: true, message: 'Error: Please enter the Score!' },
          ]}
        >
          <InputNumber min={0} max={10} />
        </Form.Item>

        <Form.Item name='img' getValueFromEvent={getFile}>
          <Upload
            {...props}
            beforeUpload={async (file) => {
              // const reader = new FileReader()
              // console.log('hi')
              // console.log(file)
              // reader.onload = (e) => {
              //   URL = console.log(e.target.result)
              // }
              // reader.readAsDataURL(file)

              try {
                // const formData = new FormData()
                formData.append('file', file)
                formData.append('upload_preset', 'dhayyhrtl')
                const dataRes = await axios.post(
                  'cloudinary://921198211742996:bsx9Lh-jSzp7ssZEHZTlJRChhcc@dhayyhrtl',
                  formData
                )
                setimageUrl(dataRes.data.url)
                console.log(imageUrl)
                const submitPost = {
                  image: imageUrl,
                }
                await axios.post('http://localhost:5000/api', submitPost)
              } catch (err) {
                console.error(err)
                // Prevent upload
                return false
              }
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default PostModal
