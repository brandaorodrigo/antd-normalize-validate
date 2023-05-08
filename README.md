# antd-form-helper

[![Version](https://img.shields.io/npm/v/antd-normalize-validate.svg)](https://www.npmjs.com/package/antd-normalize-validate)

## **install**

```sh
npm i antd-form-helper
```

## normalize

description about normalize

#### normalize: how to use

```javascript
<Form.Item label="CPF" name="cpf" normalize={normalize.cpf}>
    <Input />
</Form.Item>
```

#### normalize: types

-   `capitalize` _capitalizes the first letter of a string and lowercases the remaining letters._
-   `cnpj` _normalize a brazilian cnpj number._
-   `cpf` _normalize a brazilian cpf number._
-   `currencyToNumber` _convert currency to float value._
-   `currency` _normalize a currency value in the international format._
-   `dateToIso` _convert a data to the iso format._
-   `date` _normalize a date in the format of "dd/mm/yyyy"._
-   `email` _normalize an email address._
-   `fullname` _normalize a fullname._
-   `lowercase` _converts a string to lowercase._
-   `numeric` _removes all non-numeric characters from a string._
-   `phoneToInternational` _convert a phone to the international format._
-   `phone` _normalize a phone number._
-   `time` _normalize a time in the format of "hh:mm"._
-   `titlecase` _capitalizes the first letter of each word in a string._
-   `uppercase` _converts a string to uppercase._
-   `zipcode` _normalize a brazilian zip code._

#### normalize: example

```javascript
import React, { useEffect } from 'react';

import { Button, Form, Input } from 'antd';

import { normalize } from '../utils/antd';

const App: React.FC = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            cpf: normalize.cpf('18137944133'),
        });
    }, []);

    return (
        <Form
            form={form}
            onFinish={(data: any) => console.log(data)}
            validateTrigger="onBlur"
        >
            <Form.Item label="CPF" name="cpf" normalize={normalize.cpf}>
                <Input />
            </Form.Item>
            <Button htmlType="submit">Send</Button>
        </Form>
    );
};

export default App;
```

## rules

description about rules

#### rules: how to use

```javascript
<Form.Item
    label="CPF"
    name="cpf"
    normalize={normalize.cpf}
    required
    rules={[{ required: true }, rule('cpf', '${label} is invalid.')]}
>
    <Input />
</Form.Item>
```

#### rules: types

-   `cnpj` _validates a brazilian cnpj number._
-   `cpf` _validates a brazilian cpf number._
-   `currency` _validates a currency value in the international format._
-   `date` _validates a date in the format of "dd/mm/yyyy"._
-   `email` _validates an email address._
-   `fullname` _validates a fullname._
-   `phone` _validates a phone number, ensuring that it has at least 10 digits._
-   `time` _validates a time in the format of "hh:mm"._
-   `zipcode` _validates a brazilian zip code._

#### rules: example

```javascript
import React, { useEffect } from 'react';

import { Button, Form, Input } from 'antd';

import { normalize, rule } from '../utils/antd';

const App: React.FC = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            cpf: normalize.cpf('18137944133'),
        });
    }, []);

    return (
        <Form
            form={form}
            onFinish={(data: any) => console.log(data)}
            validateTrigger="onBlur"
        >
            <Form.Item
                label="CPF"
                name="cpf"
                normalize={normalize.cpf}
                required
                rules={[
                    { required: true },
                    rule('cpf', '${label} is invalid.'),
                ]}
            >
                <Input />
            </Form.Item>
            <Button htmlType="submit">Send</Button>
        </Form>
    );
};

export default App;
```

## DatePicker: disabledDate

description

## DatePicker: disabledData: example

```javascript
import React, { useEffect } from 'react';

import { Button, DatePicker, Form } from 'antd';
import dayjs from 'dayjs';

import { disabledDate, normalize, rule } from '../utils/antd';

const App: React.FC = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            cpf: normalize.cpf('18137944133'),
        });
    }, []);

    return (
        <Form
            form={form}
            onFinish={(data: any) => console.log(data)}
            validateTrigger="onBlur"
        >
            <Form.Item
                label="Date"
                name="date"
                required
                rules={[{ required: true }, rule('date')]}
            >
                <DatePicker
                    disabledDate={(date) =>
                        disabledDate(
                            date,
                            dayjs('2023-01-01'),
                            dayjs('2023-12-31')
                        )
                    }
                    format="DD/MM/YYYY"
                />
            </Form.Item>
            <Form.Item
                label="Date"
                name="date"
                required
                rules={[{ required: true }, rule('date')]}
            >
                <DatePicker
                    disabledDate={(date) =>
                        disabledDate(date, false, dayjs('2023-12-31'))
                    }
                    format="DD/MM/YYYY"
                />
            </Form.Item>
            <Form.Item
                label="Date"
                name="date"
                required
                rules={[{ required: true }, rule('date')]}
            >
                <DatePicker
                    disabledDate={(date) =>
                        disabledDate(date, dayjs('2023-01-01'))
                    }
                    format="MM/YYYY"
                    picker="month"
                />
            </Form.Item>
            <Form.Item
                label="Range"
                name="range"
                required
                rules={[{ required: true }]}
            >
                <DatePicker.RangePicker
                    disabledDate={(date) =>
                        disabledDate(date, dayjs(), dayjs().add(6, 'days'))
                    }
                    format="DD/MM/YYYY"
                    picker="date"
                />
            </Form.Item>
            <Button htmlType="submit">Send</Button>
        </Form>
    );
};

export default App;
```

### example: DatePicker

```javascript
import React from 'react';

import { Button, Form } from 'antd';

import { Item, DatePicker } from 'antd-normalize-validate';

const App: React.FC = () => {
    const [form] = Form.useForm();

    return (
        <Form form={form} onFinish={(submit: any) => console.log(submit)}>
            <Item label="date" name="date" required>
                <DatePicker
                    format="DD/MM/YYYY"
                    maxDate={dayjs('2023-05-16')}
                    minDate={dayjs('2023-01-01')}
                    picker="date"
                    showToday={false}
                />
            </Item>
            <Item label="month" name="month" required>
                <DatePicker
                    format="MM/YYYY"
                    minDate={dayjs('2023-01-01')}
                    picker="month"
                />
            </Item>
            <Item label="year" name="year" required>
                <DatePicker format="YYYY" picker="year" />
            </Item>
            <Item label="range" name="range" required>
                <DatePicker.RangePicker
                    format="DD/MM/YYYY"
                    maxDate={dayjs('2023-05-16')}
                    minDate={dayjs('2023-01-01')}
                    picker="date"
                />
            </Item>
            <Button htmlType="submit">submit</Button>
        </Form>
    );
};

export default App;
```

## component: Select

the `Select` component will serve to replace `Select` from the original AntDesign 5 documentation.
it has an improvement in the search prop accepting search for uppercase, lowercase and with accents and even so finding the result.
also has one optional property.

### props: Select

-   `format` _normalize option labels automatically with capitalize, titlecase, lowercase or uppercase._

### example: Select

```javascript
import React from 'react';

import { Button, Form } from 'antd';

import { Item, DatePicker } from 'antd-normalize-validate';

const App: React.FC = () => {
    const [form] = Form.useForm();

    return (
        <Form form={form} onFinish={(submit: any) => console.log(submit)}>
            <Item label="select" name="select" required>
                <Select
                    format="uppercase"
                    options={[
                        { value: 1, label: 'sim' },
                        { value: 2, label: 'não' },
                    ]}
                />
            </Item>
            <Button htmlType="submit">submit</Button>
        </Form>
    );
};

export default App;
```

### subcomponent: Select.State and Select.City

`Select.State` is a facilitator to return all the states of brazil at once inside the select.
just as `Select.City` does the same, returning the cities of the informed state.

#### example: Select.State and Select.City

```javascript
import React from 'react';

import { Button, Form } from 'antd';

import { Item, Select } from 'antd-normalize-validate';

const App: React.FC = () => {
    const [form] = Form.useForm();

    const [state, setState] = useState<string>();

    return (
        <Form form={form} onFinish={(submit: any) => console.log(submit)}>
            <Item label="state" name="state" required>
                <Select.State
                    onSelect={(state: string) => {
                        setState(state);
                        form.setFieldValue('city', undefined);
                    }}
                />
            </Item>
            <Item label="city" name="city" required>
                <Select.City
                    disabled={!state}
                    format="uppercase"
                    state={state}
                />
            </Item>
            <Button htmlType="submit">submit</Button>
        </Form>
    );
};

export default App;
```

## component: Password

the `Password` component is a facilitator for creating and updating passwords.
it encompasses `Form.Item` and `Input.Password` in the same component with added internal `rules` for validation and confirmation.
that is, it is not necessary to use `Item` and call `Password` as a subcomponent everything is internal.
this component have 12 optional props.

### props: Password

-   `equalMessage` _the error message if the password does not match the confirmation field._
-   `equal` _field name of original password for comparison._
-   `lengthMessage` _the error message if the password is shorter than the minimum length required._
-   `length` _the minimum length required for the password field._
-   `lowercaseMessage` _the error message if the password does not contain at least one lowercase letter._
-   `lowercase` _requires the password to have at least one lowercase letter._
-   `numericMessage` _the error message if the password does not contain at least one number._
-   `numeric` _requires the password to have at least one number._
-   `symbolMessage` _the error message if the password does not contain at least one special character._
-   `symbol` _requires the password to have at least one special character._
-   `uppercaseMessage` _the error message if the password does not contain at least one uppercase letter._
-   `uppercase` _requires the password to have at least one uppercase letter._

### example: Password

```javascript
import React from 'react';

import { Button, Form } from 'antd';

import { Password } from 'antd-normalize-validate';

const App: React.FC = () => {
    const [form] = Form.useForm();

    return (
        <Form form={form} onFinish={(data: any) => console.log(data)}>
            <Password
                label="new password"
                length={6}
                lengthMessage="must be at least {size} characters."
                lowercase
                lowercaseMessage="must have at least one lowercase letter."
                name="password"
                numeric
                numericMessage="must have at least one number."
                placeholder="your new password"
                required
                symbol
                symbolMessage="must have 1 special character."
                uppercase
                uppercaseMessage="must have at least 1 capital letter."
            />
            <Password
                equal="password"
                equalMessage="password confirmation does not match."
                label="confirm password"
                name="confirm"
                placeholder="confirm your new password"
                required
            />
            <Button htmlType="submit">submit</Button>
        </Form>
    );
};

export default App;
```

## component: Others

the other components of antdesign 5 that can be used in `Form` can normally be used together with this package.
even the original `DatePicker` and `Select` can also be used if you prefer.

1. **AutoComplete**
1. **Cascader**
1. **Checkbox**
1. **DatePicker** (original)
1. **Form**
1. **Input**
1. **InputNumber**
1. **Mentions**
1. **Radio**
1. **Rate**
1. **Select** (original)
1. **Slider**
1. **Switch**
1. **TimePicker**
1. **Transfer**
1. **TreeSelect**
1. **Upload**

### example: Others

```javascript
import React, { useEffect } from 'react';

import { Button, Form, Checkbox, Radio, Rate } from 'antd';

import { Item } from 'antd-normalize-validate';

const App: React.FC = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            checkbox: true,
            checkboxgroup: 'yes',
            radio: 2,
            rate: 3,
        });
    }, []);

    return (
        <Form
            form={form}
            labelCol={{ span: 5 }}
            layout="vertical"
            onFinish={(data) => console.log(data)}
            style={{ maxWidth: 600 }}
            wrapperCol={{ span: 14 }}
        >
            <Item name="checkbox" required valuePropName="checked">
                <Checkbox value={true}>checkbox</Checkbox>
            </Item>
            <Item label="checkboxgroup" name="checkboxgroup" required>
                <Checkbox.Group options={[{ value: 'yes', label: 'yes' }]} />
            </Item>
            <Item label="radio" name="radio" required>
                <Radio.Group
                    options={[
                        { value: 1, label: 'yes' },
                        { value: 2, label: 'no' },
                    ]}
                />
            </Item>
            <Item label="rate" name="rate">
                <Rate />
            </Item>
            <Button htmlType="submit">submit</Button>
        </Form>
    );
};

export default App;
```

## class: normalize

there is a way to use the `normalization` class that is internal to the `Item` component externally, to normalize data directly in the code lines.
this functionality is interesting for entering data in the form and for processing the data that comes out in `onFinish`

### normalizations

-   `capitalize` _capitalizes the first letter of a string and lowercases the remaining letters._
-   `cnpj` _normalize a brazilian cnpj number._
-   `cpf` _normalize a brazilian cpf number._
-   `currencyToNumber` _convert currency to float value._
-   `currency` _normalize a currency value in the international format._
-   `dateToIso` _convert a data to the iso format._
-   `date` _normalize a date in the format of "dd/mm/yyyy"._
-   `email` _normalize an email address._
-   `fullname` _normalize a fullname._
-   `lowercase` _converts a string to lowercase._
-   `numeric` _removes all non-numeric characters from a string._
-   `phoneToInternational` _convert a phone to the international format._
-   `phone` _normalize a phone number._
-   `time` _normalize a time in the format of "hh:mm"._
-   `titlecase` _capitalizes the first letter of each word in a string._
-   `uppercase` _converts a string to uppercase._
-   `zipcode` _normalize a brazilian zip code._

### example: normalize

```javascript
import React, { useEffect } from 'react';

import { normalize } from 'antdnv';

const App: React.FC = () => {
    useEffect(() => {
        const data = {
            capitalize: normalize.capitalize('a'),
            cnpj: normalize.cnpj('a'),
            cpf: normalize.cpf('a'),
            currency: normalize.currency('a'),
            currencyToNumber: normalize.currencyToNumber('a'),
            date: normalize.date('a'),
            dateToIso: normalize.dateToIso('a'),
            email: normalize.email('a'),
            fullname: normalize.fullname('a'),
            lowercase: normalize.lowercase('a'),
            numeric: normalize.numeric('a'),
            phone: normalize.phone('a'),
            phoneToInternational: normalize.phoneToInternational('a'),
            time: normalize.time('a'),
            titlecase: normalize.titlecase('a'),
            uppercase: normalize.uppercase('a'),
            zipcode: normalize.zipcode('a'),
        };

        console.log(data);
    }, []);

    return <></>;
};

export default App;
```

## author

[rodrigo brandão](https://www.linkedin.com/in/brandaorodrigo/)

## license

[mit licensed](LICENSE)

```javascript
import React, { useEffect, useState } from 'react';

import { Button, Form, Input } from 'antd';

import { normalize, rule } from '../utils/antd';

const App: React.FC = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            cpf: normalize.cpf('18137944133'),
            time: normalize.time('22:11'),
            fullname: normalize.fullname('carl sagan'),
        });
    }, []);

    const [result, setResult] = useState<any>();

    const onFinish = (data: any) => {
        setResult(JSON.stringify(data));
    };

    return (
        <Form form={form} onFinish={onFinish} validateTrigger="onBlur">
            <Form.Item
                label="CPF"
                name="cpf"
                normalize={normalize.cpf}
                required
                rules={[
                    { required: true },
                    rule('cpf', '${label} is invalid.')
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Time"
                name="time"
                normalize={normalize.time}
                required
                rules={[{ required: true }, rule('time')]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Fullname"
                name="fullname"
                normalize={normalize.fullname}
                required
                rules={[{ required: true }, rule('fullname')]}
            >
                <Input.TextArea maxLength={100} showCount />
            </Form.Item>
            <Button htmlType="submit">Send</Button>
            <div>{result}</div>
        </Form>
    );
};

export default App;
```
