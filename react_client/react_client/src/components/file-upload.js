import React from "react";
import {Button, Icon, Upload, message} from "antd";
import * as reqwest from "reqwest";
import {uploadUrl} from "../config/cfg";

export class FileUpload extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    };



    handleUpload = (cb) => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });

        reqwest({
            url: uploadUrl,
            method: 'post',
            processData: false,
            data: formData,
            success: (response) => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('upload successfully.');
                const uploadedLocations = response.map(obj => obj.Location);
                cb(uploadedLocations);
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('upload failed.');
            },
        });
    };

    render() {
        const { fileList } = this.state;
        const props = {
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <div>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Select File
                    </Button>
                </Upload>
            </div>
        );
    }
}