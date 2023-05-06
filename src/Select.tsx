import React, { useEffect, useState } from 'react';

import { Select, SelectProps as SelectPropsAntd } from 'antd';
import { DefaultOptionType, SelectValue } from 'antd/es/select';

import { normalize } from './Item';

const search = (value: string): string => {
    if (!value) return '';
    const fix = value.normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const number = fix.replaceAll(/[.\-/]/g, '');
    if (!isNaN(Number(number))) return number;
    return fix.toLowerCase();
};

type Props = SelectPropsAntd<SelectValue> & {
    format?: 'capitalize' | 'titlecase' | 'lowercase' | 'uppercase';
};

const Custom: React.FC<Props> = ({
    allowClear = false,
    autoClearSearchValue = true,
    format,
    maxTagCount = 'responsive',
    onSelect,
    options,
    showArrow = true,
    showSearch = true,
    placeholder = 'Selecione...',
    ...props
}) => (
    <Select
        allowClear={allowClear}
        autoClearSearchValue={autoClearSearchValue}
        filterOption={(value, item) => {
            const input = search(String(value));
            const label = search(String(item?.label));
            return label.indexOf(input) !== -1 ? true : false;
        }}
        getPopupContainer={(node) => node}
        maxTagCount={maxTagCount}
        onSelect={(value: any, item: any) => {
            if (onSelect && value instanceof Object === false) {
                onSelect(value, item);
            }
        }}
        options={
            options &&
            options?.map((option: any) => {
                if (format) option.label = normalize[format](option?.label);
                return option;
            })
        }
        placeholder={placeholder}
        showArrow={showArrow}
        showSearch={showSearch}
        {...props}
    />
);

type FetchData = {
    key: string;
    value: string;
    label: string;
}[];

type StateProps = Omit<Props, 'options' | 'mode'>;

const CustomState: React.FC<StateProps> = ({ ...props }) => {
    const [options, setOptions] = useState<DefaultOptionType[]>([]);

    const getStates = () => {
        fetch(
            'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
            { method: 'GET', redirect: 'follow' }
        )
            .then((response) => response.json())
            .then((result: { id: string; sigla: string; nome: string }[]) => {
                const data = [] as FetchData;
                if (result) {
                    result?.map(({ id, sigla, nome }) =>
                        data.push({ key: id, value: sigla, label: nome })
                    );
                }
                setOptions(data);
            });
    };

    useEffect(() => {
        getStates();
    }, []);

    return <Select options={options} {...props} />;
};

type CityProps = Omit<Props, 'options' | 'mode'> & {
    state: string | undefined;
};

const CustomCity: React.FC<CityProps> = ({ state, ...props }) => {
    const [options, setOptions] = useState<DefaultOptionType[]>([]);

    const getCities = (state: string) => {
        fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios?orderBy=nome`,
            { method: 'GET', redirect: 'follow' }
        )
            .then((response) => response.json())
            .then((result: { id: string; nome: string }[]) => {
                const data = [] as FetchData;
                if (result) {
                    result?.map(({ id, nome }) =>
                        data.push({ key: id, value: nome, label: nome })
                    );
                }
                setOptions(data);
            });
    };

    useEffect(() => {
        if (!state) return;
        getCities(state);
    }, [state]);

    return <Select options={options} {...props} />;
};

class Class extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    static State = CustomState;

    static City = CustomCity;

    render() {
        return <Custom {...this.props} />;
    }
}

export default Class;
export { search };
export type { Props as SelectProps };
