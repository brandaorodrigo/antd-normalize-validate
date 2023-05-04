# AntDesign Form +

Este pacote possui melhorias nos componentes de formulário do antDesign 5.
Automatizando regras de **validação** e **normalização** de inputs.
Para isso é substituido o uso do `Form.Item` pelo componente deste pacote chamado `Item`.
Possui, também, pequenos aperfeiçoamentos para os componentes `DataPicker` e `Select`.
Além de components novos `SelectState` e `SelectCity`.

## Instalação

```sh
npm i antdf
```

## Componente: Item

O component `Item` servirá para substituir o `Form.Item` da documentação original do AntDesign 5.
Ele se comporta identico ao componente original, mas possui 3 propriedades opcionais a mais.

### Props: Item

| Prop            | Descrição                                                                 | Example                                   |
| --------------- | ------------------------------------------------------------------------- | ----------------------------------------- |
| format          | Normaliza e Valida campo baseado no formato. (Abaixo lista dos formatos). | format="phone"                            |
| formatMessage   | Mensagem de erro customizada se a validação do formato falhar.            | formatMessage="Este campo está incorreto" |
| requiredMessage | Mensagem de erro customizada para a validação de required.                | requiredMessage="Precisa ser digitado"    |

### Prop: format

| Format       | Normalization                                                                  | Validation                                                                                                  |
| ------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| capitalize   | Capitalizes the first letter of a string and lowercases the remaining letters. | -                                                                                                           |
| **cnpj**     | Applies a mask to a Brazilian CNPJ number.                                     | Validates a Brazilian CNPJ number.                                                                          |
| **cpf**      | Applies a mask to a Brazilian CPF number.                                      | Validates a Brazilian CPF number.                                                                           |
| **currency** | Formats a number as currency.                                                  | Validates a currency value in the format of a decimal number with commas or periods as separators.          |
| **date**     | Applies a mask to a date string.                                               | Validates a date in the format of "dd/mm/yyyy".                                                             |
| **email**    | Converts a string to lowercase.                                                | Validates an email address.                                                                                 |
| **fullname** | An alias for titlecase.                                                        | Validates a full name, ensuring that it is not empty and contains at least two words with no abbreviations. |
| lowercase    | Converts a string to lowercase.                                                | -                                                                                                           |
| numeric      | Removes all non-numeric characters from a string.                              | -                                                                                                           |
| **phone**    | Applies a mask to a phone number.                                              | Validates a phone number, ensuring that it has at least 10 digits.                                          |
| **time**     | Applies a mask to a time string.                                               | Validates a time in the format of "hh:mm".                                                                  |
| titlecase    | Capitalizes the first letter of each word in a string.                         | -                                                                                                           |
| uppercase    | Converts a string to uppercase.                                                | -                                                                                                           |
| **zipcode**  | Applies a mask to a Brazilian ZIP code.                                        | Validates a Brazilian ZIP code.                                                                             |

### Example: Item

```javascript
import { Button, Form } from 'antd';
import { Item, DatePicker } from 'antdf';

const Example = () => {
    const [form] = Form.useForm();

    return (
        <Form form={form} onFinish={(submit: any) => console.log(submit)}>
            <Item
                format="cpf"
                formatMessage="CPF está incorreto."
                label="CPF"
                name="cpf"
                required
                requiredMessage="É preciso digitar o CPF."
            >
                <Input />
            </Item>
            <Item format="cnpj" label="CNPJ" name="cnpj" required>
                <Input placeholder="Digite o CNPJ..." />
            </Item>
            <Item format="time" label="Time" name="time" required>
                <Input />
            </Item>
            <Item format="fullname" label="Fullname" name="fullname" required>
                <Input.TextArea maxLength={20} showCount />
            </Item>
            <Button htmlType="submit">Submit</Button>
        </Form>
    );
};
```

## Componente: DataPicker

O component `DatePicker` servirá para substituir o `DatePicker` da documentação original do AntDesign 5.
Ele se comporta identico ao componente original, mas possui 2 propriedades opcionais a mais.

### Props: DatePicker

| Prop    | Descrição                                |
| ------- | ---------------------------------------- |
| minDate | dayjs com data mínima para o calendário. |
| maxDate | dayjs com data máxima para o calendário. |

### Exemplo: DatePicker

```javascript
import { Button, Form } from 'antd';
import { Item, DatePicker } from 'antdf';

const Example = () => {
    const [form] = Form.useForm();

    return (
        <Form form={form} onFinish={(submit: any) => console.log(submit)}>
            <Item label="Date" name="date" required>
                <DatePicker
                    format="DD/MM/YYYY"
                    maxDate={dayjs('2023-05-16')}
                    minDate={dayjs('2023-01-01')}
                    picker="date"
                    showToday={false}
                />
            </Item>
            <Item label="Month" name="month" required>
                <DatePicker
                    format="MM/YYYY"
                    minDate={dayjs('2023-01-01')}
                    picker="month"
                />
            </Item>
            <Item label="Year" name="year" required>
                <DatePicker format="YYYY" picker="year" />
            </Item>
            <Item label="Range" name="range" required>
                <DatePicker.RangePicker
                    format="DD/MM/YYYY"
                    maxDate={dayjs('2023-05-16')}
                    minDate={dayjs('2023-01-01')}
                    picker="date"
                />
            </Item>
            <Button htmlType="submit">Submit</Button>
        </Form>
    );
};
```

## Componente: Select

O component `Select` servirá para substituir o `Select` da documentação original do AntDesign 5.
Ele possui um aprimoramento na prop de search aceitando buscar por maisculos, minusculos e com acentos e mesmo assim achando o resultado. Exemplo:palhaco - encontrará resultados para Palhaço.
Também possui 1 propriedades opcional a mais.

### Props: Select

| Prop   | Descrição                                                                                                 |
| ------ | --------------------------------------------------------------------------------------------------------- |
| format | Normaliza as labels dos options automaticamente com `capitalize`, `titlecase`, `lowercase` ou `uppercase` |

### Example: Select

```javascript
import { Button, Form } from 'antd';
import { Item, DatePicker } from 'antdf';

const Example = () => {
    const [form] = Form.useForm();

    return (
        <Form form={form} onFinish={(submit: any) => console.log(submit)}>
            <Item label="Select" name="select" required>
                <Select
                    format="uppercase"
                    options={[
                        { value: 1, label: 'sim' },
                        { value: 2, label: 'não' },
                    ]}
                />
            </Item>
            <Button htmlType="submit">Submit</Button>
        </Form>
    );
};
```

### Subcomponente: Select.State e Select.City

O `Select.State` é um facilitador para retornar todos os estados do Brasil de uma vez dentro do select.
Assim como o `Select.City` faz o mesmo retornando as cidades do estado informado.

#### Exemplo: Select.State e Select.City

```javascript
import { Button, Form } from 'antd';
import { Item, Select } from 'antdf';

const Example = () => {
    const [form] = Form.useForm();

    const [state, setState] = useState<string>();

    return (
        <Form form={form} onFinish={(submit: any) => console.log(submit)}>
            <Item label="State" name="state" required>
                <Select.State
                    onSelect={(state: string) => {
                        setState(state);
                        form.setFieldValue('city', undefined);
                    }}
                />
            </Item>
            <Item label="City" name="city" required>
                <Select.City
                    disabled={!state}
                    format="uppercase"
                    state={state}
                />
            </Item>
            <Button htmlType="submit">Submit</Button>
        </Form>
    );
};
```

## Componente: ItemPassword

O componente `ItemPassword` é um facilitador para criação e atualização de senhas.
Ele engloba `Form.Item` e `Input.Password` no mesmo compomente com acrescimo de `rules` internas para a validação e confirmação.
Ou seja, não é necessário utilizar o `Item` e chamar o `ItemPassword` como subcomponente tudo está interno.

### Props: ItemPassword

| Prop     | Descrição                                          | Example          |
| -------- | -------------------------------------------------- | ---------------- |
| equal    | Nome do campo do password original para comparação | equal="password" |
| validate | Executa a validação das regras de senha            | validate         |

### Exemplo: ItemPassword

```javascript
import { Button, Form } from 'antd';
import { ItemPassword } from 'antdf';

const Example = () => {
    const [form] = Form.useForm();

    return (
        <Form form={form} onFinish={(submit: any) => console.log(submit)}>
            <ItemPassword
                label="New password"
                name="password"
                placeholder="Your new password"
                required
                validate
            />
            <ItemPassword
                equal="password"
                label="Confirm password"
                name="confirmPassword"
                required
            />
            <Button htmlType="submit">Submit</Button>
        </Form>
    );
};
```

## Componente: Outros

Os outros componentes do AntDesign 5 que podem ser usado no `Form` podem ser usado normalmente junto desse package.
Inclusive o `DatePicker` e `Select` originais também podem ser usados se preferir.

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
