

import React, { Component } from 'react'
import { Upload, Modal, Icon } from 'antd';


export default class extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };
    handleCancel = () => this.setState({ previewVisible: false })
    render() {
        // 上传按钮
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { fileList } = this.state
        const props = {
            onChange: ({ fileList }) => {
                this.setState({ fileList })
                this.props.handleUploadImg(fileList)
            },
            onPreview: (file) => {
                this.setState({
                    previewImage: file.url || file.thumbUrl,
                    previewVisible: true,
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList
        }
        return (
            <div>
                <Upload
                    listType="picture-card"
                    {...props}
                >
                    {this.state.fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>
        )
    }
}