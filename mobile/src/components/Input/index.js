import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import { date as convertToHumanDate } from '../../utils/masks'
import { dateToString, pad } from '../../utils/string';

export function Input({ dateInputType = false, passwordInputType = false, label, error, onChangeText, placeholder, disabled = false, ...rest }) {

  const [date] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleOpenDatePicker = () => {
    setShowDatePicker(true)
  }

  const datePickerChangeDate = (date) => {
    const currentDate = dateToString(date.nativeEvent.timestamp)
    onChangeText(currentDate)
    setShowDatePicker(false)
  }

  if (dateInputType) {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputGroup}>
          <TextInput
            editable={!disabled}
            selectTextOnFocus={!disabled}
            style={disabled ? styles.inputDisabledDate : styles.inputDate}
            onChangeText={text => onChangeText(convertToHumanDate(text))}
            placeholder={placeholder}
            {...rest}
          />
          <TouchableOpacity
            style={disabled ? styles.ButtonDisabledDate : styles.ButtonDate}
            onPress={disabled ? () => { } : handleOpenDatePicker}>
            <FontAwesome5 name="calendar-alt" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode='date'
            display="default"
            onChange={(selectedDate) => datePickerChangeDate(selectedDate)}
          />
        )}
      </View>
    )
  }

  if (passwordInputType) {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputGroup}>
          <TextInput
            editable={!disabled}
            selectTextOnFocus={!disabled}
            style={disabled ? styles.inputDisabledDate : styles.inputDate}
            onChangeText={text => onChangeText(text)}
            placeholder={placeholder}
            secureTextEntry={showPassword}
            {...rest}
          />
          <TouchableOpacity
            style={disabled ? styles.ButtonDisabledDate : styles.ButtonDate}
            onPress={disabled ? () => { } : handleToggleShowPassword}>
            {
              showPassword
                ? <FontAwesome5 name="eye" size={24} color="#fff" />
                : <FontAwesome5 name="eye-slash" size={24} color="#fff" />
            }
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        editable={!disabled}
        selectTextOnFocus={!disabled}
        style={disabled ? styles.inputDisabled : styles.input}
        onChangeText={text => onChangeText(text)}
        placeholder={placeholder}
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}