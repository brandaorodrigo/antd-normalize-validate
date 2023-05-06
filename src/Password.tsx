import React, { useEffect, useState } from 'react';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Progress, Form, Input, InputProps } from 'antd';
import { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import { NamePath } from 'antd/es/form/interface';
import { Rule } from 'rc-field-form/lib/interface';

import Item, { ItemProps } from './Item';

type Props = ItemProps &
    InputProps & {
        equal?: NamePath;
        equalMessage?: string;
        lowercase?: boolean;
        lowercaseMessage?: string;
        numeric?: boolean;
        numericMessage?: string;
        length?: number;
        lengthMessage?: string;
        symbol?: boolean;
        symbolMessage?: string;
        uppercase?: boolean;
        uppercaseMessage?: string;
    };

const Custom: React.FC<Props> = ({
    equal,
    equalMessage = 'Confirmação da senha não confere',
    length,
    lengthMessage = 'Deve possuir no mínimo {size} caracteres',
    lowercase,
    lowercaseMessage = 'Deve possuir pelo menos uma letra minúscula',
    numeric,
    numericMessage = 'Deve possuir pelo menos um número',
    required,
    symbol,
    symbolMessage = 'Deve possuir um caracter especial',
    tooltip,
    uppercase,
    uppercaseMessage = 'Deve possuir pelo menos uma letra maiúscula',
    ...props
}) => {
    const [total, setTotal] = useState(0);
    const [percent, setPercent] = useState<number>(0);
    const [autoTooltip, setAutoTooltip] = useState<LabelTooltipType>(tooltip);

    useEffect(() => {
        const array = [] as string[];
        if (lowercase) {
            array.push(lowercaseMessage);
        }
        if (numeric) {
            array.push(numericMessage);
        }
        if (symbol) {
            array.push(symbolMessage);
        }
        if (uppercase) {
            array.push(uppercaseMessage);
        }
        if (length) {
            array.push(lengthMessage.replace('{size}', String(length)));
        }
        setTotal(array.length);
        if (array.length > 0) {
            setAutoTooltip(
                <>
                    {array.map((t, key) => (
                        <div key={key}>{t}</div>
                    ))}
                </>
            );
        }
    }, []);

    const form = Form.useFormInstance();

    const rules = [
        () => ({
            validator(_: unknown, value: string) {
                if (!value) {
                    return Promise.resolve();
                }
                let pass = 0;
                if (lowercase && value.search(/[a-z]/) === -1) {
                    return Promise.reject(new Error(lowercaseMessage));
                } else {
                    pass++;
                }
                if (numeric && value.search(/[0-9]/) === -1) {
                    return Promise.reject(new Error(numericMessage));
                } else {
                    pass++;
                }
                if (symbol && value.search(/[#?!@$%^&*-]/) === -1) {
                    return Promise.reject(new Error(symbolMessage));
                } else {
                    pass++;
                }
                if (uppercase && value.search(/[A-Z]/) === -1) {
                    return Promise.reject(new Error(uppercaseMessage));
                } else {
                    pass++;
                }
                if (length && value.length < length) {
                    const fix = lengthMessage.replace('{size}', String(length));
                    return Promise.reject(new Error(fix));
                } else {
                    pass++;
                }
                setPercent((total / pass) * 20);
                if (equal) {
                    const confirm = form.getFieldValue(equal);
                    if (confirm && value !== confirm) {
                        return Promise.reject(new Error(equalMessage));
                    }
                }
                return Promise.resolve();
            },
        }),
    ] as Rule[];

    return (
        <>
            <input
                autoComplete="new-password"
                hidden
                name="fakePassword"
                type="password"
            />
            {total > 0 && (
                <Progress
                    percent={percent}
                    showInfo={false}
                    size="small"
                    status="normal"
                    strokeColor={percent > 90 ? '#54bbab' : '#cc9090'}
                    style={{
                        position: 'absolute',
                        width: '50%',
                        right: '8px',
                        top: '-4px',
                    }}
                />
            )}
            <Item
                required={required}
                rules={rules}
                tooltip={autoTooltip}
                validateTrigger="onChange"
                {...props}
            >
                <Input.Password
                    iconRender={(visible) =>
                        visible ? (
                            <EyeTwoTone twoToneColor="#cfcfcf" />
                        ) : (
                            <EyeInvisibleOutlined />
                        )
                    }
                    {...props}
                />
            </Item>
        </>
    );
};

export default Custom;
