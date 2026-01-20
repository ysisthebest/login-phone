import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function App() {
  const [phone, setPhone] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // CON TRỎ NHẤP NHÁY
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const addNumber = (num) => {
    if (phone.length < 10) {
      setPhone(phone + num);
    }
  };

  const deleteNumber = () => {
    setPhone(phone.slice(0, -1));
  };

  const renderKey = (label, onPress) => (
    <TouchableOpacity style={styles.key} onPress={onPress}>
      <Text style={styles.keyText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* PHẦN TRÊN */}
      <View style={styles.top}>
        <Text style={styles.title}>Đăng nhập</Text>

        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.desc}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        {/* INPUT + CON TRỎ */}
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>
            {phone}
            {showCursor && <Text style={styles.cursor}>|</Text>}
          </Text>

          {phone.length === 0 && (
            <Text style={styles.placeholder}>
              Nhập số điện thoại của bạn
            </Text>
          )}
        </View>
      </View>

      {/* PHẦN DƯỚI */}
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[
            styles.button,
            phone.length < 9 && styles.buttonDisabled
          ]}
          disabled={phone.length < 9}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>

        {/* BÀN PHÍM */}
        <View style={styles.keyboard}>
          <View style={styles.row}>
            {renderKey('1', () => addNumber('1'))}
            {renderKey('2', () => addNumber('2'))}
            {renderKey('3', () => addNumber('3'))}
          </View>
          <View style={styles.row}>
            {renderKey('4', () => addNumber('4'))}
            {renderKey('5', () => addNumber('5'))}
            {renderKey('6', () => addNumber('6'))}
          </View>
          <View style={styles.row}>
            {renderKey('7', () => addNumber('7'))}
            {renderKey('8', () => addNumber('8'))}
            {renderKey('9', () => addNumber('9'))}
          </View>
          <View style={styles.row}>
            <View style={styles.key} />
            {renderKey('0', () => addNumber('0'))}
            {renderKey('⌫', deleteNumber)}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  /* PHẦN TRÊN */
  top: {
    flex: 1,
    padding: 24
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6
  },
  desc: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20
  },

  inputBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    position: 'relative'
  },
  inputText: {
    fontSize: 16,
    color: '#000'
  },
  cursor: {
    fontSize: 22,   
    lineHeight: 26,   
    color: '#00bfa5',
    fontWeight: 'bold'
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    top: 10,
    fontSize: 16,
    color: '#aaa'
  },

  /* PHẦN DƯỚI */
  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 16
  },
  button: {
    backgroundColor: '#00bfa5',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonDisabled: {
    backgroundColor: '#ccc'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },

  keyboard: {
    marginTop: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  key: {
    width: '30%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6
  },
  keyText: {
    fontSize: 22,
    fontWeight: '600'
  }
});