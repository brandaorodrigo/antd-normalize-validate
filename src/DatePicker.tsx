import 'dayjs/locale/pt-br';

import React from 'react';

import { DatePicker, DatePickerProps } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import locale from 'antd/es/date-picker/locale/pt_BR';
import dayjs, { Dayjs } from 'dayjs';

const autoLocale = locale;

const joinDate = (date: string | Dayjs, time: string) => {
    return dayjs(date)
        .hour(Number(time.split(':')[0]))
        .minute(Number(time.split(':')[1]))
        .second(0)
        .millisecond(0);
};

const disabledDate = (
    date: Dayjs,
    minDate: Dayjs | undefined,
    maxDate: Dayjs | undefined
): boolean => {
    if (!date) return true;
    if (minDate && date.isBefore(minDate)) return true;
    if (maxDate && date.isAfter(maxDate.add(1, 'day'))) return true;
    return false;
};

type Props = DatePickerProps & {
    maxDate?: Dayjs;
    minDate?: Dayjs;
};

const Custom: React.FC<Props> = ({
    allowClear = false,
    format = 'DD/MM/YYYY',
    locale,
    maxDate,
    minDate,
    style = { width: '100%' },
    ...props
}) => (
    <DatePicker
        allowClear={allowClear}
        disabledDate={(date) => disabledDate(date, minDate, maxDate)}
        format={format}
        getPopupContainer={(node) => node}
        locale={locale ?? autoLocale}
        style={style}
        {...props}
    />
);

type CustomRangePickerProps = RangePickerProps & {
    maxDate?: Dayjs;
    minDate?: Dayjs;
};

const CustomRangePicker: React.FC<CustomRangePickerProps> = ({
    allowClear = false,
    format = 'DD/MM/YYYY',
    locale,
    maxDate,
    minDate,
    style = { width: '100%' },
    ...props
}) => (
    <DatePicker.RangePicker
        allowClear={allowClear}
        disabledDate={(date) => disabledDate(date, minDate, maxDate)}
        format={format}
        getPopupContainer={(node) => node}
        locale={locale ?? autoLocale}
        style={style}
        {...props}
    />
);

class Class extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    static RangePicker = CustomRangePicker;

    render() {
        return <Custom {...this.props} />;
    }
}

export default Class;
export { joinDate, disabledDate };
