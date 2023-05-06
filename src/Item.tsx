import React from 'react';

import { Form, FormItemProps } from 'antd';
import dayjs from 'dayjs';
import { Rule } from 'rc-field-form/lib/interface';

class Normalize {
    mask = (value: string | number, mask: string): string => {
        if (!value) return '';
        const numeric = String(value).replace(/\D/g, '');
        let digit = 0;
        let output = '';
        if (!numeric.length) return '';
        for (let i = 0; i < mask.length; i += 1)
            if (mask.charAt(i) === '_') {
                output += numeric.charAt(digit);
                if (!numeric.charAt(digit + 1)) break;
                digit += 1;
            } else output += mask.charAt(i);
        return output;
    };

    capitalize = (value: string): string => {
        if (!value) return '';
        return (
            String(value).charAt(0).toUpperCase() +
            String(value).slice(1).toLowerCase()
        );
    };

    cnpj = (value: string): string => this.mask(value, '__.___.___/____-__');

    cpf = (value: string): string => this.mask(value, '___.___.___-__');

    currency = (value: string | number): string => {
        if (!value && value !== '0' && value != '0,00' && value !== 0)
            return '';
        let integer = '';
        let decimal = '';
        if (typeof value === 'number') {
            const split = String(value.toFixed(2)).split('.');
            integer = String(Number(split[0]));
            decimal = split[1] ? String(split[1].slice(0, 2)) : '0';
        } else {
            const numeric = String(value).replace(/\D/g, '');
            decimal = numeric.slice(-2);
            integer = numeric.slice(0, -2);
        }
        if (decimal.length === 1) decimal = `0${decimal}`;
        if (integer.length) {
            integer = String(integer).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        } else {
            integer = '0';
        }
        if (integer.replaceAll('0', '') === '') {
            integer = '0';
        }
        return `${Number(integer)},${decimal}`;
    };

    currencyToNumber = (value: string): number | undefined => {
        if (!value && value != '0,00') return undefined;
        const numeric = value.replace(/\D/g, '');
        if (!numeric && numeric !== '0') return undefined;
        return Number(value.replaceAll('.', '').replaceAll(',', '.'));
    };

    date = (value: string): string => this.mask(value, '__/__/____');

    dateToIso = (value: string): string | undefined => {
        const s = value.split('/');
        if (s.length !== 3) return undefined;
        return `${s[2]}-${s[1]}-${s[0]}`;
    };

    email = (value: string): string => value.toLowerCase();

    lowercase = (value: string): string => {
        return value.toLowerCase();
    };

    numeric = (value: string): string => {
        return value ? value.replace(/\D/g, '') : '';
    };

    phone = (value: string): string => {
        if (!value) return '';
        const fix = value.replace(/\D/g, '');
        if (fix.slice(0, 1) === '0') return this.mask(fix, '____-___-____');
        return this.mask(
            fix,
            fix.length === 11 ? '(__) _____-____' : '(__) ____-____'
        );
    };

    phoneToInternational = (value: string): string => {
        if (!value) return '';
        const numeric = value.replace(/\D/g, '');
        if (!numeric) return '';
        const ddi = value.slice(0, 3) === '+55' ? true : false;
        return ddi ? `+${numeric}` : `+55${numeric}`;
    };

    time = (value: string): string => this.mask(value, '__:__');

    titlecase = (value: string): string => {
        if (!value) return '';
        const exclude = 'as,à,às,com,da,de,do,e,etc,na,no,o,dos'.split(',');
        const array = value.split(' ');
        const upper = array?.map((word) => {
            const w = word.toLowerCase();
            if (!exclude.includes(w))
                return w[0]
                    ? w[0].toUpperCase() + w.slice(1).toLowerCase()
                    : '';
            return w;
        });
        if (upper) {
            value = upper.join(' ');
            value = value.replaceAll('S/a', 'S/A');
        }
        return value;
    };

    fullname = (value: string): string => {
        const fix = this.titlecase(value);
        return fix.replace(/[0-9]/g, '');
    };

    uppercase = (value: string): string => {
        return value.toUpperCase();
    };

    zipcode = (value: string): string => this.mask(value, '_____-___');
}

const normalizeInternal = new Normalize();

class Validate {
    cnpj = (value: string): boolean => {
        const mod11 = (clear: string, limit: number): number => {
            const value = String(clear).replace(/\D/g, '');
            let sum = 0;
            let mult = 2;
            for (let i = value.length - 1; i >= 0; i--) {
                sum += mult * +value[i];
                if (++mult > limit) mult = 2;
            }
            const dv = ((sum * 10) % 11) % 10;
            return dv;
        };
        value = value.replace(/\D+/g, '');
        if (value.length !== 14 || value.match(/(\d)\1{13}/)) return false;
        const number = value.substring(0, value.length - 2);
        const dv1 = mod11(number, 9);
        const dv2 = mod11(number + dv1, 9);
        return number + dv1 + dv2 === value;
    };

    cpf = (value: string): boolean => {
        const mod11 = (clear: string, limit: number): number => {
            const value = String(clear).replace(/\D/g, '');
            let sum = 0;
            let mult = 2;
            for (let i = value.length - 1; i >= 0; i--) {
                sum += mult * +value[i];
                if (++mult > limit) mult = 2;
            }
            const dv = ((sum * 10) % 11) % 10;
            return dv;
        };
        value = value.replace(/\D+/g, '');
        if (value.length !== 11 || value.match(/(\d)\1{10}/)) return false;
        const number = value.slice(0, 9);
        const dv1 = mod11(number, 12);
        const dv2 = mod11(number + dv1, 12);
        return number + dv1 + dv2 === value;
    };

    currency = (value: string): boolean => {
        return /^((?=.*[1-9]|0)(?:\d{1,3}))((?=.*\d)(?:.\d{3})?)*((?=.*\d)(?:,\d\d){1}?){0,1}$/gm.test(
            value
        );
    };

    date = (value: string): boolean => {
        if (value.length !== 10) return false;
        const split = value.split('/');
        if (split.length !== 3) return false;
        const original = `${split[2]}-${split[1]}-${split[0]}`;
        const format = dayjs(original).format('YYYY-MM-DD');
        return original === format ? true : false;
    };

    email = (value: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    fullname = (value: string): boolean | string => {
        const split = value.trim().split(' ');
        if (split.length) {
            if (split.length === 1) return 'Digite o nome completo.';
            if (split[0].length < 2 || split[split.length - 1].length < 2)
                return 'Não utilize abreviações.';
            else return true;
        } else return false;
    };

    phone = (value: string): boolean => {
        value = value.replace(/\D/g, '');
        return value.length < 10 ? false : true;
    };

    time = (value: string): boolean => {
        if (value.length !== 5 || value.indexOf(':') !== 2) return false;
        const split = value.split(':');
        if (Number(split[0]) > 23 || Number(split[1]) > 59) return false;
        return true;
    };

    zipcode = (value: string): boolean => {
        return value.length === 9 ? true : false;
    };
}

const validate = new Validate();

type ItemProps = FormItemProps & {
    format?:
        | 'capitalize'
        | 'cnpj'
        | 'cpf'
        | 'currency'
        | 'date'
        | 'email'
        | 'fullname'
        | 'lowercase'
        | 'numeric'
        | 'phone'
        | 'time'
        | 'titlecase'
        | 'uppercase'
        | 'zipcode';
    formatMessage?: string;
    requiredMessage?: string;
};

const Item: React.FC<ItemProps> = ({
    children,
    format,
    formatMessage,
    label,
    normalize,
    required,
    requiredMessage,
    rules,
    validateTrigger = 'onBlur',
    ...props
}) => {
    const autoRules = [
        {
            required,
            message: requiredMessage
                ? requiredMessage
                : label
                ? `${label} é obrigatório.`
                : 'Obrigatório.',
        },
    ] as Rule[];

    if (format && validate[format]) {
        autoRules.push(() => ({
            validator(_: unknown, value: string) {
                if (!value) {
                    return Promise.resolve();
                }
                const result = validate[format](value);
                if (result === true) {
                    return Promise.resolve();
                }
                if (typeof result === 'string') {
                    return Promise.reject(new Error(result));
                }
                return Promise.reject(
                    new Error(formatMessage ?? `${label} é inválido.`)
                );
            },
        }));
    }

    return (
        <Form.Item
            label={label}
            normalize={(value, preValue, allValues) =>
                normalize
                    ? normalize(value, preValue, allValues)
                    : format
                    ? normalizeInternal[format](value)
                    : value
            }
            required={required}
            rules={rules ? autoRules.concat(rules) : autoRules}
            validateTrigger={validateTrigger}
            {...props}
        >
            {children}
        </Form.Item>
    );
};

export default Item;
export { normalizeInternal as normalize };
export type { ItemProps };
