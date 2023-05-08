# antd-form-helper

[![Version](https://img.shields.io/npm/v/antd-normalize-validate.svg)](https://www.npmjs.com/package/antd-normalize-validate)

## install

```sh
npm i antd-form-helper
```

## normalize

description about normalize

### normalize: how to use

```javascript
<Form.Item label="CPF" name="cpf" normalize={normalize.cpf}>
    <Input />
</Form.Item>
```

### normalize: types

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

### normalize: example

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

### rules: how to use

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

### rules: types

-   `cnpj` _validates a brazilian cnpj number._
-   `cpf` _validates a brazilian cpf number._
-   `currency` _validates a currency value in the international format._
-   `date` _validates a date in the format of "dd/mm/yyyy"._
-   `email` _validates an email address._
-   `fullname` _validates a fullname._
-   `phone` _validates a phone number, ensuring that it has at least 10 digits._
-   `time` _validates a time in the format of "hh:mm"._
-   `zipcode` _validates a brazilian zip code._

### rules: example

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

## disabledDate

description of the function disabledDate

## disabledDate: how to use

```javascript
<Form.Item
    label="Date"
    name="date"
    required
    rules={[{ required: true }, rule('date')]}
>
    <DatePicker
        disabledDate={(date) =>
            disabledDate(date, dayjs(), dayjs().add(6, 'days'))
        }
        format="DD/MM/YYYY"
    />
</Form.Item>
```

## disabledDate: example

```javascript
import React, { useEffect } from 'react';

import { Button, DatePicker, Form } from 'antd';
import dayjs from 'dayjs';

import { disabledDate } from '../utils/antd';

const App: React.FC = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            date: dayjs('2023-01-01'),
            otherDate: dayjs('2023-01-01'),
            month: dayjs('2022-06-12'),
            range: [dayjs(), dayjs().add(6, 'days')],
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
                rules={[{ required: true }]}
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
                label="Other date"
                name="otherDate"
                required
                rules={[{ required: true }]}
            >
                <DatePicker
                    disabledDate={(date) =>
                        disabledDate(date, false, dayjs().add(6, 'days'))
                    }
                    format="DD/MM/YYYY"
                />
            </Form.Item>
            <Form.Item
                label="Month"
                name="month"
                required
                rules={[{ required: true }]}
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

## example

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
