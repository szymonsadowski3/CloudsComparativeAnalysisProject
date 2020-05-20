import './styles/my-products-table.css';
import {Table, Input, InputNumber, Popconfirm, Form, message} from 'antd';
import React from "react";
import isEqual from "lodash/isEqual";
import remove from "lodash/remove";
import {deleteProductById, updateItemInBackend} from "../api/custom-queries";


const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };

    getRulesForDataIndex(record, dataIndex, title) {
        if (dataIndex == 'currentPrice') {
            return {
                rules: [
                    {
                        required: true,
                        message: `Please Input ${title}!`,
                    },
                    {
                        asyncValidator: (rule, value) => {
                            return new Promise((resolve, reject) => {
                                try {
                                    const parsedFloat = parseFloat(value);
                                    if (!isEqual(parsedFloat, NaN)) {
                                        resolve();
                                    } else {
                                        reject("Not a float!");
                                    }
                                } catch (e) {
                                    reject("Not a float!");
                                }
                            });
                        },
                        message: `"Current price" must be a number!`,
                    },
                ],
                initialValue: record[dataIndex],
            };
        }

        return {
            rules: [
                {
                    required: true,
                    message: `Please Input ${title}!`,
                },
            ],
            initialValue: record[dataIndex],
        };
    }

    renderCell = ({getFieldDecorator}) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{margin: 0}}>
                        {
                            getFieldDecorator(
                                dataIndex,
                                this.getRulesForDataIndex(record, dataIndex, title)
                            )(this.getInput())
                        }
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: this.props.dataToDisplay, editingId: ''};

        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                editable: false,
            },
            {
                title: 'name',
                dataIndex: 'name',
                editable: true,
            },
            {
                title: 'description',
                dataIndex: 'description',
                editable: true,
            },
            {
                title: 'current price',
                dataIndex: 'currentPrice',
                editable: true,
            },
            {
                title: 'Imgs Url',
                dataIndex: 'illustrativeMediaUrl',
                editable: true,
            },
            {
                title: 'createdAt',
                dataIndex: 'createdAt',
                editable: false,
            },
            {
                title: 'tags',
                dataIndex: 'tags',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const {editingId} = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (<span>
                        <EditableContext.Consumer>
                            {form => (
                                <a
                                    onClick={() => this.save(form, record.id)}
                                    style={{marginRight: 8}}
                                >
                                    Save
                                </a>
                            )}
                        </EditableContext.Consumer>
                        <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={() => this.cancel(record.id)}
                        >
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>) : (
                        <span>
                            <a
                                disabled={editingId !== ''}
                                onClick={() => this.edit(record.id)}
                            >
                                Edit
                            </a>

                            <Popconfirm
                                title="Are you sure you want to delete this record?"
                                onConfirm={() => this.delete(record.id)}
                            >
                                <a
                                    disabled={editingId !== ''}
                                    className='delete-operation'
                                >
                                    Delete
                                </a>
                            </Popconfirm>
                        </span>
                    );
                },
            },
        ];
    }

    isEditing = record => record.id === this.state.editingId;

    cancel = () => {
        this.setState({editingId: ''});
    };

    save(form, editedId) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            console.dir(newData);
            const index = newData.findIndex(item => editedId === item.id);
            console.dir(index);
            if (index > -1) {
                const itemToUpdate = newData[index];
                newData.splice(index, 1, {
                    ...itemToUpdate,
                    ...row,
                });
                this.setState({data: newData, editingId: ''});
                updateItemInBackend(editedId, row).then(response => {
                    console.dir(response);
                    message.success('Successfully edited the product');
                }).catch(error => {
                    console.err(error);
                    message.error("Couldn't add the product!");
                });
            }
        });
    }

    edit(editingId) {
        this.setState({editingId});
    }

    delete(editingId) {
        deleteProductById(editingId).then(response => {
            console.dir(response);
            const newData = [...this.state.data];
            remove(newData, (n) => {
                return n.id == editingId;
            });
            this.setState({data: newData, editingId: ''});
            message.success('Successfully deleted the product!');
        }).catch(error => {
            console.err(error);
            message.error("Couldn't delete the product!");
        });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <EditableContext.Provider value={this.props.form}>
                <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                    scroll={{x: 1200}}

                />
            </EditableContext.Provider>
        );
    }
}

export const EditableFormTable = Form.create()(EditableTable);