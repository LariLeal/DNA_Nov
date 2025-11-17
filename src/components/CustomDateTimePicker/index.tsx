import React, {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Modal, Platform, View} from 'react-native';
import {style} from './styles';

interface CustomDateTimePickerProps {
    type?: 'date' | 'time' | 'datetime';
    onDateChange?: (date: Date) => void;
    show: boolean;
    setShow: (show: boolean) => void;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
    type = 'date',
    onDateChange,
    show,
    setShow,
}) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (onDateChange) {
            onDateChange(date);
        }
    }, [date, onDateChange]);

    const onChange = (event: any, selectedDate?: Date) => {
        if (event.type === 'dismissed') {
            setShow(false);
            return
        }
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false);
    }

    return (
        <Modal transparent visible={show} onRequestClose={() => setShow(false)}>
            <View style={style.modalOverlay}>
                <View
                    style={[
                        style.container,
                        Platform.OS === 'android' && {backgroundColor: 'transparent'},
                    ]}
                >
                    <DateTimePicker
                        value={date}
                        mode={type}
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={onChange}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default CustomDateTimePicker;